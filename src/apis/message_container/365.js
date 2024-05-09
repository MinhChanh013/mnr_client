import { socket, socketReceiveReponse } from "../../socket";
import { poster } from "../../services/BaseService";
import { ev_code } from "../../constants";
import { message } from "antd";
import store from "../../store";
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

export const clearGetout = async (rows = []) => {
  if (rows.length === 0) {
    return;
  } else {
    const IDRefs = rows.map((row) => row.MsgRef);
    const formData = {
      IDRefs,
    };
    try {
      const data = await poster(cpath("clear-getin"), formData);
      if (data.error) {
        message.error(data.error);
        return;
      }
      load(store.getState().filterForm);
    } catch (error) {
      console.log(error);
    }
  }
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
