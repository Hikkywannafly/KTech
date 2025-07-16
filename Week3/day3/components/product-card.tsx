"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductCardProps {
  id: number
  title: string
  price: number
  images: string[]
  category: {
    name: string
  }
  badge?: string
  badgeColor?: string
  discount?: string
  originalPrice?: number
  rating?: string
}

export default function ProductCard({
  id,
  title,
  price,
  images,
  category,
  badge,
  badgeColor = "bg-yellow-500",
  discount,
  originalPrice,
  rating = "4.5",
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price * 25000)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 relative overflow-hidden border-0 shadow-md">
      <div className="relative">
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={imageError ? "/placeholder.svg?height=200&width=200" : images[0]}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
            onError={handleImageError}
            priority={id <= 6}
          />

          {/* Overlay actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white">
                <Eye className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {badge && (
          <Badge className={`absolute top-2 left-2 text-white text-xs font-bold ${badgeColor} shadow-lg`}>
            {badge}
          </Badge>
        )}

        {discount && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold shadow-lg">{discount}</Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs text-gray-600 bg-gray-100">
            {category.name}
          </Badge>
        </div>

        <h3
          className="text-sm font-semibold line-clamp-2 mb-3 min-h-[2.5rem] text-gray-800 group-hover:text-blue-600 transition-colors"
          title={title}
        >
          {title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(Number(rating)) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({rating})</span>
        </div>

        <div className="space-y-1 mb-4">
          <div className="text-red-600 font-bold text-lg">{formatPrice(price)}</div>
          {originalPrice && <div className="text-gray-400 text-sm line-through">{formatPrice(originalPrice)}</div>}
        </div>

        <Button
          size="sm"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
        >
          <ShoppingCart className="h-3 w-3 mr-2" />
          Thêm vào giỏ
        </Button>
      </CardContent>
    </Card>
  )
}
