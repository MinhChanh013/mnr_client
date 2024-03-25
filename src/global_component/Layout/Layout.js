import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";

export default function Layout() {
  return (
    <>
      <Loading />
      <Message />
      <Header />
      <Outlet />
    </>
  );
}
