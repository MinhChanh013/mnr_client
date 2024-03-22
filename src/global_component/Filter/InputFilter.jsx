import { Input } from "antd";

export default function InputFilter({ name = "", placeholder = "" }) {
  return <Input name={name} placeholder={placeholder} />;
}
