const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_E07KJmxtGRsb@ep-withered-sun-a9hfiu37-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
  }
})

async function createTestUser() {
  try {
    // Create a simple test user
    const testUser = await prisma.user.upsert({
      where: { email: 'test@test.com' },
      update: {},
      create: {
        email: 'test@test.com',
        password: await bcrypt.hash('test123', 10),
        name: 'Test User',
        role: 'BRAND',
        company: 'Test Company',
        subscription: {
          create: {
            planType: 'FREE',
            status: 'ACTIVE'
          }
        }
      }
    })
    
    console.log('✅ Created test user:', testUser.email)
    console.log('🔑 Login with: test@test.com / test123')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()