const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_E07KJmxtGRsb@ep-withered-sun-a9hfiu37-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
  }
})

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })
    
    console.log('👥 Users in database:', users.length)
    users.forEach(user => {
      console.log(`📧 ${user.email} - ${user.name} (${user.role})`)
    })
    
    // Test specific user
    const testUser = await prisma.user.findUnique({
      where: { email: 'sarah@fashionnova.com' }
    })
    
    if (testUser) {
      console.log('✅ Test user exists:', testUser.email)
      console.log('🔒 Password hash exists:', !!testUser.password)
    } else {
      console.log('❌ Test user NOT found')
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()