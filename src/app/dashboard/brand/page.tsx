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
  Plus,
  Search,
  BarChart3
} from "lucide-react"

interface DashboardStats {
  totalCampaigns: number
  activeCampaigns: number
  totalInfluencers: number
  totalSpent: number
  avgEngagement: number
  messagesReceived: number
}

interface Campaign {
  id: string
  title: string
  status: "ACTIVE" | "DRAFT" | "COMPLETED" | "PAUSED"
  influencerCount: number
  budget: number
  createdAt: string
}

interface Message {
  id: string
  senderName: string
  content: string
  createdAt: string
  isRead: boolean
}

export default function BrandDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalInfluencers: 0,
    totalSpent: 0,
    avgEngagement: 0,
    messagesReceived: 0
  })
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // TODO: Replace with real API calls
      // For now, using mock data
      setStats({
        totalCampaigns: 12,
        activeCampaigns: 3,
        totalInfluencers: 45,
        totalSpent: 15420,
        avgEngagement: 4.2,
        messagesReceived: 8
      })

      setCampaigns([
        {
          id: "1",
          title: "Summer Collection Launch",
          status: "ACTIVE",
          influencerCount: 12,
          budget: 5000,
          createdAt: new Date().toISOString()
        },
        {
          id: "2", 
          title: "Brand Awareness Q4",
          status: "DRAFT",
          influencerCount: 0,
          budget: 8000,
          createdAt: new Date().toISOString()
        },
        {
          id: "3",
          title: "Product Review Campaign", 
          status: "COMPLETED",
          influencerCount: 8,
          budget: 3500,
          createdAt: new Date().toISOString()
        }
      ])

      setMessages([
        {
          id: "1",
          senderName: "Sarah Johnson",
          content: "I'd love to collaborate on your summer campaign. My engagement rate is 4.8% and I reach 125K followers...",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isRead: false
        },
        {
          id: "2", 
          senderName: "Mike Chen",
          content: "Thanks for considering me for the project. When would be a good time to discuss the campaign details?",
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          isRead: true
        },
        {
          id: "3",
          senderName: "Emma Wilson", 
          content: "Just finished the content for your review. Please let me know if you need any adjustments.",
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          isRead: true
        }
      ])

      setLoading(false)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800"
      case "COMPLETED":
        return "bg-gray-100 text-gray-800"
      case "PAUSED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "Just now"
  }

  const statCards = [
    {
      title: "Total Campaigns",
      value: stats.totalCampaigns,
      change: "+12%",
      changeType: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Active Campaigns", 
      value: stats.activeCampaigns,
      change: "+3",
      changeType: "positive" as const,
      icon: BarChart3
    },
    {
      title: "Connected Influencers",
      value: stats.totalInfluencers,
      change: "+8%",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Total Spent",
      value: `$${stats.totalSpent.toLocaleString()}`,
      change: "-5%",
      changeType: "negative" as const,
      icon: DollarSign
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
              Welcome back, {session?.user?.name}!
            </h2>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your campaigns today.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/dashboard/campaigns/new"
              className="upfluence-button-primary inline-flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Link>
            <Link
              href="/dashboard/search"
              className="upfluence-button-secondary inline-flex items-center"
            >
              <Search className="mr-2 h-4 w-4" />
              Find Influencers
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            const gradients = [
              'linear-gradient(135deg, #0D0DE6 0%, #1E40AF 100%)',
              'linear-gradient(135deg, #FF4331 0%, #DC2626 100%)', 
              'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
            ]
            return (
              <div key={stat.title} className="upfluence-stat-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="p-3 rounded-xl text-white"
                    style={{ background: gradients[index % gradients.length] }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  {stat.changeType === "positive" ? (
                    <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">{stat.change}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">{stat.change}</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">
                    vs last month
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Campaigns */}
          <div className="upfluence-card">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Recent Campaigns</h3>
              <Link 
                href="/dashboard/campaigns"
                className="text-sm font-semibold hover:underline"
                style={{ color: 'var(--upfluence-blue)' }}
              >
                View all →
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 cursor-pointer">
                    <div>
                      <p className="font-medium text-gray-900">{campaign.title}</p>
                      <p className="text-sm text-gray-500">
                        {campaign.influencerCount} influencers • ${campaign.budget.toLocaleString()} budget
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
              <Link 
                href="/dashboard/messages"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View all
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3 py-3 border-b last:border-b-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 cursor-pointer">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {message.senderName[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{message.senderName}</p>
                        {!message.isRead && (
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(message.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/dashboard/campaigns/new"
              className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left transition-colors"
            >
              <TrendingUp className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900">Create Campaign</h4>
              <p className="text-sm text-gray-500">Start a new influencer campaign</p>
            </Link>
            <Link 
              href="/dashboard/search"
              className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left transition-colors"
            >
              <Users className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900">Find Influencers</h4>
              <p className="text-sm text-gray-500">Discover new creators for your brand</p>
            </Link>
            <Link 
              href="/dashboard/messages"
              className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left transition-colors"
            >
              <MessageSquare className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900">View Messages</h4>
              <p className="text-sm text-gray-500">Check your latest conversations</p>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}