"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  UserCheck,
  UserX,
  Building
} from "lucide-react"

interface AdminStats {
  totalUsers: number
  totalBrands: number
  totalInfluencers: number
  activeCampaigns: number
  totalRevenue: number
  pendingApprovals: number
  reportsOpen: number
  systemHealth: "good" | "warning" | "critical"
}

interface RecentActivity {
  id: string
  type: "user_signup" | "campaign_created" | "payment_processed" | "report_filed"
  description: string
  timestamp: string
  severity: "info" | "warning" | "error"
}

interface PendingItem {
  id: string
  type: "brand_verification" | "influencer_verification" | "campaign_approval" | "dispute"
  title: string
  submittedBy: string
  submittedAt: string
  priority: "low" | "medium" | "high"
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalBrands: 0,
    totalInfluencers: 0,
    activeCampaigns: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
    reportsOpen: 0,
    systemHealth: "good"
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      // TODO: Replace with real API calls
      setStats({
        totalUsers: 1247,
        totalBrands: 156,
        totalInfluencers: 1091,
        activeCampaigns: 89,
        totalRevenue: 234750,
        pendingApprovals: 23,
        reportsOpen: 7,
        systemHealth: "good"
      })

      setRecentActivity([
        {
          id: "1",
          type: "user_signup",
          description: "New brand 'TechStart' registered",
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          severity: "info"
        },
        {
          id: "2",
          type: "campaign_created",
          description: "Fashion Nova created 'Summer Launch' campaign",
          timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          severity: "info"
        },
        {
          id: "3",
          type: "payment_processed",
          description: "Payment of $1,200 processed for Sarah Johnson",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          severity: "info"
        },
        {
          id: "4",
          type: "report_filed",
          description: "Report filed against campaign #1234",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          severity: "warning"
        }
      ])

      setPendingItems([
        {
          id: "1",
          type: "brand_verification",
          title: "Brand verification for 'NewCorp'",
          submittedBy: "NewCorp Team",
          submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          priority: "high"
        },
        {
          id: "2",
          type: "influencer_verification",
          title: "Influencer verification for @lifestyle_guru",
          submittedBy: "Emma Smith",
          submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          priority: "medium"
        },
        {
          id: "3",
          type: "dispute",
          title: "Payment dispute - Campaign #5678",
          submittedBy: "Mike Chen",
          submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          priority: "high"
        }
      ])

      setLoading(false)
    } catch (error) {
      console.error("Error fetching admin data:", error)
      setLoading(false)
    }
  }

  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "user_signup":
        return UserCheck
      case "campaign_created":
        return TrendingUp
      case "payment_processed":
        return DollarSign
      case "report_filed":
        return AlertTriangle
      default:
        return Activity
    }
  }

  const getSeverityColor = (severity: RecentActivity["severity"]) => {
    switch (severity) {
      case "info":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getPriorityColor = (priority: PendingItem["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      description: `${stats.totalBrands} brands, ${stats.totalInfluencers} influencers`
    },
    {
      title: "Active Campaigns", 
      value: stats.activeCampaigns,
      change: "+8",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Currently running campaigns"
    },
    {
      title: "Platform Revenue",
      value: `$${(stats.totalRevenue / 1000).toFixed(0)}K`,
      change: "+23%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Total platform revenue"
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      change: stats.pendingApprovals > 20 ? "High" : "Normal",
      changeType: stats.pendingApprovals > 20 ? "negative" as const : "positive" as const,
      icon: Clock,
      description: "Require admin attention"
    }
  ]

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg border">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Platform overview and management tools</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`flex items-center px-3 py-1 rounded text-sm font-medium ${
              stats.systemHealth === "good" 
                ? "bg-green-50 text-green-700"
                : stats.systemHealth === "warning"
                ? "bg-yellow-50 text-yellow-700"
                : "bg-red-50 text-red-700"
            }`}>
              {stats.systemHealth === "good" ? (
                <CheckCircle className="h-4 w-4 mr-1" />
              ) : (
                <AlertTriangle className="h-4 w-4 mr-1" />
              )}
              System {stats.systemHealth}
            </div>
            <button className="upfluence-button upfluence-button-secondary">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 days
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                +12%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900">1,247</p>
            <p className="text-xs text-gray-500 mt-1">156 brands, 1,091 influencers</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                +8
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Active Campaigns</p>
            <p className="text-2xl font-semibold text-gray-900">89</p>
            <p className="text-xs text-gray-500 mt-1">Currently running</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                +23%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Platform Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">$235K</p>
            <p className="text-xs text-gray-500 mt-1">Total platform revenue</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                High
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Pending Approvals</p>
            <p className="text-2xl font-semibold text-gray-900">23</p>
            <p className="text-xs text-gray-500 mt-1">Require admin attention</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity - 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <Link href="/admin/activity" className="text-sm font-medium text-[#0D0DE6] hover:text-[#0A0AB8]">
                  View all
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {[
                { type: "user_signup", text: "New brand 'TechStart' registered", time: "30 min ago", icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
                { type: "campaign", text: "Fashion Nova created 'Summer Launch' campaign", time: "45 min ago", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
                { type: "payment", text: "Payment of $1,200 processed for Sarah Johnson", time: "2 hours ago", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
                { type: "report", text: "Report filed against campaign #1234", time: "3 hours ago", icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-50" },
                { type: "approval", text: "Brand verification approved for NewCorp", time: "5 hours ago", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
              ].map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${activity.bg}`}>
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pending Approvals - 1 column */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Pending Approvals</h2>
                <Link href="/admin/approvals" className="text-sm font-medium text-[#0D0DE6] hover:text-[#0A0AB8]">
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {[
                { title: "Brand verification for 'NewCorp'", submitter: "NewCorp Team", priority: "high", time: "1 day ago" },
                { title: "Influencer verification for @lifestyle_guru", submitter: "Emma Smith", priority: "medium", time: "2 days ago" },
                { title: "Payment dispute - Campaign #5678", submitter: "Mike Chen", priority: "high", time: "6 hours ago" },
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      item.priority === 'high' 
                        ? 'bg-red-50 text-red-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">by {item.submitter}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/admin/users" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Manage Users</h3>
            <p className="text-sm text-gray-500">View and manage all users</p>
          </Link>

          <Link href="/admin/campaigns" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Campaign Monitor</h3>
            <p className="text-sm text-gray-500">Monitor all campaigns</p>
          </Link>

          <Link href="/admin/approvals" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Approvals</h3>
            <p className="text-sm text-gray-500">Review pending items</p>
          </Link>

          <Link href="/admin/reports" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Reports</h3>
            <p className="text-sm text-gray-500">Handle user reports</p>
          </Link>
        </div>

        {/* Platform Analytics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Platform Analytics</h2>
            <Link href="/admin/analytics" className="text-sm font-medium text-[#0D0DE6] hover:text-[#0A0AB8]">
              View details
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-gray-900">156</p>
              <p className="text-sm text-gray-500">Active Brands</p>
              <p className="text-xs text-green-600 mt-1">+8 this month</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-gray-900">1,091</p>
              <p className="text-sm text-gray-500">Active Influencers</p>
              <p className="text-xs text-green-600 mt-1">+42 this month</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <MessageSquare className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-gray-900">7</p>
              <p className="text-sm text-gray-500">Open Reports</p>
              <p className="text-xs text-yellow-600 mt-1">Requires attention</p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}