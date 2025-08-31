import { Outlet } from "react-router";
import { MainNav } from "./MainNav";

export const AppLayout = () => {
  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
};
