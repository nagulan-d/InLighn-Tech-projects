import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/mock-data"

export function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 8)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
