import { Card, Typography, Form, Input, Col } from "antd";
import React from "react";

const EmailConfig = (props) => {
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
          <Typography>Mã Doanh Nghiệp Kho/Bãi/Cảng</Typography>
          <Form.Item
            name="portId"
            rules={[
              {
                required: true,
                message: "không thể bỏ trống!",
              },
            ]}
          >
            <Input placeholder="Mã Doanh Nghiệp Kho/Bãi/Cảng" />
          </Form.Item>
        </Col>
        <Col>
          <Typography>Mã Số Thuế</Typography>
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
          <Typography>Tên Doanh Nghiệp Kho/Bãi/Cảng</Typography>
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
          <Typography>Mã Chi Cục HQ Giám Sát</Typography>
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
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Typography>Tên Chi Cục HQ Giám Sát</Typography>
          <Form.Item
            label=""
            name="customsName"
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
      </Form>
    </Card>
  );
};

export default EmailConfig;
