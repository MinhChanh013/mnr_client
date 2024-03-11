import React from "react";
import { SendOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Input,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import Table from "../../global_component/dataTable/customTable";

const { RangePicker } = DatePicker;

const Msg253 = () => {
  const dataTable = [
    {
      stt: "",
      tentau: "",
      hohieutau: "",
      imo: "",
      ngaytauden: "",
      ngaytauroi: "",
      chuyennhap: "",
      chuyenxuat: "",
      khoathamchieu: "",
    },
  ];
  const columns = [
    { columnId: "stt" },
    { columnId: "tentau" },
    { columnId: "hohieutau" },
    { columnId: "imo" },
    { columnId: "ngaytauden" },
    { columnId: "ngaytauroi" },
    { columnId: "chuyennhap" },
    { columnId: "chuyenxuat" },
    { columnId: "khoathamchieu" },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "STT" },
      { type: "header", text: "Tên Tàu" },
      { type: "header", text: "hô Hiệu Tàu" },
      { type: "header", text: "Số IMO" },
      { type: "header", text: "Ngày Tàu Đến" },
      { type: "header", text: "Ngày Tàu Rời" },
      { type: "header", text: "Chuyến Nhập" },
      { type: "header", text: "Chuyến Xuất" },
      { type: "header", text: "Khóa Tham Chiếu" },
    ],
  };

  return (
    <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
      <Col span={6}>
        <Card title="253 - THÔNG TIN TÀU XUẤT NHẬP CẢNH">
          <Flex
            style={{
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />

            <Radio.Group>
              <Radio value={0}>Nhập cảnh</Radio>
              <Radio value={1}>Xuất cảnh</Radio>
            </Radio.Group>

            <Divider />
            <Col style={{ margin: "auto" }}>
              <Button
                type="primary"
                icon={<CloudDownloadOutlined />}
                style={{ backgroundColor: "#50a81d" }}
              >
                Nạp dữ liệu
              </Button>
            </Col>
          </Flex>
        </Card>
      </Col>
      <Col span={18}>
        <Card
          style={{ borderRadius: "0px", height: "100%" }}
          className="b-card"
        >
          <Row gutter={[8, 8]}>
            <Col span={24} style={{ justifyContent: "space-between" }}>
              <Row
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Col>
                  <Space>
                    <Typography>Tìm:</Typography>
                    <Input />
                  </Space>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    style={{ backgroundColor: "#f5a442" }}
                  >
                    Gửi thông điệp
                  </Button>
                </Col>
              </Row>
            </Col>
            <Divider
              style={{ margin: "5px 0 5px", borderColor: "#dededede " }}
            />
            <Col span={24}>
              <div className="b-table">
                <Table
                  config={{
                    columns,
                    header,
                    dataSource: dataTable,
                  }}
                />
              </div>
            </Col>
            <Divider
              style={{ margin: "5px 0 5px", borderColor: "#dededede" }}
            />
            <Col span={24} style={{ textAlign: "right" }}></Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Msg253;
