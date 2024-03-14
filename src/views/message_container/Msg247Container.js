import React from "react";
import { SendOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Input,
  Radio,
  Row,
  DatePicker,
  Typography,
} from "antd";
import Table from "../../global_component/dataTable/customTable";

const { RangePicker } = DatePicker;

const Msg247Container = () => {
  const dataTable = [
    {
      chon: "",
      hanh_dong: "",
      trang_thai: "",
      huong_n_x_cu: "",
      huong_n_x_moi: "",
      so_van_don: "",
      so_container: "",
      full_empty: "",
      ngay_getin: "",
      ten_tau: "",
      chuyen_tau: "",
      ngay_tau_den_roi: "",
      ghi_chu: "",
      so_tiep_nhan: "",
      nga_tiep_nhan: "",
      noi_dung_phan_hoi: "",
      khoa_tham_chien: "",
    },
  ];
  const columns = [
    { columnId: "chon" },
    { columnId: "hanh_dong" },
    { columnId: "trang_thai" },
    { columnId: "huong_n_x_cu" },
    { columnId: "huong_n_x_moi" },
    { columnId: "so_van_don" },
    { columnId: "so_container" },
    { columnId: "full_empty" },
    { columnId: "ngay_getin" },
    { columnId: "ten_tau" },
    { columnId: "chuyen_tau" },
    { columnId: "ngay_tau_den_roi" },
    { columnId: "ghi_chu" },
    { columnId: "so_tiep_nhan" },
    { columnId: "nga_tiep_nhan" },
    { columnId: "noi_dung_phan_hoi" },
    { columnId: "khoa_tham_chien" },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "Chọn" },
      { type: "header", text: "Hành Động" },
      { type: "header", text: "Trạng Thái" },
      { type: "header", text: "Hướng N/X Cũ" },
      { type: "header", text: "Hướng N/X Mới" },
      { type: "header", text: "Số Vận Đơn" },
      { type: "header", text: "Số Container" },
      { type: "header", text: "Full/Empty" },
      { type: "header", text: "Ngày Getin" },
      { type: "header", text: "Tên Tàu" },
      { type: "header", text: "Chuyến Tàu" },
      { type: "header", text: "Ngày Tàu Đến/Rời" },
      { type: "header", text: "Ghi Chú" },
      { type: "header", text: "Số Tiếp Nhận" },
      { type: "header", text: "Ngày Tiếp Nhận" },
      { type: "header", text: "Nội dung Phản Hồi" },
      { type: "header", text: "Khóa tham chiếu" },
    ],
  };

  return (
    <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
      <Col span={6}>
        <Card title="247 - GỬI THÔNG TIN THAY ĐỔI LOẠI HÀNG HÓA (CONTAINER)">
          <Flex
            style={{
              flexDirection: "column",
            }}
          >
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
          </Flex>
          <Divider
            style={{
              borderColor: "#ffb13d",
              color: "#ffb13d",
              marginBottom: "2px",
            }}
          >
            Loại Hàng (mới)
          </Divider>
          <Radio.Group>
            <Radio value={0}>Hàng Ngoại</Radio>
            <Radio value={1}>Hàng Nội</Radio>
          </Radio.Group>
          <Divider
            style={{
              borderColor: "#ffb13d",
              color: "#ffb13d",
              marginBottom: "2px",
            }}
          >
            Hướng (mới)
          </Divider>
          <Radio.Group>
            <Radio value={0}>Nhập Khấu</Radio>
            <Radio value={1}>Xuất Khấu</Radio>
          </Radio.Group>
          <Divider
            style={{
              borderColor: "#ffb13d",
              color: "#ffb13d",
              marginBottom: "2px",
            }}
          >
            Gửi thông điệp
          </Divider>
          <Radio.Group>
            <Radio value={1}>Tất cả</Radio>
            <Radio value={2}>Thành công</Radio>
            <Radio value={3}>Thất bại</Radio>
            <Radio value={4}>Chưa gửi</Radio>
          </Radio.Group>
          <Divider
            style={{
              borderColor: "#ffb13d",
              color: "#ffb13d",
              marginBottom: "2px",
            }}
          >
            Trạng thái container
          </Divider>

          <Radio.Group>
            <Radio value={1}>Tất cả</Radio>
            <Radio value={2}>Chưa ra khỏi cảng</Radio>
            <Radio value={3}>Đã ra khỏi cảng</Radio>
          </Radio.Group>
          <Divider
            style={{
              borderColor: "#ffb13d",
              color: "#ffb13d",
              marginBottom: "2px",
            }}
          >
            Lọc Theo Ngày GetIn
          </Divider>

          <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
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

export default Msg247Container;
