/**
 * Payment Provider Interface
 * Defines the contract for all payment provider adapters
 */

export interface InitiatePaymentInput {
  amount: number
  currency: string
  phoneNumber: string
  reference: string
  description?: string
  customerEmail?: string
  metadata?: Record<string, string>
}

export interface InitiatePaymentResult {
  success: boolean
  providerReference?: string
  checkoutUrl?: string
  status: 'pending' | 'initiated' | 'failed'
  errorCode?: string
  errorMessage?: string
}

export interface PaymentStatusResult {
  success: boolean
  status: 'pending' | 'successful' | 'failed' | 'cancelled' | 'refunded'
  providerReference?: string
  amount?: number
  currency?: string
  failureCode?: string
  failureMessage?: string
  errorCode?: string
  errorMessage?: string
  processedAt?: string
}

export interface VerifiedPaymentEvent {
  success: boolean
  eventId: string
  eventType: string
  providerReference: string
  status: 'pending' | 'successful' | 'failed' | 'cancelled' | 'refunded'
  amount: number
  currency: string
  phoneNumber?: string
  rawPayload: Record<string, unknown>
  signatureValid: boolean
}

/**
 * Payment Provider Interface
 */
export interface PaymentProvider {
  /**
   * Initiate a payment collection
   */
  initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentResult>

  /**
   * Check the status of a transaction
   */
  getTransactionStatus(reference: string): Promise<PaymentStatusResult>

  /**
   * Verify a webhook event from the provider
   */
  verifyWebhook(request: Request): Promise<VerifiedPaymentEvent>

  /**
   * Get the provider name
   */
  getProviderName(): string

  /**
   * Check if the provider is in sandbox mode
   */
  isSandbox(): boolean
}

/**
 * Payment provider factory
 */
export type PaymentProviderType = 'campay' | 'monetbil' | 'sandbox'

export function getPaymentProvider(type: PaymentProviderType): PaymentProvider {
  switch (type) {
    case 'campay':
      return createCamPayProvider()
    case 'monetbil':
      return createMonetbilProvider()
    case 'sandbox':
    default:
      return createSandboxProvider()
  }
}

function createCamPayProvider(): PaymentProvider {
  return new CamPayProvider()
}

function createMonetbilProvider(): PaymentProvider {
  return new MonetbilProvider()
}

function createSandboxProvider(): PaymentProvider {
  return new SandboxProvider()
}

/**
 * CamPay Provider Implementation
 * Documentation: https://docs.campay.net/
 */
class CamPayProvider implements PaymentProvider {
  private apiBaseUrl: string
  private apiUsername: string
  private apiPassword: string
  private webhookSecret: string

  constructor() {
    this.apiBaseUrl = process.env.PAYMENT_API_BASE_URL || 'https://api.campay.net/api'
    this.apiUsername = process.env.PAYMENT_API_USERNAME || ''
    this.apiPassword = process.env.PAYMENT_API_PASSWORD || ''
    this.webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET || ''
  }

  getProviderName(): string {
    return 'CamPay'
  }

  isSandbox(): boolean {
    return this.apiBaseUrl.includes('sandbox') || !this.apiUsername
  }

  private async getToken(): Promise<string> {
    const response = await fetch(`${this.apiBaseUrl}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.apiUsername,
        password: this.apiPassword,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get CamPay token')
    }

    const data = await response.json()
    return data.token
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
    try {
      const token = await this.getToken()

      // Normalize phone number for CamPay (remove 237 prefix if present)
      const normalizedPhone = input.phoneNumber.replace(/^237/, '')

      const response = await fetch(`${this.apiBaseUrl}/collect/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          amount: String(input.amount / 100), // CamPay expects amount in main currency unit
          currency: input.currency,
          from: normalizedPhone,
          reference: input.reference,
          description: input.description || `Payment ${input.reference}`,
          redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/complete`,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        return {
          success: false,
          status: 'failed',
          errorCode: 'INIT_FAILED',
          errorMessage: error.detail || 'Payment initiation failed',
        }
      }

      const data = await response.json()

      return {
        success: true,
        providerReference: data.reference,
        checkoutUrl: data.redirect_url,
        status: 'pending',
      }
    } catch (error) {
      return {
        success: false,
        status: 'failed',
        errorCode: 'NETWORK_ERROR',
        errorMessage: 'Failed to connect to payment provider',
      }
    }
  }

  async getTransactionStatus(reference: string): Promise<PaymentStatusResult> {
    try {
      const token = await this.getToken()

      const response = await fetch(`${this.apiBaseUrl}/transaction/${reference}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      if (!response.ok) {
        return {
          success: false,
          status: 'failed',
          errorCode: 'NOT_FOUND',
          errorMessage: 'Transaction not found',
        }
      }

      const data = await response.json()

      return {
        success: true,
        status: this.mapPaymentStatus(data.status),
        providerReference: data.reference,
        amount: parseFloat(data.amount) * 100, // Convert to smallest unit
        currency: data.currency,
        processedAt: data.updated_at,
      }
    } catch (error) {
      return {
        success: false,
        status: 'failed',
        errorCode: 'NETWORK_ERROR',
        errorMessage: 'Failed to check transaction status',
      }
    }
  }

