import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./global_component/Layout/Layout.js";
import { reConnect, socket } from "./socket.js";
import Dashboard from "./views/Dashboard/Dashboard.js";
import NotFound from "./views/not_found/NotFound.jsx";

import "./assets/css/ReactGrid-css/custom.css";
import Login from "./views/login/Login.js";
import Msg211 from "./views/message_common/Msg211.js";
import Msg217 from "./views/message_common/Msg217.js";
import Msg227 from "./views/message_common/Msg227.js";
import Msg252 from "./views/message_common/Msg252.js";
import Msg253 from "./views/message_common/Msg253.js";
import Msg367point8 from "./views/message_common/Msg367point8.js";
import Msg901 from "./views/message_common/Msg901.js";
import MsgHistory from "./views/message_common/MsgHistory.js";
import Msg212Container from "./views/message_container/Msg212Container.js";
import Msg213 from "./views/message_container/Msg213Container.js";
import Msg214 from "./views/message_container/Msg214Container.js";
import Msg214ContainerCSHT from "./views/message_container/Msg214ContainerCSHT.js";
import Msg237 from "./views/message_container/Msg237Container.js";
import Msg247Container from "./views/message_container/Msg247Container.js";
import Msg363Container from "./views/message_container/Msg363Container.js";
import Msg365Container from "./views/message_container/Msg365Container.js";
import Msg365ContainerCSHT from "./views/message_container/Msg365ContainerCSHT.js";
import Msg3661Container from "./views/message_container/Msg3661Container.js";
import Msg3665Container from "./views/message_container/Msg3665Container.js";
import Msg3668Container from "./views/message_container/Msg3668Container.js";
import Msg367Container from "./views/message_container/Msg367Container.js";
import Msg465Container from "./views/message_container/Msg465Container.js";
import Msg566Container from "./views/message_container/Msg566Container.js";

import BulkGetin from "./views/Category/Bulk/BulkGetin.js";
import BulkGetout from "./views/Category/Bulk/BulkGetout.js";
import BulkMNF from "./views/Category/Bulk/BulkMNF.js";
import ContainerMNF from "./views/Category/Container/ContainerMNF.js";
import ContainerSizeType from "./views/Category/Container/ContainerSizeType.js";
import ContainerStock from "./views/Category/Container/ContainerStock.js";
import LiquidGetin from "./views/Category/Liquid/LiquidGetin.js";
import LiquidGetout from "./views/Category/Liquid/LiquidGetout.js";
import LiquidMNF from "./views/Category/Liquid/LiquidMNF.js";
import LiquidType from "./views/Category/Liquid/LiquidType.js";
import PackageGetin from "./views/Category/Package/PackageGetin.js";
import PackageGetout from "./views/Category/Package/packageGetout.js";
import PackageMNF from "./views/Category/Package/PackageMNF.js";

import Msg207Package from "./views/message_package/Msg207Package.js";
import Msg212Package from "./views/message_package/Msg212Package.js";
import Msg215Package from "./views/message_package/Msg215Package.js";
import Msg215PackageCSHT from "./views/message_package/Msg215PackageCSHT.js";
import Msg223Package from "./views/message_package/Msg223Package.js";
import Msg257Package from "./views/message_package/Msg257Package.js";
import Msg2661Package from "./views/message_package/Msg2661Package.js";
import Msg2665Package from "./views/message_package/Msg2665Package.js";
import Msg2668Package from "./views/message_package/Msg2668Package.js";
import Msg297Package from "./views/message_package/Msg297Package.js";
import Msg321Package from "./views/message_package/Msg321Package.js";
import Msg321PackageCSHT from "./views/message_package/Msg321PackageCSHT.js";
import Msg341Package from "./views/message_package/Msg341Package.js";
import Msg367Package from "./views/message_package/Msg367Package.js";
import Msg566Package from "./views/message_package/Msg566Package.js";

import SysConfig from "./views/General/SysConfig/SysConfig.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/msg3668_container", element: <Msg3668Container /> },
      { path: "/msg212_container", element: <Msg212Container /> },
      { path: "/msg253_common", element: <Msg253 /> },
      { path: "/msg217_common", element: <Msg217 /> },
      { path: "/msg211_common", element: <Msg211 /> },
      { path: "/msg901_common", element: <Msg901 /> },
      { path: "/msg_history", element: <MsgHistory /> },
      { path: "/msg227_common", element: <Msg227 /> },
      { path: "/msg252_common", element: <Msg252 /> },
      { path: "/msg3678_common", element: <Msg367point8 /> },
      { path: "/msg213_container", element: <Msg213 /> },
      { path: "/msg214_container", element: <Msg214 /> },
      { path: "/msg237_container", element: <Msg237 /> },
      { path: "/msg247_container", element: <Msg247Container /> },
      { path: "/msg3665_container", element: <Msg3665Container /> },
      { path: "/msg3661_container", element: <Msg3661Container /> },
      { path: "/msg566_container", element: <Msg566Container /> },
      { path: "/msg363_container", element: <Msg363Container /> },
      { path: "/msg365_container", element: <Msg365Container /> },
      { path: "/msg465_container", element: <Msg465Container /> },
      { path: "/msg214_container_CSHT", element: <Msg214ContainerCSHT /> },
      { path: "/msg365_container_CSHT", element: <Msg365ContainerCSHT /> },
      { path: "/msg367_container", element: <Msg367Container /> },

      { path: "/msg212_package", element: <Msg212Package /> },
      { path: "/msg566_package", element: <Msg566Package /> },
      { path: "/msg215_package", element: <Msg215Package /> },
      { path: "/msg2668_package", element: <Msg2668Package /> },
      { path: "/msg207_package", element: <Msg207Package /> },
      { path: "/msg2665_package", element: <Msg2665Package /> },
      { path: "/msg2661_package", element: <Msg2661Package /> },
      { path: "/msg257_package", element: <Msg257Package /> },
      { path: "/msg297_package", element: <Msg297Package /> },
      { path: "/msg367_package", element: <Msg367Package /> },
      { path: "/msg223_package", element: <Msg223Package /> },
      { path: "/msg321_package", element: <Msg321Package /> },
      { path: "/msg341_package", element: <Msg341Package /> },
      { path: "/msg215_package_CSHT", element: <Msg215PackageCSHT /> },
      { path: "/msg321_package_CSHT", element: <Msg321PackageCSHT /> },

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

      { path: "/SysConfig", element: <SysConfig /> },
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
