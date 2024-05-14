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
  loadDetail,
  del,
  save,
} from "../../../apis/Category/BulkGetout.js";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "../../../global_component/SearchBox/index.jsx";

import { basicRenderColumns } from "../../../utils/dataTable.utils.js";

export default function BulkGetout() {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const gridRefDetail = React.createRef();
  const vesselSelectRef = React.useRef();
  const [rows, setRows] = React.useState([]);
  const [rowsDetail, setRowsDetail] = React.useState([]);
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
      BillOfLading: "",
      JobModeOut: "",
      SumCargoWeight: "",
      Remaining: "",
      WeightUnitCode: "",
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
      key: "BillOfLading",
      name: "Số Vận Đơn",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "JobModeOut",
      name: "PHương Án Ra",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "SumCargoWeight",
      name: "Tổng Trọng Lượng",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "Remaining",
      name: "Còn Lại",
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "WeightUnitCode",
      name: "Đơn vị tính",
      type: columnTypes.TextEditor,
      editable: true,
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
      type: columnTypes.TextEditor,
      editable: true,
      required: true,
    },
  ]);

  const handleConfirmsSelect = async (value) => {
    const result = await loadDetail(value);
    setRowsDetail(result.data);
    console.log(result);
  };

  const handleLoadData = async (formData) => {
    dispatch(setLoading(true));
    try {
      const resultDataBulkGetout = await load(formData);
      if (resultDataBulkGetout) {
        const newResultDataBulkGetout = resultDataBulkGetout.data;
        console.log(newResultDataBulkGetout);
        setDataTable(newResultDataBulkGetout);
        setRows(newResultDataBulkGetout);
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
      const validate = gridRefDetail.current?.Validate();
      console.log(validate);
      if (!validate.validate.length) {
        message.success("không có gì thay đổi");
        return;
      }
      if (!validate.isCheck) {
        message.warning("vui lòng điền đầy đủ thông tin !");
        return;
      }
      const billData = rows.filter(
        (obj) => obj.IDRef === [...gridRef.current.getSelectedRows()][0]
      );
      const listRow = rowsDetail.filter((obj) =>
        validate.validate.some((val) => obj.ID === val.ID)
      );
      const datas = listRow.map((item) => {
        if (item.isNew) {
          return { ...item, ID: "" };
        }
        return item;
      });
      const formData = {
        IDRef: [...gridRef.current.getSelectedRows()][0],
        bill_datas: billData,
        datas: datas,
      };
      const result = await save(formData);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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
        if ([...gridRef.current?.getSelectedRows()].length)
          setRowsDetail([{ ...NewItem, "ID": uuidv4() }, ...rowsDetail]);
        else message.warning("vui lòng chọn một thông tin vận đơn trước");
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
            title="THÔNG TIN HÀNG RỜI GETOUT"
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
            style={{ minHeight: "300px", maxHeight: "500px" }}
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
              maxHeight={400}
              direction="ltr"
              columnKeySelected="ID"
              selection={selectionTypes.single}
              pagination={paginationTypes.scroll}
              columns={columns}
              rows={rows}
              setRows={setRows}
              onFocus={onFocus}
              limit={5}
              onCellClick
              handleGetSelected={handleConfirmsSelect}
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
