"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  DollarSign,
  Eye,
  Heart,
  ArrowUpRight
} from "lucide-react"

interface InfluencerStats {
  totalEarnings: number
  activeCampaigns: number
  totalReach: number
  engagementRate: number
  profileViews: number
  newMessages: number
}

export default function InfluencerDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<InfluencerStats>({
    totalEarnings: 0,
    activeCampaigns: 0,
    totalReach: 0,
    engagementRate: 0,
    profileViews: 0,
    newMessages: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call - replace with real API
    setTimeout(() => {
      setStats({
        totalEarnings: 8750,
        activeCampaigns: 2,
        totalReach: 125000,
        engagementRate: 4.8,
        profileViews: 342,
        newMessages: 5
      })
      setLoading(false)
    }, 1000)
  }, [])

  const statCards = [
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings.toLocaleString()}`,
      change: "+23%",
      icon: DollarSign
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns,
      change: "+1",
      icon: TrendingUp
    },
    {
      title: "Total Reach",
      value: `${(stats.totalReach / 1000).toFixed(0)}K`,
      change: "+12%",
      icon: Users
    },
    {
      title: "Engagement Rate",
      value: `${stats.engagementRate}%`,
      change: "+0.3%",
      icon: Heart
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
            Here's your creator performance overview.
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
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-green-600">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Campaigns */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { 
                    brand: "Fashion Nova", 
                    campaign: "Summer Collection", 
                    due: "3 days",
                    payment: "$1,200",
                    status: "In Progress"
                  },
                  { 
                    brand: "Tech Gadgets Co", 
                    campaign: "Product Review", 
                    due: "1 week",
                    payment: "$800",
                    status: "Planning"
                  }
                ].map((campaign, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{campaign.brand}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        campaign.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{campaign.campaign}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Due in {campaign.due}</span>
                      <span className="font-medium text-green-600">{campaign.payment}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Opportunities */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">New Opportunities</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { 
                    brand: "Wellness Brand", 
                    type: "Sponsored Post", 
                    followers: "50K+",
                    budget: "$500-800"
                  },
                  { 
                    brand: "Food Company", 
                    type: "Story Series", 
                    followers: "25K+",
                    budget: "$300-500"
                  },
                  { 
                    brand: "Travel Agency", 
                    type: "Collaboration", 
                    followers: "100K+",
                    budget: "$1,000+"
                  }
                ].map((opportunity, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{opportunity.brand}</h4>
                      <span className="text-sm font-medium text-green-600">{opportunity.budget}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{opportunity.type}</p>
                    <p className="text-xs text-gray-500">Min. {opportunity.followers} followers</p>
                    <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.profileViews}</div>
                <div className="text-sm text-gray-500">Profile Views (30 days)</div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.newMessages}</div>
                <div className="text-sm text-gray-500">New Messages</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">94%</div>
                <div className="text-sm text-gray-500">Profile Completion</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Stats */}
        <div className="bg-white rounded-lg border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Social Media Performance</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Instagram</span>
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Verified</span>
                </div>
                <div className="text-2xl font-bold">85.2K</div>
                <div className="text-sm opacity-90">Followers</div>
                <div className="text-sm opacity-90 mt-1">4.8% engagement</div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">YouTube</span>
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Verified</span>
                </div>
                <div className="text-2xl font-bold">12.5K</div>
                <div className="text-sm opacity-90">Subscribers</div>
                <div className="text-sm opacity-90 mt-1">6.2% engagement</div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">TikTok</span>
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Growing</span>
                </div>
                <div className="text-2xl font-bold">27.8K</div>
                <div className="text-sm opacity-90">Followers</div>
                <div className="text-sm opacity-90 mt-1">7.1% engagement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}