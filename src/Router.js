import { BrowserRouter, Routes, Route } from "react-router-dom";
import Msg3668Container from "./views/message_container/Msg3668Container.js";
import Msg212Container from "./views/message_container/Msg212Container.js";
import "./assets/css/ReactGrid-css/custom.css";
import Msg253 from "./views/message_common/Msg253.js";
import Msg217 from "./views/message_common/Msg217.js";
import Msg227 from "./views/message_common/Msg227.js";
import Msg252 from "./views/message_common/Msg252.js";
import Msg367point8 from "./views/message_common/Msg367point8.js";

// let RouterLink = {
//     Msg3668_container
// };

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/msg3668_container" element={<Msg3668Container />} />
        <Route index path="/msg212_container" element={<Msg212Container />} />
        <Route index path="/msg253" element={<Msg253 />} />
        <Route index path="/msg217" element={<Msg217 />} />
        <Route index path="/msg227" element={<Msg227 />} />
        <Route index path="/msg252" element={<Msg252 />} />
        <Route index path="/msg367point8" element={<Msg367point8 />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
