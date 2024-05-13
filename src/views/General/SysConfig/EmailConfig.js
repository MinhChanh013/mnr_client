import { Card, Typography, Form, Input, Col, Row } from "antd";
import React from "react";

const EmailConfig = (props) => {
  const formInstance = Form.useFormInstance();
  const [outputs, setOutputs] = React.useState({});
  return (
    <Card>
      <Row gutter={[8, 24]}>
        <Col span={24}>
          <Typography>Địa chỉ mail hệ thống</Typography>
          <Input
            name={"sysMailAddr"}
            placeholder={"Địa chỉ mail"}
            onChange={(event) => {
              setOutputs({ ...outputs, portId: event.target.value });
              formInstance.setFieldValue(props.name, { ...outputs });
            }}
          />
        </Col>
        <Col span={24}>
          <Typography>Mật khẩu</Typography>
          <Input
            name={"sysMailPass"}
            placeholder={">Mật khẩu"}
            onChange={(event) => {
              setOutputs({ ...outputs, portId: event.target.value });
              formInstance.setFieldValue(props.name, { ...outputs });
            }}
          />
        </Col>
        <Col span={24}>
          <Typography>Máy chủ mail</Typography>
          <Input
            name={"sysMailHost"}
            placeholder={"Máy chủ mail"}
            onChange={(event) => {
              setOutputs({ ...outputs, portId: event.target.value });
              formInstance.setFieldValue(props.name, { ...outputs });
            }}
          />
        </Col>
        <Col span={24}>
          <Typography>Cổng (Port)</Typography>
          <Input
            name={"sysMailPort"}
            placeholder={"Cổng"}
            onChange={(event) => {
              setOutputs({ ...outputs, portId: event.target.value });
              formInstance.setFieldValue(props.name, { ...outputs });
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default EmailConfig;
