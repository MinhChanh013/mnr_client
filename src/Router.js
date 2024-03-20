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
import Msg214 from "./views/message_container/Msg214Container.js";
import Msg237 from "./views/message_container/Msg237Container.js";
import Msg3665Container from "./views/message_container/Msg3665Container.js";
import Msg247Container from "./views/message_container/Msg247Container.js";
import Dashboard from "./views/Dashboard/Dashboard.js";
import Layout from "./global_component/Layout/Layout.js";
import NotFound from "./views/not_found/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/msg3668_container", element: <Msg3668Container /> },
      { path: "/msg212_container", element: <Msg212Container /> },
      { path: "/msg253", element: <Msg253 /> },
      { path: "/msg217", element: <Msg217 /> },
      { path: "/msg901", element: <Msg901 /> },
      { path: "/msg_history", element: <MsgHistory /> },
      { path: "/msg227", element: <Msg227 /> },
      { path: "/msg252", element: <Msg252 /> },
      { path: "/msg367point8", element: <Msg367point8 /> },
      { path: "/msg213_container", element: <Msg213 /> },
      { path: "/msg214_container", element: <Msg214 /> },
      { path: "/msg237_container", element: <Msg237 /> },
      { path: "/msg247_container", element: <Msg247Container /> },
      { path: "/msg3665_container", element: <Msg3665Container /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
