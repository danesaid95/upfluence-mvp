import { UserRole, Subscription, InfluencerProfile } from "@prisma/client"
import "next-auth"

declare module "next-auth" {
  interface User {
    role: UserRole
    company?: string
    subscription?: Subscription
    influencerProfile?: InfluencerProfile & {
      socialProfiles: any[]
    }
  }

  interface Session {
    user: User & {
      id: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
    company?: string
    subscription?: Subscription
    influencerProfile?: InfluencerProfile & {
      socialProfiles: any[]
    }
  }
}