import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Electronics", image: "/placeholder.svg?height=200&width=300", href: "/shop?category=electronics" },
  { name: "Clothing", image: "/placeholder.svg?height=200&width=300", href: "/shop?category=clothing" },
  { name: "Home & Garden", image: "/placeholder.svg?height=200&width=300", href: "/shop?category=home" },
  { name: "Sports", image: "/placeholder.svg?height=200&width=300", href: "/shop?category=sports" },
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-center">{category.name}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
