import { Card, Col, Row, Form, message, Input, Space, Typography } from "antd";
import { useState, useEffect } from "react";
import * as React from "react";
import { socket } from "../../socket.js";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import ToolBar, { toolBarButtonTypes } from "../../global_component/ToolbarButton/ToolBar.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { load, send } from "../../apis/message_common/901.js"
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import dayjs from "dayjs";

const Msg901 = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const vesselSelectRef = React.useRef();
  const [vesselData, setVessel] = useState([]);
  const gridRef = React.createRef();
  const onFocus = () => { };
  const columns = [
    {
      key: 'IDRef',
      name: 'IDRef',
      visible: false,
      editable: false
    },
    {
      key: "InvForm",
      name: "Mẫu Hóa Đơn",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "InvSeries",
      name: "Ký Hiêu",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "InvNumber",
      name: "Số Hóa Đơn",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "ReceiptNo",
      name: "Số Biên Lai",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "ReceiptDate",
      name: "Ngày Biên Lai",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "ReceiptStatus",
      name: "Trạng Thái",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "TotalAmount",
      name: "Tổng Tiền",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "Inactive",
      name: "Được Lấy Hàng",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "PartnerCode",
      name: "Mã Doanh Nghiệp",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "PartnerNameInVN",
      name: "Tên Doanh Nghiệp",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "Address",
      name: "Địa Chỉ",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "TaxCode",
      name: "MST",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "ContactName",
      name: "Người Nộp Phí",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "Phone",
      name: "SĐT",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "Email",
      name: "Email",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "CustomsDeclare",
      name: "Số tờ khai",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "CustomsDeclareDate",
      name: "Ngày tờ khai",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "CustomsDeclareType",
      name: "Mã loại hình TK",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "TariffTypeCode",
      name: "Mã loại hình HH",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "TransportCode",
      name: "Mã phương tiện VC",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "DestinationCode",
      name: "Mã địa điểm lưu kho",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "CustomsGoodsItems",
      name: "Chi tiết phí",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "CustomsDeclarations",
      name: "Danh sách TK",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "JournalMemo",
      name: "Diễn Giải Chi Tiết",
      width: 150,
      type: columnTypes.TextEditor,
    },{
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      width: 150,
      type: columnTypes.TextEditor,
    },
  ];

  const buttonConfirm = async (props) => {
    if (props.type === 'load') {
      const dataFormFilter = form.getFieldsValue();
      console.log(dataFormFilter);
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
        voyagekey: Object.keys(dataVesselSelect).length > 0 ? dataVesselSelect.VoyageKey : "",
        imextype: Number(dataFormFilter.imextype),
      };
      handleLoadData(formData);
    }

    if (props.type === 'send') {
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
            message.error(data.deny)
            return;
          }
          if (data.data && data.data.dont_send_again) {
            message.success(data.data.dont_send_again)
          }

          if (data.data && data.data.xmlComplete.length > 0) {
            console.log(data.xmlComplete);
            message.success('"Thông điệp đã được đưa vào hàng đợi!"');
            socket.emit("mess_to_sock", "click");
          }

          if (data.msgGroupId) {
            message.success('Thông điệp đã được đưa vào hàng đợi!');
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
  }

  useEffect(async () => {
    try {
      const loadVessel = await searchVessels({});
      if (loadVessel.success) {
        setVessel(loadVessel.data);
      } else {

      }
    } catch (error) {
      console.log(error);
    }
  }, [])

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
        console.log('-----------------')
        setRows([]);
        message.error('Không tìm thấy dữ liệu dữ liệu!');
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
            title={'[901] \r\n THÔNG TIN BIÊN LAI THU PHÍ'}
            style={{ borderRadius: "0px", height: '100%' }}
            className="b-card"
          >
            <Row style={{ padding: "0 16px" }}>
              <Col span={24}>
                <Filter
                  filterRef={filterRef}
                  items={[
                    {
                      type: filterType.input,
                      label: "Số Biên Lai",
                      config: {
                        name: "BLno",
                        style: { fontWeight: 'bold' }
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Tờ Khai",
                      config: {
                        name: "DeclareNo",
                        style: { fontWeight: 'bold' }
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Vận Đơn",
                      config: {
                        name: "Billoflading",
                        style: { fontWeight: 'bold' }
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Container",
                      divider: true,
                      config: {
                        name: "Cntrno",
                        style: { fontWeight: 'bold' }
                      },
                    },
                    {
                      type: filterType.radio,
                      label: "Loại hàng",
                      divider: true,
                      config: {
                        name: "type",
                        defaultValue: 'cont',
                        options: [
                          { label: 'Hàng Cont', value: 'cont' },
                          { label: 'Hàng Kiện', value: 'package' },
                          { label: 'Hàng rời', value: 'dispatch' },
                        ]
                      },
                    },
                    {
                      type: filterType.rangePicker,
                      divider: true,
                      label: 'Khoảng',
                      config: {
                        name: "date",
                        // placeholder: 'Khoảng',
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
            className="main-card"
          >
            <Row>
              <Col span={18}>
                <ToolBar
                  buttonConfig={[toolBarButtonTypes.load, toolBarButtonTypes.send]}
                  handleConfirm={buttonConfirm}
                />
              </Col>
              <Col span={6} style={{ paddingTop: '4px' }}>
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

export default Msg901;
