import QRCode from 'qrcode'
import { createHash, randomBytes } from 'crypto'

/**
 * Generate a cryptographically secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString('hex')
}

/**
 * Hash a token for storage (one-way)
 */
export function hashToken(token: string): string {
  const pepper = process.env.QR_TOKEN_PEPPER || 'empire-hybrid-lounge-default-pepper'
  return createHash('sha256')
    .update(token + pepper)
    .digest('hex')
}

/**
 * Verify a token against its hash
 */
export function verifyToken(token: string, hash: string): boolean {
  return hashToken(token) === hash
}

/**
 * Generate a signed token with version and pass ID
 * The actual token is not stored, only its hash
 */
export function generateSignedToken(passId: string, version: number = 1): {
  token: string
  hash: string
} {
  const randomPart = generateSecureToken(32)
  const token = `${passId}.v${version}.${randomPart}`
  const hash = hashToken(token)
  
  return { token, hash }
}

/**
 * Verify and parse a signed token
 */
export function parseSignedToken(token: string): {
  valid: boolean
  passId?: string
  version?: number
} {
  const parts = token.split('.')
  
  if (parts.length !== 3) {
    return { valid: false }
  }
  
  const [passId, versionPart, ...rest] = parts
  
  if (!passId || !versionPart || rest.length === 0) {
    return { valid: false }
  }
  
  if (!versionPart.startsWith('v')) {
    return { valid: false }
  }
  
  const version = parseInt(versionPart.substring(1), 10)
  
  if (isNaN(version)) {
    return { valid: false }
  }
  
  return {
    valid: true,
    passId,
    version,
  }
}

/**
 * Generate a QR code as a data URL
 */
export async function generateQRCode(
  url: string,
  options: {
    width?: number
    margin?: number
    color?: {
      dark?: string
      light?: string
    }
  } = {}
): Promise<string> {
  const {
    width = 300,
    margin = 2,
    color = {},
  } = options

  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width,
      margin,
      color: {
        dark: color.dark || '#ff0055',
        light: color.light || '#0b0c10',
      },
      errorCorrectionLevel: 'H', // High error correction for QR codes that may be scanned at angles
    })

    return dataUrl
  } catch (error) {
    console.error('Failed to generate QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}

/**
 * Generate a QR code as a buffer (for PDF generation)
 */
export async function generateQRCodeBuffer(
  url: string,
  options: {
    width?: number
    margin?: number
    color?: {
      dark?: string
      light?: string
    }
  } = {}
): Promise<Buffer> {
  const {
    width = 300,
    margin = 2,
    color = {},
  } = options

  try {
    const buffer = await QRCode.toBuffer(url, {
      width,
      margin,
      color: {
        dark: color.dark || '#ff0055',
        light: color.light || '#0b0c10',
      },
      errorCorrectionLevel: 'H',
    })

    return buffer
  } catch (error) {
    console.error('Failed to generate QR code buffer:', error)
    throw new Error('Failed to generate QR code buffer')
  }
}

/**
 * Generate the pass verification URL
 */
export function generatePassUrl(token: string, baseUrl?: string): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://empire-hybrid-lounge.com'
  return `${base}/verify-pass/${token}`
}

/**
 * Generate a complete pass with QR code
 */
export async function generatePassData(
  passId: string,
  eventId: string,
  options: {
    baseUrl?: string
    qrWidth?: number
  } = {}
): Promise<{
  token: string
  tokenHash: string
  verificationUrl: string
  qrCodeDataUrl: string
}> {
  const { token, hash } = generateSignedToken(passId)
  const verificationUrl = generatePassUrl(token, options.baseUrl)
  const qrCodeDataUrl = await generateQRCode(verificationUrl, {
    width: options.qrWidth || 300,
  })

  return {
    token,
    tokenHash: hash,
    verificationUrl,
    qrCodeDataUrl,
  }
}
