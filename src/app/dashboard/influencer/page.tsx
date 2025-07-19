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
  Instagram,
  Youtube,
  Eye,
  Heart,
  Star,
  Calendar
} from "lucide-react"

interface InfluencerStats {
  totalFollowers: number
  avgEngagement: number
  activeCampaigns: number
  totalEarnings: number
  pendingPayments: number
  profileViews: number
}

interface Campaign {
  id: string
  title: string
  brandName: string
  status: "ACTIVE" | "PENDING" | "COMPLETED" | "APPLIED"
  payment: number
  deadline: string
  requirements: string
}

interface Opportunity {
  id: string
  title: string
  brandName: string
  payment: number
  category: string[]
  requirements: string
  deadline: string
  applicants: number
}

export default function InfluencerDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<InfluencerStats>({
    totalFollowers: 0,
    avgEngagement: 0,
    activeCampaigns: 0,
    totalEarnings: 0,
    pendingPayments: 0,
    profileViews: 0
  })
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInfluencerData()
  }, [])

  const fetchInfluencerData = async () => {
    try {
      // TODO: Replace with real API calls
      setStats({
        totalFollowers: 125000,
        avgEngagement: 4.8,
        activeCampaigns: 3,
        totalEarnings: 8750,
        pendingPayments: 2400,
        profileViews: 1240
      })

      setCampaigns([
        {
          id: "1",
          title: "Summer Collection Launch",
          brandName: "Fashion Nova",
          status: "ACTIVE",
          payment: 1200,
          deadline: "2024-08-15",
          requirements: "2 Instagram posts, 1 story series"
        },
        {
          id: "2",
          title: "Fitness Challenge",
          brandName: "FitGear",
          status: "PENDING",
          payment: 800,
          deadline: "2024-08-20",
          requirements: "1 workout video, 3 posts"
        },
        {
          id: "3",
          title: "Skincare Review",
          brandName: "GlowUp Beauty",
          status: "COMPLETED",
          payment: 600,
          deadline: "2024-07-30",
          requirements: "Honest review video + posts"
        }
      ])

      setOpportunities([
        {
          id: "1",
          title: "Tech Product Launch",
          brandName: "TechCorp",
          payment: 1500,
          category: ["Technology", "Reviews"],
          requirements: "Unboxing video + detailed review",
          deadline: "2024-09-01",
          applicants: 23
        },
        {
          id: "2",
          title: "Food Brand Collaboration",
          brandName: "Tasty Foods",
          payment: 900,
          category: ["Food", "Lifestyle"],
          requirements: "Recipe creation + Instagram posts",
          deadline: "2024-08-25",
          applicants: 15
        },
        {
          id: "3",
          title: "Wellness Campaign",
          brandName: "ZenLife",
          payment: 1100,
          category: ["Wellness", "Lifestyle"],
          requirements: "Wellness routine content",
          deadline: "2024-09-10",
          applicants: 31
        }
      ])

      setLoading(false)
    } catch (error) {
      console.error("Error fetching influencer data:", error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "COMPLETED":
        return "bg-gray-100 text-gray-800"
      case "APPLIED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due today"
    if (diffDays === 1) return "Due tomorrow"
    return `${diffDays} days left`
  }

  const statCards = [
    {
      title: "Total Followers",
      value: `${(stats.totalFollowers / 1000).toFixed(0)}K`,
      change: "+2.3K",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Avg Engagement", 
      value: `${stats.avgEngagement}%`,
      change: "+0.3%",
      changeType: "positive" as const,
      icon: Heart
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns,
      change: "+1",
      changeType: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings.toLocaleString()}`,
      change: "+15%",
      changeType: "positive" as const,
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
              Track your performance and discover new opportunities.
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/dashboard/profile"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Users className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
            <Link
              href="/dashboard/opportunities"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Star className="mr-2 h-4 w-4" />
              Browse Opportunities
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer">
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
                        this month
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

        {/* Social Media Overview */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <Instagram className="h-8 w-8 text-pink-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Instagram</p>
                <p className="text-xl font-bold text-gray-900">125K</p>
                <p className="text-sm text-gray-500">4.8% engagement</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
              <Youtube className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">YouTube</p>
                <p className="text-xl font-bold text-gray-900">45K</p>
                <p className="text-sm text-gray-500">6.2% engagement</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <Eye className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Profile Views</p>
                <p className="text-xl font-bold text-gray-900">{stats.profileViews}</p>
                <p className="text-sm text-gray-500">+12% this week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Campaigns & Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Campaigns */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
              <Link 
                href="/dashboard/campaigns"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View all
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {campaigns.slice(0, 3).map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{campaign.brandName}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 font-medium">${campaign.payment}</span>
                      <span className="text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDeadline(campaign.deadline)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{campaign.requirements}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* New Opportunities */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">New Opportunities</h3>
              <Link 
                href="/dashboard/opportunities"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View all
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {opportunities.slice(0, 3).map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                      <span className="text-green-600 font-medium">${opportunity.payment}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{opportunity.brandName}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {opportunity.category.map((cat) => (
                        <span key={cat} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{opportunity.applicants} applicants</span>
                      <span className="text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDeadline(opportunity.deadline)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">${stats.pendingPayments.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Pending Payments</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">${(stats.totalEarnings - stats.pendingPayments).toLocaleString()}</p>
              <p className="text-sm text-gray-500">Available to Withdraw</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}