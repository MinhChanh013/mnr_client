import { Card, Col, Row, Form, message, Flex } from "antd";
import { useState, useEffect } from "react";
import * as React from "react";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { searchVessels, load, send } from "../../apis/message_container/247.js";
import { socket } from "../../socket.js";
import { FORMAT_DATETIME } from "../../constants/index.js";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import dayjs from "dayjs";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";
import SearchBox from "../../global_component/SearchBox/index.jsx";
import { updateForm } from "../../store/slices/FilterFormSlices.js";
import { cancelSending } from "../../apis/cancel_sending/message/container.js";

const Msg247Container = () => {
  const [dataTable, setDataTable] = React.useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const vesselSelectRef = React.useRef();
  const [vesselData, setVessel] = useState([]);
  const [rows, setRows] = React.useState([]);
  const gridRef = React.createRef();
  const onFocus = () => {};
  const columns = basicRenderColumns([
    {
      key: "ID",
      name: "ID",
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
      key: "OldImExType",
      name: "Hướng N/X Cũ",
      width: 120,
      type: columnTypes.TextEditor,
    },
    {
      key: "NewImExType",
      name: "Hướng N/X Mới",
      width: 120,
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
      name: "Số Container",
      width: 200,
      type: columnTypes.DatePicker,
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
      width: 150,
      type: columnTypes.DatePicker,
    },
    {
      key: "TransportIdentity",
      name: "Tên Tàu",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "NumberOfJourney",
      name: "Số Chuyến",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày Tàu Đến/Rời",
      width: 150,
      type: columnTypes.TextEditor,
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
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "ResponseText",
      name: "Nội Dung Phản Hồi",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      width: 150,
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
    if (props.type === "load") {
      handleLoadData(formData);
    }

    if (props.type === "send") {
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

    if (props.type === "cancel") {
      await cancelSending({
        msgId: "247",
        handleLoad: () => handleLoadData(formData),
      });
    }

    if (props.type === "export_excel") {
      gridRef.current?.exportExcel();
    }
  };

  const handleLoadData = async (formData) => {
    try {
      dispatch(setLoading(true));
      const resultDataMsg247 = await load(formData);
      if (resultDataMsg247.data.length > 0) {
        setRows(resultDataMsg247?.data ?? []);
        setDataTable(resultDataMsg247?.data ?? []);
      } else {
        setRows([]);
        message.error("Không tìm thấy dữ liệu dữ liệu!");
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function searchvessel() {
      try {
        const loadVessel = await searchVessels({});
        if (loadVessel.success) {
          setVessel(loadVessel.data);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }

    searchvessel();
  }, []);

  const filterRef = React.useRef();

  return (
    <>
      <Row
        gutter={[8, 8]}
        style={{ marginTop: "8px", marginLeft: "4px", marginRight: "4px" }}
      >
        <Col span={6}>
          <Card
            title={
              "[247] \r\n GỬI THÔNG TIN THAY ĐỔI LOẠI HÀNG HÓA (CONTAINER)"
            }
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <Row className="b-row" gutter={[16, 16]}>
              <Col span={24}>
                <VesselSelect data={vesselData} ref={vesselSelectRef} />
              </Col>
              <Col span={24}>
                <Filter
                  form={form}
                  items={[
                    {
                      type: filterType.radio,
                      label: "Hướng (mới)",
                      config: {
                        name: "imextype",
                        defaultValue: "",
                        options: [
                          {
                            label: "Nhập",
                            value: "1",
                          },
                          {
                            label: "Xuất",
                            value: "2",
                          },
                        ],
                      },
                    },
                    {
                      type: filterType.radio,
                      label: "Loại hàng (mới)",
                      config: {
                        name: "isLF",
                        defaultValue: "",
                        options: [
                          {
                            label: "Hàng ngoại",
                            value: "1",
                          },
                          {
                            label: "Hàng nội",
                            value: "2",
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
};

export default Msg247Container;
