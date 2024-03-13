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
  Typography,
} from "antd";
import Table from "../../global_component/dataTable/customTable";

const { RangePicker } = DatePicker;

const Msg901 = () => {
  const dataTable = [
    {
      stt: "",
      mau_hoa_don: "",
      ky_hieu: "",
      so_hoa_don: "",
      so_bien_lai: "",
      ngay_bien_lai: "",
      trang_thai: "",
      tong_tien: "",
      duoc_lay_hang: "",
      ma_doan_nghiep: "",
      ten_doanh_nghiep: "",
      dia_chi: "",
      ma_so_thue: "",
      nguoi_nop_phi: "",
      so_dien_thoai: "",
      email: "",
      so_to_khai: "",
      ngay_to_khai: "",
      ma_loai_hinh_tk: "",
      ma_loai_hinh_hh: "",
      ma_phuong_tien_vc: "",
      ma_dia_dien_luu_kho: "",
      chi_tiet_phi: "",
      danh_sach_tk: "",
      dien_giai_chi_tiet: "",
      khoa_tham_chieu: "",
    },
  ];
  const columns = [
    { columnId: "stt" },
    { columnId: "mau_hoa_don" },
    { columnId: "ky_hieu" },
    { columnId: "so_hoa_don" },
    { columnId: "so_bien_lai" },
    { columnId: "ngay_bien_lai" },
    { columnId: "trang_thai" },
    { columnId: "tong_tien" },
    { columnId: "duoc_lay_hang" },
    { columnId: "ma_doan_nghiep" },
    { columnId: "ten_doanh_nghiep" },
    { columnId: "dia_chi" },
    { columnId: "ma_so_thue" },
    { columnId: "nguoi_nop_phi" },
    { columnId: "so_dien_thoai" },
    { columnId: "email" },
    { columnId: "so_to_khai" },
    { columnId: "ngay_to_khai" },
    { columnId: "ma_loai_hinh_tk" },
    { columnId: "ma_loai_hinh_hh" },
    { columnId: "ma_phuong_tien_vc" },
    { columnId: "ma_dia_dien_luu_kho" },
    { columnId: "chi_tiet_phi" },
    { columnId: "danh_sach_tk" },
    { columnId: "dien_giai_chi_tiet" },
    { columnId: "khoa_tham_chieu" },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "STT" },
      { type: "header", text: "Mẫu hóa đơn" },
      { type: "header", text: "Ký hiệu" },
      { type: "header", text: "Số hóa đơn" },
      { type: "header", text: "Số biên lai" },
      { type: "header", text: "Ngày biên lai" },
      { type: "header", text: "Trạng thái" },
      { type: "header", text: "Tổng tiền" },
      { type: "header", text: "Được lấy hàng" },
      { type: "header", text: "Mã doanh nghiệp" },
      { type: "header", text: "Tên doanh nghiệp" },
      { type: "header", text: "Địa chỉ" },
      { type: "header", text: "Mã số thuế" },
      { type: "header", text: "Người nộp phí" },
      { type: "header", text: "Số điện thoại" },
      { type: "header", text: "Email" },
      { type: "header", text: "Số tờ khai" },
      { type: "header", text: "Ngày tờ khai" },
      { type: "header", text: "Mã loại hình TK" },
      { type: "header", text: "Mã loại hình HH" },
      { type: "header", text: "Mã phương tiệng VC" },
      { type: "header", text: "Mã địa điểm lưu kho" },
      { type: "header", text: "Chi tiết phí" },
      { type: "header", text: "Danh sách TK" },
      { type: "header", text: "Diễn giải chi tiết" },
      { type: "header", text: "Khóa tham chiếu" },
    ],
  };

  return (
    <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
      <Col span={6}>
        <Card title="901 - THÔNG TIN BIÊN LAI THU PHÍ">
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
                    Tìm kiếm / Tra cứu
                  </Divider>
                  <label>
                    <Typography>Số biên lai</Typography>
                    <Input placeholder="Nhập Số biên lai ..." />
                  </label>
                  <label>
                    <Typography>Số tờ khai</Typography>
                    <Input placeholder="Nhập Số tờ khai ..." />
                  </label>
                  <label>
                    <Typography>Số vận đơn</Typography>
                    <Input placeholder="Nhập Số vận đơn ..." />
                  </label>
                  <label>
                    <Typography>Số container</Typography>
                    <Input placeholder="Nhập Số container ..." />
                  </label>
                  <Divider
                    style={{
                      borderColor: "#ffb13d",
                      color: "#ffb13d",
                      marginBottom: "2px",
                    }}
                  >
                    Loại hàng
                  </Divider>
                  <Radio.Group>
                    <Radio value={0}>Hàng container</Radio>
                    <Radio value={1}>Hàng kiện</Radio>
                    <Radio value={3}>Hàng rời</Radio>
                  </Radio.Group>
                  <Divider
                    style={{
                      borderColor: "#ffb13d",
                      color: "#ffb13d",
                      marginBottom: "2px",
                    }}
                  >
                    Lọc Theo Ngày Biên Lai
                  </Divider>

                  <RangePicker placeholder={["Từ ngày", "Đến ngày"]} />
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

export default Msg901;
