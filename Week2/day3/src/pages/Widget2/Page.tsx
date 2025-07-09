import { FC } from "react";
import FormLogin from "@/components/FormLogin";
const Home: FC = () => {
    return (
        <>
            <section className=" flex min-h-screen w-screen flex-col items-center justify-center gap-y-5">
                <FormLogin />
            </section>
        </>
    );
};

export default Home;
