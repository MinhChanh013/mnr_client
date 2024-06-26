import dayjs from "dayjs";
import MCheckBox from "../global_component/DataGrid/MCheckBox";
import { FORMAT_DATETIME } from "../constants";

export const dataConverTable = ({ column, row, onRowChange }, itemColumn) => {
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
    case "CHK_FE":
    case "StatusOfGood":
      rowValue === 1 ? (dataConvert = "Full") : (dataConvert = "Empty");
      break;
    case "Remark":
      rowValue
        ? (dataConvert = rowValue)
        : row["DiffType"] === 1
        ? (dataConvert = "Không có trong danh sách HQ thông báo")
        : (dataConvert = "Có trong danh sách HQ thông báo nhưng không hạ bải");
      break;
    case "Voyage":
      row["ImExType"] === "1"
        ? (dataConvert = row["InboundVoyage"])
        : (dataConvert = row["OutboundVoyage"]);
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

  const typeColumn = itemColumn.type;
  switch (typeColumn) {
    case "Checkbox":
      dataConvert = MCheckBox({
        name: keyValue,
        defaultChecked: !!row[keyValue],
        value: !!row[keyValue],
        onRowChange: onRowChange,
        onCellChange: itemColumn.onCellChange,
        row: row,
        key: keyValue,
      });
      break;
    case "Password":
      dataConvert = "*".repeat(row[keyValue] ? row[keyValue].length : "");
      break;
    default:
      break;
  }
  return (
    <div
      style={
        row["isError"] && column.required
          ? {
              boxSizing: "border-box",
              height: "41px",
              padding: "0px 8px",
              border: "1px solid red",
            }
          : { boxSizing: "border-box", height: "42px", padding: "0px 8px" }
      }
    >
      {dataConvert}
    </div>
  );
};

export const basicRenderColumns = (columns = []) => {
  return columns.map((itemColumn) => {
    return {
      ...itemColumn,
      render: (itemRender) => dataConverTable(itemRender, itemColumn),
    };
  });
};
