import { socket, socketReceiveReponse } from "../../socket";
import { poster } from "../../services/BaseService";
const msgType = "common";
const msgId = "253";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///--process
export const load = async (params) => {
  const { imextype, fromdate, todate,  } = params;

  const formData = {
    imextype,
    fromdate,
    todate,
  };

  const data = await poster(cpath("view"), formData);
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
    data.response_func === "29" || data.response_func === "27",
    load({
      fromdate: "2023/03/13 00:00:00",
      todate: "2024/03/01 00:00:00",
    })
  );
});
