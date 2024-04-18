/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  load,
  searchVessels,
  send,
} from "../../apis/message_container/3668.js";
import { FORMAT_DATETIME } from "../../constants/index.js";
import DataGrid, {
  columnTypes,
  selectionTypes
} from "../../global_component/DataGrid/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { updateForm } from "../../store/slices/FilterFormSlices.js";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import { showMessage } from "../../store/slices/MessageSlices.js";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";

export default function Msg223Liquid() {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const vesselSelectRef = React.useRef();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [dataViewsels, setDataViewsels] = React.useState([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    document.title = 'Hàng lỏng đủ điều kiện qua KVGS'
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
      key: "BillOfLading",
      name: "Nhập/Xuất",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoCtrlNo",
      name: "Số Tờ Khai",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CntrNo",
      name: "Ngày Tờ Khai",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "GetIn",
      name: "Mã CCHQ Mở TK",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "TransportIdentity",
      name: "Trạng Thái TK",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "NumberOfJourney",
      name: "MST DN",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "ArrivalDeparture",
      name: "Tên Doanh Nghiệp",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "MsgRef",
      name: "Tên Tàu",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Chuyến Tàu",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Ngày Tàu Đến/Rời",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Số Vận Đơn",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Số Định Danh",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Ngày GetIn",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Số Tiếp Nhận",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Ngày Tiếp Nhận",
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
      case "cancelgetin":
        break;
      default:
        break;
    }
  };

  const handleLoadData = async (formData) => {
    try {
      dispatch(setLoading(true));
      const resultDataMsg3668 = await load(formData);
      if (resultDataMsg3668) {
        const newResultDataMsg3668 = resultDataMsg3668.data.map((item) => {
          return {
            ...item,
            ID: uuidv4(),
          };
        });
        setRows(newResultDataMsg3668);
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
        <Col span={24}>
          <Card
            title={"[223] \r\n HÀNG LỎNG ĐỦ ĐIỀU KIỆN QUA KVGS"}
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <ToolBar
              buttonConfig={[toolBarButtonTypes.load, toolBarButtonTypes.send]}
              handleConfirm={buttonConfirm}
            />
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
