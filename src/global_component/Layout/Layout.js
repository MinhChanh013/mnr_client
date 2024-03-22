import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Loading from "../Loading/Loading";

export default function Layout() {
  return (
    <>
      <Loading />
      <Header />
      <Outlet />
    </>
  );
}
