import { Card, Col, Row, message, Input, Space, Typography, Form } from "antd";
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
import { load, send } from "../../apis/message_common/901.js";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/LoadingSlices.js";

const { Text } = Typography;

const MsgHistory = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [formFilter] = Form.useForm();
  const [formQueryHTHQ] = Form.useForm();
  const gridRef = React.createRef();
  const onFocus = () => {};
  const columns = [
    {
      key: "IDRef",
      name: "IDRef",
      visible: true,
      editable: false,
    },
    {
      name: "Số Tham Chiếu",
      key: "MsgRef",
      type: columnTypes.TextEditor,
      editable: true,
      width: 150,
    },
    {
      name: "Mã Thông Điệp",
      key: "RequestType",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      name: "Chức Năng Gởi",
      key: "RequestFunction",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      name: "Chức Năng Nhận",
      key: "ResponseFunction",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      name: "Số Tiếp Nhận",
      key: "AcceptanceNo",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      name: "Thời Gian Tiếp Nhận",
      key: "AcceptanceTime",
      type: columnTypes.DatePicker,
      editable: true,
    },
    {
      name: "Người gởi",
      key: "CreatedBy",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      name: "Nội Dung Gởi",
      key: "RequestContent",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      name: "Nội Dung Nhận",
      key: "ResponseContent",
      type: columnTypes.TextEditor,
      editable: true,
    },
  ];

  const buttonConfirm = async (props) => {
    const dataFormFilter = formFilter.getFieldsValue();
    const formData = {
      ...dataFormFilter,
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
            console.log(data.xmlComplete);
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
      const resultDataMsg901 = await load(formData);
      if (resultDataMsg901.data.length > 0) {
        const dataMsg901 = resultDataMsg901.data.map((row) => {
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
        setRows(dataMsg901);
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
            title={"TRUY VẤN THÔNG ĐIỆP"}
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <Row className="b-row">
              <Col span={24}>
                <Text
                  style={{
                    display: "block",
                    fontSize: "1.5rem",
                    fontWeight: "bolder",
                    textAlign: "center",
                  }}
                >
                  Lọc theo
                </Text>
                <Filter
                  form={formFilter}
                  items={[
                    {
                      type: filterType.rangePicker,
                      divider: true,
                      label: "Khoảng thời gian",
                      config: {
                        name: "date",
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Mã thông điệp",
                      config: {
                        name: "RequestType",
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Người gởi",
                      config: {
                        name: "CreatedBy",
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Message REF",
                      config: {
                        name: "msgref",
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số tờ khai",
                      config: {
                        name: "declareNo",
                      },
                    },
                  ]}
                />
              </Col>

              <Col span={24} style={{ marginTop: "16px" }}>
                <Text
                  style={{
                    display: "block",
                    fontSize: "1.5rem",
                    fontWeight: "bolder",
                    textAlign: "center",
                  }}
                >
                  Truy vấn trên HTHQ
                </Text>
                <Filter
                  form={formQueryHTHQ}
                  items={[
                    {
                      type: filterType.select,
                      label: "Loại thông điệp",
                      config: {
                        name: "requesttype",
                        options: [
                          { value: "366", label: "366 - Getin cont" },
                          { value: "365", label: "365 - Getout cont" },
                          { value: "465", label: "465 - Getout cont không TK" },
                          { value: "266", label: "266 - Getin kiện" },
                          { value: "321", label: "321 - Getout kiện" },
                          { value: "341", label: "341 - Getout kiện không TK" },
                          { value: "266", label: "266 - Getin rời" },
                          { value: "421", label: "421 - Getout rời" },
                          { value: "441", label: "441 - Getout rời không TK" },
                        ],
                      },
                    },
                    {
                      type: filterType.rangePicker,
                      divider: true,
                      label: "Khoảng thời gian",
                      config: {
                        name: "date",
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

export default MsgHistory;
