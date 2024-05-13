/* eslint-disable react-hooks/rules-of-hooks */
import { poster } from "../../services/BaseService";
import { socket, socketReceiveReponse } from "../../socket";
import store from "../../store";
import { showMessage } from "../../store/slices/MessageSlices";
const msgType = "sys-config";
const cpath = (action) => {
  return `/config/${msgType}/${action}`;
};
///---validate
const validateClearGetin = () => {
  throw new Error();
};

///--process
export const get = async () => {
  const result = await poster(cpath("get"));
  return result;
};

export const update = async (formdata = {}) => {
  const result = await poster(cpath("update"), formdata);
  return result;
};

// socket.on("sock_to_client", (data) => {
//   socketReceiveReponse(
//     data,
//     data.response_func === "29" || data.response_func === "27",
//     () => load(store.getState().filterForm)
//   );
// });
