/* eslint-disable react-hooks/rules-of-hooks */
import { poster } from "../../services/BaseService";
import { socket, socketReceiveReponse } from "../../socket";
import store from "../../store";
import { showMessage } from "../../store/slices/MessageSlices";
const msgType = "package-getin";
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
  const data = await poster(cpath("view"), formData);
  return data;
};

export const loadDetail = async (IDRef) => {
  const formData = {
    IDRef: IDRef,
  };
  const data = await poster(cpath("view-detail"), formData);
  return data;
};

export const save = async (formData = {}) => {
  const result = await poster(cpath("save"), formData);
  return result;
};

export const del = async (formData = {}) => {
  const result = await poster(cpath("delete"), formData);
  return result;
};

export const searchVessels = async ({ vesselName }) => {
  const formData = {
    vslname: vesselName,
  };

  const data = await poster(cpath("view-vessel"), formData);
  return data;
};

export const getJobmode = async () => {
  const result = await poster(cpath("get-jobmode"));
  return result;
};

// socket.on("sock_to_client", (data) => {
//   socketReceiveReponse(
//     data,
//     data.response_func === "29" || data.response_func === "27",
//     () => load(store.getState().filterForm)
//   );
// });
