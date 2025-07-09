import { FC } from "react";
import SignUp from "@/components/Form1/SignUp";
import SignIn from "@/components/Form1/SignIn";
const Home: FC = () => {
  return (
    <>
      <section className=" flex min-h-screen w-screen flex-col items-center justify-center gap-y-5">
        <div className="flex flex-row gap-x-4 bg-[#f8d4d4] p-4 rounded-lg shadow-lg mb-8">

          <div className="min-h-screen flex items-center justify-center  p-4">
            <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg bg-black text-white relative">
              <SignUp />

            </div>
          </div>

          <div className="min-h-screen flex items-center justify-center  p-4">
            <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg bg-black text-white relative">
              <SignIn />

            </div>
          </div>


        </div>

      </section>
    </>
  );
};

export default Home;
