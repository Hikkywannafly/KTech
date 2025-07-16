"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Flame, Zap } from "lucide-react"
import { useState, useEffect } from "react"

const categories = [
  { name: "Điện Thoại", time: "12:00", upcoming: false },
  { name: "Apple", time: "15:00", upcoming: true },
  { name: "Laptop", time: "18:00", upcoming: true },
  { name: "Phụ kiện", time: "21:00", upcoming: true },
  { name: "Đồng Hồ", time: "24:00", upcoming: true },
  { name: "PC, Máy in", time: "03:00", upcoming: true },
]

export default function OnlineDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 23,
    seconds: 45,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Khuyến mãi Online</h2>
        <Flame className="h-6 w-6 text-red-500" />
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Flash Sale Section */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-5 w-5" />
              <Badge className="bg-white text-red-600 font-bold">FLASH SALE</Badge>
            </div>
            <CardTitle className="text-white">GIÁ SỐC</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-4">
              <div className="text-sm mb-2">Chỉ còn</div>
              <div className="flex justify-center gap-1">
                <div className="bg-black text-white px-2 py-1 rounded text-lg font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <span className="text-lg">:</span>
                <div className="bg-black text-white px-2 py-1 rounded text-lg font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <span className="text-lg">:</span>
                <div className="bg-black text-white px-2 py-1 rounded text-lg font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Online Only Section */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardHeader className="text-center">
            <Badge className="bg-white text-orange-600 font-bold mb-2">ONLINE ONLY</Badge>
            <CardTitle className="text-white">GIẢM ĐẾN 35%</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button className="bg-white text-orange-600 hover:bg-gray-100 font-bold">XEM NGAY</Button>
          </CardContent>
        </Card>

        {/* Category Timeline */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className={`text-center ${!category.upcoming ? "bg-blue-50 border-blue-200" : "bg-gray-50"}`}
              >
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Clock className="h-4 w-4 mx-auto text-gray-500" />
                  </div>
                  <div className="font-semibold text-sm mb-1">{category.name}</div>
                  <div className="text-xs text-gray-600 mb-2">Sắp diễn ra</div>
                  <div className="font-bold text-blue-600">{category.time}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
