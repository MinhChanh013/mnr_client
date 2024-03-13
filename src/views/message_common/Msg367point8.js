import React from "react";
import { SendOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Flex,
  Input,
  Row,
  Typography,
} from "antd";
import Table from "../../global_component/dataTable/customTable";

const { TextArea } = Input;

const Msg367point8 = () => {
  const dataTable = [
    {
      tran_thai: "",
      ma_phan_hoi: "",
      noi_dung_phan_hoi: "",
      so_to_khai: "",
      ma_cc_mo_tk: "",
      trang_thai_tk: "",
      ghi_chu: "",
      so_tiep_nhan: "",
      thoi_gian_tiep_nhan: "",
      khoa_tham_chieu: "",
    },
  ];
  const columns = [
    { columnId: "tran_thai" },
    { columnId: "ma_phan_hoi" },
    { columnId: "noi_dung_phan_hoi" },
    { columnId: "so_to_khai" },
    { columnId: "ma_cc_mo_tk" },
    { columnId: "trang_thai_tk" },
    { columnId: "ghi_chu" },
    { columnId: "so_tiep_nhan" },
    { columnId: "thoi_gian_tiep_nhan" },
    { columnId: "khoa_tham_chieu" },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "Trạng Thái" },
      { type: "header", text: "Mã Phản Hồi" },
      { type: "header", text: "Nội Dung Phản Hồi" },
      { type: "header", text: "Số Tờ Khai" },
      { type: "header", text: "Mã CC Mở TK" },
      { type: "header", text: "Trạng Thái TK" },
      { type: "header", text: "Ghi Chú" },
      { type: "header", text: "Số Tiếp Nhận" },
      { type: "header", text: "Thời gian Tiếp Nhận" },
      { type: "header", text: "Khóa tham chiếu" },
    ],
  };

  return (
    <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
      <Col span={6}>
        <Card title="252 - HÀNG HÓA VÀO KHO QUA TKVC">
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
                    <Typography>QR Code</Typography>
                    <TextArea rows={4} />
                  </label>

                  <label>
                    <Checkbox />
                    <Typography
                      style={{ display: "inline-block", marginLeft: "10px" }}
                    >
                      Tự động gửi truy vấn với QR Code mới
                    </Typography>
                  </label>

                  <label>
                    <Typography>Số Tờ Khai VCDL</Typography>
                    <Input placeholder="Nhập Số Tờ Khai VCDL ..." />
                  </label>

                  <label>
                    <Typography>Mã ĐK HQ</Typography>
                    <Input placeholder="Nhập Mã ĐK HQ ..." />
                  </label>

                  <Button>Tìm</Button>
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

export default Msg367point8;
