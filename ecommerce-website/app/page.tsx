import { Suspense } from "react"
import { FeaturedProducts } from "@/components/featured-products"
import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <Suspense fallback={<div className="text-center py-8">Loading featured products...</div>}>
        <FeaturedProducts />
      </Suspense>
      <NewsletterSignup />
    </div>
  )
}
