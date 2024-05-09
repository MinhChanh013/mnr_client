/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Form, Flex, Typography } from "antd";
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
import { searchVessels, load } from "../../../apis/Category/ContainerMNF.js";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "../../../global_component/SearchBox/index.jsx";

import { basicRenderColumns } from "../../../utils/dataTable.utils.js";
const { Title } = Typography;
export default function LiquidType() {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = React.useState([]);
  React.useEffect(() => {
    async function fetchDataTable() {
      dispatch(setLoading(true));
      try {
        const res = await load("");
        if (res) {
          const newResultDataLiquidType = res.data;
          setRows(newResultDataLiquidType);
          setDataTable(newResultDataLiquidType);
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
    fetchDataTable();
  }, []);
  const NewItem = [
    {
      ID: "",
      BillOfLading: "",
      CntrNo: "",
      SealNo: "",
      StatusOfGood: 1,
      isLF: 1,
      CommodityDescription: "",
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
      width: 150,
      editable: false,
    },
    {
      key: "ComTypeCode",
      name: "Mã Loại Hàng",
      type: columnTypes.TextEditor,
    },
    {
      key: "ComTypeName",
      name: "Tên Loại Hàng",
      type: columnTypes.TextEditor,
    },
  ]);

  const removeRow = (index) => {
    const newRow = rows.filter((e) => !index.some((id) => e.ID === id));
    setRows(newRow);
  };

  const buttonConfirm = (props) => {
    switch (props.type) {
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
        <Col span={24}>
          <Title
            level={2}
            style={{
              textAlign: "center",
            }}
          >
            Danh Mục Loại Hàng Lỏng
          </Title>
        </Col>
        <Col span={24}>
          <Card
            style={{ borderRadius: "0px", height: "100%" }}
            className="main-card"
          >
            <Row align={"midle"}>
              <Col span={24} style={{ padding: "8px 12px" }}>
                <Flex className="main-card-toolbar" justify="space-between">
                  <Title
                    level={3}
                    style={{
                      margin: "0px",
                    }}
                  >
                    Kích cỡ và loại container
                  </Title>
                  <SearchBox
                    style={{ width: "18%" }}
                    data={dataTable}
                    onChange={setRows}
                  />
                  <ToolBar
                    buttonConfig={[
                      toolBarButtonTypes.add,
                      toolBarButtonTypes.delete,
                      toolBarButtonTypes.save,
                      toolBarButtonTypes.exportexcel,
                    ]}
                    handleConfirm={buttonConfirm}
                  />
                </Flex>
              </Col>
              <Col span={24}>
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
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
