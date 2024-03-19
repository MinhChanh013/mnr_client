import { poster } from "../../services/BaseService";
const msgType = "cont";
const msgId = "363";
const cpath = (action) => {
  return `/msg/${msgType}/${msgId}/${action}`;
};

///---validate
const validateSend = (rows) => {
  if(rows.length === 0) return
};

///--process
export const load = async (params) => {
  const {
    voyagekey,
    cntrnos,
    imextype,
    isReleaseTos,
    fromdate,
    todate,
    marker,
    getout,
  } = params;
  let arrCont = cntrnos
    .split(/[\t\r\n\s,]+/g)
    .filter((v, i, s) => s.indexOf(v) === i && v);

  if (arrCont.length > 10) {
    arrCont = arrCont.slice(0, 10);
  }

  const formData = {
    voyagekey,
    imextype,
    isReleaseTos,
    fromdate,
    todate,
    marker,
    getout,
  };

  const data = await poster(cpath("view"), formData);
  return data;
};

export const send = async (rows = []) => {
  validateSend(rows);

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