import { message } from "antd";
import { poster } from "../../../services/BaseService";

export const cancelSending = async ({ msgId, handleLoad = () => {} }) => {
  const formData = { msgId: msgId };

  try {
    const data = await poster("/msg/package/cancel-sending", formData);
    if (data.deny) {
      message.warning(data.deny);
      return;
    }
    if (!data.success) {
      message.warning("Không hủy được");
      return;
    }
    message.success("Đã hủy!");
    handleLoad();
  } catch (error) {
    console.log(error);
  }
};
