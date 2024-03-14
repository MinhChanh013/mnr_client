import {
  GlobalOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "@silevis/reactgrid/styles.css";
import { Avatar, Card, Dropdown, Space, Typography } from "antd";
import * as React from "react";
import Nav from "../Nav/Nav";

const items = [
  {
    label: "Tiếng Việt",
    key: "vn",
  },
  {
    label: "Tiếng Anh",
    key: "en",
  },
];

const itemsMenu = [
  {
    label: "Logout",
    key: "logout",
    icon: <LogoutOutlined />,
  },
];

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // drawer: false,
    };
  }

  render() {
    return (
      <>
        <Card className="b-header">
          <Space
            style={{
              flexDirection: "column",
              alignItems: "unset",
              width: "100%",
            }}
          >
            <Space className="b__header-container">
              <Space size={50} className="b__header-left">
                <Typography.Link href={window.location.hostname}>
                  <img src="./logo_transt.png" alt="" />
                </Typography.Link>
                <Nav />
              </Space>

              <Space size={50} className="b__header-right">
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  style={{ zIndex: 50 }}
                  arrow={true}
                >
                  <Space style={{ color: "white", cursor: "pointer" }}>
                    <GlobalOutlined />
                    {this.state.lang || "Đổi ngôn ngữ"}
                  </Space>
                </Dropdown>
                <Dropdown
                  menu={{ items: itemsMenu }}
                  trigger={["click"]}
                  style={{ zIndex: 50 }}
                  arrow={true}
                >
                  <Space style={{ color: "white", cursor: "pointer" }}>
                    Administrator
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </Space>
                </Dropdown>
              </Space>
            </Space>
          </Space>
        </Card>
      </>
    );
  }
}
export default Header;
