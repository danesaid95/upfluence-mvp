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
  BarChart3,
  Eye,
  Heart,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal
} from "lucide-react"

export default function BrandDashboard() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500)
  }, [])

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
            <Link href="/dashboard/campaigns/new" className="upfluence-button upfluence-button-primary">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                +12.5%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Active Campaigns</p>
            <p className="text-2xl font-semibold text-gray-900">24</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                +8.2%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Influencers</p>
            <p className="text-2xl font-semibold text-gray-900">1,247</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                +25.1%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Reach</p>
            <p className="text-2xl font-semibold text-gray-900">3.2M</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-pink-50 rounded-lg">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                +18.7%
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Engagement Rate</p>
            <p className="text-2xl font-semibold text-gray-900">4.8%</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Campaigns - 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Campaigns</h2>
                <Link href="/dashboard/campaigns" className="text-sm font-medium text-[#0D0DE6] hover:text-[#0A0AB8]">
                  View all
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {[
                { name: "Summer Collection 2024", status: "active", influencers: 45, budget: "$12,500", completion: 67 },
                { name: "Product Launch - Tech", status: "active", influencers: 23, budget: "$8,900", completion: 45 },
                { name: "Brand Awareness Q2", status: "review", influencers: 67, budget: "$15,000", completion: 100 },
                { name: "Holiday Campaign", status: "draft", influencers: 0, budget: "$20,000", completion: 0 },
              ].map((campaign, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        campaign.status === 'active' 
                          ? 'bg-green-50 text-green-700'
                          : campaign.status === 'review'
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-gray-50 text-gray-700'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4 text-gray-500">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {campaign.influencers} influencers
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {campaign.budget}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#0D0DE6] h-2 rounded-full" 
                          style={{ width: `${campaign.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{campaign.completion}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed - 1 column */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6 space-y-4">
              {[
                { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", text: "Campaign approved", subtext: "Summer Collection 2024", time: "2 hours ago" },
                { icon: Users, color: "text-blue-600", bg: "bg-blue-50", text: "5 new applications", subtext: "Product Launch - Tech", time: "4 hours ago" },
                { icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50", text: "New message", subtext: "From @fashionista", time: "5 hours ago" },
                { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50", text: "Review required", subtext: "Brand Awareness Q2", time: "1 day ago" },
              ].map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${activity.bg}`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                      <p className="text-sm text-gray-500">{activity.subtext}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/search" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Find Influencers</h3>
            <p className="text-sm text-gray-500">Discover creators for your next campaign</p>
          </Link>

          <Link href="/dashboard/analytics" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">View Analytics</h3>
            <p className="text-sm text-gray-500">Track your campaign performance</p>
          </Link>

          <Link href="/dashboard/messages" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Messages</h3>
            <p className="text-sm text-gray-500">3 unread conversations</p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}