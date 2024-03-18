import * as React from "react";
import Table from "../../global_component/dataTable/customTable.js";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import { Card, Col, Divider, Radio, Row, Typography } from "antd";
import {
  LoadButton,
  buttonTypes,
  renderEventButtons,
} from "../../global_component/EventButtons/index.jsx";
import { load, sendmsg, clear } from "../../apis/message_container/3668.js";

const { Text } = Typography;

export default function Msg3668Container() {
  const dataTable = [
    {
      chon: "select",
      tentau: "HAC",
      imo: "120",
      sovandon: "SIK20123112",
      sodinhdanh: "",
      socontainer: "GMDU0981345",
      ngaygetin: "12/03/2024",
      abc: "",
      chuyentau: "012W",
      nhapxuat: "NHAP",
    },
  ];
  const style = {
    borderColor: "#ffb13d",
    color: "#ffb13d",
    marginBottom: "2px",
  };
  const columns = [
    { columnId: "select", width: 150 },
    { columnId: "tentau", width: 150 },
    { columnId: "imo", width: 150 },
    { columnId: "sovandon", width: 150 },
    { columnId: "sodinhdanh", width: 150 },
    { columnId: "socontainer", width: 150 },
    { columnId: "ngaygetin", width: 150 },
    { columnId: "abc", width: 150 },
    { columnId: "chuyentau", width: 150 },
    { columnId: "nhapxuat", width: 150 },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "Chọn" },
      { type: "header", text: "Tên Tàu" },
      { type: "header", text: "Số IMO" },
      { type: "header", text: "Số Vận Đơn" },
      { type: "header", text: "Số Định Danh" },
      { type: "header", text: "Số Container" },
      { type: "header", text: "Ngày Getin" },
      { type: "header", text: "ABC" },
      { type: "header", text: "Chuyến Tàu" },
      { type: "header", text: "Nhập/Xuất" },
    ],
  };

  return (
    <Row gutter={[8, 8]} style={{ marginTop: "8px" }}>
      <Col span={7}>
        <Card
          title="366.8 - GỬI GETIN CONTAINER"
          style={{ borderRadius: "0px" }}
          className="b-card"
        >
          <Row>
            <Col span={24}>
              <VesselSelect />
            </Col>
            <Divider style={style}> Lọc dữ liệu </Divider>
            <Col span={24}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Text strong={true}>Hướng</Text>
                </Col>
                <Col span={24}>
                  <Radio.Group>
                    <Radio value={1}>Tất cả</Radio>
                    <Radio value={2}>Nhập</Radio>
                    <Radio value={3}>Xuất</Radio>
                    <Radio value={4}>Nội địa</Radio>
                  </Radio.Group>
                </Col>
                <Divider
                  style={{
                    marginTop: "1px",
                    marginBottom: "1px",
                    borderColor: "#d1cccc",
                  }}
                />
                <Col span={24}>
                  <Text strong={true}>Hàng Nội / Ngoại</Text>
                </Col>
                <Col span={24}>
                  <Radio.Group>
                    <Radio value={1}>Tất cả</Radio>
                    <Radio value={2}>Hàng ngoại</Radio>
                    <Radio value={3}>Hàng nội</Radio>
                  </Radio.Group>
                </Col>
                <Divider
                  style={{
                    marginTop: "1px",
                    marginBottom: "1px",
                    borderColor: "#d1cccc",
                  }}
                />
                <Col span={24}>
                  <Text strong={true}>Hàng / Rỗng</Text>
                </Col>
                <Col span={24}>
                  <Radio.Group>
                    <Radio value={"A"}>Tất cả</Radio>
                    <Radio value={"F"}>Hàng</Radio>
                    <Radio value={"E"}>Rỗng</Radio>
                  </Radio.Group>
                </Col>
                <Divider
                  style={{
                    marginTop: "1px",
                    marginBottom: "1px",
                    borderColor: "#d1cccc",
                  }}
                />
                <Col span={24}>
                  <Text strong={true}>Trạng thái thông điệp</Text>
                </Col>
                <Col span={24}>
                  <Radio.Group>
                    <Radio value={"all"}>Tất cả</Radio>
                    <Radio value={"s"}>Thành công</Radio>
                    <Radio value={"c"}>Thất bại</Radio>
                    <Radio value={"n"}>Chưa gửi</Radio>
                  </Radio.Group>
                </Col>
                <Divider
                  style={{
                    marginTop: "1px",
                    marginBottom: "1px",
                    borderColor: "#d1cccc",
                  }}
                />
                <Col span={24}>
                  <Text strong={true}>Trạng thái container ra khỏi cảng</Text>
                </Col>
                <Col span={24}>
                  <Radio.Group>
                    <Radio value={"all"}>Tất cả</Radio>
                    <Radio value={"s"}>Chưa ra </Radio>
                    <Radio value={"c"}>Đã ra </Radio>
                  </Radio.Group>
                </Col>
                <Col style={{ margin: "auto" }}></Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={17}>
        <Card
          style={{ borderRadius: "0px", height: "100%" }}
          className="b-card"
        >
          <Table
            config={{
              columns: columns,
              header: header,
              dataSource: dataTable,
              footer: true,
            }}
          />
        </Card>
      </Col>
    </Row>
  );
}
