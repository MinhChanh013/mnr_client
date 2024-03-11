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
} from "antd";
import { UnorderedListOutlined, GlobalOutlined } from "@ant-design/icons";
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
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
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

            <Space size={50} style={{ marginRight: "20px" }}>
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
              <Button
                style={{
                  backgroundColor: "#3367D6",
                  borderColor: "#3367D6",
                  padding: 0,
                }}
                icon={
                  <Avatar alt="user" style={{ color: "white" }}>
                    {" "}
                    user{" "}
                  </Avatar>
                }
              />
            </Space>
          </Space>
        </Card>
        <Drawer
          style={{ backgroundColor: "#3367D6", color: "white" }}
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
      </>
    );
  }
}
export default Header;
