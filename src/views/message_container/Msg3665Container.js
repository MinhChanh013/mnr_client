/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useDispatch } from "react-redux";
import {
  load,
  searchVessels,
  send,
} from "../../apis/message_container/3665.js";
import { FORMAT_DATETIME } from "../../constants/index.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import { showMessage } from "../../store/slices/MessageSlices.js";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";

export default function Msg3665Container() {
  const gridRef = React.createRef();
  const onFocus = () => {};
  const vesselSelectRef = React.useRef();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [dataViewsels, setDataViewsels] = React.useState([]);
  const [form] = Form.useForm();

  React.useEffect(async () => {
    try {
      const res = await searchVessels("");
      if (res) {
        setDataViewsels(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const columns = basicRenderColumns([
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
      width: 180,
      type: columnTypes.TextEditor,
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
      key: "BillOfLading",
      name: "Số Vận Đơn",
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
      key: "StatusOfGood",
      name: "Full/Empty",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "OldGetIn",
      name: "Ngày Getin Cũ",
      width: 180,
      type: columnTypes.DatePicker,
      editable: true,
    },
    {
      key: "NewGetIn",
      name: "Ngày Getin Mới",
      width: 180,
      type: columnTypes.DatePicker,
      editable: true,
    },
    {
      key: "OldTransportIdentity",
      name: "Tên Tàu Cũ",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "NewTransportIdentity",
      name: "Tên Tàu Mới",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "OldNumberOfJourney",
      name: "Chuyến Tàu Cũ",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },

    {
      key: "NewNumberOfJourney",
      name: "Chuyến Tàu Mới",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },

    {
      key: "OldArrivalDeparture",
      name: "Ngày Tàu Đến/Đi Cũ",
      width: 180,
      type: columnTypes.DatePicker,
      editable: true,
    },
    {
      key: "NewArrivalDeparture",
      name: "Ngày Tàu Đến/Đi Mới",
      width: 180,
      type: columnTypes.DatePicker,
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
  ]);

  const handleLoadData = async (formData) => {
    dispatch(setLoading(true));
    try {
      const resultDataMsg3665 = await load(formData);
      if (resultDataMsg3665) {
        setRows(resultDataMsg3665.data ?? []);
        dispatch(
          showMessage({
            content: "Nạp dữ liệu thành công",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };

  const buttonConfirm = async (props) => {
    switch (props.type) {
      case "load":
        const dataFormFilter = form.getFieldsValue();
        const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
        let fromdate, todate;
        if (dataFormFilter.dateFromTo) {
          fromdate = dayjs(dataFormFilter.dateFromTo[0]).format(
            FORMAT_DATETIME
          );
          todate = dayjs(dataFormFilter.dateFromTo[1]).format(FORMAT_DATETIME);
        }

        delete dataFormFilter.dateFromTo;
        const formData = {
          ...dataFormFilter,
          fromdate,
          todate,
          voyagekey: dataVesselSelect ? dataVesselSelect.VoyageKey : "",
        };
        handleLoadData(formData);
        break;
      case "send":
        const idMsgRowData = gridRef.current?.getSelectedRows();
        const listMsgRowSelect = [];
        idMsgRowData.forEach((idMsgSelected) => {
          listMsgRowSelect.push(
            rows[rows.findIndex((item) => item.ID === idMsgSelected)]
          );
        });
        try {
          await send(listMsgRowSelect, dispatch);
        } catch (error) {
          console.log(error);
        }
        break;
      case "cancel":
        // await cancelSending();
        break;
      default:
        break;
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
            title="366.5 - HIỆU CHỈNH THÔNG TIN GETIN CHO CONTAINER HẠ BÃI/VÀO CẢNG"
            style={{ borderRadius: "0px" }}
            className="b-card"
          >
            <Row style={{ padding: "0 24px" }}>
              <Col span={24}>
                <VesselSelect ref={vesselSelectRef} data={dataViewsels} />
              </Col>

              <Filter
                form={form}
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
