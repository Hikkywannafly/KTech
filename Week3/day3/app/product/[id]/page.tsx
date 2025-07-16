"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Plus, Minus, Truck, Shield, RotateCcw } from "lucide-react"
import Image from "@/components/image"
import Link from "next/link"
import Header from "@/components/header"
import PromoBar from "@/components/promo-bar"

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

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`)

        if (!response.ok) {
          throw new Error("Product not found")
        }

        const data: Product = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
        router.push("/products")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id, router])

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price * 25000)
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PromoBar />
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-300 rounded-lg"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-10 bg-gray-300 rounded w-1/2"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PromoBar />
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
          <Link href="/products">
            <Button>Quay lại danh sách sản phẩm</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBar />
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600">
            Sản phẩm
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.title}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=500&width=500"
                }}
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative bg-white rounded overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=100&width=100"
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category.name}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8) • 124 đánh giá</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-red-600 mb-2">{formatPrice(product.price)}</div>
                <div className="text-lg text-gray-500 line-through">{formatPrice(product.price * 1.2)}</div>
                <Badge className="bg-red-100 text-red-800">Tiết kiệm 20%</Badge>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Số lượng:</span>
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Thêm vào giỏ hàng
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)}>
                  <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  Yêu thích
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-4 w-4 mr-2" />
                  Chia sẻ
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">Miễn phí vận chuyển</div>
                <div className="text-xs text-gray-500">Đơn từ 500k</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium">Bảo hành chính hãng</div>
                <div className="text-xs text-gray-500">12 tháng</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <div className="text-sm font-medium">Đổi trả dễ dàng</div>
                <div className="text-xs text-gray-500">Trong 7 ngày</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Mô tả sản phẩm</TabsTrigger>
              <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá (124)</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mô tả sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông số kỹ thuật</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Danh mục:</span>
                      <span>{product.category.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Mã sản phẩm:</span>
                      <span>#{product.id}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Tình trạng:</span>
                      <Badge className="bg-green-100 text-green-800">Còn hàng</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Đánh giá khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-medium">Khách hàng {i + 1}</span>
                          <span className="text-sm text-gray-500">2 ngày trước</span>
                        </div>
                        <p className="text-gray-700">
                          Sản phẩm rất tốt, chất lượng như mong đợi. Giao hàng nhanh chóng.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
