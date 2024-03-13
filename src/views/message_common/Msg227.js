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
  Space,
  Typography,
} from "antd";
import Table from "../../global_component/dataTable/customTable";

const Msg227 = () => {
  const dataTable = [
    {
      chon: "",
      hanhdong: "",
      trangthai: "",
      so_container: "",
      so_niem_chi: "",
      tentau: "",
      chuyentau: "",
      ngay_tau_den_roi: "",
      mo_ta_hang_hoa: "",
      full_empty: "",
      ngay_thay_doi: "",
      to_khai: "",
      ghi_chu: "",
      so_tiep_nhan: "",
      ngay_tiep_nhan: "",
      noi_dung_phan_hoi: "",
      khoa_tham_chieu: "",
    },
  ];
  const columns = [
    { columnId: "chon" },
    { columnId: "hanhdong" },
    { columnId: "trangthai" },
    { columnId: "so_container" },
    { columnId: "so_niem_chi" },
    { columnId: "tentau" },
    { columnId: "chuyentau" },
    { columnId: "ngay_tau_den_roi" },
    { columnId: "mo_ta_hang_hoa" },
    { columnId: "full_empty" },
    { columnId: "ngay_thay_doi" },
    { columnId: "to_khai" },
    { columnId: "ghi_chu" },
    { columnId: "so_tiep_nhan" },
    { columnId: "ngay_tiep_nhan" },
    { columnId: "noi_dung_phan_hoi" },
    { columnId: "khoa_tham_chieu" },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "Chọn" },
      { type: "header", text: "Hành Động" },
      { type: "header", text: "Trạng thái" },
      { type: "header", text: "Số Container" },
      { type: "header", text: "Số Niêm Chì" },
      { type: "header", text: "Tên Tàu" },
      { type: "header", text: "Chuyến Tàu" },
      { type: "header", text: "Ngày Tàu Đến/Rời" },
      { type: "header", text: "Mô Tả Hàng Hóa" },
      { type: "header", text: "Full/Empty" },
      { type: "header", text: "Ngày Thay Đổi" },
      { type: "header", text: "Tờ Khai" },
      { type: "header", text: "Ghi Chú" },
      { type: "header", text: "Số Tiếp Nhận" },
      { type: "header", text: "Ngày Tiếp Nhận" },
      { type: "header", text: "Nội Dung Phản Hồi" },
      { type: "header", text: "Khóa Tham Chiếu" },
    ],
  };

  return (
    <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
      <Col span={6}>
        <Card title="227 - CONTAINER ĐÓNG HÀNG">
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

              <Typography
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Chọn tàu
              </Typography>

              <Divider />

              <Flex
                style={{
                  flexDirection: "column",
                }}
              >
                <Button>Chọn Chuyến Tàu</Button>
                <Button>Bỏ Chọn</Button>

                <Divider />

                <Flex
                  style={{
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <label>
                    <Typography>Tên Tàu</Typography>
                    <Input />
                  </label>

                  <label>
                    <Typography>Chuyến N/X</Typography>
                    <Input />
                  </label>

                  <label>
                    <Typography>ETA/ETD</Typography>
                    <Input />
                  </label>
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

export default Msg227;
