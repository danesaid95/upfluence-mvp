import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Clean and validate database URL
const rawDatabaseUrl = process.env.DATABASE_URL || 
  "postgresql://neondb_owner:npg_E07KJmxtGRsb@ep-withered-sun-a9hfiu37-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require"

const DATABASE_URL = rawDatabaseUrl.trim()

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL
    }
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma