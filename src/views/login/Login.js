import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import React from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { loginApi } from "../../apis/Login";

import logo1 from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";
import Thumb from "../../assets/images/Thumb.png";
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
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      setIsLoading(true);
      const res = await loginApi({
        username: e.username,
        password: e.password,
      });
      if (res && res.access_token) {
        localStorage.setItem("token", res.access_token);
        success();
        navigate("/");
      } else if (res && res.status === 400) {
        error(res.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}
      <Flex className={cx("Wrapper")} align="center" justify="center">
        <Flex className={cx("Content")} align="center" justify="center">
          <Row justify={"center"} align={"middle"} className={cx("Chilren")}>
            <Col span={12}>
              <Row justify={"center"} align={"middle"}>
                {/* <img src={logo2} className={cx("logo2")} alt="logo"></img>
                <Col>
                  <Title level={5} style={{ color: "#2D328D", margin: "0px" }}>
                    Công ty cổ phần càng Sài Gòn
                  </Title>
                  <Title level={5} style={{ color: "#2D328D", margin: "0px" }}>
                    Chi nhánh Tân Thuận
                  </Title>
                </Col> */}
                <Col span={24} className={cx("Col")}>
                  <img src={logo1} className={cx("logo")} alt="thumb"></img>
                </Col>
                <Col span={24} className={cx("Col")}>
                  <img src={Thumb} style={{ width: "90%" }}></img>
                </Col>
                <Col span={24} className={cx("Col")}>
                  {/* <img src={logo1} className={cx("logo")} alt="thumb"></img> */}
                  <Title
                    level={5}
                    style={{
                      margin: "0",
                      paddingLeft: "10px",
                      color: "#3b4bc2",
                    }}
                  >
                    copyright by Ceh software version 1.2 2023
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col span={12} className={cx("Col")}>
              <Card className={cx("Loginform")}>
                <Row gutter={[4, 30]} justify={"center"} align={"middle"}>
                  <Col span={24} className={cx("Col")}>
                    <Flex vertical align="center">
                      <img
                        src="./logo.png"
                        className={cx("Mainlogo")}
                        alt="logo"
                      ></img>
                    </Flex>
                  </Col>
                  <Col span={24} className={cx("Col")}>
                    <Flex style={{ width: "90%" }}>
                      <Form
                        style={{ width: "100%" }}
                        wrapperCol={{ span: 24 }}
                        name="basic"
                        initialValues={{
                          remember: false,
                        }}
                        autoComplete="off"
                        onFinish={handleSubmit}
                      >
                        <Form.Item
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên đăng nhập!",
                            },
                          ]}
                        >
                          <Input
                            className={cx("ipInfor")}
                            placeholder="Tên người dùng"
                            prefix={<UserOutlined className={cx("Icon")} />}
                          />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập mật khẩu!",
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
                            disabled={isLoading}
                            className={cx("btnLogin")}
                            type="default"
                            htmlType="submit"
                            icon={<LoginOutlined />}
                            // onClick={handleSubmit}
                          >
                            Đăng nhập
                          </Button>
                        </Form.Item>
                      </Form>
                    </Flex>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
