import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Shop the latest trends from Tamil Nadu and across India. Quality products at the best prices!
        </p>
        <Link href="/shop">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
