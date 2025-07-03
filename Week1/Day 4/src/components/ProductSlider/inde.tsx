import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const images = [
    "https://i.pinimg.com/1200x/8f/d0/77/8fd077e7174b1a83b795ae5e509477b5.jpg",
    "https://i.redd.it/1szzcy1b7zq21.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL5U3GBuWbfvKVPydf_uUPze-BT4sI3po8aoGGk0yBJI0Esb7HX3_8ZIqOGyqBJXWGrA&usqp=CAUg",
    "https://m.media-amazon.com/images/I/51-S6sH+BtL.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2iJX9QD8PpbG7svNJaeFMxZgB4j7tYOnssfTTZLTUU8BE4BScDlmYhe5JY_YvFY4msU&usqp=CAU",
];

const ProductSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Slide with Thumb</h2>


            <Swiper
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
                className="mb-4"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`product-${index}`} className="w-full h-[180px] object-contain" />
                    </SwiperSlide>
                ))}
            </Swiper>


            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                watchSlidesProgress
                modules={[Thumbs]}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`thumb-${index}`}
                            className="border rounded cursor-pointer"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductSlider;
