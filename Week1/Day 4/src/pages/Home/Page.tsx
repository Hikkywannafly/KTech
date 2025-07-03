import { Card } from "@/components/Card";
import { FC } from "react";
const Data = [
  {
    src: "https://s.pacn.ws/1/p/1a7/kono-subarashii-sekai-ni-shukufuku-wo-3-plush-chomusuke-831939.1.jpg?v=sljmf4",
    title: "Chomusuke 1 Chomusuke 1 Chomusuke 1 Chomusuke 1 Chomusuke 1 Chomusuke 1",
    view: "View 1",
  },
  {
    src: "https://i.redd.it/1szzcy1b7zq21.jpg",
    title: "Chomusuke 2 Chomusuke 1 Chomusuke 1 Chomusuke 1 Chomusuke 1 Chomusuke 1",
    view: "View 2",
  },
  {
    src: "https://s4.anilist.co/file/anilistcdn/character/large/b120654-9yWTm8QyQy0O.jpg",
    title: "Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3",
    view: "View 3",
  },
  {
    src: "https://s4.anilist.co/file/anilistcdn/character/large/b120654-9yWTm8QyQy0O.jpg",
    title: " Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3 ",
    view: "View 3",
  },
]

const Home: FC = () => {
  return (

    <section>
      <div className="flex  min-h-[calc(100vh-64px)] bg-base-200 w-full justify-center ">
        <div className="flex-col lg:flex-row max-w-7xl w-full px-4 py-8 gap-4">

          <div className="flex justify-between items-center mb-5">
            <span className="text-xl font-bold">Tin mới</span>
            <span className="text-xl font-semibold text-black">Xem Thêm</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {Data.map((item, index) => (
              <Card
                key={index}
                src={item.src}
                title={item.title}
                view={item.view}
                className="rounded-lg shadow-lg"
              />
            ))}
          </div>

        </div>

      </div>

    </section>

  );
};

export default Home;