  async verifyWebhook(request: Request): Promise<VerifiedPaymentEvent> {
    const signature = request.headers.get('x-campay-signature')

    // Verify signature
    if (signature !== this.webhookSecret) {
      return {
        success: false,
        eventId: '',
        eventType: '',
        providerReference: '',
        status: 'failed',
        amount: 0,
        currency: '',
        rawPayload: {},
        signatureValid: false,
      }
    }

    const payload = await request.json()

    return {
      success: true,
      eventId: payload.reference || '',
      eventType: payload.status || '',
      providerReference: payload.reference || '',
      status: this.mapPaymentStatus(payload.status),
      amount: parseFloat(payload.amount || '0') * 100,
      currency: payload.currency || 'XAF',
      phoneNumber: payload.operator_reference,
      rawPayload: payload,
      signatureValid: true,
    }
  }

  private mapPaymentStatus(status: string): PaymentStatusResult['status'] {
    switch (status.toUpperCase()) {
      case 'SUCCESSFUL':
        return 'successful'
      case 'FAILED':
        return 'failed'
      case 'CANCELLED':
        return 'cancelled'
      case 'REFUNDED':
        return 'refunded'
      default:
        return 'pending'
    }
  }
}

/**
 * Monetbil Provider Implementation (placeholder)
 */
class MonetbilProvider implements PaymentProvider {
  getProviderName(): string {
    return 'Monetbil'
  }

  isSandbox(): boolean {
    return true
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
    // Placeholder implementation
    return {
      success: false,
      status: 'failed',
      errorCode: 'NOT_IMPLEMENTED',
      errorMessage: 'Monetbil integration is not yet implemented',
    }
  }

  async getTransactionStatus(reference: string): Promise<PaymentStatusResult> {
    return {
      success: false,
      status: 'pending',
      errorCode: 'NOT_IMPLEMENTED',
      errorMessage: 'Monetbil integration is not yet implemented',
    }
  }

  async verifyWebhook(request: Request): Promise<VerifiedPaymentEvent> {
    return {
      success: false,
      eventId: '',
      eventType: '',
      providerReference: '',
      status: 'failed',
      amount: 0,
      currency: '',
      rawPayload: {},
      signatureValid: false,
    }
  }
}

/**
 * Sandbox Provider Implementation
 * Used for development and testing
 */
class SandboxProvider implements PaymentProvider {
  getProviderName(): string {
    return 'Sandbox'
  }

  isSandbox(): boolean {
    return true
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
    // Simulate successful payment initiation
    return {
      success: true,
      providerReference: `SANDBOX_${input.reference}_${Date.now()}`,
      status: 'initiated',
    }
  }

  async getTransactionStatus(reference: string): Promise<PaymentStatusResult> {
    // Simulate status check - always return pending for sandbox
    return {
      success: true,
      status: 'pending',
      providerReference: reference,
    }
  }

  async verifyWebhook(request: Request): Promise<VerifiedPaymentEvent> {
    const payload = await request.json()

    return {
      success: true,
      eventId: payload.reference || `SANDBOX_${Date.now()}`,
      eventType: payload.status || 'SUCCESSFUL',
      providerReference: payload.reference || '',
      status: 'successful',
      amount: payload.amount || 1000,
      currency: payload.currency || 'XAF',
      rawPayload: payload,
      signatureValid: true,
    }
  }
}
