import AccordionTabs from "@/components/AccordionTabs";
import ButtonTabs from "@/components/ButtonTabs";
import LikeButton from "@/components/LikeButton";
import ProductSlider from "@/components/ProductSlider/inde";
import { FC } from "react";


const Widget3: FC = () => {
    return (
        <section>
            <div className="flex w-full justify-center flex-col gap-4 items-center ">
                <div className="flex flex-col gap-4">
                    <LikeButton />
                </div>
                <div className=" ">
                    <h1>ProductSlider</h1>
                    <ProductSlider />

                </div>
                <div className="  ">
                    <ButtonTabs />
                </div>
                <div className=" flex flex-col gap-4 items-center ">
                    <AccordionTabs />
                </div>

            </div>


        </section>
    );
};

export default Widget3;
