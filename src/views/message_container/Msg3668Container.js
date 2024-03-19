import { Card, Col, Divider, Radio, Row, Typography } from "antd";
import * as React from "react";
import { ProviderMessage3668Context } from "../../contexts/Message3668Container.js";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import Table from "../../global_component/dataTable/customTable.jsx";
import {
  buttonTypes,
  renderEventButtons,
} from "../../global_component/EventButtons/index.jsx";

const { Text } = Typography;
const mockDataMsg3668 = [
  {
    IsLocalForeign: "L",
    CHK_FE: true,
    ImExType: 3,
    dtBillOfLading: "NA",
    BillOfLading: "NA",
    CargoCtrlNo: "NA",
    CusMsgRef: null,
    TransportIdentity: "TIGER MAANSHAN",
    cvImVoy: null,
    cvExVoy: null,
    cvETA: null,
    cvETD: null,
    VesselName: "TIGER MAANSHAN",
    dvImVoy: "100N",
    dvExVoy: "100S",
    dvETA: "2023-03-15T01:57:18.000Z",
    dvETD: "2023-03-19T04:04:16.000Z",
    ContSize: 1,
    ContType: 1,
    GetInType: 1,
    ID: "23694",
    VoyageKey: "TGMS20230312110433",
    CntrNo: "TRHU3917991",
    GetIn: "2023-03-13T02:11:04.097Z",
    SealNo: "24283681",
    JobModeIn: "HBAI",
    CommodityDescription: "BAO BÌ",
    ContainerLocation: "B109041",
    Content: null,
    CargoWeight: 15,
    AutoMarker: true,
    SuccessMarker: true,
    ErrorMarker: false,
    CancelMarker: false,
    MsgRef: "D3F4FA19-6ED1-2167-F5FC-ACF94A671865",
    MsgTime: "2023-03-13T02:09:24.000Z",
    ResponseFnc: 29,
    ResponseText: "[jeCargo]-Cap so TN",
    JobStatus: "ACCEPTANCE_RECEIVED",
    AcceptanceNo: "109658417103",
    AcceptanceTime: "2023-03-13T02:09:24.000Z",
    StatusOfGood: true,
    WeightUnitCode: "KGM",
    NumberOfJourney: "100S",
    ArrivalDeparture: "2023-03-19T04:04:16.000Z",
  },
  {
    IsLocalForeign: "L",
    CHK_FE: false,
    ImExType: 3,
    dtBillOfLading: "NA",
    BillOfLading: "NA",
    CargoCtrlNo: "NA",
    CusMsgRef: null,
    TransportIdentity: "NOIDIA",
    cvImVoy: null,
    cvExVoy: null,
    cvETA: null,
    cvETD: null,
    VesselName: "NOIDIA",
    dvImVoy: "9999",
    dvExVoy: "9999",
    dvETA: "2022-12-26T14:21:58.000Z",
    dvETD: "2021-07-24T17:00:00.000Z",
    ContSize: 6,
    ContType: 1,
    GetInType: 1,
    ID: "23691",
    VoyageKey: "STORE",
    CntrNo: "MSDU5898660",
    GetIn: "2023-03-13T01:12:25.890Z",
    SealNo: "NA",
    JobModeIn: "TRAR",
    CommodityDescription: ".",
    ContainerLocation: "B426062",
    Content: null,
    CargoWeight: 3.9,
    AutoMarker: true,
    SuccessMarker: true,
    ErrorMarker: false,
    CancelMarker: false,
    MsgRef: "C4603D10-0911-E26B-929F-16C2A0E3514B",
    MsgTime: "2023-03-13T02:09:42.000Z",
    ResponseFnc: 29,
    ResponseText: "[jeCargo]-Cap so TN",
    JobStatus: "ACCEPTANCE_RECEIVED",
    AcceptanceNo: "109658420703",
    AcceptanceTime: "2023-03-13T02:09:42.000Z",
    StatusOfGood: false,
    WeightUnitCode: "KGM",
    NumberOfJourney: "9999",
    ArrivalDeparture: "2021-07-24T17:00:00.000Z",
  },
  {
    IsLocalForeign: "L",
    CHK_FE: false,
    ImExType: 3,
    dtBillOfLading: "NA",
    BillOfLading: "NA",
    CargoCtrlNo: "NA",
    CusMsgRef: null,
    TransportIdentity: "NOIDIA",
    cvImVoy: null,
    cvExVoy: null,
    cvETA: null,
    cvETD: null,
    VesselName: "NOIDIA",
    dvImVoy: "9999",
    dvExVoy: "9999",
    dvETA: "2022-12-26T14:21:58.000Z",
    dvETD: "2021-07-24T17:00:00.000Z",
    ContSize: 1,
    ContType: 1,
    GetInType: 1,
    ID: "23692",
    VoyageKey: "STORE",
    CntrNo: "HAHU2049131",
    GetIn: "2023-03-13T01:23:47.690Z",
    SealNo: "NA",
    JobModeIn: "TRAR",
    CommodityDescription: ".",
    ContainerLocation: "D103042",
    Content: null,
    CargoWeight: 2,
    AutoMarker: true,
    SuccessMarker: true,
    ErrorMarker: false,
    CancelMarker: false,
    MsgRef: "805F47E6-3606-2B4F-CA0E-084299A0B147",
    MsgTime: "2023-03-13T02:09:50.000Z",
    ResponseFnc: 29,
    ResponseText: "[jeCargo]-Cap so TN",
    JobStatus: "ACCEPTANCE_RECEIVED",
    AcceptanceNo: "109658422803",
    AcceptanceTime: "2023-03-13T02:09:50.000Z",
    StatusOfGood: false,
    WeightUnitCode: "KGM",
    NumberOfJourney: "9999",
    ArrivalDeparture: "2021-07-24T17:00:00.000Z",
  },
  {
    IsLocalForeign: "L",
    CHK_FE: false,
    ImExType: 3,
    dtBillOfLading: "NA",
    BillOfLading: "NA",
    CargoCtrlNo: "NA",
    CusMsgRef: null,
    TransportIdentity: "NOIDIA",
    cvImVoy: null,
    cvExVoy: null,
    cvETA: null,
    cvETD: null,
    VesselName: "NOIDIA",
    dvImVoy: "9999",
    dvExVoy: "9999",
    dvETA: "2022-12-26T14:21:58.000Z",
    dvETD: "2021-07-24T17:00:00.000Z",
    ContSize: 1,
    ContType: 1,
    GetInType: 1,
    ID: "23693",
    VoyageKey: "STORE",
    CntrNo: "TWCU2129811",
    GetIn: "2023-03-13T01:24:54.800Z",
    SealNo: "NA",
    JobModeIn: "TRAR",
    CommodityDescription: ".",
    ContainerLocation: "D101024",
    Content: null,
    CargoWeight: 2,
    AutoMarker: true,
    SuccessMarker: true,
    ErrorMarker: false,
    CancelMarker: false,
    MsgRef: "C02B9A28-329A-0130-A383-29C0731F81B3",
    MsgTime: "2023-03-13T02:09:28.000Z",
    ResponseFnc: 29,
    ResponseText: "[jeCargo]-Cap so TN",
    JobStatus: "ACCEPTANCE_RECEIVED",
    AcceptanceNo: "109658418003",
    AcceptanceTime: "2023-03-13T02:09:28.000Z",
    StatusOfGood: false,
    WeightUnitCode: "KGM",
    NumberOfJourney: "9999",
    ArrivalDeparture: "2021-07-24T17:00:00.000Z",
  },
  {
    IsLocalForeign: "L",
    CHK_FE: true,
    ImExType: 3,
    dtBillOfLading: "NA",
    BillOfLading: "NA",
    CargoCtrlNo: "NA",
    CusMsgRef: null,
    TransportIdentity: "TIGER MAANSHAN",
    cvImVoy: null,
    cvExVoy: null,
    cvETA: null,
    cvETD: null,
    VesselName: "TIGER MAANSHAN",
    dvImVoy: "100N",
    dvExVoy: "100S",
    dvETA: "2023-03-15T01:57:18.000Z",
    dvETD: "2023-03-19T04:04:16.000Z",
    ContSize: 1,
    ContType: 1,
    GetInType: 1,
    ID: "23696",
    VoyageKey: "TGMS20230312110433",
    CntrNo: "CSNU1266309",
    GetIn: "2023-03-13T02:32:13.337Z",
    SealNo: "24283686",
    JobModeIn: "HBAI",
    CommodityDescription: "BAO BÌ",
    ContainerLocation: "B109031",
    Content: null,
    CargoWeight: 15,
    AutoMarker: true,
    SuccessMarker: true,
    ErrorMarker: false,
    CancelMarker: false,
    MsgRef: "0978AC31-2F0A-1CF2-9C74-E09A33F9D59E",
    MsgTime: "2023-03-13T02:53:46.000Z",
    ResponseFnc: 29,
    ResponseText: "[jeCargo]-Cap so TN",
    JobStatus: "ACCEPTANCE_RECEIVED",
    AcceptanceNo: "109659119403",
    AcceptanceTime: "2023-03-13T02:53:46.000Z",
    StatusOfGood: true,
    WeightUnitCode: "KGM",
    NumberOfJourney: "100S",
    ArrivalDeparture: "2023-03-19T04:04:16.000Z",
  },
  {
    IsLocalForeign: "L",
    CHK_FE: true,
    ImExType: 3,
    dtBillOfLading: "NA",
    BillOfLading: "NA",
    CargoCtrlNo: "NA",
    CusMsgRef: null,
    TransportIdentity: "TIGER MAANSHAN",
    cvImVoy: null,
    cvExVoy: null,
    cvETA: null,
    cvETD: null,
    VesselName: "TIGER MAANSHAN",
    dvImVoy: "100N",
    dvExVoy: "100S",
    dvETA: "2023-03-15T01:57:18.000Z",
    dvETD: "2023-03-19T04:04:16.000Z",
    ContSize: 1,
    ContType: 1,
    GetInType: 1,
    ID: "23699",
    VoyageKey: "TGMS20230312110433",
    CntrNo: "TGBU3019427",
    GetIn: "2023-03-13T02:36:38.373Z",
    SealNo: "24283690",
    JobModeIn: "HBAI",
    CommodityDescription: "BAO BÌ",
    ContainerLocation: "B109021",
    Content: null,
    CargoWeight: 15,
    AutoMarker: true,
    SuccessMarker: true,
    ErrorMarker: false,
    CancelMarker: false,
    MsgRef: "045BE158-F437-B65F-E44B-0DB64194F4BA",
    MsgTime: "2023-03-13T02:53:34.000Z",
    ResponseFnc: 29,
    ResponseText: "[jeCargo]-Cap so TN",
    JobStatus: "ACCEPTANCE_RECEIVED",
    AcceptanceNo: "109659116303",
    AcceptanceTime: "2023-03-13T02:53:34.000Z",
    StatusOfGood: true,
    WeightUnitCode: "KGM",
    NumberOfJourney: "100S",
    ArrivalDeparture: "2023-03-19T04:04:16.000Z",
  },
  {
    IsLocalForeign: "L",
    CHK_FE: true,
    ImExType: 3,
    dtBillOfLading: "NA",
    BillOfLading: "NA",
    CargoCtrlNo: "NA",
    CusMsgRef: null,
    TransportIdentity: "TIGER MAANSHAN",
    cvImVoy: null,
    cvExVoy: null,
    cvETA: null,
    cvETD: null,
    VesselName: "TIGER MAANSHAN",
    dvImVoy: "100N",
    dvExVoy: "100S",
    dvETA: "2023-03-15T01:57:18.000Z",
    dvETD: "2023-03-19T04:04:16.000Z",
    ContSize: 1,
    ContType: 1,
    GetInType: 1,
    ID: "23697",
    VoyageKey: "TGMS20230312110433",
    CntrNo: "CSNU1818619",
    GetIn: "2023-03-13T02:32:22.690Z",
    SealNo: "24283688",
    JobModeIn: "HBAI",
    CommodityDescription: "BAO BÌ",
    ContainerLocation: "B109032",
    Content: null,
    CargoWeight: 15,
    AutoMarker: true,
    SuccessMarker: true,
    ErrorMarker: false,
    CancelMarker: false,
    MsgRef: "95191FCD-821B-BC84-8C73-4A43043FE3A1",
    MsgTime: "2023-03-13T02:54:00.000Z",
    ResponseFnc: 29,
    ResponseText: "[jeCargo]-Cap so TN",
    JobStatus: "ACCEPTANCE_RECEIVED",
    AcceptanceNo: "109659123203",
    AcceptanceTime: "2023-03-13T02:54:00.000Z",
    StatusOfGood: true,
    WeightUnitCode: "KGM",
    NumberOfJourney: "100S",
    ArrivalDeparture: "2023-03-19T04:04:16.000Z",
  },
];

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

  const handleLoadData = () => {
    const dataMsg3668 = [];
    mockDataMsg3668.forEach((item) => {
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
      imextype = ImExType === 1 ? "Nhập" : ImExType === 2 ? "Xuất" : "Nội Địa";
      if (SuccessMarker) {
        msgLog = "Thành công";
      } else if (ErrorMarker) {
        msgLog = "Thất bại";
      } else msgLog = "Chưa gửi";
      fe = StatusOfGood === 1 ? "Full" : "Empty";

      dataMsg3668.push({
        Select: "select",
        JobStatus,
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
        AcceptanceNo,
        AcceptanceTime,
        ResponseText,
        MsgRef,
      });
    });

    console.log(dataMsg3668);
    setDataTable(dataMsg3668);
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
