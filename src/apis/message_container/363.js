import { socket, socketReceiveReponse } from "../../socket";
import { poster } from "../../services/BaseService";
import { message } from "antd";
import store from "../../store";
const msgType = "cont";
const msgId = "363";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///---validate
const validateSend = (rows) => {
  if (rows.length === 0) return;
};

///--process
export const load = async (params) => {
  const {
    voyagekey,
    cntrnos,
    imextype,
    isReleaseTos,
    fromdate,
    todate,
    marker,
    getout,
  } = params;
  // let arrCont = cntrnos
  //   .split(/[\t\r\n\s,]+/g)
  //   .filter((v, i, s) => s.indexOf(v) === i && v);

  // if (arrCont.length > 10) {
  //   arrCont = arrCont.slice(0, 10);
  // }

  const formData = {
    voyagekey,
    imextype,
    isReleaseTos,
    fromdate,
    todate,
    marker,
    getout,
  };

  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (rows = []) => {
  validateSend(rows);

  const formData = rows;

  const data = await poster(cpath("send"), formData);
  return data;
};

export const cancelSending = async () => {
  const formData = { msgId: msgId };

  try {
    const data = await poster(cpath("cancel-sending"), formData);
    if (data.deny) {
      message.warning(data.deny);
      return;
    }
    if (!data.success) {
      message.warning("Không hủy được");
      return;
    }
    message.success("Đã hủy!");
    load(store.getState().filterForm);
  } catch (error) {
    console.log(error);
  }
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
    msgId,
    data.response_func === "32" || data.response_func === "27",
    load({
      fromdate: "2023/03/13 00:00:00",
      todate: "2024/03/01 00:00:00",
    })
  );
});
