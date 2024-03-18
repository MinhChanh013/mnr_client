import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import React from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { loginApi } from "../../apis/Login";

import logo1 from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Input,
  Button,
  Flex,
  Typography,
  Form,
  Checkbox,
  Card,
  message,
} from "antd";

const cx = classNames.bind(styles);
const { Title } = Typography;

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Đăng nhập thành công",
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Email || !Password) {
    } else {
      let res = await loginApi({
        username: Email,
        password: Password,
      });
      if (res && res.access_token) {
        localStorage.setItem("token", res.access_token);
        success();
        navigate("/");
      } else if (res && res.status === 400) {
        error(res.message);
      }
    }
  };
  return (
    <>
      {contextHolder}
      <Flex className={cx("Wrapper")} align="center" justify="center">
        <Flex className={cx("Content")} align="center" justify="center">
          <Card className={cx("Loginform")}>
            <Row gutter={[4, 40]} justify={"center"} align={"middle"}>
              <img src={logo2} className={cx("logo2")} alt="logo"></img>
              <Col>
                <Title level={5} style={{ color: "#2D328D", margin: "0px" }}>
                  Công ty cổ phần càng Sài Gòn
                </Title>
                <Title level={5} style={{ color: "#2D328D", margin: "0px" }}>
                  Chi nhánh Tân Thuận
                </Title>
              </Col>
              <Col span={24} className={cx("Col")}>
                <Row>
                  <Col span={24} className={cx("Col")}>
                    <Flex vertical align="center">
                      <img
                        src="./logo.png"
                        className={cx("Mainlogo")}
                        alt="logo"
                      ></img>
                      <Typography className={cx("Title")}>
                        Custom Automatic Systems
                      </Typography>
                    </Flex>
                  </Col>
                  <Col span={24} className={cx("Col")}>
                    <Flex style={{ width: "80%" }}>
                      <Form
                        style={{ width: "100%" }}
                        wrapperCol={{ span: 24 }}
                        name="basic"
                        initialValues={{
                          remember: true,
                        }}
                        autoComplete="off"
                      >
                        <Form.Item
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input
                            className={cx("ipInfor")}
                            placeholder="Tên người dùng"
                            value={Email}
                            prefix={<UserOutlined className={cx("Icon")} />}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                          ]}
                        >
                          <Input.Password
                            className={cx("ipInfor")}
                            placeholder="Mật khẩu"
                            prefix={<LockOutlined className={cx("Icon")} />}
                            iconRender={(visible) =>
                              visible ? (
                                <EyeInvisibleOutlined />
                              ) : (
                                <EyeOutlined />
                              )
                            }
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                          <Flex align="center" justify="space-between">
                            <Checkbox
                              style={{
                                fontSize: "1rem",
                                color: "#3b4bc2",
                                fontWeight: "bold",
                              }}
                            >
                              Lưu đăng nhập
                            </Checkbox>
                            <Link
                              style={{
                                color: "#3b4bc2",
                                fontSize: "1rem",
                                fontWeight: "bold",
                              }}
                            >
                              Quên mật khẩu?
                            </Link>
                          </Flex>
                        </Form.Item>

                        <Form.Item>
                          <Button
                            className={cx("btnLogin")}
                            type="default"
                            htmlType="submit"
                            icon={<LoginOutlined />}
                            onClick={handleSubmit}
                          >
                            Đăng nhập
                          </Button>
                        </Form.Item>
                      </Form>
                    </Flex>
                  </Col>
                </Row>
              </Col>
              <Col span={24} className={cx("Col")}>
                <img src={logo1} className={cx("logo")} alt="thumb"></img>
                <Title
                  level={5}
                  style={{ margin: "0", paddingLeft: "10px", color: "#2C86FF" }}
                >
                  copyright by Ceh software version 1.2 2023
                </Title>
              </Col>
            </Row>
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
