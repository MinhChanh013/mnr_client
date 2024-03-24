import { poster } from "../../services/BaseService";
import { socket, socketReceiveReponse } from "../../socket";
const msgType = "cont";
const msgId = "213";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///---validate
const validateSend = () => {
  throw new Error();
};

///--process
export const load = async (params) => {
  const { startDate, finishDate, imextype } = params;

  const formData = {
    startDate: startDate,
    finishDate: finishDate,
    imextype: imextype,
  };

  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (props) => {
  validateSend();

  const { startDate, finishDate, imextype } = props;
  const formData = {
    startDate,
    finishDate,
    imextype,
  };

  const data = await poster(cpath("send"), formData);
  return data;
};

export const cancelSending = async (rows = []) => {
  const formData = { msgId: msgId };

  const data = await poster(cpath("send-cancel"), formData);
  return data;
};

socket.on("sock_to_client", (data) => {
  socketReceiveReponse(
    data,
    msgId,
    data.response_func === "32" || data.response_func === "27",
    load({
      fromdate: "2023/03/13 00:00:00",
      todate: "2024/03/01 00:00:00",
    })
  );
});
