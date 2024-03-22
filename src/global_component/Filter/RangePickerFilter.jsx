import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

export default function RangePickerFilter({ name = "", placeholder = "" }) {
  return (
    <RangePicker
      style={{ width: "100%" }}
      name={name}
      placeholder={placeholder}
    />
  );
}
