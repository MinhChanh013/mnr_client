import { Select } from "antd";

export function renderCellEditSelect({ row, key, options, onRowChange, baseColumn }) {
  return (
    <Select
      style={{
        width: "100%",
        height: "100%",
      }}
      value={row[key]}
      options={options}
      onGetData={(value) => {
        onRowChange({ ...row, [key]: value, isEdit: true }, true);
        baseColumn.onCellChange && baseColumn.onCellChange({ row, key, value })
      }}
      autoFocus
      allowClear={baseColumn.allowClear ?? false}
    />
  );
}
