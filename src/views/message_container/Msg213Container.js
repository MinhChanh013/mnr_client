import React from "react";
import { SendOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Input,
  Row,
  Typography,
  DatePicker,
  Radio,
} from "antd";
import Table from "../../global_component/dataTable/customTable";

const { RangePicker } = DatePicker;

const Msg213 = () => {
  const dataTable = [
    {
      id: "",
      stt: "",
      huong: "",
      so_to_khai: "",
      so_van_don: "",
      so_container: "",
      so_niem_chi: "",
      ten_tau: "",
      khoa_tham_chieu: "",
    },
  ];
  const columns = [
    { columnId: "id" },
    { columnId: "stt" },
    { columnId: "huong" },
    { columnId: "so_to_khai" },
    { columnId: "so_van_don" },
    { columnId: "so_container" },
    { columnId: "so_niem_chi" },
    { columnId: "ten_tau" },
    { columnId: "khoa_tham_chieu" },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "ID" },
      { type: "header", text: "STT" },
      { type: "header", text: "Hướng" },
      { type: "header", text: "Số Tờ Khai" },
      { type: "header", text: "Số Vận Đơn" },
      { type: "header", text: "Số Container" },
      { type: "header", text: "Số Niêm Chì" },
      { type: "header", text: "Tên Tàu" },
      { type: "header", text: "Khóa tham chiếu" },
    ],
  };

  return (
    <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
      <Col span={6}>
        <Card title="213 - DANH SÁCH CONTAINER SOI CHIẾU TRƯỚC">
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
                  <label>
                    <Typography>Ngày</Typography>
                    <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
                  </label>

                  <Radio.Group>
                    <Radio value={0}>Nhập Khẩu</Radio>
                    <Radio value={1}>Xuất Khẩu</Radio>
                  </Radio.Group>
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

export default Msg213;
