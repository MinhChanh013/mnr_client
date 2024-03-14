import React from "react";
import { SendOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Flex, Input, Row, Typography } from "antd";
import Table from "../../global_component/dataTable/customTable";

const Msg214 = () => {
  const dataTable = [
    {
      chon: "",
      ma_tau: "",
      hanh_dong: "",
      trang_thai: "",
      ten_tau: "",
      ho_hieu_tau: "",
      so_imo: "",
      so_chuyen: "",
      ngay_tau_den_di: "",
      so_van_don: "",
      so_dinh_danh: "",
      so_container: "",
      so_niem_chi: "",
      loai_sai_khac: "",
      chi_tiet_sai_khac: "",
      so_tiep_nhan: "",
      ngay_tiep_nhan: "",
      noi_dung_phan_hoi: "",
      khoa_tham_chieu: "",
    },
  ];
  const columns = [
    { columnId: "chon" },
    { columnId: "ma_tau" },
    { columnId: "hanh_dong" },
    { columnId: "trang_thai" },
    { columnId: "ten_tau" },
    { columnId: "ho_hieu_tau" },
    { columnId: "so_imo" },
    { columnId: "so_chuyen" },
    { columnId: "ngay_tau_den_di" },
    { columnId: "so_van_don" },
    { columnId: "so_dinh_danh" },
    { columnId: "so_container" },
    { columnId: "so_niem_chi" },
    { columnId: "loai_sai_khac" },
    { columnId: "chi_tiet_sai_khac" },
    { columnId: "so_tiep_nhan" },
    { columnId: "ngay_tiep_nhan" },
    { columnId: "noi_dung_phan_hoi" },
    { columnId: "khoa_tham_chieu" },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "Chọn" },
      { type: "header", text: "Mã Tàu" },
      { type: "header", text: "Hành Động" },
      { type: "header", text: "Trạng Thái" },
      { type: "header", text: "Tên tàu" },
      { type: "header", text: "Hô Hiệu Tàu" },
      { type: "header", text: "Số IMO" },
      { type: "header", text: "Số Chuyến" },
      { type: "header", text: "Ngày tàu đến/đi" },
      { type: "header", text: "Số Vận Đơn" },
      { type: "header", text: "Số Định Danh" },
      { type: "header", text: "Số Container" },
      { type: "header", text: "Số Niêm Chì" },
      { type: "header", text: "Loại Sai Khác" },
      { type: "header", text: "Chi Tiết Sai Khác" },
      { type: "header", text: "Số Tiếp Nhận" },
      { type: "header", text: "Ngày Tiếp Nhận" },
      { type: "header", text: "Nội dung Phản Hồi" },
      { type: "header", text: "Khóa tham chiếu" },
    ],
  };

  return (
    <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
      <Col span={6}>
        <Card title="214 - DANH SÁCH CONTAINER SAI KHÁC">
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

export default Msg214;
