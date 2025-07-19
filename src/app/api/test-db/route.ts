import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
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
      testUserEmail: testUser?.email
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      status: 'error',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}