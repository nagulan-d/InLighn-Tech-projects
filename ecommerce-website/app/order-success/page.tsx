import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for your purchase! Your order has been confirmed and will be processed shortly.
            </p>
            <p className="text-sm text-gray-500">Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <div className="space-y-2">
              <Link href="/shop">
                <Button className="w-full">Continue Shopping</Button>
              </Link>
              <Link href="/orders">
                <Button variant="outline" className="w-full bg-transparent">
                  View Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
