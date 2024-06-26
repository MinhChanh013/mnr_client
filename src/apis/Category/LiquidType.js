/* eslint-disable react-hooks/rules-of-hooks */
import { poster } from "../../services/BaseService";
import { socket, socketReceiveReponse } from "../../socket";
import store from "../../store";
import { showMessage } from "../../store/slices/MessageSlices";
const msgType = "liquid-type";
const cpath = (action) => {
  return `/category/${msgType}/${action}`;
};
///---validate
const validateClearGetin = () => {
  throw new Error();
};

///--process
export const load = async (params) => {
  const { voyagekey, imextype, isLF } = params;

  const formData = {
    voyagekey: voyagekey,
    cntrclass: imextype,
    isLF: isLF,
  };
  const data = await poster(cpath("get-liquid-type"), formData);
  console.log("data", data);
  return data;
};

export const save = async (rows = [], dispatch) => {
  if (rows.length === 0) {
    dispatch(
      showMessage({
        type: "error",
        content: "Vui lòng chọn tàu!",
      })
    );
    return;
  }
};

export const del = async (rows = []) => {
  const idRefs = rows.map((p) => p.IDRef);
  const formData = {
    IDRefs: idRefs,
  };
  const data = await poster(cpath("del-getin"), formData);
  return data;
};

// socket.on("sock_to_client", (data) => {
//   socketReceiveReponse(
//     data,
//     data.response_func === "29" || data.response_func === "27",
//     () => load(store.getState().filterForm)
//   );
// });
