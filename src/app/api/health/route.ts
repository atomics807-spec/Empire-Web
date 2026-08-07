import { NextResponse } from 'next/server'
import { getCurrentTimeISO, CAMEROON_TIMEZONE } from '@/lib/timezone'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: getCurrentTimeISO(),
    timezone: CAMEROON_TIMEZONE,
    service: 'empire-hybrid-lounge',
    version: process.env.npm_package_version || '1.0.0',
  })
}
