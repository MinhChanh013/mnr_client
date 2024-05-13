import { Card, Typography, Form, Input, Col, Row, Flex } from "antd";
import React, { useEffect } from "react";

const Setting = (props) => {
  const formInstance = Form.useFormInstance();
  const [outputs, setOutputs] = React.useState({});
  return (
    <Flex style={{ backgroundColor: "#cbdcf7", width: "100%", height: "100%" }}>
      <Row gutter={[8, 24]}>
        <Col span={24}>
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
            <Input placeholder={"Mã Doanh Nghiệp Kho/Bãi/Cảng"} />
          </Form.Item>
        </Col>
        <Col span={24}>
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
            <Input placeholder="Mã Số Thuế" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Typography>Tên Doanh Nghiệp Kho/Bãi/Cảng</Typography>
          <Form.Item
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
        <Col span={24}>
          <Typography>Mã Chi Cục HQ Giám Sát</Typography>
          <Form.Item
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
        <Col span={24}>
          <Typography>Tên Chi Cục HQ Giám Sát</Typography>
          <Form.Item
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
      </Row>
    </Flex>
  );
};

export default Setting;
