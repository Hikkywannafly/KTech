import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Star, Users, Zap } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import PromoBar from "@/components/promo-bar"
import HeroBanner from "@/components/hero-banner"
import CategoryNav from "@/components/category-nav"
import OnlineDeals from "@/components/online-deals"
import ProductGrid from "@/components/product-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBar />
      <Header />
      <CategoryNav />

      {/* Hero Section */}
      <HeroBanner />
      {/* <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent>
            <Link href="/products">
              <Button size="lg" className="flex items-center space-x-2">
                <span>Xem sản phẩm</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section> */}

      {/* Online Deals Section */}
      <OnlineDeals />

      {/* Product Grid Section */}
      <ProductGrid />
    </div>
  )
}
