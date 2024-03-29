import { DownOutlined } from "@ant-design/icons";
import { Flex, Col, Row, Dropdown, message, Space, Button } from "antd";
import * as React from "react";
const SysConfig = () => {
  const [data, setData] = React.useState("Click me!");
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
    setData(items[key - 1].label);
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  return (
    <Flex style={{ backgroundColor: "white", width: "50%" }}>
      <Row>
        <Col>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
            trigger={["click"]}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                {data}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Col>
      </Row>
    </Flex>
  );
};

export default SysConfig;
