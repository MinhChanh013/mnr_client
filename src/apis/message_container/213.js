import { poster } from "../../services/BaseService";
const msgType = "cont";
const msgId = "213";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///---validate
const validateSend = () => {
  throw new Error();
};

///--process
export const load = async (params) => {
  const { startDate, finishDate, imextype } = params;

  const formData = {
    startDate: startDate,
    finishDate: finishDate,
    imextype: imextype,
  };

  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (props) => {
  validateSend();

  const { startDate, finishDate, imextype } = props;
  const formData = {
    startDate,
    finishDate,
    imextype,
  };

  const data = await poster(cpath("send"), formData);
  return data;
};

export const cancelSending = async (rows = []) => {
  const formData = { msgId: msgId };

  const data = await poster(cpath("send-cancel"), formData);
  return data;
};
