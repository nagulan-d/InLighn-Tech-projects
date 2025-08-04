import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Truck, Users, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: Users },
    { label: "Products Sold", value: "2,00,000+", icon: Award },
    { label: "Cities Served", value: "100+", icon: Globe },
    { label: "Years of Service", value: "5+", icon: Heart },
  ]

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "We prioritize our customers' satisfaction above everything else. Your happiness is our success.",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Every product goes through rigorous quality checks to ensure you get only the best.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery across Tamil Nadu and India. Most orders delivered within 2-3 days.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Supporting local artisans and businesses across Tamil Nadu while serving our community.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          About TamilMart
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Trusted Shopping Partner in <span className="text-purple-600">Tamil Nadu</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          TamilMart is Tamil Nadu's premier online shopping destination, connecting you with quality products from local
          artisans to international brands. We're proud to serve our community with authentic products and exceptional
          service.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Founded in 2019 in Chennai, TamilMart began as a small initiative to bridge the gap between traditional
              Tamil Nadu craftsmanship and modern e-commerce. Our founders, passionate about promoting local culture
              while embracing technology, envisioned a platform that would serve both local artisans and customers
              across India.
            </p>
            <p>
              Today, we've grown into Tamil Nadu's most trusted online marketplace, featuring everything from
              traditional Kanchipuram silk sarees to the latest electronics. We take pride in our roots while looking
              forward to the future of digital commerce in India.
            </p>
            <p>
              Our commitment extends beyond just selling products. We actively support local communities, promote
              sustainable practices, and ensure that every transaction contributes to the growth of Tamil Nadu's
              economy.
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="TamilMart Story"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-lg"></div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <value.icon className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-700 dark:text-purple-300">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              To democratize commerce in Tamil Nadu by providing a platform that connects local businesses with
              customers across India, while maintaining the highest standards of quality, service, and cultural
              authenticity.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              To become India's most trusted and culturally rich e-commerce platform, where tradition meets innovation,
              and every purchase supports the growth of local communities and artisans.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Meet Our Leadership</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Our diverse team brings together expertise in technology, business, and deep understanding of Tamil culture
          and commerce.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="CEO"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg">Rajesh Kumar</h3>
              <p className="text-purple-600 mb-2">Founder & CEO</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Former tech executive with 15+ years experience in e-commerce and passion for Tamil culture.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="CTO"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg">Priya Selvam</h3>
              <p className="text-purple-600 mb-2">Chief Technology Officer</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Technology leader specializing in scalable e-commerce platforms and user experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="CMO"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg">Arjun Murugan</h3>
              <p className="text-purple-600 mb-2">Chief Marketing Officer</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Marketing strategist with deep understanding of Indian consumer behavior and digital trends.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the TamilMart Family</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Experience the best of Tamil Nadu's commerce. From traditional crafts to modern essentials, we have everything
          you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg" variant="secondary">
              Start Shopping
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
