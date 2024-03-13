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
  Row,
  Select,
  Typography,
  Tabs,
} from "antd";
import Table from "../../global_component/dataTable/customTable";

const { RangePicker } = DatePicker;

const items = [
  {
    key: "noi_dung_da_goi_truy_van",
    label: "Nội dung đã gởi truy vấn",
    children: <Table />,
  },
  {
    key: "thong_tin_nhan_ve",
    label: "Thông tin nhận về",
    children: <Table />,
  },
];

const MsgHistory = () => {
  const dataTable = [
    {
      so_tham_chieu: "",
      ma_thong_diep: "",
      chuc_nang_gui: "",
      chuc_nang_nhan: "",
      so_tiep_nhan: "",
      thoi_gian_tiep_nhan: "",
      nguoi_goi: "",
      noi_dung_goi: "",
      noi_dung_nhan: "",
    },
  ];
  const columns = [
    { columnId: "so_tham_chieu" },
    { columnId: "ma_thong_diep" },
    { columnId: "chuc_nang_gui" },
    { columnId: "chuc_nang_nhan" },
    { columnId: "so_tiep_nhan" },
    { columnId: "thoi_gian_tiep_nhan" },
    { columnId: "nguoi_goi" },
    { columnId: "noi_dung_goi" },
    { columnId: "noi_dung_nhan" },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "Số Tham Chiếu" },
      { type: "header", text: "Mã Thông Điệp" },
      { type: "header", text: "Chức Năng Gởi" },
      { type: "header", text: "Chức Năng Nhận" },
      { type: "header", text: "Số Tiếp Nhận" },
      { type: "header", text: "Thời Gian Tiếp Nhận" },
      { type: "header", text: "Người gởi" },
      { type: "header", text: "Nội Dung Gởi" },
      { type: "header", text: "Nội Dung Nhận" },
    ],
  };

  return (
    <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
      <Col span={6}>
        <Card title="TRUY VẤN THÔNG ĐIỆP">
          <Flex
            style={{
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Col>
              <Button
                type="primary"
                icon={<CloudDownloadOutlined />}
                style={{ backgroundColor: "#50a81d" }}
              >
                Nạp dữ liệu
              </Button>

              <Divider />

              <Flex
                style={{
                  flexDirection: "column",
                }}
              >
                <Flex
                  style={{
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <Divider
                    style={{
                      borderColor: "#ffb13d",
                      color: "#ffb13d",
                      marginBottom: "2px",
                    }}
                  >
                    Lọc Theo
                  </Divider>
                  <label>
                    <Typography>Ngày</Typography>
                    <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
                  </label>
                  <label>
                    <Typography>Mã thông điệp</Typography>
                    <Input placeholder="Nhập Mã thông điệp ..." />
                  </label>
                  <label>
                    <Typography>Người gởi</Typography>
                    <Input placeholder="Nhập Người gởi ..." />
                  </label>
                  <label>
                    <Typography>Message REF (?)</Typography>
                    <Input placeholder="Nhập Message REF (?) ..." />
                  </label>
                  <label>
                    <Typography>Số tờ khai</Typography>
                    <Input placeholder="Nhập Số tờ khai ..." />
                  </label>

                  <Button>Tìm</Button>
                  <Divider
                    style={{
                      borderColor: "#ffb13d",
                      color: "#ffb13d",
                      marginBottom: "2px",
                    }}
                  >
                    Truy vấn trên HTHQ
                  </Divider>

                  <label>
                    <Typography>Người gởi</Typography>
                    <Select
                      style={{
                        width: "100%",
                      }}
                      options={[
                        { value: 366, label: "366 - Getin cont" },
                        { value: 365, label: "365 - Getout cont" },
                        { value: 465, label: "465 - Getout cont không TK" },
                        { value: 266, label: "266 - Getin kiện" },
                        { value: 321, label: "321 - Getout kiện" },
                        { value: 341, label: "341 - Getout kiện không TK" },
                        { value: 266, label: "266 - Getin rời" },
                        { value: 421, label: "421 - Getout rời" },
                        { value: 441, label: "441 - Getout rời không TK" },
                      ]}
                      placeholder="Chọn Loại thông điệp ..."
                    />
                  </label>
                  <label>
                    <Typography>Ngày</Typography>
                    <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
                  </label>

                  <Button>Gởi truy vấn</Button>
                </Flex>
              </Flex>
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
                  <div>
                    <Typography>Tìm:</Typography>
                    <Input />
                  </div>
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
              <Tabs defaultActiveKey="1" items={items} />
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

export default MsgHistory;
