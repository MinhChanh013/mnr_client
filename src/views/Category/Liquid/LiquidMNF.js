/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Form, Flex, message } from "antd";
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
import {
  searchVessels,
  load,
  del,
  save,
} from "../../../apis/Category/LiquidMNF.js";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "../../../global_component/SearchBox/index.jsx";

import { basicRenderColumns } from "../../../utils/dataTable.utils.js";
import dayjs from "dayjs";
import { FORMAT_DATETIME } from "../../../constants/index.js";
export default function LiquidMNF() {
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

  const NewItem = {
    ID: "",
    TransportIdentity: "",
    NumberOfJourney: "",
    ArrivalDeparture: "",
    BillOfLading: "",
    ImExType: 1,
    CargoPiece: "",
    PieceUnitCode: "",
    IsLocalForeign: "",
    CommodityDescription: "",
    CntrNo: "",
    isNew: true,
  };
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
      key: "TransportIdentity",
      name: "Tên Tàu",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "NumberOfJourney",
      name: "Số chuyến",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày Tàu Đến",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 200,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "ImExType",
      name: "Hướng",
      width: 150,
      type: columnTypes.Select,
      editable: true,
      required: true,
      options: [
        {
          value: 1,
          label: "Nhập",
        },
        {
          value: 2,
          label: "Xuất",
        },
      ],
    },
    {
      key: "CargoWeight",
      name: "Trọng Lượng",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "WeightUnitCode",
      name: "DVT",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },

    {
      key: "IsLocalForeign",
      name: "Nội/ngoại",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả HH",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
  ]);

  const handleLoadData = async (formData) => {
    dispatch(setLoading(true));
    try {
      const resultDataCntrMNF = await load(formData);
      if (resultDataCntrMNF) {
        const newResultDataCntrMNF = resultDataCntrMNF.data;
        setDataTable(newResultDataCntrMNF);
        setRows(newResultDataCntrMNF);
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

  const handleDeleteData = (index) => {
    dispatch(setLoading(true));
    try {
      if (index.length) {
        const listRowDel = rows.filter((obj) =>
          index.some((id) => obj.ID === id)
        );
        RemoveRow(listRowDel);
        const newRow = rows.filter((obj) => !index.some((id) => obj.ID === id));
        gridRef.current?.setSelectedRows([]);
        setRows(newRow);
      }
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoading(false));
  };

  const handleSaveData = async () => {
    try {
      const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
      const validate = gridRef.current?.Validate();
      const listRow = rows.filter((obj) =>
        validate.validate.some((val) => obj.ID === val.ID)
      );
      const formData = {
        voyagekey: dataVesselSelect.VoyageKey,
        eta: dayjs(dataVesselSelect.ETA).format(FORMAT_DATETIME),
        etd: dayjs(dataVesselSelect.ETD).format(FORMAT_DATETIME),
        vesselname: dataVesselSelect.VesselName,
        inboundvoyage: dataVesselSelect.InboundVoyage,
        outboundvoyage: dataVesselSelect.OutboundVoyage,
        callsign: dataVesselSelect.callsign,
        imo: dataVesselSelect.imo,
        imextype: dataVesselSelect.imextype,
        datas: listRow,
      };
      console.log(formData);
      const result = await save(formData);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddData = () => {
    const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
    if (!Object.keys(dataVesselSelect).length) {
      message.warning("vui lòng chọn tàu trước!");
      return;
    }
    setRows([
      {
        ...NewItem,
        "ID": uuidv4(),
        "TransportIdentity": dataVesselSelect.VesselName,
        "NumberOfJourney": dataVesselSelect.InboundVoyage,
        "ArrivalDeparture": dayjs(dataVesselSelect.ETA).format(FORMAT_DATETIME),
        "VoyageKey": dataVesselSelect.VoyageKey,
        "CallSign": dataVesselSelect.CallSign,
        "ImoNumber": dataVesselSelect.IMO,
      },
      ...rows,
    ]);
  };

  const RemoveRow = async (rowDel) => {
    const listRowDel = rowDel.filter((obj) => !obj.isNew);
    const result = await del(listRowDel);
    return result;
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
        handleDeleteData([...gridRef.current.getSelectedRows()]);
        break;
      case "add":
        handleAddData();
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
            title="MANIFEST - LOADING LIST (HÀNG LỎNG)"
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
                      defaultValue: "",
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
          <Card className="main-card">
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
