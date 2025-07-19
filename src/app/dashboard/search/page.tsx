"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  TrendingUp,
  Instagram,
  Youtube,
  MessageSquare,
  Heart,
  Eye
} from "lucide-react"

interface Influencer {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  location: string
  categories: string[]
  platforms: {
    instagram?: { followers: number; engagement: number; verified: boolean }
    youtube?: { followers: number; engagement: number; verified: boolean }
    tiktok?: { followers: number; engagement: number; verified: boolean }
  }
  rate: number
  isVerified: boolean
  isAvailable: boolean
}

export default function InfluencerSearch() {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    minFollowers: "",
    maxFollowers: "",
    platform: "",
    verified: false,
    available: true
  })

  // Mock data - replace with real API call
  useEffect(() => {
    setTimeout(() => {
      setInfluencers([
        {
          id: "1",
          name: "Sarah Johnson",
          username: "@sarah.lifestyle",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b32bd413?w=150&h=150&fit=crop&crop=face",
          bio: "Lifestyle blogger passionate about sustainable fashion and wellness. Collaborating with eco-friendly brands.",
          location: "Los Angeles, CA",
          categories: ["Fashion", "Lifestyle", "Sustainability"],
          platforms: {
            instagram: { followers: 125000, engagement: 4.8, verified: true },
            youtube: { followers: 45000, engagement: 6.2, verified: false }
          },
          rate: 1200,
          isVerified: true,
          isAvailable: true
        },
        {
          id: "2", 
          name: "Mike Chen",
          username: "@mikeeats",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          bio: "Food enthusiast and chef sharing recipes from around the world. Specializing in Asian cuisine and cooking tutorials.",
          location: "New York, NY",
          categories: ["Food", "Cooking", "Travel"],
          platforms: {
            instagram: { followers: 89000, engagement: 5.2, verified: true },
            youtube: { followers: 156000, engagement: 7.1, verified: true },
            tiktok: { followers: 234000, engagement: 8.4, verified: true }
          },
          rate: 1800,
          isVerified: true,
          isAvailable: true
        },
        {
          id: "3",
          name: "Emma Wilson",
          username: "@emmafitness",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          bio: "Certified personal trainer helping people achieve their fitness goals. Promoting health and wellness through movement.",
          location: "Miami, FL",
          categories: ["Fitness", "Health", "Wellness"],
          platforms: {
            instagram: { followers: 67000, engagement: 6.8, verified: false },
            tiktok: { followers: 145000, engagement: 9.2, verified: false }
          },
          rate: 800,
          isVerified: false,
          isAvailable: true
        },
        {
          id: "4",
          name: "Alex Rodriguez",
          username: "@alextech",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          bio: "Tech reviewer and gadget enthusiast. Covering the latest in smartphones, laptops, and emerging technology.",
          location: "San Francisco, CA",
          categories: ["Technology", "Gaming", "Reviews"],
          platforms: {
            youtube: { followers: 298000, engagement: 5.9, verified: true },
            instagram: { followers: 78000, engagement: 4.1, verified: true }
          },
          rate: 2500,
          isVerified: true,
          isAvailable: false
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "youtube":
        return <Youtube className="h-4 w-4" />
      case "tiktok":
        return <div className="h-4 w-4 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
      default:
        return null
    }
  }

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`
    return count.toString()
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg border">
                  <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Influencers</h1>
          <p className="text-gray-600 mt-1">
            Discover creators that align with your brand values and audience.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search influencers by name, category, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">All Categories</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Verified Only</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Available</span>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influencers.map((influencer) => (
            <div key={influencer.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={influencer.avatar}
                      alt={influencer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{influencer.name}</h3>
                        {influencer.isVerified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{influencer.username}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {influencer.location}
                      </div>
                    </div>
                  </div>
                  {!influencer.isAvailable && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      Busy
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{influencer.bio}</p>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {influencer.categories.slice(0, 3).map((category) => (
                    <span key={category} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {category}
                    </span>
                  ))}
                </div>

                {/* Platform Stats */}
                <div className="space-y-2 mb-4">
                  {Object.entries(influencer.platforms).map(([platform, stats]) => (
                    <div key={platform} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        {getPlatformIcon(platform)}
                        <span className="capitalize text-gray-600">{platform}</span>
                        {stats.verified && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {formatFollowers(stats.followers)}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {stats.engagement}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rate */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-lg font-bold text-gray-900">${influencer.rate}</span>
                    <span className="text-sm text-gray-500 ml-1">per post</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 border rounded-lg hover:bg-gray-50">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 border rounded-lg hover:bg-gray-50">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        influencer.isAvailable
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!influencer.isAvailable}
                    >
                      {influencer.isAvailable ? "Contact" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Load More Influencers
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}