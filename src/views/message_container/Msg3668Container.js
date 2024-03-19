import { Card, Col, Divider, Radio, Row, Typography } from "antd";
import * as React from "react";
import { ProviderMessage3668Context } from "../../contexts/Message3668Container.js";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import Table from "../../global_component/dataTable/customTable.js";
import {
  buttonTypes,
  renderEventButtons,
} from "../../global_component/EventButtons/index.jsx";
import { load } from "../../apis/message_container/3668.js";

const { Text } = Typography;

export default function Msg3668Container() {
  const [dataTable, setDataTable] = React.useState([]);

  const style = {
    borderColor: "#ffb13d",
    color: "#ffb13d",
    marginBottom: "2px",
  };

  const columns = [
    { columnId: "Select", width: 100 },
    { columnId: "JobStatus", width: 180 },
    { columnId: "StatusOfGood", width: 100 },
    { columnId: "BillOfLading", width: 100 },
    { columnId: "cargoCtrlNo", width: 100 },
    { columnId: "container", width: 150 },
    { columnId: "GetIn", width: 200 },
    { columnId: "TransportIdentity", width: 150 },
    { columnId: "NumberOfJourney", width: 150 },
    { columnId: "ArrivalDeparture", width: 200 },
    { columnId: "ImExType", width: 150 },
    { columnId: "StatusOfGood", width: 150 },
    { columnId: "jobModeIn", width: 150 },
    { columnId: "cargoWeight", width: 150 },
    { columnId: "SealNo", width: 150 },
    { columnId: "CommodityDescription", width: 150 },
    { columnId: "ContainerLocation", width: 150 },
    { columnId: "content", width: 150 },
    { columnId: "AcceptanceNo", width: 150 },
    { columnId: "AcceptanceTime", width: 220 },
    { columnId: "ResponseText", width: 180 },
    { columnId: "MsgRef", width: 300 },
  ];

  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "Chọn" },
      { type: "header", text: "Hành Động" },
      { type: "header", text: "Trạng Thái" },
      { type: "header", text: "Số Vận Đơn" },
      { type: "header", text: "Số Định Danh" },
      { type: "header", text: "Số Container" },
      { type: "header", text: "Ngày Getin" },
      { type: "header", text: "Tên Tàu" },
      { type: "header", text: "Chuyến Tàu" },
      { type: "header", text: "Ngày tàu đến" },
      { type: "header", text: "Nhập/Xuất" },
      { type: "header", text: "Full/Empty" },
      { type: "header", text: "Phương Án Vào" },
      { type: "header", text: "Trọng Lượng" },
      { type: "header", text: "Số Chì" },
      { type: "header", text: "Mô Tả HH" },
      { type: "header", text: "Vị Trí Count" },
      { type: "header", text: "Ghi Chú" },
      { type: "header", text: "Số Tiếp Nhận" },
      { type: "header", text: "Ngày Tiếp Nhận" },
      { type: "header", text: "Nội Dung Phản Hồi" },
      { type: "header", text: "Khóa Tham Chiếu" },
    ],
  };

  const handleLoadData = async () => {
    const dataMsg3668 = [];
    try {
      const resultDataMsg3668 = await load({
        fromdate: "2023/03/13 00:00:00",
        todate: "2024/03/01 00:00:00",
        cntrnos: "",
      });
      if (resultDataMsg3668) {
        console.log(resultDataMsg3668);
        resultDataMsg3668.data.forEach((item) => {
          const {
            SuccessMarker,
            ErrorMarker,
            JobStatus,
            BillOfLading,
            CargoCtrlNo,
            CntrNo,
            GetIn,
            TransportIdentity,
            NumberOfJourney,
            ArrivalDeparture,
            ImExType,
            StatusOfGood,
            JobModeIn,
            CargoWeight,
            SealNo,
            CommodityDescription,
            ContainerLocation,
            Content,
            AcceptanceNo,
            AcceptanceTime,
            ResponseText,
            MsgRef,
          } = item;
          let msgLog, imextype, fe;
          imextype =
            ImExType === 1 ? "Nhập" : ImExType === 2 ? "Xuất" : "Nội Địa";
          if (SuccessMarker) {
            msgLog = "Thành công";
          } else if (ErrorMarker) {
            msgLog = "Thất bại";
          } else msgLog = "Chưa gửi";
          fe = StatusOfGood === 1 ? "Full" : "Empty";

          dataMsg3668.push({
            Select: "select",
            JobStatus: JobStatus ?? "",
            msgLog,
            BillOfLading,
            CargoCtrlNo,
            CntrNo,
            GetIn,
            TransportIdentity,
            NumberOfJourney,
            ArrivalDeparture,
            ImExType: imextype,
            StatusOfGood: fe,
            JobModeIn,
            CargoWeight: `${CargoWeight}`,
            SealNo,
            CommodityDescription,
            ContainerLocation,
            Content: Content ?? "",
            AcceptanceNo: AcceptanceNo ?? "",
            AcceptanceTime: AcceptanceTime ?? "",
            ResponseText: ResponseText ?? "",
            MsgRef: MsgRef ?? "",
          });
        });
        setDataTable(dataMsg3668);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ProviderMessage3668Context>
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
                      <Text strong={true}>
                        Trạng thái container ra khỏi cảng
                      </Text>
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
              {renderEventButtons([
                {
                  type: buttonTypes.Load,
                  action: handleLoadData,
                },
              ])}
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
      </ProviderMessage3668Context>
    </>
  );
}
