import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import * as React from "react";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import {
  buttonTypes,
  renderEventButtons,
} from "../../global_component/EventButtons/index.jsx";
import { load, searchVessels } from "../../apis/message_container/3668.js";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import { getFormData } from "../../utils";
import RevoTable from "../../global_component/dataTable/revoTable.js";
import ToolBar, { toolBarButtonTypes } from "../../global_component/ToolbarButton/ToolBar.js";

export default function Msg3665Container() {
  const [dataTable, setDataTable] = useState([]);
  const [vesselData, setVesselData] = useState([]);

  const style = {
    borderColor: "#ffb13d",
    color: "#ffb13d",
    marginBottom: "2px",
  };

  const columns = [
    { prop: "Select", name: "Chọn", size: 80 },
    { prop: "JobStatus", name: "Hành Động" },
    { prop: "StatusOfGood", name: "Trạng Thái", sortable: true, size: 150 },
    { prop: "BillOfLading", name: "Số Vận Đơn", resize: true, size: 150 },
    { prop: "CargoCtrlNo", name: "Số Định Danh" },
    { prop: "CntrNo", name: "Số Container" },
    { prop: "GetIn", name: "Ngày Getin" },
    { prop: "TransportIdentity", name: "Tên Tàu" },
    { prop: "NumberOfJourney", name: "Số Chuyến" },
    { prop: "ArrivalDeparture", name: "Ngày Tàu Đến" },
    { prop: "ImExType", name: "Nhập/Xuất" },
    { prop: "StatusOfGood", name: "Full/Empty" },
    { prop: "JobModeIn", name: "Phương Án Vào" },
    { prop: "CargoWeight", name: "Trọng Lượng" },
    { prop: "SealNo", name: "Số Chì" },
    { prop: "CommodityDescription", name: "Mô Tả HH" },
    { prop: "ContainerLocation", name: "Vị Trí Cont" },
    { prop: "Content", name: "Ghi Chú" },
    { prop: "AcceptanceNo", name: "Số Tiếp Nhận" },
    { prop: "AcceptanceTime", name: "Ngày Tiếp Nhận" },
    { prop: "ResponseText", name: "Nội Dung Phản Hồi" },
    { prop: "MsgRef", name: "Khóa Tham Chiếu" },
  ];

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

  //* CÁCH LẤY DỮ LIỆU TỪ FILTER.
  const filterRef = React.useRef();
  // const handleSelectFilterData = () => {
  //* KHI HÀM NÀY CHẠY THÌ CỰA THEO filterRef ĐỂ LẤY DỮ LIỆU,
  //   console.log({
  //     data: getFormData(filterRef.current),
  //   });
  // };

  const buttonConfirm = (props) => {
    if (props.type === 'load') {

    }

    if (props.type === 'send') {

    }

    if (props.type === 'delete') {

    }

    if (props.type === 'save') {

    }
  }

  return (
    <>
      <Row
        gutter={[8, 8]}
        style={{ marginTop: "8px", marginLeft: "4px", marginRight: "4px" }}
      >
        <Col span={6}>
          {/* *MỞ NÚT NÀY LÊN VÀ CHẠY TEST ĐỂ XEM KẾT QUẢ HIỂN THỊ RA GIAO DIỆN. */}
          {/* <Button onClick={handleSelectFilterData}>Test</Button> */}
          <Card
            title="366.5 - HIỆU CHỈNH CONTAINER GETIN"
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
        <Col span={18}>
          <ToolBar
            buttonConfig={[toolBarButtonTypes.load, toolBarButtonTypes.cancel, toolBarButtonTypes.cancelgetin, toolBarButtonTypes.save, toolBarButtonTypes.delete]}
            handleConfirm={buttonConfirm}
          />
          <Card
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <RevoTable
              config={{
                columns: columns,
                dataSource: dataTable,
                footer: true,
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
