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

  for (const item of target) {
    inputNames.push(item.name);
  }

  return inputNames.reduce((prevValue, currentValue) => {
    return {
      ...prevValue,
      [currentValue]: formData.get(currentValue),
    };
  }, {});
};

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
            {/* *MỞ NÚT NÀY LÊN VÀ CHẠY TEST ĐỂ XEM KẾT QUẢ HIỂN THỊ RA GIAO DIỆN. */}
            {/* <Button onClick={handleSelectFilterData}>Test</Button> */}
            <Card
              title="366.8 - GỬI GETIN CONTAINER"
              style={{ borderRadius: "0px" }}
              className="b-card"
            >
              <Row style={{ padding: "0 24px" }}>
                <Col span={24}>
                  <VesselSelect />
                </Col>

                <Filter
                  filterRef={filterRef}
                  items={[
                    {
                      type: filterType.radio,
                      label: "Hướng",
                      config: {
                        name: "imextype",
                        options: [
                          {
                            label: "Tất cả",
                            value: "",
                          },
                          {
                            label: "Nhập",
                            value: "1",
                          },
                          {
                            label: "Xuất",
                            value: "2",
                          },
                          {
                            label: "Nội địa",
                            value: "3",
                          },
                        ],
                      },
                    },
                    {
                      type: filterType.radio,
                      label: "Loại hàng",
                      config: {
                        name: "isLF",
                        options: [
                          {
                            label: "Hàng ngoại",
                            value: "1",
                          },
                          {
                            label: "Hàng nội",
                            value: "2",
                          },
                        ],
                      },
                    },
                    {
                      type: filterType.radio,
                      label: "Trạng thái thông điệp",
                      config: {
                        name: "marker",
                        options: [
                          {
                            label: "Tất cả",
                            value: "",
                          },
                          {
                            label: "Thành công",
                            value: "SuccessMarker",
                          },
                          {
                            label: "Thất bại",
                            value: "ErrorMarker",
                          },
                          {
                            label: "Chưa gửi",
                            value: "UnMarker",
                          },
                        ],
                      },
                    },
                    {
                      type: filterType.radio,
                      label: "Trạng thái container ra khỏi cảng",
                      config: {
                        name: "getout",
                        options: [
                          {
                            label: "Tất cả",
                            value: "",
                          },
                          {
                            label: "Chưa ra",
                            value: "1",
                          },
                          {
                            label: "Đã ra",
                            value: "2",
                          },
                        ],
                      },
                    },
                    {
                      type: filterType.radio,
                      label: "Loại hàng",
                      config: {
                        name: "fe",
                        options: [
                          {
                            label: "Tất cả",
                            value: "",
                          },
                          {
                            label: "Full",
                            value: "1",
                          },
                          {
                            label: "Empty",
                            value: "0",
                          },
                        ],
                      },
                    },
                    {
                      type: filterType.rangePicker,
                      label: "Khoản",
                      config: {
                        name: "dateFromTo",
                        placeholder: ["Từ", "Đến"],
                        value: "",
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Cont",
                      config: {
                        name: "cntrNo",
                        placeholder: "",
                        value: "",
                      },
                    },
                  ]}
                />
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
