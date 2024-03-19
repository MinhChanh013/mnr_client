import { poster } from "../../services/BaseService";
const msgType = "cont";
const msgId = "247";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///---validate
const validateSend = () => {
  throw new Error();
};

///--process
export const load = async (params) => {
  const { voyagekey, imextype, isLF, fromdate, todate, marker, getout } =
    params;

  const formData = {
    voyagekey: voyagekey,
    imextype: imextype,
    isLF: isLF,
    fromdate: fromdate,
    todate: todate,
    marker: marker,
    getout: getout,
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

