import { FC } from "react";
import UserRegistrationForm from "@/components/Form";
const Home: FC = () => {
    return (
        <>
            <section className=" flex min-h-screen w-screen flex-col items-center justify-center gap-y-5">
                <UserRegistrationForm />
            </section>
        </>
    );
};

export default Home;
