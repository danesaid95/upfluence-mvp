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
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h2>
            <p className="text-gray-600 mt-1">
              Platform overview and management tools.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              stats.systemHealth === "good" 
                ? "bg-green-100 text-green-800"
                : stats.systemHealth === "warning"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
              {stats.systemHealth === "good" ? (
                <CheckCircle className="h-4 w-4 mr-1" />
              ) : (
                <AlertTriangle className="h-4 w-4 mr-1" />
              )}
              System {stats.systemHealth}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">
                    {stat.description}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      vs last month
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              href="/admin/users"
              className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left transition-colors"
            >
              <Users className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900">Manage Users</h4>
              <p className="text-sm text-gray-500">View and manage all users</p>
            </Link>
            <Link
              href="/admin/campaigns"
              className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left transition-colors"
            >
              <TrendingUp className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900">Campaign Monitor</h4>
              <p className="text-sm text-gray-500">Monitor all campaigns</p>
            </Link>
            <Link
              href="/admin/approvals"
              className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left transition-colors"
            >
              <Shield className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900">Approvals</h4>
              <p className="text-sm text-gray-500">Review pending approvals</p>
            </Link>
            <Link
              href="/admin/reports"
              className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left transition-colors"
            >
              <AlertTriangle className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900">Reports</h4>
              <p className="text-sm text-gray-500">Handle user reports</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity & Pending Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 py-3 border-b last:border-b-0">
                      <div className={`p-2 rounded-lg ${getSeverityColor(activity.severity)} bg-gray-50`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Pending Items */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
              <Link 
                href="/admin/approvals"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View all
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pendingItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Submitted by {item.submittedBy}</p>
                    <p className="text-xs text-gray-500">{formatTimeAgo(item.submittedAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Platform Analytics */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <Building className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.totalBrands}</p>
              <p className="text-sm text-gray-500">Active Brands</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.totalInfluencers}</p>
              <p className="text-sm text-gray-500">Active Influencers</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{stats.reportsOpen}</p>
              <p className="text-sm text-gray-500">Open Reports</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}