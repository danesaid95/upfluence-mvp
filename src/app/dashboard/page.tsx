"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

interface DashboardStats {
  totalCampaigns: number
  activeCampaigns: number
  totalInfluencers: number
  totalSpent: number
  avgEngagement: number
  messagesReceived: number
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call - replace with real API
    setTimeout(() => {
      setStats({
        totalCampaigns: 12,
        activeCampaigns: 3,
        totalInfluencers: 45,
        totalSpent: 15420,
        avgEngagement: 4.2,
        messagesReceived: 23
      })
      setLoading(false)
    }, 1000)
  }, [])

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
      icon: Users
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
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {session?.user?.name}!
          </h2>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your campaigns today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === "positive" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      )}
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
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Campaigns */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Summer Collection Launch", status: "Active", influencers: 12 },
                  { name: "Brand Awareness Q4", status: "Draft", influencers: 0 },
                  { name: "Product Review Campaign", status: "Completed", influencers: 8 }
                ].map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500">{campaign.influencers} influencers</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      campaign.status === "Active" 
                        ? "bg-green-100 text-green-800"
                        : campaign.status === "Draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", message: "I'd love to collaborate on your summer campaign...", time: "2h ago" },
                  { name: "Mike Chen", message: "Thanks for considering me for the project. When would...", time: "5h ago" },
                  { name: "Emma Wilson", message: "Just finished the content for your review. Please let me...", time: "1d ago" }
                ].map((message, index) => (
                  <div key={index} className="flex items-start space-x-3 py-3 border-b last:border-b-0">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {message.name[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-500 truncate">{message.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{message.time}</p>
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
            <button className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left">
              <TrendingUp className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900">Create Campaign</h4>
              <p className="text-sm text-gray-500">Start a new influencer campaign</p>
            </button>
            <button className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left">
              <Users className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900">Find Influencers</h4>
              <p className="text-sm text-gray-500">Discover new creators for your brand</p>
            </button>
            <button className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left">
              <MessageSquare className="h-6 w-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900">View Messages</h4>
              <p className="text-sm text-gray-500">Check your latest conversations</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}