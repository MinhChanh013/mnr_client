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
} from "../../apis/message_package/207.js";
import { FORMAT_DATETIME } from "../../constants/index.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { updateForm } from "../../store/slices/FilterFormSlices.js";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import { showMessage } from "../../store/slices/MessageSlices.js";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";
import SearchBox from "../../global_component/SearchBox/index.jsx";

export default function Msg207Package() {
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
      name: "Hướng",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "TransportIdentity",
      name: "Tên Tàu",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "Voyage",
      name: "Số Chuyến",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "BillOfLading",
      name: "Ngày tàu đến/đi",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "CargoCtrlNo",
      name: "Số Vận Đơn",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "AcceptanceNo",
      name: "Số Định Danh",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "AcceptanceTime",
      name: "Lần GetIn (Cuối)",
      width: 200,
      type: columnTypes.TextEditor,
    },
    {
      key: "ResponseText",
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
      name: "Nội dung Phản Hồi",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Khóa tham chiếu",
      width: 300,
      type: columnTypes.TextEditor,
    },
  ]);

  const buttonConfirm = async (props) => {
    const dataFormFilter = form.getFieldsValue();
    const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
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
      const resultDataMsg207 = await load(formData);
      if (resultDataMsg207) {
        const newResultDataMsg207 = resultDataMsg207.data.map((item) => {
          return {
            ...item,
            ID: uuidv4(),
          };
        });
        setRows(newResultDataMsg207);
        setDataTable(newResultDataMsg207);
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
            title={"[207] \r\n [KIỆN] XÁC NHẬN GETIN HẾT HÀNG"}
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <Row className="b-row" gutter={[16, 16]}>
              <Col span={24}>
                <VesselSelect ref={vesselSelectRef} data={dataViewsels} />
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
