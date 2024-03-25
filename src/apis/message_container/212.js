import { poster } from "../../services/BaseService";
import { socket, socketReceiveReponse } from "../../socket";
import { showMessage } from "../../store/slices/MessageSlices";
const msgType = "cont";
const msgId = "212";

const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///--process
export const load = async (formData) => {
  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (params, dispatch) => {
  const { VoyageKey, VesselName, CallSign, IMO, ETA } = params;

  if (!VoyageKey) {
    dispatch(
      showMessage({
        type: "error",
        content: "Vui lòng chọn tàu!",
      })
    );
    return;
  }

  const formData = {
    voyagekey: VoyageKey,
    vsslname: VesselName,
    callsign: CallSign,
    imo: IMO,
    eta: ETA,
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

socket.on("sock_to_client", (data) => {
  socketReceiveReponse(
    data,
    "212.1",
    data.response_func === "32" || data.response_func === "27",
    load({
      fromdate: "2023/03/13 00:00:00",
      todate: "2024/03/01 00:00:00",
    })
  );
});
