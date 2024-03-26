import dayjs from "dayjs";
import { FORMAT_DATETIME } from "../constants";

export const dataConverTable = ({ column, row }) => {
  const keyValue = column.key;
  const rowValue = row[keyValue];
  let dataConvert;
  switch (keyValue) {
    case "JobStatus":
      dataConvert = row[keyValue] ?? "READY";
      break;
    case "ImExType":
      dataConvert =
        rowValue === 1 ? "Nhập" : rowValue === 2 ? "Xuất" : "Nội Địa";
      break;
    case "StatusMarker":
      if (row["SuccessMarker"]) {
        dataConvert = "Thành công";
      } else if (row["ErrorMarker"]) {
        dataConvert = "Thất bại";
      } else dataConvert = "Chưa gửi";
      break;
    case "StatusOfGood":
      rowValue === 1 ? (dataConvert = "Full") : (dataConvert = "Empty");
      break;
    case "ArrivalDeparture":
    case "IssueDate":
    case "AcceptanceTime":
    case "GetIn":
    case "OldGetIn":
    case "NewGetIn":
    case "OldArrivalDeparture":
    case "NewArrivalDeparture":
      dataConvert = rowValue ? dayjs(rowValue).format(FORMAT_DATETIME) : "";
      break;
    default:
      dataConvert = !!row[keyValue] ? `${row[keyValue]}` : "";
      break;
  }
  return dataConvert;
};

export const basicRenderColumns = (columns = []) => {
  return columns.map((itemColumn) => {
    return {
      ...itemColumn,
      render: (itemRender) => dataConverTable(itemRender),
    };
  });
};
