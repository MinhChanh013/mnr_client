/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Flex, Form, Row } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { load, searchVessels, send } from "../../apis/message_package/212.js";
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

export default function Msg212Package() {
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
      key: "TransportIdentity",
      name: "Tên tàu",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "TransportCallSign",
      name: "Hô Hiệu Tàu",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "TransportIMONumber",
      name: "Số IMO",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày tàu đến/đi",
      width: 150,
      type: columnTypes.DatePicker,
    },
    {
      key: "NumberOfJourney",
      name: "Số Chuyến",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "CargoCtrlNo",
      name: "Số Định Danh",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoPiece",
      name: "Số Lượng Hàng Hóa",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "PieceUnitCode",
      name: "ĐVT",
      width: 200,
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
        try {
          dispatch(updateForm(formData));
          await send(dataVesselSelect, dispatch);
        } catch (error) {
          console.log(error);
        }
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
      const resultDataMsg212 = await load(formData);
      if (resultDataMsg212) {
        const newResultDataMsg212 = resultDataMsg212.data.map((item) => {
          return {
            ...item,
            ID: uuidv4(),
          };
        });
        setDataTable(newResultDataMsg212)
        setRows(newResultDataMsg212);
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
            title={"[212] \r\n HÀNG KIỆN ĐƯỢC XẾP DỠ XUỐNG CẢNG/KHO/BÃI"}
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
