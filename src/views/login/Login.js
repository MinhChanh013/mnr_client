import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import thumb from "../../assets/images/Thumb.png";
import logo from "../../assets/images/logo.png";
import Background from "../../assets/images/Background.png";
import { UserOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Input,
  Button,
  Flex,
  Typography,
  Form,
  Checkbox,
} from "antd";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function Login() {
  const [showPass, setShowPass] = useState(false);
  return (
    <Flex className={cx("Wrapper")} align="center" justify="center">
      <img src={Background} className={cx("Background")}></img>
      <Flex className={cx("Content")} align="center" justify="center">
        {/* <img src={Backgroundlogin} className={cx("Backgroundlogin")}></img> */}
        <div className={cx("Backgroundlogin2")}></div>
        <Row gutter={[140, 8]} justify={"center"} align={"center"}>
          <Col span={12}>
            <Row justify={"center"} align={"center"}>
              <img src={logo} className={cx("Logo")} alt="logo"></img>
            </Row>
            <Row justify={"center"} align={"center"}>
              <img src={thumb} className={cx("Thumb")} alt="thumb"></img>
            </Row>
          </Col>
          <Col span={12}>
            <Flex className={cx("Loginform")}>
              {/*-------------------------logo------------------------------*/}
              <Typography className={cx("Title")}>C.A.S</Typography>
              <Typography className={cx("Desc")}>
                Custom Automatic Systems
              </Typography>
              <Form
                name="basic"
                style={{
                  maxWidth: 600,
                }}
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
                    style={{ paddingLeft: "0" }}
                    placeholder="Tên người dùng"
                    prefix={<UserOutlined className={cx("Icon")} />}
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
                    style={{ paddingRight: "0" }}
                    placeholder="Mật khẩu"
                    iconRender={(visible) =>
                      visible ? (
                        <UnlockOutlined
                          style={{
                            backgroundColor: "#ffd28f",
                            justifyContent: "center",
                            fontSize: "30px",
                            width: "50px",
                            height: "50px",
                            borderRadius: "12px",
                          }}
                        />
                      ) : (
                        <LockOutlined
                          style={{
                            backgroundColor: "#ffd28f",
                            justifyContent: "center",
                            fontSize: "30px",
                            width: "50px",
                            height: "50px",
                            borderRadius: "12px",
                          }}
                        />
                      )
                    }
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Flex align="center" justify="space-between">
                    <Checkbox style={{ fontSize: "1rem" }}>
                      Lưu đăng nhập
                    </Checkbox>
                    <Link style={{ color: "black", fontSize: "1rem" }}>
                      Quên mật khẩu?
                    </Link>
                  </Flex>
                </Form.Item>

                <Form.Item>
                  <Button
                    className={cx("btnLogin")}
                    type="default"
                    htmlType="submit"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
              {/*-----------------------------------------------------------*/}
            </Flex>
          </Col>
        </Row>
      </Flex>
    </Flex>
  );
}

export default Login;
