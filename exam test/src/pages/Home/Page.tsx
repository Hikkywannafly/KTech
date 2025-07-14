import { FC } from "react";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";
const Home: FC = () => {
  return (
    <>
      <section>
        <div className="flex min-h-[calc(100vh-64px)] w-full justify-center p-4 ">
          <div className=" flex-col lg:flex-row px-4">
            <div>
              <UserForm />
            </div>
            <div className="mx-4">
              <UserList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
