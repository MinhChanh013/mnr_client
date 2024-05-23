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
} from "../../../apis/Category/ContainerMNF.js";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "../../../global_component/SearchBox/index.jsx";

import { basicRenderColumns } from "../../../utils/dataTable.utils.js";
export default function ContainerMNF() {
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
    BillOfLading: "",
    CntrNo: "",
    SealNo: "",
    StatusOfGood: "",
    ImExType: "",
    IsLocalForeign: "",
    CommodityDescription: "",
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
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 200,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "CntrNo",
      name: "Số Container",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "SealNo",
      name: "Số Chì",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "StatusOfGood",
      name: "Full/Empty",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "ImExType",
      name: "Hướng",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
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
      const validate = gridRef.current?.Validate();
      console.log(validate);
      if (!validate.isCheck) {
        message.warning("vui lòng điền đầy đủ thông tin trước khi lưu !");
        return;
      }
      const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
      const listRowNew = rows.filter((obj) =>
        validate.validate.some((val) => obj.ID === val.ID && obj.isNew)
      );
      if (listRowNew.length > 0 && Object.keys(dataVesselSelect).length === 0) {
        message.warning("vui lòng chọn tàu trước!");
        return;
      }
      if (!validate.validate.length) {
        message.success("không có thay đổi mới");
        return;
      }

      const listRow = rows.filter((obj) =>
        validate.validate.some((val) => obj.ID === val.ID)
      );
      const datas = listRow.map((item) => {
        if (item.isNew) {
          return { ...item, ID: "" };
        }
        return item;
      });
      const formData = {
        voyagekey: dataVesselSelect.VoyageKey,
        eta: dataVesselSelect.ETA,
        etd: dataVesselSelect.ETD,
        vesselname: dataVesselSelect.VesselName,
        inboundvoyage: dataVesselSelect.InboundVoyage,
        outboundvoyage: dataVesselSelect.OutboundVoyage,
        callsign: dataVesselSelect.CallSign,
        imo: dataVesselSelect.IMO,
        datas: datas,
      };
      const result = await save(formData);
      if (result.success) message.success("lưu thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const RemoveRow = async (rowDel) => {
    const listRowDel = rowDel.filter((obj) => !obj.isNew);
    const result = await del(listRowDel);
    return result;
  };

  const buttonConfirm = async (props) => {
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
      case "add":
        setRows([{ ...NewItem, "ID": uuidv4() }, ...rows]);
        break;
      case "delete":
        handleDeleteData([...gridRef.current.getSelectedRows()]);
        break;
      case "export_excel":
        gridRef.current?.exportExcel();
      case "save":
        handleSaveData([...gridRef.current.getSelectedRows()]);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Row gutter={[8, 8]} style={{ marginTop: "8px" }}>
        <Col span={6}>
          <Card
            styles={{
              title: {
                textAlign: "center",
                color: "#1b618c",
              },
            }}
            title="MANIFEST - LOADING LIST (CONTAINER)"
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
                      ],
                    },
                  },
                  {
                    type: filterType.radio,
                    label: "Loại hàng",
                    config: {
                      name: "IsLocalForeign",
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
        <Col span={18}>
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
