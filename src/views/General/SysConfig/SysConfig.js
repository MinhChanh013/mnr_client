import { Flex, Col, Row, message, Button, Menu, Form, Divider } from "antd";
import * as React from "react";
import Setting from "./Setting";
import CertificateNo from "./CertificateNo";
import EmailConfig from "./EmailConfig";

import classNames from "classnames/bind";
import "../../../assets/css/General/SysConfig.scss";

const SysConfig = () => {
  const [form] = Form.useForm();
  const [currentItem, setCurrentItem] = React.useState(1);
  const handleClick = ({ key }) => {
    message.info(`Click on item ${key}`);
    setCurrentItem(key);
  };
  const onClick = () => {
  };
  const ComponentCurrent = (props) => {
    const Component = props.component;
    return <Component name={props.name} />;
  };
  const items = [
    {
      key: "1",
      name: "Setting",
      label: "Cấu hình hệ thống",
      layout: Setting,
    },
    {
      key: "2",
      name: "CertificateNo",
      label: "Chứng thư số",
      layout: CertificateNo,
    },
    {
      label: "Thư điện tử",
      name: "EmailConfig",
      key: "3",
      layout: EmailConfig,
    },
  ];
  return (
    <Flex justify="center" style={{ backgroundColor: "#e8e8e8" }}>
      <Row
        align="top"
        style={{ marginTop: "80px", width: "45vw", minWidth: "700px" }}
      >
        <Col
          span={8}
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <Flex justify="flex-end" style={{ padding: "8px" }}>
            <Button type="primary" ghost style={{ marginRight: "6px" }}>
              SAVE
            </Button>
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
          <Divider style={{ margin: "5px" }} />
          <Menu
            onClick={handleClick}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            className="SysConfig-menu"
          />
        </Col>
        <Col span={16}>
          <Form form={form}>
            <Form.Item name={items[currentItem - 1].name}>
              <ComponentCurrent
                component={items[currentItem - 1].layout}
                name={items[currentItem - 1].name}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Flex>
  );
};

export default SysConfig;
