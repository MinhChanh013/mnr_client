import { DatePicker, Form, Row, Col } from "antd";
import { useState } from "react";
export default function RangePickerFilter({ name = "", placeholder = "" }) {
  const formInstance = Form.useFormInstance();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const checkState = () => {
    return fromDate === "" || toDate === ""
      ? ""
      : fromDate > toDate
      ? "error"
      : "";
  };
  const style = {
    borderBottom: "1px solid",
    borderRadius: "0px",
  };
  return (
    <Row align={"middle"} justify={"space-between"}>
      <Col span={10}>
        <DatePicker
          name="fromDate"
          style={style}
          variant="borderless"
          placeholder={placeholder[0]}
          onChange={(e, date) => {
            setFromDate(date);
            formInstance.setFieldValue(name, {
              fromDate: date,
              toDate: toDate,
            });
          }}
          status={checkState()}
          showTime
          format={{
            format: "YYYY-MM-DD HH:mm:ss",
            type: "mask",
          }}
        />
      </Col>
      <Col span={10}>
        <DatePicker
          name="toDate"
          style={style}
          placeholder={placeholder[1]}
          onChange={(e, date) => {
            setToDate(date);
            formInstance.setFieldValue(name, {
              fromDate: fromDate,
              toDate: date,
            });
          }}
          variant="borderless"
          status={checkState()}
          showTime
          format={{
            format: "YYYY-MM-DD HH:mm:ss",
            type: "mask",
          }}
        />
      </Col>
    </Row>
  );
}
