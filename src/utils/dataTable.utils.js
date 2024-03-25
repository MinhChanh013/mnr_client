export const dataConverTable = (resultDataMsgApi, columnsTable) => {
  const dataMsgTable = resultDataMsgApi.data.map((row, index) => {
    return columnsTable.reduce((acc, column) => {
      const keyValue = column.key;
      const rowValue = row[keyValue];
      switch (keyValue) {
        case "ID":
          acc[keyValue] = rowValue ?? index;
          break;
        case "JobStatus":
          acc[keyValue] = row[keyValue] ?? "READY";
          break;
        case "ImExType":
          acc[keyValue] =
            rowValue === 1 ? "Nhập" : rowValue === 2 ? "Xuất" : "Nội Địa";
          break;
        case "StatusMarker":
          if (row["SuccessMarker"]) {
            acc[keyValue] = "Thành công";
          } else if (row["ErrorMarker"]) {
            acc[keyValue] = "Thất bại";
          } else acc[keyValue] = "Chưa gửi";
          break;
        case "StatusOfGood":
          rowValue === 1 ? (acc[keyValue] = "Full") : (acc[keyValue] = "Empty");
          break;
        default:
          acc[keyValue] = !!row[keyValue] ? `${row[keyValue]}` : "";
          break;
      }
      return acc;
    }, {});
  });
  return dataMsgTable;
};
