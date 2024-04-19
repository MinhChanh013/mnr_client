/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row } from "antd";
import * as React from "react";
import VesselSelect from "../../../global_component/Modal/VesselSelect.js";
import { Filter, filterType } from "../../../global_component/Filter/index.jsx";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../../global_component/DataGrid/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../../global_component/ToolbarButton/ToolBar.js";
import { getFormData } from "../../../utils/form.utils.js";
export default function ContainerMNF() {
  const onFocus = () => {};
  const gridRef = React.createRef();
  const vesselSelectRef = React.useRef();
  const [rows, setRows] = React.useState(() => {
    return [];
  });
  const [dataViewsels, setDataViewsels] = React.useState([]);

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
  const columns = [
    {
      key: "ID",
      name: "STT",
      width: 80,
      editable: false,
      visible: true,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoWeight",
      name: "TL Dự Kiến",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "WeightUnitCode",
      name: "DVT Dự Kiến",
      width: 200,
      type: columnTypes.TextEditor,
    },
    {
      key: "RealCargoWeight",
      name: "TL Thực Tế",
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
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "ComTypeCode",
      name: "Loại Hàng",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "StockLocation",
      name: "Vị Trí HH",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả HH",
      width: 180,
      type: columnTypes.TextEditor,
    },
  ];
  const removeRow = (index) => {
    const newRow = rows.filter((e) => !index.some((id) => e.ID === id));
    setRows(newRow);
  };
  const buttonConfirm = (props) => {
    switch (props.type) {
      case "load":
        handleSelectFilterData();
        handleLoadData();
        break;
      case "delete":
        removeRow([...gridRef.current.getSelectedRows()]);
        gridRef.current.setSelectedRows();
        break;
      case "add":
        setRows([...NewItem, ...rows]);
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

  const handleLoadData = async () => {
    try {
      //   const resultDataMsg3668 = await load({
      //     fromdate: "2023/03/13 00:00:00",
      //     todate: "2024/03/01 00:00:00",
      //   });
      //   if (resultDataMsg3668) {
      //     const dataMsg3668 = resultDataMsg3668.data.map((row) => {
      //       return columns.reduce((acc, column) => {
      //         // handle logic data
      //         const keyValue = column.key;
      //         const rowValue = row[keyValue];
      //         switch (keyValue) {
      //           case "ImExType":
      //             acc[keyValue] =
      //               rowValue === 1 ? "Nhập" : rowValue === 2 ? "Xuất" : "Nội Địa";
      //             break;
      //           case "StatusMarker":
      //             if (row["SuccessMarker"]) {
      //               acc[keyValue] = "Thành công";
      //             } else if (row["ErrorMarker"]) {
      //               acc[keyValue] = "Thất bại";
      //             } else acc[keyValue] = "Chưa gửi";
      //             break;
      //           case "StatusOfGood":
      //             rowValue === 1
      //               ? (acc[keyValue] = "Full")
      //               : (acc[keyValue] = "Empty");
      //             break;
      //           default:
      //             keyValue === "Select"
      //               ? (acc[keyValue] = "select")
      //               : (acc[keyValue] = !!row[keyValue] ? `${row[keyValue]}` : "");
      //             break;
      //         }
      //         return acc;
      //       }, {});
      //     });
      //     setRows(dataMsg3668);
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  //* CÁCH LẤY DỮ LIỆU TỪ FILTER.
  const filterRef = React.useRef();
  const handleSelectFilterData = () => {
    console.log({
      data: getFormData(filterRef.current),
    });
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
            title="THÔNG TIN HÀNG LỎNG GETIN"
            style={{ borderRadius: "0px", height: "100%" }}
            className="b-card"
          >
            <Row className="b-row" gutter={[16, 16]}>
              <Col span={24}>
                <VesselSelect ref={vesselSelectRef} data={dataViewsels} />
              </Col>

              <Filter
                filterRef={filterRef}
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
            className="b-card"
          >
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
