/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Form, Row } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { load, searchVessels } from "../../apis/message_container/566.js";
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
export default function Msg566Container() {
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
      key: "ImExType",
      name: "Nhập/Xuất",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "transportIdentity",
      name: "Tên Tàu",
      width: 100,
      type: columnTypes.TextEditor,
    },
    {
      key: "numberOfJourney",
      name: "Số Chuyến",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "arrivalDeparture",
      name: "Ngày Cập/Rời",
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
      key: "IssueDate",
      name: "Ngày Vận Đơn",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả Hàng Hóa",
      width: 200,
      type: columnTypes.TextEditor,
    },
    {
      key: "content",
      name: "Ghi Chú",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "isUpdate",
      name: "Cấp Lại",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "AcceptanceNo",
      name: "Số Tiếp Nhận",
      width: 180,
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
      name: "Nội dung Phản Hồi",
      width: 220,
      type: columnTypes.DatePicker,
    },
    {
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      width: 220,
      type: columnTypes.DatePicker,
    },
  ];

  const buttonConfirm = async (props) => {
    switch (props.type) {
      case "load":
        const dataFormFilter = form.getFieldsValue();
        const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();

        const formData = {
          ...dataFormFilter,
          voyagekey: dataVesselSelect ? dataVesselSelect.VoyageKey : "",
        };
        handleLoadData(formData);
        break;
      case "send":
        break;
      default:
        break;
    }
  };

  const handleLoadData = async (formData) => {
    try {
      dispatch(setLoading(true));
      const resultDataMsg566 = await load(formData);
      if (resultDataMsg566) {
        const dataMsg566 = resultDataMsg566.data.map((row) => {
          return columns.reduce((acc, column) => {
            // handle logic data
            const keyValue = column.key;
            const rowValue = row[keyValue];
            switch (keyValue) {
              case "JobStatus":
                acc[keyValue] = rowValue ?? "READY";
                break;
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
        setRows(dataMsg566);
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
            title="566 - XIN SỐ ĐỊNH DANH"
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
                    label: "Loại hàng",
                    config: {
                      name: "isLF",
                      defaultValue: "",
                      options: [
                        {
                          label: "Tất cả",
                          value: "",
                        },
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
                    type: filterType.input,
                    label: "Số vận đơn",
                    config: {
                      defaultValue: "",
                      name: "billOfLading",
                      placeholder: "",
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
