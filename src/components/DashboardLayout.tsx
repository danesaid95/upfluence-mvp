"use client"

import { ReactNode } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Users, 
  Search, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Plus
} from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const userRole = session?.user?.role

  const brandNavigation = [
    { name: "Dashboard", href: "/dashboard/brand", icon: Home },
    { name: "Find Influencers", href: "/dashboard/search", icon: Search },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: BarChart3 },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  ]

  const influencerNavigation = [
    { name: "Dashboard", href: "/dashboard/influencer", icon: Home },
    { name: "Opportunities", href: "/dashboard/opportunities", icon: Search },
    { name: "My Campaigns", href: "/dashboard/campaigns", icon: BarChart3 },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Profile", href: "/dashboard/profile", icon: Users },
  ]

  const adminNavigation = [
    { name: "Dashboard", href: "/dashboard/admin", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Campaigns", href: "/admin/campaigns", icon: BarChart3 },
    { name: "Reports", href: "/admin/reports", icon: MessageSquare },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ]

  const getNavigation = () => {
    switch (userRole) {
      case "BRAND":
        return brandNavigation
      case "INFLUENCER":
        return influencerNavigation
      case "ADMIN":
        return adminNavigation
      default:
        return brandNavigation
    }
  }

  const navigation = getNavigation()

  const isActive = (href: string) => {
    if (href === "/dashboard/brand" || href === "/dashboard/influencer" || href === "/dashboard/admin") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center px-6 border-b">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            Upfluence
          </Link>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-3 border-t">
          <div className="space-y-1">
            <Link
              href="/settings"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {session?.user?.role === "BRAND" 
                  ? "Brand Dashboard" 
                  : session?.user?.role === "INFLUENCER"
                  ? "Creator Dashboard"
                  : "Admin Dashboard"}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {userRole === "BRAND" && (
                <Link
                  href="/dashboard/campaigns/new"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Campaign
                </Link>
              )}
              
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {session?.user?.name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {session?.user?.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {session?.user?.company || session?.user?.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}