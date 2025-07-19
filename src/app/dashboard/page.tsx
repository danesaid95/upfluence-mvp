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

    console.log("Dashboard Router - Status:", status)
    console.log("Dashboard Router - Session:", session)
    console.log("Dashboard Router - User Role:", session?.user?.role)

    if (!session) {
      console.log("No session, redirecting to signin")
      router.push("/auth/signin")
      return
    }

    // Redirect based on user role
    const userRole = session.user.role
    console.log("Redirecting based on role:", userRole)
    
    switch (userRole) {
      case "BRAND":
        console.log("Redirecting to brand dashboard")
        router.push("/dashboard/brand")
        break
      case "INFLUENCER":
        console.log("Redirecting to influencer dashboard")
        router.push("/dashboard/influencer")
        break
      case "ADMIN":
        console.log("Redirecting to admin dashboard")
        router.push("/dashboard/admin")
        break
      default:
        console.log("Unknown role, redirecting to signin:", userRole)
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