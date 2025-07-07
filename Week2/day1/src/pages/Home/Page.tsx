import { FC, useState } from "react";
import List from "./list";
import Create from "./create";
const Home: FC = () => {

  const [reload, setReload] = useState(0);

  const handleOnCreated = (customer: any) => {
    console.log('Customer created:', customer);
    setReload((prev) => prev + 1);
  };
  return (
    <>
      <section>
        <div className="flex  min-h-[calc(100vh-64px)] bg-base-200 w-full justify-center">
          <div className="hero-content flex-col lg:flex-row">
            <div>
              <Create onCreated={handleOnCreated} />
              <List reload={reload} />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
