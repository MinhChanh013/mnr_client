/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Form, Flex } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import VesselSelect from "../../../global_component/Modal/VesselSelect.js";
import { Filter, filterType } from "../../../global_component/Filter/index.jsx";
import DataGrid, {
  columnTypes,
  selectionTypes,
  paginationTypes,
} from "../../../global_component/DataGrid/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../../global_component/ToolbarButton/ToolBar.js";
import { setLoading } from "../../../store/slices/LoadingSlices.js";
import { showMessage } from "../../../store/slices/MessageSlices.js";
import { searchVessels, load } from "../../../apis/Category/ContainerStock.js";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "../../../global_component/SearchBox/index.jsx";

import { basicRenderColumns } from "../../../utils/dataTable.utils.js";
export default function ContainerStock() {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const vesselSelectRef = React.useRef();
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = React.useState([]);
  const [dataViewsels, setDataViewsels] = React.useState([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
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
  const NewItem = [
    {
      ID: "",
      VesselName: "",
      InboundVoyage: "",
      OutboundVoyage: "",
      BillOfLading: "",
      CntrNo: "",
      ImExType: "",
      CntrSztp: "",
      CHK_FE: "",
      SealNo: "",
      GetIn: "",
      JobModeIn: "",
      NatureOfTransport: "",
      GetOut: "",
      JobModeOut: "",
      CommodityDescription: "",
      ContainerLocation: "",
      IsLocalForeign: "",
      CHK_LCL: "",
      CargoWeight: "",
      GetOutTruck: "",
      Remark: "",
    },
  ];
  const columns = basicRenderColumns([
    {
      key: "ID",
      name: "ID",
      width: 80,
      visible: true,
    },
    {
      key: "STT",
      name: "STT",
      width: 80,
    },
    {
      key: "VesselName",
      name: "Tên Tàu",
      width: 200,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "InboundVoyage",
      name: "C.Nhập",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "OutboundVoyage",
      name: "C.Xuất",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CntrNo",
      name: "Số Container",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "ImExType",
      name: "Hướng",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CntrSztp",
      name: "SizeType",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CHK_FE",
      name: "Full/Empty",
      width: 200,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "SealNo",
      name: "Số Niêm chì",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "GetIn",
      name: "Ngày Vào Bãi",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "JobModeIn",
      name: "Phương Án Vào",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "NatureOfTransport",
      name: "Loại Hình VC",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "GetOut",
      name: "Ngày Ra Bãi",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "JobModeOut",
      name: "Phương Án Ra",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả Hàng Hóa",
      width: 200,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "ContainerLocation",
      name: "Vị Trí Container",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "IsLocalForeign",
      name: "Nội/Ngoại",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CHK_LCL",
      name: "LCL",
      width: 180,
      type: columnTypes.Checkbox,
      editable: true,
    },
    {
      key: "CargoWeight",
      name: "Trọng Lượng",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "GetOutTruck",
      name: "BKS Phương Tiện",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "Remark",
      name: "Ghi chú",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
  ]);

  const removeRow = (index) => {
    const newRow = rows.filter((e) => !index.some((id) => e.ID === id));
    setRows(newRow);
  };

  const handleLoadData = async (formData) => {
    dispatch(setLoading(true));
    try {
      const resultDataCntrStock = await load(formData);
      if (resultDataCntrStock) {
        const newResultDataCntrStock = resultDataCntrStock.data;
        console.log(newResultDataCntrStock);
        setDataTable(newResultDataCntrStock);
        setRows(newResultDataCntrStock);
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

  const buttonConfirm = (props) => {
    const dataFormFilter = form.getFieldsValue();
    const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();

    const formData = {
      ...dataFormFilter,
      voyagekey: dataVesselSelect ? dataVesselSelect.VoyageKey : "",
    };
    switch (props.type) {
      case "load":
        console.log(formData);
        handleLoadData(formData);
        break;
      case "delete":
        removeRow([...gridRef.current.getSelectedRows()]);
        break;
      case "add":
        NewItem["ID"] = uuidv4();
        setRows([NewItem, ...rows]);
        break;
      case "export_excel":
        gridRef.current?.exportExcel();
        break;
      default:
        break;
    }
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
            title="THÔNG TIN CONTAINER BIẾN ĐỘNG"
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <Row className="b-row" gutter={[16, 16]}>
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
                    label: "Số Cont",
                    config: {
                      name: "cntrNo",
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
            className="main-card"
          >
            <Flex className="main-card-toolbar" justify="space-between">
              <ToolBar
                buttonConfig={[
                  toolBarButtonTypes.add,
                  toolBarButtonTypes.delete,
                  toolBarButtonTypes.load,
                  toolBarButtonTypes.save,
                  toolBarButtonTypes.exportexcel,
                ]}
                handleConfirm={buttonConfirm}
              />
              <SearchBox
                style={{ width: "24%" }}
                data={dataTable}
                onChange={setRows}
              />
            </Flex>
            <DataGrid
              ref={gridRef}
              direction="ltr"
              columnKeySelected="ID"
              selection={selectionTypes.multi}
              pagination={paginationTypes.scroll}
              columns={columns}
              rows={rows}
              setRows={setRows}
              onFocus={onFocus}
              limit={5}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
