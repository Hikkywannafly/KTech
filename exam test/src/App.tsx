import { FC } from "react";
import { Route, Routes } from "react-router";
import Layout from "@/components/Layout/Layout";
import Home from "@/pages/Home/Page";
import NoMatch from "@/pages/NoMatch/Page";
import { UserProvider } from "@/context/UserProvider";
import UserDetail from "@/pages/User/page";
import UserList from "@/components/UserList";
// import Widget1 from "./pages/Widget1/page";
// import Widget2 from "./pages/Widget2/page";
// import Widget3 from "./pages/Widget3/page";
// import Widget4 from "./pages/Widget4/page";

const App: FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
