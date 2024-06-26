import { poster } from "../../services/BaseService";
import { socket, socketReceiveReponse } from "../../socket";
import store from "../../store";
import { showMessage } from "../../store/slices/MessageSlices";
const msgType = "package";
const msgId = "367";

const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///--process
export const load = async (formData) => {
  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (params, dispatch) => {
  const { declareNo, declareOffice, allow_send_again } = params;

  if (!declareNo || !declareOffice) {
    dispatch(
      showMessage({
        type: "error",
        content: "Chọn một chuyến tàu để gởi thông điệp!",
      })
    );
    return;
  }

  const formData = {
    declareNo,
    declareOffice,
    allow_send_again,
  };

  const data = await poster(cpath("send"), formData);
  if (data) {
    if (data.deny) {
      dispatch(
        showMessage({
          type: "error",
          content: data.deny,
        })
      );
      return;
    }
    if (data.data && data.data.xmlComplete.length > 0) {
      dispatch(
        showMessage({
          type: "success",
          content: "Thông điệp đã được đưa vào hàng đợi!",
        })
      );
      socket.emit("mess_to_sock", "click");
    }

    if (data.msgGroupId) {
      dispatch(
        showMessage({
          type: "success",
          content: "Thông điệp đã được đưa vào hàng đợi!",
        })
      );
      socket.emit("mess_to_sock", data.msgGroupId);
    }
  }
  return data;
};

export const cancelSending = async (rows = []) => {
  const formData = { msgId: msgId };

  const data = await poster(cpath("cancel-sending"), formData);
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
    "367",
    data.response_func === "32" || data.response_func === "27",
    () => load(store.getState().filterForm)
  );
});
