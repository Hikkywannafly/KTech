import { Button } from "@/components/ui/button"
import { Smartphone, Laptop, Headphones, Watch, Home, Tablet, Monitor, Gamepad2, CreditCard } from "lucide-react"

const categories = [
  { icon: Smartphone, label: "Điện thoại", href: "/dien-thoai" },
  { icon: Laptop, label: "Laptop", href: "/laptop" },
  { icon: Headphones, label: "Phụ kiện", href: "/phu-kien" },
  { icon: Watch, label: "Smartwatch", href: "/smartwatch" },
  { icon: Home, label: "Đồng hồ", href: "/dong-ho" },
  { icon: Tablet, label: "Tablet", href: "/tablet" },
  { icon: Monitor, label: "Máy cũ, Thu cũ", href: "/may-cu" },
  { icon: Gamepad2, label: "Màn hình, Máy in", href: "/man-hinh" },
  { icon: CreditCard, label: "Sim, Thẻ cào", href: "/sim-the" },
]

export default function CategoryNav() {
  return (
    <nav className="bg-white border-b shadow-sm py-3 px-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Button
                key={index}
                variant="ghost"
                className="flex items-center gap-2 whitespace-nowrap hover:bg-gray-100 text-gray-700"
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{category.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
