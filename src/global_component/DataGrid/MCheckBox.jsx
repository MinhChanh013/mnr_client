import { Checkbox } from "antd";

function MCheckBox({
  name = "",
  defaultChecked = false,
  label = "",
  onGetData,
  onGetEvent,
  onRowChange,
  key,
  row,
  value,
  onCellChange,
}) {
  return (
    <Checkbox
      value={value}
      name={name}
      checked={value}
      defaultChecked={defaultChecked}
      onChange={(event) => {
        onGetData && onGetData(event.target.value);
        onGetEvent && onGetEvent(event);
        onRowChange &&
          key &&
          row &&
          onRowChange(
            { ...row, [key]: event.target.checked ? "1" : "0", isEdit: true },
            true
          );
        onCellChange && onCellChange({ row, key, value: event.target.checked });
      }}
    >
      {label}
    </Checkbox>
  );
}

export default MCheckBox;
