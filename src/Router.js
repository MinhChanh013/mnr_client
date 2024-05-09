import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./global_component/Layout/Layout.js";
import { reConnect, socket } from "./socket.js";
import Dashboard from "./views/Dashboard/Dashboard.js";
import NotFound from "./views/not_found/NotFound.jsx";

import "./assets/css/ReactGrid-css/custom.css";
import Login from "./views/login/Login.js";
//===== MESSAGE COMMON =======//
import Msg211 from "./views/message_common/Msg211.js";
import Msg217 from "./views/message_common/Msg217.js";
import Msg227 from "./views/message_common/Msg227.js";
import Msg252 from "./views/message_common/Msg252.js";
import Msg253 from "./views/message_common/Msg253.js";
import Msg367point8 from "./views/message_common/Msg367point8.js";
import Msg901 from "./views/message_common/Msg901.js";
import MsgHistory from "./views/message_common/MsgHistory.js";

//===== MESSAGE CONTAINER =======//
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

//===== CATEGORY =======//
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

//===== MESSAGE PACKAGE =======//
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
//===== MESSAGE BULK =======//
import Msg207Bulk from "./views/message_bulk/Msg207Bulk.js";
import Msg212Bulk from "./views/message_bulk/Msg212Bulk.js";
import Msg216Bulk from "./views/message_bulk/Msg216Bulk.js";
import Msg223Bulk from "./views/message_bulk/Msg223Bulk.js";
import Msg267Bulk from "./views/message_bulk/Msg267Bulk.js";
import Msg297Bulk from "./views/message_bulk/Msg297Bulk.js";
import Msg421BulkCSHT from "./views/message_bulk/MsgCSHT421Bulk.js";
import Msg216BulkCSHT from "./views/message_bulk/MsgCSHT216Bulk.js";
import Msg4668Bulk from "./views/message_bulk/Msg4668Bulk.js";
import Msg4665Bulk from "./views/message_bulk/Msg4665Bulk.js";
import Msg4661Bulk from "./views/message_bulk/Msg4661Bulk.js";
import Msg566Bulk from "./views/message_bulk/Msg566Bulk.js";
import Msg441Bulk from "./views/message_bulk/Msg441Bulk.js";
import Msg421Bulk from "./views/message_bulk/Msg421Bulk.js";
import Msg367Bulk from "./views/message_bulk/Msg367Bulk.js";

//===== MESSAGE LIQUID =======//
import Msg121Liquid from "./views/message_liquid/Msg121Liquid.js";
import Msg1668Liquid from "./views/message_liquid/Msg1668Liquid.js";
import Msg1665Liquid from "./views/message_liquid/Msg1665Liquid.js";
import Msg1661Liquid from "./views/message_liquid/Msg1661Liquid.js";
import Msg566Liquid from "./views/message_liquid/Msg566Liquid.js";
import Msg367Liquid from "./views/message_liquid/Msg367Liquid.js";
import Msg297Liquid from "./views/message_liquid/Msg297Liquid.js";
import Msg277Liquid from "./views/message_liquid/Msg277Liquid.js";
import Msg226Liquid from "./views/message_liquid/Msg226Liquid.js";
import Msg223Liquid from "./views/message_liquid/Msg223Liquid.js";
import Msg212Liquid from "./views/message_liquid/Msg212Liquid.js";
import Msg207Liquid from "./views/message_liquid/Msg207Liquid.js";
import Msg141Liquid from "./views/message_liquid/Msg141Liquid.js";

//===== MESSAGE LIQUID =======//
import User from "./views/Settings/user.js";
import UserDecent from "./views/Settings/UserDecent.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Dashboard /> },

      //===== MESSAGE COMMON =======//
      { path: "/msg253_common", element: <Msg253 /> },
      { path: "/msg217_common", element: <Msg217 /> },
      { path: "/msg211_common", element: <Msg211 /> },
      { path: "/msg901_common", element: <Msg901 /> },
      { path: "/msg_history", element: <MsgHistory /> },
      { path: "/msg227_common", element: <Msg227 /> },
      { path: "/msg252_common", element: <Msg252 /> },
      { path: "/msg3678_common", element: <Msg367point8 /> },

      //===== MESSAGE CONTAINER =======//
      { path: "/msg3668_container", element: <Msg3668Container /> },
      { path: "/msg212_container", element: <Msg212Container /> },
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

      //===== MESSAGE PACKAGE =======//
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

      //===== CATEGORY =======//
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

      //===== MESSAGE BULK =======//
      { path: "/msg207_bulk", element: <Msg207Bulk /> },
      { path: "/msg212_bulk", element: <Msg212Bulk /> },
      { path: "/msg216_bulk", element: <Msg216Bulk /> },
      { path: "/msg223_bulk", element: <Msg223Bulk /> },
      { path: "/msg267_bulk", element: <Msg267Bulk /> },
      { path: "/msg297_bulk", element: <Msg297Bulk /> },
      { path: "/msg367_bulk", element: <Msg367Bulk /> },
      { path: "/msg421_bulk", element: <Msg421Bulk /> },
      { path: "/msg441_bulk", element: <Msg441Bulk /> },
      { path: "/msg566_bulk", element: <Msg566Bulk /> },
      { path: "/msg4661_bulk", element: <Msg4661Bulk /> },
      { path: "/msg4665_bulk", element: <Msg4665Bulk /> },
      { path: "/msg4668_bulk", element: <Msg4668Bulk /> },
      { path: "/msg216_bulk_csht", element: <Msg216BulkCSHT /> },
      { path: "/msg421_bulk_csht", element: <Msg421BulkCSHT /> },

      //===== MESSAGE LIQUID =======//
      { path: "/msg212_liquid", element: <Msg212Liquid /> },
      { path: "/msg566_liquid", element: <Msg566Liquid /> },
      { path: "/msg226_liquid", element: <Msg226Liquid /> },
      { path: "/msg1668_liquid", element: <Msg1668Liquid /> },
      { path: "/msg207_liquid", element: <Msg207Bulk /> },
      { path: "/msg1665_liquid", element: <Msg1665Liquid /> },
      { path: "/msg1661_liquid", element: <Msg1661Liquid /> },
      { path: "/msg277_liquid", element: <Msg277Liquid /> },
      { path: "/msg297_liquid", element: <Msg297Liquid /> },
      { path: "/msg367_liquid", element: <Msg367Liquid /> },
      { path: "/msg223_liquid", element: <Msg223Liquid /> },
      { path: "/msg121_liquid", element: <Msg121Liquid /> },
      { path: "/msg141_liquid", element: <Msg141Liquid /> },

      //===== SETTING =======//
      { path: "/user_decent", element: <UserDecent /> },
      { path: "/user", element: <User /> },

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
