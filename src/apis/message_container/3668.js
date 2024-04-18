/* eslint-disable react-hooks/rules-of-hooks */
import { poster } from "../../services/BaseService";
import { socket, socketReceiveReponse } from "../../socket";
import store from "../../store";
import { showMessage } from "../../store/slices/MessageSlices";
const msgType = "cont";
const msgId = "3668";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///---validate
const validateClearGetin = () => {
  throw new Error();
};

///--process
export const load = async (params) => {
  const {
    voyagekey,
    cntrnos,
    imextype,
    isLF,
    fromdate,
    todate,
    marker,
    getout,
    fe,
  } = params;

  let arrCont;
  if (cntrnos) {
    arrCont = cntrnos
      .split(/[\t\r\n\s,]+/g)
      .filter((v, i, s) => s.indexOf(v) === i && v);
    if (arrCont.length > 10) {
      arrCont = arrCont.slice(0, 10);
    }
  }

  const formData = {
    voyagekey: voyagekey,
    cntrNo: arrCont,
    imextype: imextype,
    isLF: isLF,
    fromdate: fromdate,
    todate: todate,
    marker: marker,
    getout: getout,
    fe: fe,
  };

  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (rows = [], dispatch) => {
  if (rows.length === 0) {
    dispatch(
      showMessage({
        type: "error",
        content: "Vui lòng chọn tàu!",
      })
    );
    return;
  }

  const data = await poster(cpath("send"), rows);
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

export const clearGetin = async (rows = []) => {
  const idRefs = rows.map((p) => p.IDRef);

  const formData = {
    IDRefs: idRefs,
  };

  const data = await poster(cpath("del-getin"), formData);
  return data;
};

export const cancelSending = async () => {
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
    msgId,
    data.response_func === "29" || data.response_func === "27",
    () => load(store.getState().filterForm)
  );
});
