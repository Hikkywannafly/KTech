
import Image from "./image"
export default function HeroBanner() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative bg-gradient-to-r w-full h-[300px]  rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={"https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/b6/dd/b6dd779ce5e8a918cc4f557fce984b16.png"}
          alt="Hero Banner"
          className="w-full h-[300px] object-cover rounded-lg shadow-md"
          fill
        />
      </div>
    </div>
  )
}
