import { Form, Select } from "antd";

export default function SelectFilter({
  options = [],
  name = "",
  value,
  defaultValue,
}) {
  const formInstance = Form.useFormInstance();

  return (
    <Select
      name={name}
      defaultValue={defaultValue}
      value={value}
      onChange={(value) => formInstance.setFieldValue(name, value)}
      options={options}
    />
  );
}
