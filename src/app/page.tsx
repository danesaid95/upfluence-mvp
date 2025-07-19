import Link from "next/link"
import { ArrowRight, Users, TrendingUp, Shield, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Upfluence</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className="text-gray-600 hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect Brands with
            <span className="text-indigo-600"> Authentic Influencers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover, connect, and collaborate with influencers who align with your brand values. 
            Build authentic relationships that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup?role=BRAND"
              className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 flex items-center justify-center"
            >
              I&apos;m a Brand
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/auth/signup?role=INFLUENCER"
              className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-50 flex items-center justify-center"
            >
              I&apos;m an Influencer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Upfluence?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to run successful influencer marketing campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Influencers</h3>
              <p className="text-gray-600">
                Access to thousands of verified influencers across all major platforms
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">
                Track engagement rates, audience demographics, and campaign performance
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Built-in payment system with escrow protection for both parties
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Matching</h3>
              <p className="text-gray-600">
                AI-powered matching to find the perfect influencer for your brand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Free</h3>
              <div className="text-4xl font-bold mb-6 text-gray-900">$0<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li>• Up to 5 influencer contacts</li>
                <li>• Basic search filters</li>
                <li>• Email support</li>
                <li>• Basic analytics</li>
              </ul>
              <Link
                href="/auth/signup"
                className="block w-full bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-indigo-600 rounded-lg p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Pro</h3>
              <div className="text-4xl font-bold mb-6 text-gray-900">$99<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li>• Unlimited influencer contacts</li>
                <li>• Advanced search & filters</li>
                <li>• Campaign management</li>
                <li>• Advanced analytics</li>
                <li>• Priority support</li>
              </ul>
              <Link
                href="/auth/signup"
                className="block w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Agency Plan */}
            <div className="border rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Agency</h3>
              <div className="text-4xl font-bold mb-6 text-gray-900">$299<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li>• Everything in Pro</li>
                <li>• Multiple team members</li>
                <li>• White-label reports</li>
                <li>• API access</li>
                <li>• Dedicated account manager</li>
              </ul>
              <Link
                href="/auth/signup"
                className="block w-full bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Upfluence</h3>
              <p className="text-gray-400">
                The leading platform for influencer marketing campaigns.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Upfluence MVP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}