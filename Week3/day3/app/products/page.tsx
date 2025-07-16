import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Search, Filter } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 124,
    category: "Electronics",
    badge: "Best Seller",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    rating: 4.6,
    reviews: 89,
    category: "Electronics",
    badge: "New",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.7,
    reviews: 156,
    category: "Furniture",
    badge: "Sale",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    rating: 4.5,
    reviews: 203,
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    rating: 4.4,
    reviews: 67,
    category: "Clothing",
    badge: "Eco-Friendly",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    rating: 4.9,
    reviews: 312,
    category: "Lifestyle",
    badge: "Top Rated",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our carefully curated selection of high-quality products.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-muted relative overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-2 left-2" variant={product.badge === "Sale" ? "destructive" : "default"}>
                  {product.badge}
                </Badge>
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
              </div>
              <CardTitle className="line-clamp-2 text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
              <Button className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>

      {/* Features */}
      <section className="mt-16 py-12 border-t">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Free Shipping</h3>
            <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
          </div>
          <div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-sm text-muted-foreground">30-day money-back guarantee</p>
          </div>
          <div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Filter className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">Round-the-clock customer support</p>
          </div>
        </div>
      </section>
    </div>
  )
}
