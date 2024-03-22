import { DatePicker, Form } from "antd";

const { RangePicker } = DatePicker;

export default function RangePickerFilter({ name = "", placeholder = "" }) {
  const formInstance = Form.useFormInstance();
  return (
    <RangePicker
      style={{ width: "100%" }}
      name={name}
      placeholder={placeholder}
      onChange={(dates) => formInstance.setFieldValue(name, dates)}
    />
  );
}
