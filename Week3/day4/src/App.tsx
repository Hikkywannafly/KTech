import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import AllTasks from "@/pages/AllTasks/Page";
import AddTask from "@/pages/AddTasks/Page";
import NoMatch from "@/pages/NoMatch/Page";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth><Layout /></RequireAuth>}>
          {/* <Route index element={<Home />} /> */}
          <Route path="/" element={<AllTasks />} />
          <Route path="/all-tasks" element={<AllTasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/settings" element={<AllTasks />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
