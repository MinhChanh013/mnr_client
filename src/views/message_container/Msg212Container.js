/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Flex, Row } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { load, searchVessels, send } from "../../apis/message_container/212.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
  paginationTypes,
} from "../../global_component/DataGrid/index.jsx";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import { showMessage } from "../../store/slices/MessageSlices.js";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";
import { updateForm } from "../../store/slices/FilterFormSlices.js";
import SearchBox from "../../global_component/SearchBox/index.jsx";
import { cancelSending } from "../../apis/cancel_sending/message/container.js";

const Msg212Container = () => {
  const [dataTable, setDataTable] = React.useState([]);
  const gridRef = React.createRef();
  const onFocus = () => {};
  const vesselSelectRef = React.useRef();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [dataViewsels, setDataViewsels] = React.useState([]);

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

  const columns = basicRenderColumns([
    {
      key: "ID",
      name: "ID",
      width: 180,
      visible: true,
    },
    {
      key: "STT",
      name: "STT",
      width: 100,
    },
    {
      key: "TransportIdentity",
      name: "Tên tàu",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "TransportCallSign",
      name: "Hô Hiệu Tàu",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "TransportIMONumber",
      name: "Số IMO",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày tàu đến/đi",
      width: 180,
      type: columnTypes.DatePicker,
    },
    {
      key: "NumberOfJourney",
      name: "Số Chuyến",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 180,
      type: columnTypes.TextEditor,
    },
    {
      key: "CargoCtrlNo",
      name: "Số Định Danh",
      width: 180,
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
      type: columnTypes.Checkbox,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả Hàng Hóa",
      width: 180,
      type: columnTypes.TextEditor,
    },

    {
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      width: 180,
      type: columnTypes.TextEditor,
    },
  ]);

  const handleLoadData = async (formData) => {
    dispatch(setLoading(true));
    try {
      const resultDataMsg3665 = await load(formData);
      if (resultDataMsg3665) {
        setRows(resultDataMsg3665.data ?? []);
        setDataTable(resultDataMsg3665.data ?? []);
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
    const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
    const formData = {
      voyagekey:
        Object.keys(dataVesselSelect).length > 0
          ? dataVesselSelect.VoyageKey
          : "",
    };
    switch (props.type) {
      case "load":
        handleLoadData(
          Object.keys(dataVesselSelect).length > 0 ? formData : {}
        );
        break;
      case "send":
        try {
          dispatch(
            updateForm(Object.keys(dataVesselSelect).length > 0 ? formData : {})
          );
          await send(vesselSelectRef.current?.getSelectedVessel(), dispatch);
        } catch (error) {
          console.log(error);
        }
        break;
      case "cancel":
        await cancelSending({
          msgId: "212",
          handleLoad: () => handleLoadData(formData),
        });
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
      <Row
        gutter={[8, 8]}
        style={{ marginTop: "8px", marginLeft: "4px", marginRight: "4px" }}
      >
        <Col span={6}>
          <Card
            title={"[212] \r\n CONTAINER ĐƯỢC XẾP DỠ XUỐNG CẢNG/KHO/BÃI"}
            className="b-card"
          >
            <Row className="b-row" gutter={[24, 24]}>
              <Col span={24}>
                <VesselSelect ref={vesselSelectRef} data={dataViewsels} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={18}>
          <Card className="main-card">
            <Flex className="main-card-toolbar" justify="space-between">
              <ToolBar
                buttonConfig={[
                  toolBarButtonTypes.load,
                  toolBarButtonTypes.send,
                  toolBarButtonTypes.cancel,
                  toolBarButtonTypes.exportexcel,
                ]}
                handleConfirm={buttonConfirm}
              />
              <SearchBox
                style={{ width: "24%" }}
                data={dataTable}
                onChange={setRows}
              ></SearchBox>
            </Flex>
            <DataGrid
              ref={gridRef}
              direction="ltr"
              columnKeySelected="ID"
              selection={selectionTypes.single}
              columns={columns}
              rows={rows}
              setRows={setRows}
              onFocus={onFocus}
              pagination={paginationTypes.pagination}
              limit={5}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Msg212Container;
