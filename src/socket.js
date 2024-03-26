import { io } from "socket.io-client";
import { ev_code } from "./constants";
import store from "./store";
import { showMessage } from "./store/slices/MessageSlices";

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
    store.dispatch(
      showMessage({
        type: "success",
        content: data.note_state,
      })
    );
    if (isCheckReponse || data.event_code.includes(ev_code)) {
      func();
      // $("#loadlist").trigger("click");
      // append_msglog(data.note_state, "b");
    }
  }
};

export const reConnect = () => {
  setInterval(() => {
    let isDisconnect = 0;
    if (!socket.connected) {
      //  handle notification disconnected socket
      isDisconnect = 1;
    }

    if (isDisconnect === 1 && socket.connected) {
      //  handle notification connected socket
      isDisconnect = 0;
      var userInfo = {
        // 'userID': $('span#user_name').text().trim(),
        // 'grpID': $('span#loginGrpID').text().trim()
      };
      socket.emit("nguoidung", userInfo);
    }
  }, 2000);
};
