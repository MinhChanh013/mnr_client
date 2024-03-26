import { socket, socketReceiveReponse } from "../../socket";
import { poster } from "../../services/BaseService";
const msgType = "cont";
const msgId = "csht214";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///---validate

///--process
export const load = async (params) => {
  const {  voyagekey, imextype, isLF, marker, getout, fe } = params;
  // validateLoad(GroupID);

  const formData = {
    voyagekey,
    imextype,
    isLF,
    marker,
    getout,
    fe,
  };

  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (rows = []) => {

  const formData = rows;

  const data = await poster(cpath("send"), formData);
  return data;
};

export const cancelSending = async (rows = []) => {
  const formData = { msgId: msgId };

  const data = await poster(cpath("send-cancel"), formData);
  return data;
};

export const searchVessels = async ({ vesselName }) => {
  const formData = {
    vslname: vesselName,
  };

  const data = await poster(cpath("view-vessel"), formData);
  return data;
};

socket.on("sock_to_client", (data) => {
  socketReceiveReponse(
    data,
    "214[CSHT]",
    data.response_func === "29" || data.response_func === "27",
    load({
      fromdate: "2023/03/13 00:00:00",
      todate: "2024/03/01 00:00:00",
    })
  );
});
