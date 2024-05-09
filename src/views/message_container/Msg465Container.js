import { Card, Col, Flex, Form, Row, message } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cancelSending } from "../../apis/cancel_sending/message/container.js";
import {
  load,
  searchVessels,
  send,
} from "../../apis/message_container/465.js";
import { FORMAT_DATETIME } from "../../constants/index.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import SearchBox from "../../global_component/SearchBox/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { socket } from "../../socket.js";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";

const Msg465Container = () => {
  const [dataTable, setDataTable] = React.useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const vesselSelectRef = React.useRef();
  const [vesselData, setVessel] = useState([]);
  const gridRef = React.createRef();
  const onFocus = () => {};
  const columns = basicRenderColumns([
    {
      key: "IDRef",
      name: "IDRef",
      visible: true,
      editable: false,
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
      name: "Nhập/Xuất",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "TransportIdentity",
      name: "Tên Tàu",
      width: 100,
      type: columnTypes.TextEditor,
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
      width: 200,
      type: columnTypes.DatePicker,
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
      name: "Số Container",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "StatusOfGood",
      name: "Full/Empty",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "GetIn",
      name: "Ngày Getin",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "GetOut",
      name: "Ngày Getout",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "SealNo",
      name: "Số Chì",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoWeight",
      name: "Tổng Trọng Lượng",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "WeightUnitCode",
      name: "ĐVT",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "GetOutType",
      name: "Phương Án Ra",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "GetOutTruck",
      name: "BKS Phương Tiện",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "Remark",
      name: "Ghi chú",
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
      voyagekey:
        Object.keys(dataVesselSelect).length > 0
          ? dataVesselSelect.VoyageKey
          : "",
      imextype: Number(dataFormFilter.imextype),
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

    if (props.type === "cancel") {
      await cancelSending({
        msgId: "465",
        handleLoad: () => handleLoadData(formData),
      });
    }

    if (props.type === "export_excel") {
      gridRef.current?.exportExcel();
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

  const handleLoadData = async (formData) => {
    try {
      dispatch(setLoading(true));
      const resultDataMsg465 = await load(formData);
      if (resultDataMsg465.data?.length > 0) {
        setRows(resultDataMsg465.data);
        setDataTable(resultDataMsg465.data);
      } else {
        setRows([]);
        message.error("Không tìm thấy dữ liệu dữ liệu!");
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  const filterRef = React.useRef();

  return (
    <>
      <Row
        gutter={[8, 8]}
        style={{ marginTop: "8px", marginLeft: "4px", marginRight: "4px" }}
      >
        <Col span={6}>
          <Card
            title={"[465] \n GETOUT CONT KHÔNG CẦN CHỨNG TỪ HQ"}
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
                      label: "Hướng",
                      config: {
                        name: "imextype",
                        defaultValue: 3,
                        style: { fontWeight: "bold" },
                        options: [
                          {
                            label: "Tất cả",
                            value: 3,
                          },
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
                      label: "Loại hàng",
                      config: {
                        name: "isLF",
                        defaultValue: "",
                        style: { fontWeight: "bold" },
                        options: [
                          {
                            label: "Tất cả",
                            value: "",
                          },
                          {
                            label: "Full",
                            value: "1",
                          },
                          {
                            label: "Empty",
                            value: "2",
                          },
                        ],
                      },
                    },
                    {
                      type: filterType.radio,
                      label: "Tình Trạng Container Ra Khỏi Cảng",
                      config: {
                        name: "isLF",
                        defaultValue: "",
                        style: { fontWeight: "bold" },
                        options: [
                          {
                            label: "Tất cả",
                            value: "",
                          },
                          {
                            label: "Đã ra",
                            value: "1",
                          },
                          {
                            label: "Chưa ra",
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
              columnKeySelected="IDRef"
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
};

export default Msg465Container;
