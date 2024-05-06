/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Form } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import VesselSelect from "../../../global_component/Modal/VesselSelect.js";
import { Filter, filterType } from "../../../global_component/Filter/index.jsx";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../../global_component/DataGrid/index.jsx";
import ToolBar, {
  toolBarButtonTypes,
} from "../../../global_component/ToolbarButton/ToolBar.js";
import { updateForm } from "../../../store/slices/FilterFormSlices.js";
import { setLoading } from "../../../store/slices/LoadingSlices.js";
import { getFormData } from "../../../utils/form.utils.js";
import { showMessage } from "../../../store/slices/MessageSlices.js";
import { searchVessels, load } from "../../../apis/Category/ContainerMNF.js";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "../../../global_component/SearchBox/index.jsx";

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
  const NewItem = [
    {
      BillOfLading: "",
      CntrNo: "",
      SealNo: "",
      StatusOfGood: "Full",
      isLF: "Nhập",
      CommodityDescription: "",
    },
  ];
  const columns = [
    {
      key: "ID",
      name: "STT",
      width: 80,
      editable: false,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 200,
      type: columnTypes.TextEditor,
    },
    {
      key: "CntrNo",
      name: "Số Container",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "SealNo",
      name: "Số Chì",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "StatusOfGood",
      name: "Full/Empty",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "ImExType",
      name: "Hướng",
      width: 150,
      type: columnTypes.TextEditor,
    },
    {
      key: "isLF",
      name: "Nội/ngoại",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả HH",
      width: 150,
      type: columnTypes.TextEditor,
    },
  ];
  const removeRow = (index) => {
    const newRow = rows.filter((e) => !index.some((id) => e.ID === id));
    setRows(
      newRow.map((item, index) => {
        return {
          ...item,
          ID: index + 1,
        };
      })
    );
  };
  const handleLoadData = async (formData) => {
    dispatch(setLoading(true));
    try {
      const resultDataCntrMNF = await load(formData);
      if (resultDataCntrMNF) {
        const newResultDataCntrMNF = resultDataCntrMNF.data.map((item) => {
          return {
            ...item,
            ID: uuidv4(),
          };
        });
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
        const idMsgRowData = gridRef.current?.getSelectedRows();
        const listMsgRowSelect = [];
        idMsgRowData.forEach((idMsgSelected) => {
          listMsgRowSelect.push(
            rows[rows.findIndex((item) => item.ID === idMsgSelected)]
          );
        });
        try {
          dispatch(updateForm(formData));
          // await send(listMsgRowSelect, dispatch);
        } catch (error) {
          console.log(error);
        }
        break;
      case "cancel":
        // await cancelSending();
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
            style={{
              borderRadius: "0px",
            }}
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
              style={{ height: "80vh" }}
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
