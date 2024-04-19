/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Form, Row } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { load, searchVessels, send } from "../../apis/message_package/2668.js";
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
import dayjs from "dayjs";
import { FORMAT_DATETIME } from "../../constants/index.js";

export default function Msg2668Package() {
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
      key: "TransportIdentity",
      name: "Tên Tàu",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "NumberOfJourney",
      name: "Chuyến",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày Tàu Đến",
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
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoCtrlNo",
      name: "Số Định Danh",
      width: 200,
      type: columnTypes.TextEditor,
    },
    {
      key: "GetIn",
      name: "Ngày Getin",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoPieceGetIn",
      name: "Số Lượng",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "PieceUnitCode",
      name: "ĐVT",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "Seq",
      name: "Lần",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "IsDifferent",
      name: "Sai Khác",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "IsOutOfGood",
      name: "Hết Hàng",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "JobModeIn",
      name: "Phương Án Vào",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "GetInType",
      name: "Hình Thức Vào",
      width: 300,
      type: columnTypes.TextEditor,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả HH",
      width: 300,
      type: columnTypes.TextEditor,
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
      name: "Khóa tham chiếu",
      width: 300,
      type: columnTypes.TextEditor,
    },
  ]);

  const buttonConfirm = async (props) => {
    const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
    const dataFormFilter = form.getFieldsValue();
    let fromdate, todate, isLF;
    if (dataFormFilter.dateFromTo) {
      fromdate = dayjs(dataFormFilter.dateFromTo[0]).format(FORMAT_DATETIME);
      todate = dayjs(dataFormFilter.dateFromTo[1]).format(FORMAT_DATETIME);
    }
    isLF = dataFormFilter.localforeign ?? "";

    delete dataFormFilter.dateFromTo;
    delete dataFormFilter.localforeign;

    const formData = {
      ...dataFormFilter,
      isLF,
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
      const resultDataMsg2668 = await load(formData);
      if (resultDataMsg2668) {
        const newResultDataMsg2668 = resultDataMsg2668.data.map((item) => {
          return {
            ...item,
            ID: uuidv4(),
          };
        });
        setRows(newResultDataMsg2668);
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
        <Col span={7}>
          <Card
            title={"[2668] \r\n GỬI GETIN HÀNG KIỆN VÀO KVGS"}
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
                      label: "Loại hàng",
                      config: {
                        name: "localforeign",
                        defaultValue: "F",
                        options: [
                          {
                            label: "Hàng ngoại",
                            value: "F",
                          },
                          {
                            label: "Hàng nội",
                            value: "L",
                          },
                        ],
                      },
                    },
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
                      label: "Khoản",
                      config: {
                        name: "dateFromTo",
                        placeholder: ["Từ", "Đến"],
                        value: "",
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Vận Đơn",
                      config: {
                        defaultValue: "",
                        name: "billoflading",
                        placeholder: "",
                        value: "",
                      },
                    },
                  ]}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={17}>
          <Card className="main-card">
            <ToolBar
              buttonConfig={[
                toolBarButtonTypes.load,
                toolBarButtonTypes.send,
                toolBarButtonTypes.exportexcel,
              ]}
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
