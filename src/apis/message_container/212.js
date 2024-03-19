import { poster } from "../../services/BaseService";
const msgType = "cont";
const msgId = "212";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///---validate
const validateSend = () => {
  throw new Error();
};

///--process
export const load = async (voyagekey) => {
  const formData = {
    voyagekey: voyagekey,
  };

  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (params) => {
  const { voyagekey, vsslname, callsign, imo, eta } = params;
  validateSend();

  const formData = {
    voyagekey,
    vsslname,
    callsign,
    imo,
    eta,
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
