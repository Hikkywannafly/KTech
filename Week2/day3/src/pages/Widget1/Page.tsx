import { FC } from "react";
import FormRegistration from "@/components/FormRegister";
const Home: FC = () => {
    return (
        <>
            <section className="flex w-screen flex-col items-center justify-center gap-y-5">
                <FormRegistration />
            </section>
        </>
    );
};

export default Home;
