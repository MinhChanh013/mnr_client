import { Card, Col, Form, Row } from "antd";
import * as React from "react";
import { useState } from "react";
import { load } from "../../apis/message_container/3665.js";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import RevoTable from "../../global_component/dataTable/revoTable.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/LoadingSlices.js";

export default function Msg3665Container() {
  const gridRef = React.createRef();
  const onFocus = () => {};
  const vesselSelectRef = React.useRef();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [dataViewsels, setDataViewsels] = React.useState([]);
  const [form] = Form.useForm();

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
      key: "StatusOfGood",
      name: "Trạng Thái",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CargoCtrlNo",
      name: "Số Định Danh",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CntrNo",
      name: "Số Container",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "GetIn",
      name: "Ngày Getin",
      width: 180,
      type: columnTypes.DatePicker,
      editable: true,
    },
    {
      key: "TransportIdentity",
      name: "Tên Tàu",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "NumberOfJourney",
      name: "Số Chuyến",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày Tàu Đến",
      width: 180,
      type: columnTypes.DatePicker,
      editable: true,
    },
    {
      key: "ImExType",
      name: "Nhập/Xuất",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "StatusOfGood",
      name: "Full/Empty",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "JobModeIn",
      name: "Phương Án Vào",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CargoWeight",
      name: "Trọng Lượng",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "SealNo",
      name: "Số Chì",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả HH",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "ContainerLocation",
      name: "Vị Trí Cont",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "Content",
      name: "Ghi Chú",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "AcceptanceNo",
      name: "Số Tiếp Nhận",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "AcceptanceTime",
      name: "Ngày Tiếp Nhận",
      width: 180,
      type: columnTypes.DatePicker,
      editable: true,
    },
    {
      key: "ResponseText",
      name: "Nội Dung Phản Hồi",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
  ];

  const handleLoadData = async () => {
    const dataMsg3665 = [];
    dispatch(setLoading(true));
    try {
      const resultDataMsg3665 = await load({});
      if (resultDataMsg3665) {
        resultDataMsg3665.data.forEach((item) => {
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

          dataMsg3665.push({
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
        setRows(dataMsg3665);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };

  const filterRef = React.useRef();

  const buttonConfirm = (props) => {
    if (props.type === "load") {
      handleLoadData();
    }

    if (props.type === "send") {
    }

    if (props.type === "delete") {
    }

    if (props.type === "save") {
    }
  };

  return (
    <>
      <Row
        gutter={[8, 8]}
        style={{ marginTop: "8px", marginLeft: "4px", marginRight: "4px" }}
      >
        <Col span={6}>
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
        <Col span={17}>
          <Card
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <ToolBar
              buttonConfig={[
                toolBarButtonTypes.load,
                toolBarButtonTypes.send,
                toolBarButtonTypes.cancelgetin,
                toolBarButtonTypes.cancel,
              ]}
              handleConfirm={buttonConfirm}
            />
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
