import { poster } from "../../services/BaseService";

const validateLoad = (GroupID) => {
  throw new Error();
};

export const load = async (params) => {
  const {
    GroupID,
    voyagekey,
    cntrnos,
    imextype,
    isLF,
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
    voyagekey: voyagekey,
    cntrNo: arrCont,
    imextype: imextype,
    isLF: isLF,
    fromdate: fromdate,
    todate: todate,
    marker: marker,
    getout: getout,
    fe: fe,
  };

  const data = await poster("/msg/cont/3668/view", formData);
  return data;
};

const validateSend = () => {
  throw new Error();
};

export const send = async (rows = []) => {
  validateSend();

  const formData = {
    datas: rows,
  };

  const data = await poster("/msg/cont/3668/send", formData);
  return data;
};

const validateClearGetin = () => {
  throw new Error();
};

export const clearGetin = async (rows = []) => {
  validateClearGetin();

  const idRefs = rows.map((p) => p[25]);
  if (idRefs.length === 0) {
    return;
  }

  const formData = {
    IDRefs: idRefs,
  };

  const data = await poster("/msg/cont/3668/del-getin", formData);
  return data;
};

const validateCancelSending = () => {
  throw new Error();
};

export const cancelSending = async (rows = []) => {
  validateCancelSending();

  const formData = { msgId: "3668" };

  const data = await poster("/msg/cont/3668/send-cancel", formData);
  return data;
};

export const searchVessels = async ({ vesselName }) => {
  const formData = {
    vslname: vesselName,
  };

  const data = await poster("/msg/cont/3668/search", formData);
  return data;
};
