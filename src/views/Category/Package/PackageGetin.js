/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Form, Flex, message } from "antd";
import * as React from "react";
import dayjs from "dayjs";
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
  loadDetail,
  del,
  save,
  getJobmode,
} from "../../../apis/Category/PackageGetin.js";
import { FORMAT_DATETIME } from "../../../constants";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "../../../global_component/SearchBox/index.jsx";

import { basicRenderColumns } from "../../../utils/dataTable.utils.js";
import { retry } from "@reduxjs/toolkit/query";
export default function PackageGetin() {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const gridRefDetail = React.createRef();
  const vesselSelectRef = React.useRef();
  const [rows, setRows] = React.useState([]);
  const [rowsDetail, setRowsDetail] = React.useState([]);
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = React.useState([]);
  const [dataViewsels, setDataViewsels] = React.useState([]);
  const [jobMode, setJobMode] = React.useState([]);
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
    async function get_Jobmode() {
      try {
        const res = await getJobmode();
        if (res) {
          const result = res.data.map((item) => {
            return {
              value: item.JobMode,
              label: item.JobMode,
            };
          });
          setJobMode(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
    get_Jobmode();
    fetchDataVessels();
  }, []);

  const NewItem = {
    ID: "",
    EirNo: "",
    GetIn: undefined,
    PieceUnitCode: "",
    CargoPieceGetIn: "",
    Seq: "",
    IsOutOfGood: false,
    isNew: true,
  };
  const columns = basicRenderColumns([
    {
      key: "IDRef",
      name: "IDRef",
      width: 80,
      visible: false,
    },
    {
      key: "STT",
      name: "STT",
      width: 80,
    },
    {
      key: "VesselName",
      name: "Tên Tàu",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoPiece",
      name: "SL Dự Kiến",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "PieceUnitCode",
      name: "DVT Dự Kiến",
      width: 200,
      type: columnTypes.TextEditor,
    },
    {
      key: "RealCargoPiece",
      name: "SL Thực Tế",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "RealUnitCode",
      name: "DVT Thực Tế",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "IsLocalForeign",
      name: "Nội/Ngoại",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "JobModeIn",
      name: "P/A Vào",
      width: 180,
      type: columnTypes.Select,
      editable: true,
      options: jobMode,
    },
    {
      key: "StockLocation",
      name: "Vị Trí HH",
      width: 150,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả HH",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "DeclareContent",
      name: "DS Tờ Khai",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "VoyageKey",
      name: "VoyageKey",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "ImExType",
      name: "ImExType",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "ID",
      name: "ID",
      width: 180,
      type: columnTypes.TextEditor,
    },
  ]);

  const columnsDetail = basicRenderColumns([
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
      key: "EirNo",
      name: "Số Lệnh/ Số Tham Chiếu",
      width: 200,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "GetIn",
      name: "Ngày Vào Cảng",
      width: 200,
      type: columnTypes.DatePicker,
      editable: true,
      required: true,
    },
    {
      key: "PieceUnitCode",
      name: "ĐVT",
      width: 200,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "CargoPieceGetIn",
      name: "Số Lượng Vào",
      width: 200,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "Seq",
      name: "Lần Vào",
      width: 200,
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
    {
      key: "IsOutOfGood",
      name: "Đã Hết Hàng",
      width: 200,
      type: columnTypes.Checkbox,
      editable: true,
    },
  ]);

  const checkVessel = () => {
    const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
    if (!Object.keys(dataVesselSelect).length) {
      message.warning("Vui lòng chọn tàu trước!");
      return false;
    }
    return true;
  };

  const handleLoadDetail = async (value) => {
    const IDRef = rows.find((item) => item.STT === value).IDRef;
    const result = await loadDetail(IDRef);
    console.log(result);
    setRowsDetail(result.data);
  };

  const handleLoadData = async (formData) => {
    if (checkVessel()) {
      dispatch(setLoading(true));
      try {
        const resultDataCntrMNF = await load(formData);
        if (resultDataCntrMNF) {
          const newResultDataCntrMNF = resultDataCntrMNF.data;
          console.log(newResultDataCntrMNF);
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
    }
  };

  const handleDeleteData = (index) => {
    dispatch(setLoading(true));
    try {
      if (index.length) {
        const listRowDel = rowsDetail.filter((obj) =>
          index.some((id) => obj.ID === id)
        );
        RemoveRow(listRowDel);
        const newRow = rowsDetail.filter(
          (obj) => !index.some((id) => obj.ID === id)
        );
        gridRef.current?.setSelectedRows([]);
        setRowsDetail(newRow);
      }
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoading(false));
  };

  const handleSaveData = async () => {
    try {
      const validateDetail = gridRefDetail.current?.Validate();
      const validate = gridRef.current?.Validate();
      if (!validateDetail.validate.length && !validate.validate.length) {
        message.success("không có gì thay đổi");
        return;
      }
      if (!validate.isCheck || !validateDetail.isCheck) {
        message.warning("vui lòng điền đầy đủ thông tin !");
        return;
      }
      const STT = rows.find(
        (item) => item.STT === [...gridRef.current.getSelectedRows()][0]
      ).STT;
      const billData = rows.filter((obj) => obj.STT === STT);
      const listRow = rowsDetail.filter((obj) =>
        validateDetail.validate.some((val) => obj.ID === val.ID)
      );
      console.log(validateDetail);
      console.log(listRow);
      const check_validate_datein = validate_dateIn(listRow, billData[0]);
      if (check_validate_datein.error !== "") {
        message.warning(check_validate_datein.error);
        return;
      }
      let getoutPiece = 0;
      const pr_unit = billData[0].PieceUnitCode;
      let rmk = [];
      let zeroQTY = false;
      rowsDetail.map((item) => {
        console.log(item);
        const units = item.PieceUnitCode;
        const qty = item.CargoPieceGetIn;
        if (pr_unit == units) {
          if (!qty || qty == 0) {
            zeroQTY = true;
            return;
          }
          getoutPiece += qty;
        } else rmk.push(`${qty}:${units}`);
      });
      const expected_qty = billData[0].CargoPiece;
      if (getoutPiece > expected_qty) {
        message.warning("Số lượng getin không hợp lý! Vui lòng kiểm tra lại!");
        return;
      }
      const datas = listRow.map((item) => {
        if (item.isNew) {
          return { ...item, ID: "" };
        }
        return item;
      });
      const formData = {
        IDRef: billData[0].IDRef ? billData[0].IDRef : "",
        bill_datas: billData[0],
        datas: datas,
        sumQty_Unit: getoutPiece,
        expected_qty: expected_qty,
        remarks: rmk,
      };
      console.log(formData);
      const result = await save(formData);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const validate_dateIn = (validate, billData) => {
    let checkError = { error: "" };
    const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
    const etaTime = dayjs(dataVesselSelect.ETA).format(FORMAT_DATETIME);
    const etdTime = dayjs(dataVesselSelect.ETD).format(FORMAT_DATETIME);
    const now = dayjs().format(FORMAT_DATETIME);
    console.log(billData);
    validate.map((item) => {
      if (billData.ImExType === 1)
        if (item.GetIn <= etaTime)
          checkError["error"] = "Thời gian GETIN phải lớn hơn ETA!";
        else if (item.GetIn >= etdTime)
          checkError["error"] = "Thời gian GETIN phải nhỏ hơn ETD!";
      if (item.GetIn >= now)
        checkError["error"] =
          "Thời gian GETIN phải nhỏ hơn thời gian hiện tại!";
    });
    return checkError;
  };

  const handleAddData = () => {
    if ([...gridRef.current.getSelectedRows()].length) {
      console.log([...gridRef.current.getSelectedRows()]);
      const STT = rows.find(
        (item) => item.STT === [...gridRef.current.getSelectedRows()][0]
      ).STT;
      const billData = rows.filter((obj) => obj.STT === STT);
      console.log(billData);
      setRowsDetail([
        ...rowsDetail,
        {
          ...NewItem,
          "ID": uuidv4(),
          "Seq": rowsDetail.length + 1,
          "PieceUnitCode": billData[0].PieceUnitCode,
          "CargoPieceGetIn": billData[0].CargoPiece,
        },
      ]);
    } else message.warning("vui lòng chọn một thông tin vận đơn trước");
  };

  const RemoveRow = async (rowDel) => {
    const listRowDel = rowDel.filter((obj) => !obj.isNew);
    console.log(listRowDel);
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
        handleDeleteData([...gridRefDetail.current.getSelectedRows()]);
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
            title="THÔNG TIN HÀNG KIỆN GETIN"
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
            className="main-card"
            style={{ minHeight: "300px", maxHeight: "500px" }}
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
              maxHeight={400}
              direction="ltr"
              columnKeySelected="STT"
              selection={selectionTypes.single}
              pagination={paginationTypes.scroll}
              columns={columns}
              rows={rows}
              setRows={setRows}
              onFocus={onFocus}
              limit={5}
              onCellClick
              handleGetSelected={handleLoadDetail}
            />
          </Card>
          <Card style={{ marginTop: "10px", height: "300px", padding: "0" }}>
            <DataGrid
              style={{ height: "230px" }}
              ref={gridRefDetail}
              direction="ltr"
              columnKeySelected="ID"
              selection={selectionTypes.multi}
              pagination={paginationTypes.scroll}
              columns={columnsDetail}
              rows={rowsDetail}
              setRows={setRowsDetail}
              onFocus={onFocus}
              limit={5}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
