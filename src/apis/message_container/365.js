import { poster } from "../../services/BaseService";
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
  validateLoad(GroupID);

  let arrCont = cntrnos
    .split(/[\t\r\n\s,]+/g)
    .filter((v, i, s) => s.indexOf(v) === i && v);

  if (arrCont.length > 10) {
    arrCont = arrCont.slice(0, 10);
  }

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

export const clearGetin = async (rows = []) => {
  const idRefs = rows.map((p) => p.IDRef);
  if (idRefs.length === 0) {
    return;
  }

  const formData = {
    IDRefs: idRefs,
  };

  const data = await poster(cpath("del-getin"), formData);
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
