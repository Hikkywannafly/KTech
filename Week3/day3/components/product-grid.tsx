"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "./image"
import Link from "next/link"

interface Product {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  category: {
    id: number
    name: string
    image: string
  }
}

const badges = ["VƯỢT TRỘI", "VÔ VAN DEAL RẺ", "FLASH SALE", "HOT DEAL", "GIẢM SỐC"]
const badgeColors = ["bg-yellow-500", "bg-red-500", "bg-red-600", "bg-orange-500", "bg-purple-500"]

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price * 25000)
}

function generateDiscount(): { discount: string; originalPrice: number } | null {
  const hasDiscount = Math.random() > 0.4
  if (!hasDiscount) return null

  const discountPercent = Math.floor(Math.random() * 50) + 10 // 10-60% discount
  return {
    discount: `-${discountPercent}%`,
    originalPrice: discountPercent,
  }
}

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardContent className="p-3">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/3 mb-1" />
        <Skeleton className="h-4 w-1/4 mb-3" />
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  )
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=12")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data: Product[] = await response.json()

        // Filter out products with invalid images
        const validProducts = data.filter(
          (product) =>
            product.images &&
            product.images.length > 0 &&
            product.images[0] &&
            !product.images[0].includes("placeimg.com") &&
            product.images[0].startsWith("http"),
        )

        setProducts(validProducts)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Lỗi tải sản phẩm: {error}</p>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product, index) => {
          const discountInfo = generateDiscount()
          const badge = badges[index % badges.length]
          const badgeColor = badgeColors[index % badgeColors.length]
          const rating = (Math.random() * 1.5 + 3.5).toFixed(1) // Random rating between 3.5-5.0

          return (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="group hover:shadow-lg transition-shadow duration-300 relative overflow-hidden cursor-pointer">
                <div className="relative">
                  <div className="relative w-full h-48 bg-gray-100">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=200&width=200"
                      }}
                    />
                  </div>

                  <Badge className={`absolute top-2 left-2 text-white text-xs ${badgeColor}`}>{badge}</Badge>

                  {discountInfo && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                      {discountInfo.discount}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-3">
                  <h3 className="text-sm font-medium line-clamp-2 mb-2 min-h-[2.5rem]" title={product.title}>
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{rating}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-red-600 font-bold text-lg">{formatPrice(product.price)}</div>
                    {discountInfo && (
                      <div className="text-gray-400 text-sm line-through">
                        {formatPrice(product.price * (1 + discountInfo.originalPrice / 100))}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 mb-2">{product.category.name}</div>

                  <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Mua ngay
                  </Button>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline" size="lg" className="px-8 bg-transparent">
          Xem thêm sản phẩm
        </Button>
      </div>
    </div>
  )
}
