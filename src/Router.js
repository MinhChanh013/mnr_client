import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard.js";
import Layout from "./global_component/Layout/Layout.js";
import NotFound from "./views/not_found/NotFound.jsx";
import React from "react";
import { reConnect, socket } from "./socket.js";

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
import Msg566Container from "./views/message_container/Msg566Container.js";
import Msg3661Container from "./views/message_container/Msg3661Container.js";

import ContainerMNF from "./views/Category/Container/ContainerMNF.js";
import ContainerSizeType from "./views/Category/Container/ContainerSizeType.js";
import ContainerStock from "./views/Category/Container/ContainerStock.js";
import PackageMNF from "./views/Category/Package/PackageMNF.js";
import PackageGetin from "./views/Category/Package/PackageGetin.js";
import PackageGetout from "./views/Category/Package/packageGetout.js";
import BulkMNF from "./views/Category/Bulk/BulkMNF.js";
import BulkGetin from "./views/Category/Bulk/BulkGetin.js";
import BulkGetout from "./views/Category/Bulk/BulkGetout.js";
import LiquidMNF from "./views/Category/Liquid/LiquidMNF.js";
import LiquidGetin from "./views/Category/Liquid/LiquidGetin.js";
import LiquidGetout from "./views/Category/Liquid/LiquidGetout.js";
import LiquidType from "./views/Category/Liquid/LiquidType.js";

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
      { path: "/msg3661_container", element: <Msg3661Container /> },
      { path: "/msg566_container", element: <Msg566Container /> },

      { path: "/ContainerMNF", element: <ContainerMNF /> },
      { path: "/ContainerSizeType", element: <ContainerSizeType /> },
      { path: "/ContainerStock", element: <ContainerStock /> },
      { path: "/PackageMNF", element: <PackageMNF /> },
      { path: "/PackageGetin", element: <PackageGetin /> },
      { path: "/PackageGetout", element: <PackageGetout /> },
      { path: "/BulkMNF", element: <BulkMNF /> },
      { path: "/BulkGetin", element: <BulkGetin /> },
      { path: "/BulkGetout", element: <BulkGetout /> },
      { path: "/LiquidMNF", element: <LiquidMNF /> },
      { path: "/LiquidGetin", element: <LiquidGetin /> },
      { path: "/LiquidGetout", element: <LiquidGetout /> },
      { path: "/LiquidType", element: <LiquidType /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default function Router() {
  React.useEffect(() => {
    socket.connect();
    reConnect();
  }, []);
  return <RouterProvider router={router} />;
}
