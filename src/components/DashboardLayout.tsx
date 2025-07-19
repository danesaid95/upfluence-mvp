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
  Plus,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  Mail,
  FileText,
  DollarSign,
  HelpCircle,
  Zap
} from "lucide-react"
import { useState } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const userRole = session?.user?.role
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const brandNavigation = [
    { name: "Dashboard", href: "/dashboard/brand", icon: Home },
    { name: "Influencers", href: "/dashboard/search", icon: Users },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: TrendingUp },
    { name: "Contacts", href: "/dashboard/contacts", icon: Mail },
    { name: "Inbox", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Payments", href: "/dashboard/payments", icon: DollarSign },
  ]

  const influencerNavigation = [
    { name: "Dashboard", href: "/dashboard/influencer", icon: Home },
    { name: "Opportunities", href: "/dashboard/opportunities", icon: Zap },
    { name: "My Campaigns", href: "/dashboard/campaigns", icon: TrendingUp },
    { name: "Inbox", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Earnings", href: "/dashboard/earnings", icon: DollarSign },
    { name: "Profile", href: "/dashboard/profile", icon: Users },
  ]

  const adminNavigation = [
    { name: "Dashboard", href: "/dashboard/admin", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Campaigns", href: "/admin/campaigns", icon: TrendingUp },
    { name: "Reports", href: "/admin/reports", icon: FileText },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
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
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E7EB] z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#0D0DE6]">Upfluence</span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Create New Button */}
            {userRole === "BRAND" && (
              <Link
                href="/dashboard/campaigns/new"
                className="upfluence-button upfluence-button-primary"
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Create Campaign
              </Link>
            )}

            {/* Help */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-[#0D0DE6] rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {session?.user?.name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                  <p className="text-xs text-gray-500">{session?.user?.company || session?.user?.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 bg-white border-r border-[#E5E7EB] transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                  active
                    ? "bg-[#F3F4F6] text-[#0D0DE6]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${active ? 'text-[#0D0DE6]' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E7EB]">
          <Link
            href="/settings"
            className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-150"
          >
            <Settings className="mr-3 h-5 w-5 text-gray-400" />
            Settings
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-150 mt-1"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-0'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}