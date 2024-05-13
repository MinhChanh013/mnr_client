import { Flex, Col, Row, Button, Typography, Form, Input } from "antd";
import * as React from "react";
import Setting from "./Setting";
import CertificateNo from "./CertificateNo";
import EmailConfig from "./EmailConfig";
import { get, update } from "../../../apis/general/SysConfig";

import "../../../assets/css/General/SysConfig.scss";

const { Title } = Typography;

const SysConfig = () => {
  const [form] = Form.useForm();
  const formInstance = Form.useFormInstance();
  const [outputs, setOutputs] = React.useState({});
  const [data, setData] = React.useState({});

  const handleSubmit = async (e) => {
    console.log(e);
    const result = await update(e);
    console.log(result);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await get();
        if (res) {
          console.log(res);
          setData(res.data);
          form.setFieldsValue({
            port_id: res.data.port_id,
            port_name: res.data.port_name,
            port_tax_code: res.data.port_tax_code,
            customs_id: res.data.customs_id,
            customs_name: res.data.customs_name,
            token_provider_name: res.data.token_provider_name,
            token_pin_code: res.data.token_pin_code,
            token_serial: res.data.token_serial,
            token_expire_date: res.data.token_expire_date,
            sys_mail_addr: res.data.sys_mail_addr,
            sys_mail_pass: res.data.sys_mail_pass,
            sys_mail_host: res.data.sys_mail_host,
            sys_mail_port: res.data.sys_mail_port,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Flex
      justify="center"
      style={{ width: "100%", height: "100%", marginTop: "30px" }}
    >
      <Form form={form} style={{ width: "40%" }} onFinish={handleSubmit}>
        <Row gutter={[8, 0]}>
          <Col span={24}>
            <Title level={3} style={{ margin: "10px 0px" }}>
              Cấu hình hệ thống
            </Title>
          </Col>
          <Col span={12}>
            <Typography>Mã Doanh Nghiệp Kho/Bãi/Cảng</Typography>
            <Form.Item
              name="port_id"
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
          <Col span={12}>
            <Typography>Mã Số Thuế</Typography>
            <Form.Item
              name="port_tax_code"
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
          <Col span={12}>
            <Typography>Tên Doanh Nghiệp Kho/Bãi/Cảng</Typography>
            <Form.Item
              name="port_name"
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
          <Col span={12}>
            <Typography>Mã Chi Cục HQ Giám Sát</Typography>
            <Form.Item
              name="customs_id"
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
              name="customs_name"
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
            <Title level={3} style={{ margin: "0" }}>
              Chứng thư số
            </Title>
          </Col>
          <Col span={12}>
            <Typography>Tên nhà cung cấp (Token Provider Name)</Typography>
            <Form.Item
              name="token_provider_name"
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
          <Col span={12}>
            <Typography>Mã Pin (Token Pin Code)</Typography>
            <Form.Item
              name="token_pin_code"
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
          <Col span={12}>
            <Typography>Số serial (Token Serial Number)</Typography>
            <Form.Item
              name="token_serial"
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
          <Col span={12}>
            <Typography>Ngày hết hạn (Token Expire Date)</Typography>
            <Form.Item
              name="token_expire_date"
              rules={[
                {
                  required: true,
                  message: "không thể bỏ trống!",
                },
              ]}
            >
              <Input placeholder={"Địa chỉ mail"} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Title level={3} style={{ margin: "0" }}>
              Thư điện tử
            </Title>
          </Col>
          <Col span={12}>
            <Typography>Địa chỉ mail hệ thống</Typography>
            <Form.Item
              name="sys_mail_addr"
              rules={[
                {
                  required: true,
                  message: "không thể bỏ trống!",
                },
              ]}
            >
              <Input placeholder={"Địa chỉ mail"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Typography>Mật khẩu</Typography>
            <Form.Item
              name="sys_mail_pass"
              rules={[
                {
                  required: true,
                  message: "không thể bỏ trống!",
                },
              ]}
            >
              <Input placeholder={"Mật khẩu"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Typography>Máy chủ mail</Typography>
            <Form.Item
              name="sys_mail_host"
              rules={[
                {
                  required: true,
                  message: "không thể bỏ trống!",
                },
              ]}
            >
              <Input placeholder={"Máy chủ mail"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Typography>Cổng (Port)</Typography>
            <Form.Item
              name="sys_mail_port"
              rules={[
                {
                  required: true,
                  message: "không thể bỏ trống!",
                },
              ]}
            >
              <Input placeholder={"Cổng"} />
            </Form.Item>
          </Col>
          <Form.Item>
            <Flex justify="flex-end" style={{ padding: "8px" }}>
              <Form.Item>
                <Button
                  style={{ marginRight: "6px" }}
                  type="primary"
                  htmlType="submit"
                  // onClick={handleSubmit}
                >
                  Save
                </Button>
              </Form.Item>
              <Button
                type="primary"
                ghost
                style={{
                  color: "#f5a442",
                  borderColor: "#f5a442",
                  marginRight: "6px",
                }}
              >
                RELOAD
              </Button>
            </Flex>
          </Form.Item>
        </Row>
      </Form>
    </Flex>
  );
};

export default SysConfig;
