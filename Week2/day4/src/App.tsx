import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import Home from "@/pages/Home/Page";
import AllTasks from "@/pages/AllTasks/Page";
import NoMatch from "@/pages/NoMatch/Page";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth><Layout /></RequireAuth>}>
          <Route index element={<Home />} />
          <Route path="/all-tasks" element={<AllTasks />} />
          <Route path="/today" element={<AllTasks />} />
          <Route path="/important" element={<AllTasks />} />
          <Route path="/completed" element={<AllTasks />} />
          <Route path="/add-task" element={<AllTasks />} />
          <Route path="/settings" element={<AllTasks />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
