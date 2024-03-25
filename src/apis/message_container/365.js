import { socket, socketReceiveReponse } from "../../socket";
import { poster } from "../../services/BaseService";
import { ev_code } from "../../constants";
const msgType = "cont";
const msgId = "365";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///---validate
const validateLoad = (GroupID) => {
  throw new Error();
};
const validateSend = () => {
  throw new Error();
};

///--process
export const load = async (params) => {
  const {
    GroupID,
    voyagekey,
    cntrnos,
    imextype,
    fromdate,
    todate,
    marker,
    getout,
    fe,
  } = params;

  const formData = {
    voyagekey,
    imextype,
    fromdate,
    todate,
    marker,
    getout,
    fe,
  };

  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (rows = []) => {
  validateSend();

  const formData = {
    datas: rows,
  };

  const data = await poster(cpath("send"), formData);
  return data;
};

export const clearGetin = async (rows = []) => {
  const idRefs = rows.map((p) => p.IDRef);
  if (idRefs.length === 0) {
    return;
  }

  const formData = {
    IDRefs: idRefs,
  };

  const data = await poster(cpath("del-getin"), formData);
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
  if (data.request_type === "365") {
    if (
      data.response_func === "29" ||
      data.response_func === "27" ||
      data.event_code.includes(ev_code)
    ) {
      // append_msglog(data.note_state, "b");

      //get remaining msgcount in storage after each msg completed
      //check
      let remaining = parseInt(localStorage.getItem("queueCount") || 0) - 1;
      if (remaining <= 0) {
        let filter = localStorage.getItem("filter");
        if (filter) {
          load(JSON.parse(filter));
        }

        localStorage.removeItem("queueCount");
      } else {
        localStorage.setItem("queueCount", remaining);
      }
    }
  }
});
