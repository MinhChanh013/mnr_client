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
      <div
        style={{
          minHeight: "calc(100vh - var(--height-header) - 30px - 1px)",
        }}
      >
        <Outlet />
      </div>
      <Affix offsetBottom={0}>
        <Typography
          style={{
            color: "#555555",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e8e8e8",
            boxSizing: "border-box",
            height: "30px",
          }}
        >
          Copyright by CEH @ 2024 version 2.0
        </Typography>
      </Affix>
    </>
  );
}
