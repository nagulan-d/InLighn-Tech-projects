import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/mock-data"

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets, smartphones, laptops, and electronic accessories",
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-blue-500",
  },
  {
    id: "clothing",
    name: "Clothing & Fashion",
    description: "Traditional wear, western outfits, accessories, and footwear",
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-pink-500",
  },
  {
    id: "home",
    name: "Home & Garden",
    description: "Furniture, home decor, kitchen appliances, and gardening tools",
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-green-500",
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    description: "Fitness equipment, sports gear, yoga accessories, and outdoor items",
    image: "/placeholder.svg?height=300&width=400",
    color: "bg-orange-500",
  },
]

export default function CategoriesPage() {
  // Get product count for each category
  const getCategoryCount = (categoryId: string) => {
    return products.filter((product) => product.category === categoryId).length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop by Categories</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore our wide range of products across different categories. From traditional Tamil Nadu crafts to modern
          electronics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {categories.map((category) => (
          <Link key={category.id} href={`/shop?category=${category.id}`}>
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
              <div className="relative">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`absolute top-4 left-4 ${category.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {getCategoryCount(category.id)} Products
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Featured Categories Section */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Popular in Tamil Nadu</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎵</span>
            </div>
            <h3 className="font-semibold">Music & Audio</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Traditional & Modern</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="font-semibold">Home Essentials</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">For Every Home</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👕</span>
            </div>
            <h3 className="font-semibold">Traditional Wear</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Authentic Designs</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold">Latest Tech</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Cutting Edge</p>
          </div>
        </div>
      </div>
    </div>
  )
}
