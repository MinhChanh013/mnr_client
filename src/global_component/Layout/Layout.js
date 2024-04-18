import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";
import { Typography, Affix } from "antd";

export default function Layout() {
  return (
    <>
      <Loading />
      <Message />
      <Header />
      <Outlet />
      <Affix offsetBottom={0}>
        <Typography
          style={{
            color: "#555555",
            textAlign: "center",
            backgroundColor: "#e8e8e8",
          }}
        >
          Copyright by CEH @ 2024 version 2.0
        </Typography>
      </Affix>
    </>
  );
}
