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
  Twitter,
  Eye,
  Heart,
  Star,
  Calendar,
  Clock,
  MoreHorizontal,
  Search,
  BarChart3,
  Zap
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
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
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
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {session?.user?.name}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="upfluence-button upfluence-button-secondary">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 days
            </button>
            <Link href="/dashboard/opportunities" className="upfluence-button upfluence-button-primary">
              <Search className="mr-2 h-4 w-4" />
              Browse Opportunities
            </Link>
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
                +12.5%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Followers</p>
            <p className="text-2xl font-semibold text-gray-900">125K</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                +0.3%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Engagement Rate</p>
            <p className="text-2xl font-semibold text-gray-900">4.8%</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                3 active
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Active Campaigns</p>
            <p className="text-2xl font-semibold text-gray-900">5</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                +24.6%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Earnings</p>
            <p className="text-2xl font-semibold text-gray-900">$8,750</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Campaigns - 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Active Campaigns</h2>
                <Link href="/dashboard/campaigns" className="text-sm font-medium text-[#0D0DE6] hover:text-[#0A0AB8]">
                  View all
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {[
                { 
                  brand: "Fashion Nova", 
                  campaign: "Summer Collection 2024", 
                  status: "active", 
                  deliverables: "3 Instagram posts, 1 Story",
                  deadline: "2024-08-15",
                  payment: "$1,500",
                  progress: 33
                },
                { 
                  brand: "TechGear Pro", 
                  campaign: "Product Review - Smartwatch", 
                  status: "active", 
                  deliverables: "1 YouTube video, 2 Instagram posts",
                  deadline: "2024-08-20",
                  payment: "$2,000",
                  progress: 50
                },
                { 
                  brand: "Natural Beauty Co", 
                  campaign: "Skincare Routine", 
                  status: "review", 
                  deliverables: "5 Instagram posts, 3 Stories",
                  deadline: "2024-08-10",
                  payment: "$800",
                  progress: 100
                },
              ].map((campaign, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{campaign.campaign}</h3>
                      <p className="text-sm text-gray-500">{campaign.brand}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        campaign.status === 'active' 
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {campaign.status}
                      </span>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between text-gray-500">
                      <span>{campaign.deliverables}</span>
                      <span className="font-medium text-gray-900">{campaign.payment}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Due: {campaign.deadline}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#0D0DE6] h-2 rounded-full" 
                            style={{ width: `${campaign.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{campaign.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Overview - 1 column */}
          <div className="space-y-6">
            {/* Social Media Stats */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Platform Performance</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-50 rounded-lg">
                      <Instagram className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Instagram</p>
                      <p className="text-sm text-gray-500">125K followers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">4.8%</p>
                    <p className="text-xs text-green-600">+0.8%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Youtube className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">YouTube</p>
                      <p className="text-sm text-gray-500">45K subscribers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">6.2%</p>
                    <p className="text-xs text-green-600">+1.2%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Twitter className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Twitter</p>
                      <p className="text-sm text-gray-500">15K followers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">3.1%</p>
                    <p className="text-xs text-red-600">-0.3%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
                  <Link href="/dashboard/messages" className="text-sm font-medium text-[#0D0DE6] hover:text-[#0A0AB8]">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { from: "Fashion Nova", message: "Great work on the last post!", time: "2 hours ago", unread: true },
                  { from: "TechGear Pro", message: "Can you send the video draft?", time: "5 hours ago", unread: true },
                  { from: "Natural Beauty Co", message: "Campaign approved!", time: "1 day ago", unread: false },
                ].map((msg, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{msg.from}</p>
                        {msg.unread && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{msg.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/opportunities" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Browse Opportunities</h3>
            <p className="text-sm text-gray-500">12 new campaigns match your profile</p>
          </Link>

          <Link href="/dashboard/analytics" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">View Analytics</h3>
            <p className="text-sm text-gray-500">Track your growth and engagement</p>
          </Link>

          <Link href="/dashboard/messages" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Messages</h3>
            <p className="text-sm text-gray-500">2 unread conversations</p>
          </Link>
        </div>

        {/* Earnings Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Earnings Overview</h2>
            <Link href="/dashboard/earnings" className="text-sm font-medium text-[#0D0DE6] hover:text-[#0A0AB8]">
              View details
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">This Month</p>
              <p className="text-2xl font-semibold text-gray-900">$2,400</p>
              <p className="text-sm text-green-600 mt-1">+32% from last month</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">$3,200</p>
              <p className="text-sm text-gray-500 mt-1">3 campaigns in progress</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Available</p>
              <p className="text-2xl font-semibold text-gray-900">$3,150</p>
              <button className="text-sm font-medium text-[#0D0DE6] hover:text-[#0A0AB8] mt-1">Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}