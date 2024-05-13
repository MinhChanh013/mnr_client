import { Card, Typography, Form, Input, Col } from "antd";
import React from "react";

const CertificateNo = (props) => {
  const formInstance = Form.useFormInstance();
  const onFieldsChange = (e, b) => {
    const result = b.reduce((acc, item) => {
      acc[item.name[0]] = item.value ?? "";
      return acc;
    }, {});
    formInstance.setFieldValue(props.name, result);
  };

  return (
    <Card>
      <Form onFieldsChange={onFieldsChange} autoComplete="off">
        <Col>
          <Typography>Tên nhà cung cấp (Token Provider Name)</Typography>
          <Form.Item
            name="tokenProviderName"
            rules={[
              {
                required: true,
                message: "không thể bỏ trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Typography>Mã Pin (Token Pin Code)</Typography>
          <Form.Item
            name="portTaxCode"
            rules={[
              {
                required: true,
                message: "không thể bỏ trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Typography>Số serial (Token Serial Number)</Typography>
          <Form.Item
            label=""
            name="portName"
            rules={[
              {
                required: true,
                message: "không thể bỏ trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Typography>Ngày hết hạn (Token Expire Date)</Typography>
          <Form.Item
            label=""
            name="customsId"
            rules={[
              {
                required: true,
                message: "không thể bỏ trống!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Form>
    </Card>
  );
};

export default CertificateNo;
