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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--upfluence-bg)' }}>
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-72 upfluence-sidebar shadow-xl">
        <div className="flex h-20 items-center px-8 border-b border-gray-100">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 upfluence-gradient rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-2xl font-bold upfluence-text-gradient">Upfluence</span>
          </Link>
        </div>
        
        <nav className="mt-8 px-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    active
                      ? "upfluence-nav-active text-white"
                      : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                  }`}
                >
                  <Icon className="mr-4 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-gray-100">
          <div className="space-y-2">
            <Link
              href="/settings"
              className="flex items-center px-4 py-3 text-sm font-semibold text-gray-600 rounded-xl hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200"
            >
              <Settings className="mr-4 h-5 w-5" />
              Settings
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center px-4 py-3 text-sm font-semibold text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <LogOut className="mr-4 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-72">
        {/* Top header */}
        <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="flex h-20 items-center justify-between px-8">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {session?.user?.role === "BRAND" 
                  ? "Brand Dashboard" 
                  : session?.user?.role === "INFLUENCER"
                  ? "Creator Dashboard"
                  : "Admin Dashboard"}
              </h1>
            </div>
            
            <div className="flex items-center space-x-6">
              {userRole === "BRAND" && (
                <Link
                  href="/dashboard/campaigns/new"
                  className="upfluence-button-primary inline-flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Campaign
                </Link>
              )}
              
              <button className="relative p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              
              <div className="flex items-center space-x-4 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 upfluence-gradient rounded-xl flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {session?.user?.name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {session?.user?.name}
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'var(--upfluence-gray)' }}>
                    {session?.user?.company || session?.user?.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}