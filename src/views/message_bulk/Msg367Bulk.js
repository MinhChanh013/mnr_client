/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Form, Row } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import { showMessage } from "../../store/slices/MessageSlices.js";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";
import {load, searchVessels, send} from "../../apis/message_bulk/367.js";

export default function Msg367Bulk() {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const vesselSelectRef = React.useRef();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [dataViewsels, setDataViewsels] = React.useState([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    document.title = "Tờ khai đủ điều kiện qua KVGS";
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
      key: "CntrNo",
      name: "Số Tờ Khai",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "NumberOfJourney",
      name: "Tên Tàu",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "ArrivalDeparture",
      name: "Chuyến Tàu",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "ArrivalDeparturee",
      name: "Ngày Tàu Đến/Rời",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "MsgRef",
      name: "Ghi Chú",
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
    {
      key: "MsgRef",
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
    // const dataFormFilter = form.getFieldsValue();
    // const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
    // let fromdate, todate;
    // if (dataFormFilter.dateFromTo) {
    //   fromdate = dayjs(dataFormFilter.dateFromTo[0]).format(FORMAT_DATETIME);
    //   todate = dayjs(dataFormFilter.dateFromTo[1]).format(FORMAT_DATETIME);
    // }

    // delete dataFormFilter.dateFromTo;
    // const formData = {
    //   ...dataFormFilter,
    //   fromdate,
    //   todate,
    //   voyagekey: dataVesselSelect ? dataVesselSelect.VoyageKey : "",
    // };
    switch (props.type) {
      case "new declare":
        console.log(form.getFieldsValue());
        // handleLoadData(formData);
        break;
      case "send":
        // const idMsgRowData = gridRef.current?.getSelectedRows();
        // const listMsgRowSelect = [];
        // idMsgRowData.forEach((idMsgSelected) => {
        //   listMsgRowSelect.push(
        //     rows[rows.findIndex((item) => item.ID === idMsgSelected)]
        //   );
        // });
        // try {
        //   dispatch(updateForm(formData));
        //   await send(listMsgRowSelect, dispatch);
        // } catch (error) {
        //   console.log(error);
        // }
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
        <Col span={6}>
          <Card
            title={"[367] \r\n [RỜI] - TỜ KHAI ĐỦ ĐIỀU KIỆN QUA KVGS"}
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <Row className="b-row" gutter={[16, 16]}>
              <Col span={24}>
                <Filter
                  form={form}
                  items={[
                    {
                      type: filterType.checkbox,
                      label: "Loại hàng",
                      config: {
                        name: "autosend",
                        label: "Tự động gửi truy vấn với QR Code mới",
                      },
                    },
                    {
                      type: filterType.checkbox,
                      label: "Loại hàng",
                      config: {
                        name: "allow_send_again",
                        label:
                          "Gởi lại (trường hợp tờ khai đã tồn tại trong hệ thống)",
                      },
                    },
                    {
                      type: filterType.textarea,
                      label: "QR Code",
                      config: {
                        name: "qrCode",
                        defaultValue: "",
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Tờ Khai",
                      config: {
                        defaultValue: "",
                        name: "declareNo",
                        placeholder: "",
                        value: "",
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Mã ĐK HQ",
                      config: {
                        defaultValue: "",
                        name: "declareOffice",
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
        <Col span={18}>
          <Card className="main-card">
            <ToolBar
              buttonConfig={[
                toolBarButtonTypes.newdeclare,
                toolBarButtonTypes.load,
                toolBarButtonTypes.send,
                toolBarButtonTypes.cancel,
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
