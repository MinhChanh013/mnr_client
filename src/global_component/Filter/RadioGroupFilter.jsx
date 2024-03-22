import { Radio } from "antd";

export default function RadioGroupFilter({
  options = [],
  name = "",
  defaultValue,
}) {
  return (
    <Radio.Group
      name={name}
      defaultValue={defaultValue}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
      }}
    >
      {options.map(({ value, label }) => (
        <Radio key={value} value={value}>
          {label}
        </Radio>
      ))}
    </Radio.Group>
  );
}
