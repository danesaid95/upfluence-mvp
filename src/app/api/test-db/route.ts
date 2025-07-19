import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    console.log('Testing database connection...')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('DATABASE_URL starts with:', process.env.DATABASE_URL?.substring(0, 20))
    
    // Test database connection
    const userCount = await prisma.user.count()
    const testUser = await prisma.user.findFirst({
      where: { email: 'sarah@fashionnova.com' },
      select: { id: true, email: true, name: true }
    })
    
    return NextResponse.json({
      status: 'success',
      database: 'connected',
      userCount,
      testUser: testUser ? 'found' : 'not found',
      testUserEmail: testUser?.email,
      envCheck: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL
      }
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      status: 'error',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      envCheck: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        databaseUrlPreview: process.env.DATABASE_URL?.substring(0, 30) + '...'
      }
    }, { status: 500 })
  }
}