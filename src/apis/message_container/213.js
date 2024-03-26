import { poster } from "../../services/BaseService";
import { socket, socketReceiveReponse } from "../../socket";
import { showMessage } from "../../store/slices/MessageSlices";
const msgType = "cont";
const msgId = "213";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
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

export const send = async (props, dispatch) => {
  const { startDate, finishDate, imextype } = props;
  const formData = {
    startDate,
    finishDate,
    imextype,
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
    if (data.data && data.data.dont_send_again) {
      dispatch(
        showMessage({
          type: "success",
          content: data.data.dont_send_again,
        })
      );
    }

    if (data.data && data.data.xmlComplete.length > 0) {
      console.log(data.xmlComplete);
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

    if (data.result) {
      alert(data.result);
    }
    if (data.msgRef_array) {
      for (let i = 0; i < data.msgRef_array.length; i++) {
        // var cntrNo = data.msgRef_array[i].split(":")[0];
        // var msgRef = data.msgRef_array[i].split(":")[1].toUpperCase();
        // var trarr = $("#contenttable tr");
      }
    }
  }
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
