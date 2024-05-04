import { Card, Col, Row, message, Input, Space, Typography, Form } from "antd";
import dayjs from "dayjs";
import { FORMAT_DATETIME, FORMAT_DATEYEAR } from "../../constants/index.js";
import * as React from "react";
import { socket } from "../../socket.js";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { load, send } from "../../apis/message_common/253.js";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/LoadingSlices.js";

const Msg253 = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const gridRef = React.createRef();
  const [form] = Form.useForm();
  const onFocus = () => {};
  const columns = [
    {
      key: "IDRef",
      name: "IDRef",
      visible: true,
      editable: false,
    },
    {
      key: "TransportIdentity",
      name: "Tên Tàu",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "TransportCallSign",
      name: "Call Sign",
      type: columnTypes.TextEditor,
    },
    {
      key: "TransportIMO",
      name: "Số IMO",
      type: columnTypes.TextEditor,
    },
    {
      key: "ETA",
      name: "Ngày Tàu Đến",
      type: columnTypes.TextEditor,
    },
    {
      key: "ETD",
      name: "Ngày Tàu Rời",
      type: columnTypes.TextEditor,
    },
    {
      key: "InboundVoyage",
      name: "Chuyến Nhập",
      type: columnTypes.DatePicker,
    },
    {
      key: "OutboundVoyage",
      name: "Chuyến Xuất",
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      type: columnTypes.TextEditor,
    },
  ];

  const buttonConfirm = async (props) => {
    const dataFormFilter = form.getFieldsValue();
    let fromdate, todate;
    if (dataFormFilter.dateFromTo) {
      fromdate = dayjs(dataFormFilter.dateFromTo[0]).format(FORMAT_DATEYEAR);
      todate = dayjs(dataFormFilter.dateFromTo[1]).format(FORMAT_DATEYEAR);
    }
    delete dataFormFilter.dateFromTo;
    const formData = {
      ...dataFormFilter,
      fromdate,
      todate,
    };
    if (props.type === "load") {
      handleLoadData(formData);
    }
    if (props.type === "send") {
      const idMsgRowData = gridRef.current?.getSelectedRows();
      const listMsgRowSelect = [];
      idMsgRowData.forEach((idMsgSelected) => {
        listMsgRowSelect.push(
          rows[rows.findIndex((item) => item.IDRef === idMsgSelected)]
        );
      });
      try {
        const data = await send(listMsgRowSelect);
        if (data) {
          if (data.deny) {
            message.error(data.deny);
            return;
          }
          if (data.data && data.data.dont_send_again) {
            message.success(data.data.dont_send_again);
          }

          if (data.data && data.data.xmlComplete.length > 0) {
            message.success('"Thông điệp đã được đưa vào hàng đợi!"');
            socket.emit("mess_to_sock", "click");
          }

          if (data.msgGroupId) {
            message.success("Thông điệp đã được đưa vào hàng đợi!");
            socket.emit("mess_to_sock", data.msgGroupId);
          }

          if (data.result) {
            alert(data.result);
          }
          if (data.msgRef_array) {
            for (let i = 0; i < data.msgRef_array.length; i++) {
              // var cntrNo = data.msgRef_array[i].split(":")[0];
              // var msgRef = data.msgRef_array[i].split(":")[1].toUpperCase();
              // var trarr = $("#contenttable tr");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (props.type === "export_excel") {
      gridRef.current?.exportExcel();
    }
  };

  const handleLoadData = async (formData) => {
    try {
      dispatch(setLoading(true));
      const resultDataMsg465 = await load(formData);
      if (resultDataMsg465.data.length > 0) {
        const dataMsg465 = resultDataMsg465.data.map((row) => {
          return columns.reduce((acc, column) => {
            // handle logic data
            const keyValue = column.key;
            const rowValue = row[keyValue];
            switch (keyValue) {
              case "ImExType":
                acc[keyValue] =
                  rowValue === 1 ? "Nhập" : rowValue === 2 ? "Xuất" : "Nội Địa";
                break;
              case "StatusMarker":
                if (row["SuccessMarker"]) {
                  acc[keyValue] = "Thành công";
                } else if (row["ErrorMarker"]) {
                  acc[keyValue] = "Thất bại";
                } else acc[keyValue] = "Chưa gửi";
                break;
              case "StatusOfGood":
                rowValue === 1
                  ? (acc[keyValue] = "Full")
                  : (acc[keyValue] = "Empty");
                break;
              default:
                acc[keyValue] = !!row[keyValue] ? `${row[keyValue]}` : "";
                break;
            }
            return acc;
          }, {});
        });
        setRows(dataMsg465);
      } else {
        setRows([]);
        message.error("Không tìm thấy dữ liệu dữ liệu!");
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
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
            title={"[253] \r\n THÔNG TIN TÀU XUẤT NHẬP CẢNH"}
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <Row className="b-row">
              <Col span={24}>
                <Filter
                  form={form}
                  items={[
                    {
                      type: filterType.rangePicker,
                      label: "Khoảng thời gian",
                      config: {
                        name: "dateFromTo",
                        placeholder: ["Từ", "Đến"],
                        value: "",
                      },
                    },
                    {
                      type: filterType.radio,
                      label: "Hướng",
                      config: {
                        name: "imextype",
                        defaultValue: 1,
                        options: [
                          { label: "Nhập", value: 1 },
                          { label: "Xuất", value: 2 },
                        ],
                      },
                    },
                  ]}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={18}>
          <Card
            style={{ borderRadius: "0px", height: "calc(100vh - 111px)" }}
            className="main-card"
          >
            <Row>
              <Col span={18}>
                <ToolBar
                  buttonConfig={[
                    toolBarButtonTypes.load,
                    toolBarButtonTypes.send,
                    toolBarButtonTypes.cancel,
                    toolBarButtonTypes.exportexcel,
                  ]}
                  handleConfirm={buttonConfirm}
                />
              </Col>
              <Col span={6} style={{ paddingTop: "4px" }}>
                <Space>
                  <Typography>Tìm:</Typography>
                  <Input />
                </Space>
              </Col>
            </Row>
            <DataGrid
              ref={gridRef}
              direction="ltr"
              columnKeySelected="IDRef"
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
};

export default Msg253;
