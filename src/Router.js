import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Msg3668Container from "./views/message_container/Msg3668Container.js";
import Msg212Container from "./views/message_container/Msg212Container.js";
import "./assets/css/ReactGrid-css/custom.css";
import Msg253 from "./views/message_common/Msg253.js";
import Msg217 from "./views/message_common/Msg217.js";
import Msg901 from "./views/message_common/Msg901.js";
import MsgHistory from "./views/message_common/MsgHistory.js";
import Login from "./views/login/Login.js";
import Msg227 from "./views/message_common/Msg227.js";
import Msg252 from "./views/message_common/Msg252.js";
import Msg367point8 from "./views/message_common/Msg367point8.js";
import Msg213 from "./views/message_container/Msg213Container.js";

import Layout from "./global_component/Layout/Layout.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/msg3668_container", element: <Msg3668Container /> },
      { path: "/msg212_container", element: <Msg212Container /> },
      { path: "/msg253", element: <Msg253 /> },
      { path: "/msg217", element: <Msg217 /> },
      { path: "/msg901", element: <Msg901 /> },
      { path: "/msg_history", element: <MsgHistory /> },
      { path: "/msg227", element: <Msg227 /> },
      { path: "/msg252", element: <Msg252 /> },
      { path: "/msg367point8", element: <Msg367point8 /> },
      { path: "/msg213", element: <Msg213 /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
