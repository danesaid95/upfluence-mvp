import { NextResponse } from "next/server"

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL
    
    return NextResponse.json({
      status: 'debug',
      databaseUrl: {
        exists: !!databaseUrl,
        length: databaseUrl?.length || 0,
        firstChar: databaseUrl?.charCodeAt(0),
        first10: databaseUrl?.substring(0, 10),
        trimmed: databaseUrl?.trim().substring(0, 10),
        startsWithPostgres: databaseUrl?.startsWith('postgresql://'),
        startsWithPostgresTrimmed: databaseUrl?.trim().startsWith('postgresql://'),
        raw: JSON.stringify(databaseUrl?.substring(0, 50))
      },
      allEnv: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}