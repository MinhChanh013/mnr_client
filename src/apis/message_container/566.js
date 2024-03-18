import { poster } from "../../services/BaseService";
const msgType = "cont";
const msgId = "3668";
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
  const { voyagekey, isLF, marker, fe } = params;

  const formData = {
    voyagekey,
    isLF,
    fe,
    marker,
  };

  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (rows = [], isLF, voyagekey) => {
  validateSend();

  const formData = {
    datas: rows,
    isLF,
    voyagekey,
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
