/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Typography } from "antd";
import * as React from "react";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../../global_component/DataGrid/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../../global_component/ToolbarButton/ToolBar.js";
import { getFormData } from "../../../utils/form.utils.js";
const { Title } = Typography;
export default function ContainerSizeType() {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const [rows, setRows] = React.useState([]);
  React.useEffect(async () => {
    try {
      // const res = await searchVessels("");
      // if (res) {
      //   setDataViewsels(res.data);
      // }
    } catch (error) {
      console.log(error);
    }
  }, []);
  const NewItem = [
    {
      BillOfLading: "",
      CntrNo: "",
      SealNo: "",
      StatusOfGood: 1,
      isLF: 1,
      CommodityDescription: "",
    },
  ];
  const columns = [
    {
      key: "ID",
      name: "STT",
      width: 150,
      editable: false,
    },
    {
      key: "ComTypeCode",
      name: "Mã Loại Hàng",
      width: 400,
      type: columnTypes.TextEditor,
    },
    {
      key: "ComTypeName",
      name: "Tên Loại Hàng",
      width: 400,
      type: columnTypes.TextEditor,
    },
  ];
  function removeRow(index) {
    const newRow = [...rows];
    newRow.splice(index, 1);
    setRows(newRow);
  }
  const buttonConfirm = (props) => {
    switch (props.type) {
      case "delete":
        removeRow(1);
        break;
      case "add":
        setRows([NewItem, ...rows]);
        break;
      default:
        break;
    }
  };
  // const handleLoadData = async () => {
  //   try {
  //     const resultDataMsg3668 = await load({
  //       fromdate: "2023/03/13 00:00:00",
  //       todate: "2024/03/01 00:00:00",
  //     });
  //     if (resultDataMsg3668) {
  //       const dataMsg3668 = resultDataMsg3668.data.map((row) => {
  //         return columns.reduce((acc, column) => {
  //           // handle logic data
  //           const keyValue = column.key;
  //           const rowValue = row[keyValue];
  //           switch (keyValue) {
  //             case "ImExType":
  //               acc[keyValue] =
  //                 rowValue === 1 ? "Nhập" : rowValue === 2 ? "Xuất" : "Nội Địa";
  //               break;
  //             case "StatusMarker":
  //               if (row["SuccessMarker"]) {
  //                 acc[keyValue] = "Thành công";
  //               } else if (row["ErrorMarker"]) {
  //                 acc[keyValue] = "Thất bại";
  //               } else acc[keyValue] = "Chưa gửi";
  //               break;
  //             case "StatusOfGood":
  //               rowValue === 1
  //                 ? (acc[keyValue] = "Full")
  //                 : (acc[keyValue] = "Empty");
  //               break;
  //             default:
  //               keyValue === "Select"
  //                 ? (acc[keyValue] = "select")
  //                 : (acc[keyValue] = !!row[keyValue] ? `${row[keyValue]}` : "");
  //               break;
  //           }
  //           return acc;
  //         }, {});
  //       });
  //       setRows(dataMsg3668);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
            className="b-card"
          >
            <ToolBar
              buttonConfig={[
                toolBarButtonTypes.add,
                toolBarButtonTypes.delete,
                toolBarButtonTypes.save,
              ]}
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
