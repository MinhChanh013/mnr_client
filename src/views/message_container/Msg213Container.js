/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useDispatch } from "react-redux";
import { load, send } from "../../apis/message_container/213.js";
import { FORMAT_DATETIME } from "../../constants/index.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import { dataConverTable } from "../../utils/dataTable.utils.js";
export default function Msg213Container() {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const vesselSelectRef = React.useRef();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [form] = Form.useForm();

  const columns = [
    {
      key: "ID",
      name: "ID",
      width: 180,
      editable: false,
      visible: true,
    },
    {
      key: "STT",
      name: "STT",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "ImExType",
      name: "Hướng",
      type: columnTypes.TextEditor,
    },
    {
      key: "DeclareNo",
      name: "Số Tờ Khai",
      type: columnTypes.TextEditor,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      type: columnTypes.TextEditor,
    },
    {
      key: "CntrNo",
      name: "Số Container",
      type: columnTypes.TextEditor,
    },
    {
      key: "SealNo",
      name: "Số Niêm Chì",
      type: columnTypes.DatePicker,
    },
    {
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      type: columnTypes.TextEditor,
    },
  ];

  const buttonConfirm = async (props) => {
    switch (props.type) {
      case "load":
        const dataFormFilter = form.getFieldsValue();
        const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
        let startDate, finishDate;
        if (dataFormFilter.dateFromTo) {
          startDate = dayjs(dataFormFilter.dateFromTo[0]).format(
            FORMAT_DATETIME
          );
          finishDate = dayjs(dataFormFilter.dateFromTo[1]).format(
            FORMAT_DATETIME
          );
        }

        delete dataFormFilter.dateFromTo;
        const formData = {
          ...dataFormFilter,
          startDate,
          finishDate,
          voyagekey: dataVesselSelect ? dataVesselSelect.VoyageKey : "",
        };
        handleLoadData(formData);
        break;
      case "send":
        const FormFilter = form.getFieldsValue();
        console.log(FormFilter);
        let startDateFilter, finishDateFilter;
        if (FormFilter.dateFromTo) {
          startDateFilter = dayjs(FormFilter.dateFromTo[0]).format(
            FORMAT_DATETIME
          );
          finishDateFilter = dayjs(FormFilter.dateFromTo[1]).format(
            FORMAT_DATETIME
          );
        }

        try {
          await send(
            {
              startDate: startDateFilter,
              finishDate: finishDateFilter,
              imextype: FormFilter.imextype,
            },
            dispatch
          );
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
      const resultDataMsg213 = await load(formData);
      if (resultDataMsg213) {
        setRows(dataConverTable(resultDataMsg213, columns));
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
            title="213 - DANH SÁCH CONTAINER SOI CHIẾU TRƯỚC"
            style={{ borderRadius: "0px" }}
            className="b-card"
          >
            <Row style={{ padding: "0 8px" }}>
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
                          label: "Nhập Khẩu",
                          value: "1",
                        },
                        {
                          label: "Xuất Khẩu",
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
