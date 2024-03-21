import { Card, Col, Row } from "antd";
import * as React from "react";
import { ProviderMessage3668Context } from "../../contexts/Message3668Container.js";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import Table from "../../global_component/dataTable/customTable.js";
import {
  buttonTypes,
  renderEventButtons,
} from "../../global_component/EventButtons/index.jsx";
import { load } from "../../apis/message_container/3668.js";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import { getFormData } from "../../utils";
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
    { columnId: "StatusMarker", width: 100 },
    { columnId: "BillOfLading", width: 100 },
    { columnId: "CargoCtrlNo", width: 100 },
    { columnId: "CntrNo", width: 150 },
    { columnId: "GetIn", width: 200 },
    { columnId: "TransportIdentity", width: 150 },
    { columnId: "NumberOfJourney", width: 150 },
    { columnId: "ArrivalDeparture", width: 200 },
    { columnId: "ImExType", width: 150 },
    { columnId: "StatusOfGood", width: 150 },
    { columnId: "JobModeIn", width: 150 },
    { columnId: "CargoWeight", width: 150 },
    { columnId: "SealNo", width: 150 },
    { columnId: "CommodityDescription", width: 150 },
    { columnId: "ContainerLocation", width: 150 },
    { columnId: "Content", width: 150 },
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
    try {
      const resultDataMsg3668 = await load({
        fromdate: "2023/03/13 00:00:00",
        todate: "2024/03/01 00:00:00",
      });
      if (resultDataMsg3668) {
        const dataMsg3668 = resultDataMsg3668.data.map((row) => {
          return columns.reduce((acc, column) => {
            // handle logic data
            const keyValue = column.columnId;
            const rowValue = row[keyValue];
            switch (keyValue) {
              case "ImExType":
                acc[keyValue] =
                  rowValue === 1 ? "Nhập" : rowValue === 2 ? "Xuất" : "Nội Địa";
                break;
              case "StatusMarker":
                if (row["SuccessMarker"]) {
                  acc[keyValue] = "Thành công";
                } else if (row["ErrorMarker"]) {
                  acc[keyValue] = "Thất bại";
                } else acc[keyValue] = "Chưa gửi";
                break;
              case "StatusOfGood":
                rowValue === 1
                  ? (acc[keyValue] = "Full")
                  : (acc[keyValue] = "Empty");
                break;
              default:
                keyValue === "Select"
                  ? (acc[keyValue] = "select")
                  : (acc[keyValue] = !!row[keyValue] ? `${row[keyValue]}` : "");
                break;
            }
            return acc;
          }, {});
        });
        setDataTable(dataMsg3668);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* CÁCH LẤY DỮ LIỆU TỪ FILTER.
  const filterRef = React.useRef();
  // const handleSelectFilterData = () => {
  //* KHI HÀM NÀY CHẠY THÌ CỰA THEO filterRef ĐỂ LẤY DỮ LIỆU,
  //   console.log({
  //     data: getFormData(filterRef.current),
  //   });
  // };

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
