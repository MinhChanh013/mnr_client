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
import { searchVessels, load } from "../../../apis/Category/PackageGetout.js";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "../../../global_component/SearchBox/index.jsx";

import { basicRenderColumns } from "../../../utils/dataTable.utils.js";
export default function PackageGetout() {
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
      TransportIdentity: "",
      NumberOfJourney: "",
      ArrivalDeparture: "",
      BillOfLading: "",
      ImExType: "",
      CargoPiece: "",
      PieceUnitCode: "",
      isLF: "",
      CommodityDescription: "",
      CntrNo: "",
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
      editable: false,
    },
    {
      key: "JobModeOut",
      name: "PHương Án Ra",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "DeclareNo",
      name: "Số TK",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "SumCargoPiece",
      name: "Trạng Thái TK",
      width: 200,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CargoPieceInDeclare",
      name: "SL (Vận Đơn)",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "Remaining",
      name: "SL (Tờ Khai)",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "PieceUnitCode",
      name: "SL (Còn Lại)",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },

    {
      key: "PieceUnitCode",
      name: "DVT",
      width: 180,
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
      const resultDataBulkGetin = await load(formData);
      if (resultDataBulkGetin) {
        const newResultDataBulkGetin = resultDataBulkGetin.data.map((item) => {
          return {
            ...item,
            ID: uuidv4(),
          };
        });
        console.log(newResultDataBulkGetin);
        setDataTable(newResultDataBulkGetin);
        setRows(newResultDataBulkGetin);
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
        handleLoadData(formData);
        break;
      case "delete":
        removeRow([...gridRef.current.getSelectedRows()]);
        break;
      case "add":
        NewItem["ID"] = uuidv4();
        setRows([NewItem, ...rows]);
        break;
      case "save":
        handleSaveData();
        break;
      case "export_excel":
        gridRef.current?.exportExcel();
        break;
      default:
        break;
    }
  };
  const handleSaveData = async () => {
    try {
    } catch (error) {
      console.log(error);
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
            title="THÔNG TIN HÀNG KIỆN GETOUT"
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
              selection={selectionTypes.single}
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
