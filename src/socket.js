import { io } from "socket.io-client";
import { ev_code } from "./constants";

const URL = process.env.REACT_APP_SOCKET_URL ?? "http://10.10.11.150:8888";
export const socket = io(URL, {
  autoConnect: false,
});

export const socketReceiveReponse = (
  data,
  type,
  isCheckReponse,
  func = () => {}
) => {
  if (data.request_type === type ?? "") {
    // toastr["success"](data.note_state);
    if (isCheckReponse || data.event_code.includes(ev_code)) {
      func();
      // $("#loadlist").trigger("click");
      // append_msglog(data.note_state, "b");
    }
  }
};
