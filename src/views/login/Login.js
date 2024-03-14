import classNames from "classnames/bind";
import styles from "./Login.module.css";

import thumb from "../../assets/images/Thumb.png";
import logo1 from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";
import Background from "../../assets/images/Background.png";
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
} from "antd";

import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const { Title } = Typography;

function Login() {
  return (
    <Flex className={cx("Wrapper")} align="center" justify="center">
      <img src={Background} className={cx("Background")}></img>

      <Flex className={cx("Content")} align="center" justify="center">
        <Flex className={cx("Backgroundlogin")} align="center" justify="center">
          <Row
            gutter={[140, 8]}
            style={{ width: "100%", height: "100%" }}
            justify={"center"}
            align={"middle"}
          >
            <Col
              span={12}
              style={{
                paddingRight: "0",
                paddingLeft: "60px",
              }}
            >
              <Row
                justify={"center"}
                align={"center"}
                style={{ width: "100%" }}
              >
                <img src={logo2} className={cx("logo2")} alt="logo"></img>
              </Row>
              <Row
                justify={"center"}
                align={"center"}
                style={{ width: "100%" }}
              >
                <img src={thumb} className={cx("Thumb")} alt="thumb"></img>
              </Row>
              <Row
                justify={"center"}
                align={"center"}
                style={{ width: "100%" }}
              >
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={logo1} className={cx("logo")} alt="thumb"></img>
                  <Title level={5} style={{ margin: "0" }}>
                    copyright by Ceh software version 1.2 2023
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col
              span={12}
              style={{
                padding: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Flex className={cx("Loginform")}>
                {/*-------------------------logo------------------------------*/}
                {/* <Typography className={cx('Title')}>C.A.S</Typography> */}
                <img src="./logo.png" className={cx("Mainlogo")}></img>
                <Typography className={cx("Title")}>
                  Custom Automatic Systems
                </Typography>
                <Form
                  name="basic"
                  style={{
                    width: "80%",
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
                      placeholder="Mật khẩu"
                      prefix={<LockOutlined className={cx("Icon")} />}
                      iconRender={(visible) =>
                        visible ? <EyeInvisibleOutlined /> : <EyeOutlined />
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
                      className={cx("btnLogin")}
                      type="default"
                      htmlType="submit"
                      icon={<LoginOutlined></LoginOutlined>}
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
    </Flex>
  );
}

export default Login;
