import * as React from "react";
import "@silevis/reactgrid/styles.css";
import {
  Button,
  Card,
  Dropdown,
  Space,
  Typography,
  Avatar,
  Drawer,
  Breadcrumb,
  ConfigProvider,
} from "antd";
import {
  UnorderedListOutlined,
  GlobalOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  HistoryOutlined,
  MessageOutlined,
  ControlOutlined,
} from "@ant-design/icons";
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

const itemsSetting = [
  {
    label: "Lịch sử đăng nhập",
    key: "history",
    icon: <HistoryOutlined />,
  },
  {
    label: "Quản lý thông điệp",
    key: "manage",
    icon: <MessageOutlined />,
  },
  {
    label: "Cấu hình hệ thống",
    key: "system",
    icon: <ControlOutlined />,
  },
  {
    label: "Cấu hình gửi thông điệp",
    key: "logout",
    icon: <LogoutOutlined />,
  },
];

const classNames = {
  header: { display: "none" },
  body: { height: "8vh" },
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false,
    };
  }

  render() {
    return (
      <>
        <Card
          style={{
            backgroundColor: "#3367D6",
            borderRadius: "0px",
            borderColor: "white",
            zIndex: 40,
          }}
        >
          <Space
            style={{
              flexDirection: "column",
              alignItems: "unset",
              justifyContent: "space-between",
              gap: 12,
              width: "100%",
            }}
          >
            <Space
              style={{
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                height: 0,
              }}
            >
              <Space
                size={50}
                style={{ marginLeft: "15px", alignItems: "center" }}
              >
                <Typography.Link
                  href={window.location.hostname}
                  style={{
                    fontSize: "20px",
                    letterSpacing: "5px",
                    color: "white",
                  }}
                >
                  C.A.S
                </Typography.Link>
                <Nav />
              </Space>

              <Space size={50} style={{ marginRight: "20px", gap: "25px" }}>
                <Button
                  onClick={() => {
                    if (this.state.drawer === true) {
                      this.setState({ drawer: false });
                    } else {
                      this.setState({ drawer: true });
                    }
                  }}
                  style={{
                    backgroundColor: "#3367D6",
                    borderColor: "#3367D6",
                    color: "white",
                    marginTop: "2px",
                  }}
                  icon={<UnorderedListOutlined />}
                />
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
                  menu={{ items: itemsSetting }}
                  trigger={["click"]}
                  style={{ zIndex: 50 }}
                  arrow={true}
                >
                  <Space style={{ color: "white", cursor: "pointer" }}>
                    <SettingOutlined
                      style={{ color: "white", cursor: "pointer" }}
                    />
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
            <Space>
              <ConfigProvider
                theme={{
                  components: {
                    Breadcrumb: {
                      lastItemColor: "#fff",
                      itemColor: "rgb(210 206 206)",
                      separatorColor: "rgb(210 206 206)",
                    },
                  },
                }}
              >
                <Breadcrumb
                  style={{
                    marginLeft: "15px",
                  }}
                  items={[
                    {
                      title: "Home",
                    },
                    {
                      title: "Application Center",
                    },
                    {
                      title: "Application List",
                    },
                    {
                      title: "An Application",
                    },
                  ]}
                />
              </ConfigProvider>
            </Space>
          </Space>
          <Drawer
            style={{
              backgroundColor: "#3367D6",
              color: "white",
              paddingTop: "30px",
            }}
            classNames={classNames}
            zIndex={30}
            placement={"top"}
            closable={true}
            closeIcon={null}
            onClose={() => {
              this.setState({ drawer: false });
            }}
            open={this.state.drawer}
            key={"top"}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </Card>
      </>
    );
  }
}
export default Header;
