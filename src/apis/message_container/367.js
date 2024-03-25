import { ev_code } from "../../constants";
import { poster } from "../../services/BaseService";
import { socket } from "../../socket";
const msgType = "cont";
const msgId = "367";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///---validate
const validateSend = () => {
  throw new Error();
};

///--process
export const load = async (params) => {
  const { declareNo, declareOffice } = params;

  const formData = {
    declareNo: declareNo,
    declareOffice: declareOffice,
  };

  const data = await poster(cpath("view"), formData);
  return data;
};

export const send =  async (params) => {
  const { declareNo, declareOffice } = params;

  const formData = {
    declareNo: declareNo,
    declareOffice: declareOffice,
  };
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

socket.on("sock_to_client", function (data) {
  if (data.request_type === "367.1") {
    // toastr["success"](data.note_state);

    if (
      data.response_func === "32" ||
      data.response_func === "27" ||
      data.event_code.includes(ev_code)
    ) {
      load({
        fromdate: "2023/03/13 00:00:00",
        todate: "2024/03/01 00:00:00",
      });
    }
  }

  //thu phi
  if (data.request_type === "901.100") {
    if (
      data.response_func === "32" ||
      data.response_func === "27" ||
      data.response_func === "31" ||
      data.event_code.includes(ev_code)
    ) {
      load({
        fromdate: "2023/03/13 00:00:00",
        todate: "2024/03/01 00:00:00",
      });
    } else {
      // $("button.btn-info-receipt").text(`[${data.note_state}]`);
    }
  }
});
