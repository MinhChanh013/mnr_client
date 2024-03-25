/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useDispatch } from "react-redux";
import { load, searchVessels, send } from "../../apis/message_container/237.js";
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
import { socket } from "../../socket.js";
import { showMessage } from "../../store/slices/MessageSlices.js";
export default function Msg237Container() {
  const onFocus = () => {};
  const gridRef = React.createRef();
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

  const columns = [
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
      key: "OldSealNo",
      name: "Niêm Chì Cũ",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "NewSealNo",
      name: "Niêm Chì Mới",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "ImExType",
      name: "Nhập/Xuất",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "CntrNo",
      name: "Số Container",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CHK_FE",
      name: "Full/Empty",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "GetIn",
      name: "Ngày Getin",
      width: 200,
      type: columnTypes.DatePicker,
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
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày tàu đến/Rời",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "Content",
      name: "Ghi Chú",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "AcceptanceNo",
      name: "Số Tiếp Nhận",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "AcceptanceTime",
      name: "Ngày Tiếp Nhận",
      width: 220,
      type: columnTypes.DatePicker,
    },
    {
      key: "ResponseText",
      name: "Nội Dung Phản Hồi",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      width: 300,
      type: columnTypes.TextEditor,
    },
  ];

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
          const data = await send(listMsgRowSelect);
          if (data) {
            if (data.deny) {
              dispatch(
                showMessage({
                  type: "error",
                  content: data.deny,
                })
              );
              return;
            }
            if (data.data && data.data.dont_send_again) {
              dispatch(
                showMessage({
                  type: "success",
                  content: data.data.dont_send_again,
                })
              );
            }

            if (data.data && data.data.xmlComplete.length > 0) {
              console.log(data.xmlComplete);
              dispatch(
                showMessage({
                  type: "success",
                  content: "Thông điệp đã được đưa vào hàng đợi!",
                })
              );
              socket.emit("mess_to_sock", "click");
            }

            if (data.msgGroupId) {
              dispatch(
                showMessage({
                  type: "success",
                  content: "Thông điệp đã được đưa vào hàng đợi!",
                })
              );
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
        break;
      default:
        break;
    }
  };

  const handleLoadData = async (formData) => {
    try {
      dispatch(setLoading(true));
      const resultDataMsg237 = await load(formData);
      if (resultDataMsg237) {
        const dataMsg237 = resultDataMsg237.data.map((row) => {
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
                row["CHK_FE"] === 1 ? (acc = "Full") : (acc = "Empty");
                break;
              case "CHK_FE":
                acc[keyValue] = `${row["CHK_FE"] === 1 ? "Full" : "Empty"} ${
                  row["CHK_FE"]
                }`;
                break;
              default:
                acc[keyValue] = !!row[keyValue] ? `${row[keyValue]}` : "";
                break;
            }
            return acc;
          }, {});
        });
        setRows(dataMsg237);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };

  return (
    <>
      <Row gutter={[8, 8]} style={{ marginTop: "8px" }}>
        <Col span={7}>
          <Card
            styles={{
              title: {
                textAlign: "center",
                color: "#1b618c",
              },
            }}
            title="237 - GỬI THÔNG TIN THAY ĐỔI CHÌ NIÊM PHONG CONTAINER"
            style={{ borderRadius: "0px" }}
            className="b-card"
          >
            <Row style={{ padding: "0 8px" }}>
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
              buttonConfig={[toolBarButtonTypes.load, toolBarButtonTypes.send]}
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
