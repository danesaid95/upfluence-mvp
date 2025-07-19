"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserRole } from "@prisma/client"

export default function DashboardRouter() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      router.push("/auth/signin")
      return
    }

    // Redirect based on user role
    switch (session.user.role) {
      case UserRole.BRAND:
        router.push("/dashboard/brand")
        break
      case UserRole.INFLUENCER:
        router.push("/dashboard/influencer")
        break
      case UserRole.ADMIN:
        router.push("/dashboard/admin")
        break
      default:
        router.push("/auth/signin")
    }
  }, [session, status, router])

  // Loading state
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}