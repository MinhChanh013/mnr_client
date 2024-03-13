import React from "react";
import { SendOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Flex, Input, Row, Typography } from "antd";
import Table from "../../global_component/dataTable/customTable";

const Msg252 = () => {
  const dataTable = [
    {
      ten_tau: "",
      ngay_tau_den_di: "",
      so_chuyen: "",
      so_van_don: "",
      so_dinh_danh: "",
      so_container: "",
      so_chi: "",
      full_empty: "",
      khoa_tham_chieu: "",
    },
  ];
  const columns = [
    { columnId: "ten_tau" },
    { columnId: "ngay_tau_den_di" },
    { columnId: "so_chuyen" },
    { columnId: "so_van_don" },
    { columnId: "so_dinh_danh" },
    { columnId: "so_container" },
    { columnId: "so_chi" },
    { columnId: "full_empty" },
    { columnId: "khoa_tham_chieu" },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "Tên tàu" },
      { type: "header", text: "Ngày tàu đến/đi" },
      { type: "header", text: "Số Chuyến" },
      { type: "header", text: "Số Vận Đơn" },
      { type: "header", text: "Số Định Danh" },
      { type: "header", text: "Số Container" },
      { type: "header", text: "Số Chì" },
      { type: "header", text: "Full/Empty" },
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
                    <Typography>Số Tờ Khai VCDL</Typography>
                    <Input />
                  </label>

                  <label>
                    <Typography>Mã HQ mở TK</Typography>
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

export default Msg252;
