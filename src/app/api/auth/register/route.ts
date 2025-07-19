import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, company, website } = await req.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as UserRole,
        company: role === "BRAND" ? company : undefined,
        website: role === "BRAND" ? website : undefined
      }
    })

    // Create default subscription
    await prisma.subscription.create({
      data: {
        userId: user.id,
        planType: "FREE",
        status: "ACTIVE"
      }
    })

    // Create influencer profile if role is INFLUENCER
    if (role === "INFLUENCER") {
      await prisma.influencerProfile.create({
        data: {
          userId: user.id,
          bio: "",
          category: [],
          languages: ["English"],
          isAvailable: true,
          profileCompleted: false
        }
      })
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}