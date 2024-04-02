import { poster } from "../../services/BaseService";
import { socket } from "../../socket";
import { showMessage } from "../../store/slices/MessageSlices";
const msgType = "common";
const msgId = "211";

const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

export const send = async (params, dispatch) => {

  const {itemType, file} = params;

  const formData = {
    itemType: itemType,
    file: file,
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

