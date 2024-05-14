/* eslint-disable react-hooks/exhaustive-deps */
import {
  GlobalOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "@silevis/reactgrid/styles.css";
import {
  Avatar,
  Card,
  Drawer,
  Dropdown,
  Space,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import * as React from "react";
import { useActiveNav } from "../../hooks/useNav";
import Nav from "../Nav/Nav";
import NavMobile from "../Nav/NavMobile";

const onClick = ({ key }) => {
  if (key === "logout") localStorage.clear("token");
};

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
    label: <Link to="/login">đăng suất</Link>,
    key: "logout",
    icon: <LogoutOutlined />,
  },
];

const Header = () => {
  const [activeMenuMobile, setActiveMenuMobile] = React.useState(false);
  const [keySelected, setKeySelected] = React.useState();
  const [defaultOpenKeys, setDefaultOpenKeys] = React.useState();
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      const width = document.body.clientWidth;
      if (width >= 1169) {
        setActiveMenuMobile(false);
      }
    });
  }, []);

  const handleCloseMenuMobile = () => {
    setActiveMenuMobile(false);
  };

  useActiveNav([activeMenuMobile], activeMenuMobile, (navActive) => {
    setKeySelected(navActive);
    setDefaultOpenKeys(navActive.slice(1));
  });

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
                <Space
                  className="b-language"
                  style={{ color: "white", cursor: "pointer" }}
                >
                  <GlobalOutlined />
                  <span className="language__content">Đổi ngôn ngữ</span>
                </Space>
              </Dropdown>
              <Dropdown
                menu={{ items: itemsMenu, onClick }}
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
              <Space>
                <Space className="btn__nav-mobile" style={{ marginTop: "6px" }}>
                  <lord-icon
                    src="https://cdn.lordicon.com/ipnwkgdy.json"
                    colors="outline:#fff,primary:#fff"
                    trigger="loop-on-hover"
                    delay="200"
                    onClick={() => setActiveMenuMobile(!activeMenuMobile)}
                  ></lord-icon>
                </Space>
                <Drawer
                  className="b__nav-mobile"
                  title="Menu"
                  onClose={handleCloseMenuMobile}
                  open={activeMenuMobile}
                >
                  <NavMobile
                    keySelected={keySelected}
                    defaultOpenKeys={defaultOpenKeys}
                    funcClose={handleCloseMenuMobile}
                  />
                </Drawer>
              </Space>
            </Space>
          </Space>
        </Space>
      </Card>
    </>
  );
};
export default Header;
