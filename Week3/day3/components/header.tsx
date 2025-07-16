"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, User, ShoppingCart, MapPin, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-yellow-400 py-4  shadow-md">
      <div className="container mx-auto flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-black text-yellow-400 rounded-full p-2">
            <span className="font-bold text-lg">TGD</span>
          </div>
          <span className="font-bold text-black text-xl hidden md:block">thegioididong</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input placeholder="Bạn tìm gì..." className="pl-10 bg-white border-0 rounded-lg shadow-sm" />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-black hover:bg-yellow-300 flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:block">Đăng nhập</span>
          </Button>

          <Button variant="ghost" className="text-black hover:bg-yellow-300 flex items-center gap-2 relative">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden md:block">Giỏ hàng</span>
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">0</Badge>
          </Button>

          <Button variant="ghost" className="text-black hover:bg-yellow-300 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="hidden md:block">Hồ Chí Minh</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </header>
  )
}
