/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Flex, Form, Row } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { load, searchVessels, send } from "../../apis/message_package/297.js";
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
import { cancelSending } from "../../apis/cancel_sending/message/package.js";

export default function Msg297Package() {
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
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoCtrlNo",
      name: "Số Định Danh",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "DeclareNo",
      name: "Số Tờ Khai",
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
      key: "NumberOfJourney",
      name: "Chuyến Tàu",
      width: 200,
      type: columnTypes.TextEditor,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày Tàu Đến/Rời",
      width: 200,
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
        await cancelSending({
          msgId: "297",
          handleLoad: () => handleLoadData(formData),
        });
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
      const resultDataMsg297 = await load(formData);
      if (resultDataMsg297) {
        const newResultDataMsg297 = resultDataMsg297.data.map((item) => {
          return {
            ...item,
            ID: uuidv4(),
          };
        });
        setRows(newResultDataMsg297);
        setDataTable(newResultDataMsg297);
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
            title={"[297] \r\n CHỈ ĐỊNH TỜ KHAI XUẤT HÀNG KIỆN"}
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
                      type: filterType.rangePicker,
                      label: "Lọc Theo Ngày GetIn",
                      config: {
                        name: "dateFromTo",
                        placeholder: ["Từ", "Đến"],
                        value: "",
                      },
                    },
                    {
                      type: filterType.input,
                      label: " Số Định Danh",
                      config: {
                        defaultValue: undefined,
                        name: "cargoctrlno",
                        placeholder: "",
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Vận Đơn",
                      config: {
                        defaultValue: undefined,
                        name: "billoflading",
                        placeholder: "",
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
