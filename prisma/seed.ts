import { PrismaClient, UserRole, SocialPlatform } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data
  await prisma.campaignInfluencer.deleteMany()
  await prisma.message.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.campaign.deleteMany()
  await prisma.socialProfile.deleteMany()
  await prisma.influencerProfile.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.user.deleteMany()

  // Create brands
  const brands = await Promise.all([
    prisma.user.create({
      data: {
        email: 'sarah@fashionnova.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Sarah Miller',
        role: UserRole.BRAND,
        company: 'Fashion Nova',
        website: 'https://fashionnova.com',
        description: 'Fast fashion brand targeting young women',
        subscription: {
          create: {
            planType: 'PRO',
            status: 'ACTIVE'
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'mike@techgadgets.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Mike Johnson',
        role: UserRole.BRAND,
        company: 'Tech Gadgets Co',
        website: 'https://techgadgets.com',
        description: 'Electronics and gadget retailer',
        subscription: {
          create: {
            planType: 'AGENCY',
            status: 'ACTIVE'
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'emma@wellnessbrand.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Emma Davis',
        role: UserRole.BRAND,
        company: 'Wellness Brand',
        website: 'https://wellnessbrand.com',
        description: 'Health and wellness products',
        subscription: {
          create: {
            planType: 'FREE',
            status: 'ACTIVE'
          }
        }
      }
    })
  ])

  // Create influencers
  const influencers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'sarah@lifestyle.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Sarah Johnson',
        role: UserRole.INFLUENCER,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b32bd413?w=150&h=150&fit=crop&crop=face',
        subscription: {
          create: {
            planType: 'FREE',
            status: 'ACTIVE'
          }
        },
        influencerProfile: {
          create: {
            bio: 'Lifestyle blogger passionate about sustainable fashion and wellness. Collaborating with eco-friendly brands to promote conscious living.',
            location: 'Los Angeles, CA',
            category: ['Fashion', 'Lifestyle', 'Sustainability'],
            languages: ['English', 'Spanish'],
            rate: 1200,
            isVerified: true,
            isAvailable: true,
            profileCompleted: true,
            socialProfiles: {
              create: [
                {
                  platform: SocialPlatform.INSTAGRAM,
                  username: 'sarah.lifestyle',
                  url: 'https://instagram.com/sarah.lifestyle',
                  followersCount: 125000,
                  engagementRate: 4.8,
                  avgLikes: 6000,
                  avgComments: 250,
                  isVerified: true
                },
                {
                  platform: SocialPlatform.YOUTUBE,
                  username: 'Sarah Johnson',
                  url: 'https://youtube.com/@sarahjohnson',
                  followersCount: 45000,
                  engagementRate: 6.2,
                  avgLikes: 2800,
                  avgComments: 120,
                  isVerified: false
                }
              ]
            }
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'mike@foodie.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Mike Chen',
        role: UserRole.INFLUENCER,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        subscription: {
          create: {
            planType: 'FREE',
            status: 'ACTIVE'
          }
        },
        influencerProfile: {
          create: {
            bio: 'Food enthusiast and chef sharing recipes from around the world. Specializing in Asian cuisine and cooking tutorials.',
            location: 'New York, NY',
            category: ['Food', 'Cooking', 'Travel'],
            languages: ['English', 'Mandarin'],
            rate: 1800,
            isVerified: true,
            isAvailable: true,
            profileCompleted: true,
            socialProfiles: {
              create: [
                {
                  platform: SocialPlatform.INSTAGRAM,
                  username: 'mikeeats',
                  url: 'https://instagram.com/mikeeats',
                  followersCount: 89000,
                  engagementRate: 5.2,
                  avgLikes: 4600,
                  avgComments: 180,
                  isVerified: true
                },
                {
                  platform: SocialPlatform.YOUTUBE,
                  username: 'Mike Chen',
                  url: 'https://youtube.com/@mikechen',
                  followersCount: 156000,
                  engagementRate: 7.1,
                  avgLikes: 11000,
                  avgComments: 450,
                  isVerified: true
                },
                {
                  platform: SocialPlatform.TIKTOK,
                  username: 'mikeeats',
                  url: 'https://tiktok.com/@mikeeats',
                  followersCount: 234000,
                  engagementRate: 8.4,
                  avgLikes: 19600,
                  avgComments: 890,
                  isVerified: true
                }
              ]
            }
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'emma@fitness.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Emma Wilson',
        role: UserRole.INFLUENCER,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        subscription: {
          create: {
            planType: 'FREE',
            status: 'ACTIVE'
          }
        },
        influencerProfile: {
          create: {
            bio: 'Certified personal trainer helping people achieve their fitness goals. Promoting health and wellness through movement.',
            location: 'Miami, FL',
            category: ['Fitness', 'Health', 'Wellness'],
            languages: ['English'],
            rate: 800,
            isVerified: false,
            isAvailable: true,
            profileCompleted: true,
            socialProfiles: {
              create: [
                {
                  platform: SocialPlatform.INSTAGRAM,
                  username: 'emmafitness',
                  url: 'https://instagram.com/emmafitness',
                  followersCount: 67000,
                  engagementRate: 6.8,
                  avgLikes: 4550,
                  avgComments: 320,
                  isVerified: false
                },
                {
                  platform: SocialPlatform.TIKTOK,
                  username: 'emmafitness',
                  url: 'https://tiktok.com/@emmafitness',
                  followersCount: 145000,
                  engagementRate: 9.2,
                  avgLikes: 13340,
                  avgComments: 780,
                  isVerified: false
                }
              ]
            }
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'alex@tech.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Alex Rodriguez',
        role: UserRole.INFLUENCER,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        subscription: {
          create: {
            planType: 'FREE',
            status: 'ACTIVE'
          }
        },
        influencerProfile: {
          create: {
            bio: 'Tech reviewer and gadget enthusiast. Covering the latest in smartphones, laptops, and emerging technology.',
            location: 'San Francisco, CA',
            category: ['Technology', 'Gaming', 'Reviews'],
            languages: ['English'],
            rate: 2500,
            isVerified: true,
            isAvailable: false,
            profileCompleted: true,
            socialProfiles: {
              create: [
                {
                  platform: SocialPlatform.YOUTUBE,
                  username: 'Alex Rodriguez',
                  url: 'https://youtube.com/@alextech',
                  followersCount: 298000,
                  engagementRate: 5.9,
                  avgLikes: 17580,
                  avgComments: 920,
                  isVerified: true
                },
                {
                  platform: SocialPlatform.INSTAGRAM,
                  username: 'alextech',
                  url: 'https://instagram.com/alextech',
                  followersCount: 78000,
                  engagementRate: 4.1,
                  avgLikes: 3200,
                  avgComments: 150,
                  isVerified: true
                }
              ]
            }
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'lisa@beauty.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Lisa Park',
        role: UserRole.INFLUENCER,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        subscription: {
          create: {
            planType: 'FREE',
            status: 'ACTIVE'
          }
        },
        influencerProfile: {
          create: {
            bio: 'Beauty guru and makeup artist. Sharing tutorials, product reviews, and skincare tips for all skin types.',
            location: 'Chicago, IL',
            category: ['Beauty', 'Skincare', 'Makeup'],
            languages: ['English', 'Korean'],
            rate: 1500,
            isVerified: true,
            isAvailable: true,
            profileCompleted: true,
            socialProfiles: {
              create: [
                {
                  platform: SocialPlatform.INSTAGRAM,
                  username: 'lisabeauty',
                  url: 'https://instagram.com/lisabeauty',
                  followersCount: 189000,
                  engagementRate: 5.8,
                  avgLikes: 10962,
                  avgComments: 420,
                  isVerified: true
                },
                {
                  platform: SocialPlatform.YOUTUBE,
                  username: 'Lisa Park Beauty',
                  url: 'https://youtube.com/@lisaparkbeauty',
                  followersCount: 95000,
                  engagementRate: 7.3,
                  avgLikes: 6935,
                  avgComments: 280,
                  isVerified: true
                },
                {
                  platform: SocialPlatform.TIKTOK,
                  username: 'lisabeauty',
                  url: 'https://tiktok.com/@lisabeauty',
                  followersCount: 312000,
                  engagementRate: 11.2,
                  avgLikes: 34944,
                  avgComments: 1200,
                  isVerified: true
                }
              ]
            }
          }
        }
      }
    })
  ])

  // Create campaigns
  const campaigns = await Promise.all([
    prisma.campaign.create({
      data: {
        brandId: brands[0].id,
        title: 'Summer Collection Launch',
        description: 'Promote our new summer collection with lifestyle content showcasing the versatility and style of our pieces.',
        category: ['Fashion', 'Lifestyle'],
        budget: 15000,
        requirements: 'Must include product shots, lifestyle photos, and authentic styling. Please tag @fashionnova and use #SummerVibes',
        platforms: [SocialPlatform.INSTAGRAM, SocialPlatform.TIKTOK],
        minFollowers: 50000,
        maxFollowers: 500000,
        targetAge: '18-35',
        targetGender: 'Female',
        targetLocation: ['United States', 'Canada'],
        status: 'ACTIVE',
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-08-31')
      }
    }),
    prisma.campaign.create({
      data: {
        brandId: brands[1].id,
        title: 'Tech Product Reviews',
        description: 'Honest reviews of our latest smartphone accessories and gadgets. Looking for tech enthusiasts with engaged audiences.',
        category: ['Technology', 'Reviews'],
        budget: 25000,
        requirements: 'Unboxing videos, detailed reviews, and comparison content. Must disclose partnership clearly.',
        platforms: [SocialPlatform.YOUTUBE, SocialPlatform.INSTAGRAM],
        minFollowers: 100000,
        targetAge: '25-45',
        targetGender: 'All',
        targetLocation: ['United States', 'United Kingdom', 'Australia'],
        status: 'ACTIVE',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-09-30')
      }
    })
  ])

  // Get influencer profiles
  const influencerProfiles = await Promise.all([
    prisma.influencerProfile.findFirst({ where: { userId: influencers[0].id } }),
    prisma.influencerProfile.findFirst({ where: { userId: influencers[1].id } }),
    prisma.influencerProfile.findFirst({ where: { userId: influencers[2].id } }),
    prisma.influencerProfile.findFirst({ where: { userId: influencers[3].id } }),
    prisma.influencerProfile.findFirst({ where: { userId: influencers[4].id } })
  ])

  // Create some campaign applications
  await Promise.all([
    prisma.campaignInfluencer.create({
      data: {
        campaignId: campaigns[0].id,
        influencerId: influencerProfiles[0]!.id,
        isAccepted: true,
        message: 'I love your brand aesthetic and would be excited to create content showcasing the summer collection!'
      }
    }),
    prisma.campaignInfluencer.create({
      data: {
        campaignId: campaigns[0].id,
        influencerId: influencerProfiles[2]!.id,
        isAccepted: null,
        message: 'Your summer collection aligns perfectly with my fitness and wellness content. I can create workout outfit posts!'
      }
    }),
    prisma.campaignInfluencer.create({
      data: {
        campaignId: campaigns[1].id,
        influencerId: influencerProfiles[3]!.id,
        isAccepted: true,
        message: 'As a tech reviewer, I would love to create detailed content about your latest products.'
      }
    })
  ])

  // Create messages
  await Promise.all([
    prisma.message.create({
      data: {
        senderId: influencers[0].id,
        receiverId: brands[0].id,
        campaignId: campaigns[0].id,
        subject: 'Summer Campaign Collaboration',
        content: 'Hi! I\'m really excited about your summer collection campaign. I have some creative ideas for showcasing the pieces in authentic lifestyle settings. Would love to discuss the collaboration details!',
        status: 'SENT'
      }
    }),
    prisma.message.create({
      data: {
        senderId: brands[0].id,
        receiverId: influencers[0].id,
        campaignId: campaigns[0].id,
        subject: 'Re: Summer Campaign Collaboration',
        content: 'Thank you for your interest! We love your content style and think you\'d be perfect for this campaign. Let\'s schedule a call to discuss the details and timeline.',
        status: 'READ'
      }
    }),
    prisma.message.create({
      data: {
        senderId: influencers[1].id,
        receiverId: brands[1].id,
        subject: 'Food Tech Content Opportunity',
        content: 'Hello! I noticed you have some amazing kitchen gadgets. As a food content creator, I\'d love to explore partnership opportunities for authentic product integration in my cooking videos.',
        status: 'SENT'
      }
    })
  ])

  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@upfluence.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
      role: UserRole.ADMIN,
      subscription: {
        create: {
          planType: 'AGENCY',
          status: 'ACTIVE'
        }
      }
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log(`Created:`)
  console.log(`- ${brands.length} brands`)
  console.log(`- ${influencers.length} influencers`)
  console.log(`- ${campaigns.length} campaigns`)
  console.log(`- 1 admin user`)
  console.log('\n🔑 Test credentials:')
  console.log('Brand: sarah@fashionnova.com / password123')
  console.log('Influencer: sarah@lifestyle.com / password123')
  console.log('Admin: admin@upfluence.com / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })