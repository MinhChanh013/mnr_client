/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Form, Flex, Typography } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
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
} from "../../../apis/Category/ContainerSizeType.js";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "../../../global_component/SearchBox/index.jsx";

import { basicRenderColumns } from "../../../utils/dataTable.utils.js";
const { Title } = Typography;
export default function ContainerSizeType() {
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
          const newResultDataCntrSizeType = res.data;
          setRows(newResultDataCntrSizeType);
          setDataTable(newResultDataCntrSizeType);
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
  const NewItem = {
    ID: "",
    CntrSztp: "",
    IsoSztp: "",
    ContType: "",
    ContSize: "",
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
      width: 150,
      editable: false,
    },
    {
      key: "CntrSztp",
      name: "Mã Local",
      width: 470,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "IsoSztp",
      name: "Mã ISO",
      width: 470,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "ContType",
      name: "Loại Container",
      width: 470,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "ContSize",
      name: "Kích cỡ",
      width: 470,
      type: columnTypes.TextEditor,
      editable: true,
    },
  ]);

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

  const handleSaveData = async (index) => {
    try {
      const listRowNew = rows.filter((obj) =>
        index.some((id) => obj.ID === id && obj.isNew)
      );
      const listRow = rows.filter((obj) => index.some((id) => obj.ID === id));
      const datas = listRow.map((item) => {
        if (item.isNew) {
          return { ...item, ID: "" };
        }
        return item;
      });
      console.log(datas);
      const formData = {
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
    console.log(listRowDel);
    const result = await del(listRowDel);
    return result;
  };

  const buttonConfirm = (props) => {
    switch (props.type) {
      case "add":
        setRows([{ ...NewItem, "ID": uuidv4() }, ...rows]);
        break;
      case "delete":
        handleDeleteData([...gridRef.current.getSelectedRows()]);
        break;
      case "export_excel":
        gridRef.current?.exportExcel();
        break;
      case "save":
        handleSaveData([...gridRef.current.getSelectedRows()]);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Row gutter={[8, 8]} style={{ margin: "8px 4px 0px 4px" }}>
        <Col span={24}>
          <Card
            style={{ borderRadius: "0px", height: "100%" }}
            className="main-card"
          >
            <Row align={"midle"}>
              <Col span={24}>
                <Title
                  level={3}
                  style={{
                    margin: "0px",
                    textAlign: "center"
                  }}
                >
                  Kích cỡ và loại container
                </Title>
              </Col>
              <Col span={24} style={{ padding: "8px 12px" }}>
                <Flex className="main-card-toolbar" justify="space-between">
                  <ToolBar
                    buttonConfig={[
                      toolBarButtonTypes.add,
                      toolBarButtonTypes.delete,
                      toolBarButtonTypes.save,
                      toolBarButtonTypes.exportexcel,
                    ]}
                    handleConfirm={buttonConfirm}
                  />
                  <SearchBox
                    style={{ width: "18%" }}
                    data={dataTable}
                    onChange={setRows}
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
