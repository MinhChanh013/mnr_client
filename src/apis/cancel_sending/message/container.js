import { poster } from "../../../services/BaseService";
import store from "../../../store";
import { showMessage } from "../../../store/slices/MessageSlices";

export const cancelSending = async ({ msgId, handleLoad = () => {} }) => {
  const formData = { msgId: msgId };

  try {
    const data = await poster("/msg/cont/cancel-sending", formData);
    if (data.deny) {
      store.dispatch(
        showMessage({
          type: "warning",
          content: data.deny,
        })
      );
      return;
    }
    if (!data.success) {
      store.dispatch(
        showMessage({
          type: "warning",
          content: "Không hủy được",
        })
      );
      return;
    }
    store.dispatch(
      showMessage({
        type: "success",
        content: "Đã hủy!",
      })
    );
    handleLoad();
  } catch (error) {
    console.log(error);
  }
};
