import { socket, socketReceiveReponse } from "../../socket";
import { poster } from "../../services/BaseService";
const msgType = "common";
const msgId = "3678";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

export const load = async ({ declareNo = "", declareOffice = "" }) => {
  const data = await poster(cpath("view"), { declareNo, declareOffice });
  return data;
};

export const send = async (rows = []) => {
  const formData = rows;

  const data = await poster(cpath("send"), formData);
  return data;
};

socket.on("sock_to_client", (data) => {
  socketReceiveReponse(
    data,
    msgId,
    data.response_func === "29" || data.response_func === "27"
  );
});
