import { Card, Col, Row } from "antd";
import * as React from "react";

import VesselSelect from "../../global_component/Modal/VesselSelect.js";

import { load, searchVessels } from "../../apis/message_container/3668.js";
import {
  buttonTypes,
  renderEventButtons,
} from "../../global_component/EventButtons/index.jsx";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";

import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
export default function Msg3668Container() {
  const [rows, setRows] = React.useState([]);
  const gridRef = React.createRef();
  const onFocus = () => {};

  /////////////////////////////////////////////////////////////////////
  const [dataViewsels, setDataViewsels] = React.useState([]);
  React.useEffect(() => {
    getvesels();
  }, []);
  const getvesels = async () => {
    try {
      const res = await searchVessels("");
      setDataViewsels(res.data);
    } catch (error) {
      console.log(error);
    }
    console.log(dataViewsels);
  };
  //////////////////////////////////////////////////////////////////////

  const columns = [
    {
      key: "ID",
      name: "ID",
      width: 180,
      editable: false,
      visible: true,
    },
    {
      key: "JobStatus",
      name: "Hành Động",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "StatusMarker",
      name: "Trạng Thái",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoCtrlNo",
      name: "Số Định Danh",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "CntrNo",
      name: "Số Container",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "GetIn",
      name: "Ngày Getin",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "TransportIdentity",
      name: "Tên Tàu",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "NumberOfJourney",
      name: "Chuyến Tàu",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày tàu đến",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "ImExType",
      name: "Nhập/Xuất",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "StatusOfGood",
      name: "Full/Empty",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "JobModeIn",
      name: "Phương Án Vào",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoWeight",
      name: "Trọng Lượng",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "SealNo",
      name: "Số Chì",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả HH",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "ContainerLocation",
      name: "Vị Trí Count",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "Content",
      name: "Ghi Chú",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "AcceptanceNo",
      name: "Số Tiếp Nhận",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "AcceptanceTime",
      name: "Ngày Tiếp Nhận",
      width: 220,
      type: columnTypes.DatePicker,
    },
    {
      key: "ResponseText",
      name: "Nội Dung Phản Hồi",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      width: 300,
      type: columnTypes.TextEditor,
    },
  ];

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
            const keyValue = column.key;
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
        console.log({ dataMsg3668 });
        setRows(dataMsg3668);
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
      <Row gutter={[8, 8]} style={{ marginTop: "8px" }}>
        <Col span={7}>
          {/* *MỞ NÚT NÀY LÊN VÀ CHẠY TEST ĐỂ XEM KẾT QUẢ HIỂN THỊ RA GIAO DIỆN. */}
          {/* <Button onClick={handleSelectFilterData}>Test</Button> */}
          <Card
            styles={{
              title: {
                textAlign: "center",
                color: "#1b618c",
              },
            }}
            title="366.8 - GỬI GETIN CONTAINER"
            style={{ borderRadius: "0px" }}
            className="b-card"
          >
            <Row style={{ padding: "0 8px" }}>
              <Col span={24}>
                <VesselSelect data={dataViewsels} />
              </Col>

              <Filter
                filterRef={filterRef}
                items={[
                  {
                    type: filterType.radio,
                    label: "Hướng",
                    config: {
                      name: "imextype",
                      defaultValue: "",
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
                      defaultValue: "",
                      options: [
                        {
                          label: "Tất cả",
                          value: "",
                        },
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
                      defaultValue: "",
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
                      defaultValue: "",
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
                      defaultValue: "",
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

            <DataGrid
              ref={gridRef}
              direction="ltr"
              columnKeySelected="ID"
              selection={selectionTypes.single}
              columns={columns}
              rows={rows}
              setRows={setRows}
              onFocus={onFocus}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
