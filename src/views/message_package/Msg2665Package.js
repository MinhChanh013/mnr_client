/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Flex, Form, Row } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  cancelSending,
  load,
  searchVessels,
  send,
} from "../../apis/message_package/2665.js";
import { FORMAT_DATETIME } from "../../constants/index.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { updateForm } from "../../store/slices/FilterFormSlices.js";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import { showMessage } from "../../store/slices/MessageSlices.js";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import SearchBox from "../../global_component/SearchBox/index.jsx";

export default function Msg2665Package() {
  const [dataTable, setDataTable] = React.useState([]);
  const onFocus = () => {};
  const gridRef = React.createRef();
  const vesselSelectRef = React.useRef();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [dataViewsels, setDataViewsels] = React.useState([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    async function fetchDataVessels() {
      try {
        const res = await searchVessels("");
        if (res) {
          setDataViewsels(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataVessels();
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
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "ImExType",
      name: "Nhập/Xuất",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CntrNo",
      name: "Ngày GetIn Cũ",
      width: 150,
      type: columnTypes.DatePicker,
    },
    {
      key: "NewGetIn",
      name: "Ngày GetIn Mới",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "OldTransportIdentity",
      name: "Tên Tàu Cũ",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "NewTransportIdentity",
      name: "Tên Tàu Mới",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "OldNumberOfJourney",
      name: "Chuyến Tàu Cũ",
      width: 200,
      type: columnTypes.TextEditor,
    },
    {
      key: "NewNumberOfJourney",
      name: "Chuyến Tàu Mới",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "OldArrivalDeparture",
      name: "Ngày Tàu Đến/Đi Cũ",
      width: 300,
      type: columnTypes.DatePicker,
    },
    {
      key: "NewArrivalDeparture",
      name: "Ngày Tàu Đến/Đi Mới",
      width: 300,
      type: columnTypes.DatePicker,
    },
    {
      key: "Content",
      name: "Ghi Chú",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "AcceptanceNo",
      name: "Số Tiếp Nhận",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "AcceptanceTime",
      name: "Ngày Tiếp Nhận",
      width: 300,
      type: columnTypes.DatePicker,
    },
    {
      key: "ResponseText",
      name: "Nội Dung Phản Hồi",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      width: 300,
      type: columnTypes.TextEditor,
    },
  ]);

  const buttonConfirm = async (props) => {
    const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
    const dataFormFilter = form.getFieldsValue();
    let fromdate, todate;
    if (dataFormFilter.dateFromTo) {
      fromdate = dayjs(dataFormFilter.dateFromTo[0]).format(FORMAT_DATETIME);
      todate = dayjs(dataFormFilter.dateFromTo[1]).format(FORMAT_DATETIME);
    }
    delete dataFormFilter.dateFromTo;
    const formData = {
      ...dataFormFilter,
      fromdate,
      todate,
      voyagekey: dataVesselSelect ? dataVesselSelect.VoyageKey : "",
    };
    switch (props.type) {
      case "load":
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
          dispatch(updateForm(formData));
          await send(listMsgRowSelect, dispatch);
        } catch (error) {
          console.log(error);
        }
        break;
      case "cancel":
        dispatch(updateForm(formData));
        await cancelSending();
        break;
      case "export_excel":
        gridRef.current?.exportExcel();
        break;
      default:
        break;
    }
  };

  const handleLoadData = async (formData) => {
    try {
      dispatch(setLoading(true));
      const resultDataMsg2665 = await load(formData);
      if (resultDataMsg2665) {
        const newResultDataMsg2665 = resultDataMsg2665.data.map((item) => {
          return {
            ...item,
            ID: uuidv4(),
          };
        });
        setRows(newResultDataMsg2665);
        setDataTable(newResultDataMsg2665);
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

  return (
    <>
      <Row
        gutter={[8, 8]}
        style={{ marginTop: "8px", marginLeft: "4px", marginRight: "4px" }}
      >
        <Col span={6}>
          <Card
            title={"[2665] \r\n HIỆU CHỈNH THÔNG TIN GETIN CHO HÀNG KIỆN"}
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <Row className="b-row" gutter={[16, 16]}>
              <Col span={24}>
                <VesselSelect ref={vesselSelectRef} data={dataViewsels} />
              </Col>
              <Col span={24}>
                <Filter
                  form={form}
                  items={[
                    {
                      type: filterType.radio,
                      label: "Hướng",
                      config: {
                        name: "imextype",
                        defaultValue: "1",
                        options: [
                          {
                            label: "Nhập khẩu",
                            value: "1",
                          },
                          {
                            label: "Xuất khẩu",
                            value: "2",
                          },
                        ],
                      },
                    },
                    {
                      type: filterType.rangePicker,
                      label: "Khoảng thời gian",
                      config: {
                        name: "dateFromTo",
                        placeholder: ["Từ", "Đến"],
                        value: "",
                      },
                    },
                  ]}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={18}>
          <Card className="main-card">
            <Flex className="main-card-toolbar" justify="space-between">
              <ToolBar
                buttonConfig={[
                  toolBarButtonTypes.load,
                  toolBarButtonTypes.send,
                  toolBarButtonTypes.cancel,
                  toolBarButtonTypes.exportexcel,
                ]}
                handleConfirm={buttonConfirm}
              />
              <SearchBox
                style={{ width: "24%" }}
                data={dataTable}
                onChange={setRows}
              ></SearchBox>
            </Flex>
            <DataGrid
              ref={gridRef}
              direction="ltr"
              columnKeySelected="ID"
              selection={selectionTypes.multi}
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
