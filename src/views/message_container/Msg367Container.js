import { Button, Card, Col, Input, Row, message } from "antd";
import * as React from "react";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { send } from "../../apis/message_container/367.js";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";

const Msg367Container = () => {
  const [declareNo, setDeclareNo] = React.useState("");
  const [HQno, setHQno] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const gridRef = React.createRef();
  const onFocus = () => {};
  const columns = basicRenderColumns([
    {
      key: "StatusMarker",
      name: "Trạng Thái",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "CntrNo",
      name: "Số Container",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "ResponseFnc",
      name: "Mã Phản Hồi",
      width: 100,
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
      key: "TransportIdentity",
      name: "Tên Tàu",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "NumberOfJourney",
      name: "Số Chuyến",
      width: 200,
      type: columnTypes.DatePicker,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày Tàu Đến/Rời",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "StatusOfGood",
      name: "Full/Empty",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả HH",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "Remark",
      name: "Ghi Chú",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "DeclareNo",
      name: "Số TK",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "DeclareIssueDate",
      name: "Ngày Tờ Khai",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "DeclarationOffice",
      name: "Mã CC Mở TK",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "NatureOfTransaction",
      name: "Loại Hình XKN",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "DeclarationOfficeControl",
      name: "Mã CC HQGS",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "DeclarationChannel",
      name: "Mã Luồng TK",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CustomsStatus",
      name: "Trạng Thái TK",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "EnterpriseIdentity",
      name: "MST DN",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "EnterpriseName",
      name: "Tên DN",
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
  ])

  const buttonConfirm = async (props) => {
    if (props.type === "send") {
      let dataSend = { declareNo: declareNo, declareOffice: HQno };
      const resolve = await send(dataSend);
      if (resolve.success) {
        message.success("Thành công!");
      } else {
        message.error("Thất bại!");
      }
    }

    if (props.type === "export_excel") {
      gridRef.current?.exportExcel();
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
            title={"[367] \n TỜ KHAI ĐỦ ĐIỀU KIỆN QUA KVGS"}
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <Row className="b-row" gutter={[16, 16]}>
              <Col span={24}>
                <Filter
                  filterRef={filterRef}
                  items={[
                    {
                      type: filterType.checkbox,
                      divider: false,
                      config: {
                        name: "check",
                        label: "Tự động truy vấn QR Code mới",
                        defaultChecked: true,
                      },
                    },
                    {
                      type: filterType.checkbox,
                      config: {
                        name: "check",
                        label: "Truy vấn biên lai",
                        defaultChecked: true,
                      },
                    },
                    {
                      type: filterType.textarea,
                      config: {},
                    },
                    {
                      type: filterType.input,
                      label: "Mã HQGS",
                      divider: false,
                      config: {
                        name: "imextype",
                        style: { fontWeight: "bold" },
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Mã Đơn Vị",
                      divider: false,
                      config: {
                        name: "imextype",
                        style: { fontWeight: "bold" },
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Luồng",
                      divider: false,
                      config: {
                        name: "imextype",
                        style: { fontWeight: "bold" },
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Tình Trạng TK",
                      divider: false,
                      config: {
                        name: "imextype",
                        style: { fontWeight: "bold" },
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Chì HQ",
                      divider: false,
                      config: {
                        name: "imextype",
                        style: { fontWeight: "bold" },
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Vận Đơn",
                      divider: false,
                      config: {
                        name: "imextype",
                        style: { fontWeight: "bold" },
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Container",
                      divider: false,
                      config: {
                        name: "imextype",
                        style: { fontWeight: "bold" },
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Số Tờ Khai",
                      divider: false,
                      config: {
                        name: "imextype",
                        style: { fontWeight: "bold" },
                      },
                    },
                    {
                      type: filterType.input,
                      label: "Mã ĐK HQ",
                      divider: false,
                      config: {
                        name: "imextype",
                        style: { fontWeight: "bold" },
                      },
                    },
                  ]}
                />
                <Button>Tìm</Button>
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

export default Msg367Container;
