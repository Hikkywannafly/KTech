
import Image from "./image"
export default function PromoBar() {
  return (
    <div className="w-full h-[44px] relative ">
      <Image
        src={'https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/e4/d2/e4d215b404d123b25e8b8f5c01ac2f56.png'}
        alt="Khuyến mãi"
        className="w-full h-[44px] object-cover absolute top-0 left-0"
        fill

      />
    </div>
  )
}
