/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { load, searchVessels, send } from "../../apis/message_container/212.js";
import DataGrid, {
  columnTypes,
  selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import ToolBar, {
  toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import { showMessage } from "../../store/slices/MessageSlices.js";
import { socket } from "../../socket.js";

const Msg212Container = () => {
  const gridRef = React.createRef();
  const onFocus = () => {};
  const vesselSelectRef = React.useRef();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [dataViewsels, setDataViewsels] = React.useState([]);

  React.useEffect(async () => {
    try {
      const res = await searchVessels("");
      if (res) {
        setDataViewsels(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const columns = [
    {
      key: "ID",
      name: "ID",
      width: 180,
      editable: false,
      visible: true,
    },
    {
      key: "TransportIdentity",
      name: "Tên tàu",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "TransportCallSign",
      name: "Hô Hiệu Tàu",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "TransportIMONumber",
      name: "Số IMO",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "ArrivalDeparture",
      name: "Ngày tàu đến/đi",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "NumberOfJourney",
      name: "Số Chuyến",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "BillOfLading",
      name: "Số Vận Đơn",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CargoCtrlNo",
      name: "Số Định Danh",
      width: 180,
      type: columnTypes.DatePicker,
      editable: true,
    },
    {
      key: "CntrNo",
      name: "Số Container",
      width: 180,
      type: columnTypes.DatePicker,
      editable: true,
    },
    {
      key: "SealNo",
      name: "Số Chì",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "StatusOfGood",
      name: "Full/Empty",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
    {
      key: "CommodityDescription",
      name: "Mô Tả Hàng Hóa",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },

    {
      key: "MsgRef",
      name: "Khóa Tham Chiếu",
      width: 180,
      type: columnTypes.TextEditor,
      editable: true,
    },
  ];

  const handleLoadData = async (formData) => {
    dispatch(setLoading(true));
    try {
      const resultDataMsg3665 = await load(formData);
      if (resultDataMsg3665) {
        const dataMsg3668 = resultDataMsg3665.data.map((row) => {
          return columns.reduce((acc, column) => {
            // handle logic data
            const keyValue = column.key;
            const rowValue = row[keyValue];
            switch (keyValue) {
              case "JobStatus":
                acc[keyValue] = row[keyValue] ?? "READY";
                break;
              case "ImExType":
                acc[keyValue] =
                  rowValue === 1 ? "Nhập" : rowValue === 2 ? "Xuất" : "Nội Địa";
                break;
              case "StatusMarker":
                if (row["SuccessMarker"]) {
                  acc[keyValue] = "Thành công";
                } else if (row["ErrorMarker"]) {
                  acc[keyValue] = "Thất bại";
                } else acc[keyValue] = "Chưa gửi";
                break;
              case "StatusOfGood":
                rowValue === 1
                  ? (acc[keyValue] = "Full")
                  : (acc[keyValue] = "Empty");
                break;
              default:
                acc[keyValue] = !!row[keyValue] ? `${row[keyValue]}` : "";
                break;
            }
            return acc;
          }, {});
        });
        setRows(dataMsg3668);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };

  const buttonConfirm = async (props) => {
    switch (props.type) {
      case "load":
        const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
        const formData = {
          voyagekey:
            Object.keys(dataVesselSelect).length > 0
              ? dataVesselSelect.VoyageKey
              : "",
        };
        handleLoadData(
          Object.keys(dataVesselSelect).length > 0 ? formData : {}
        );
        break;
      case "send":
        try {
          const data = await send(
            vesselSelectRef.current?.getSelectedVessel(),
            dispatch
          );
          if (data) {
            if (data.deny) {
              dispatch(
                showMessage({
                  type: "error",
                  content: data.deny,
                })
              );
              return;
            }
            if (data.data && data.data.xmlComplete.length > 0) {
              dispatch(
                showMessage({
                  type: "success",
                  content: "Thông điệp đã được đưa vào hàng đợi!",
                })
              );
              socket.emit("mess_to_sock", "click");
            }

            if (data.msgGroupId) {
              dispatch(
                showMessage({
                  type: "success",
                  content: "Thông điệp đã được đưa vào hàng đợi!",
                })
              );
              socket.emit("mess_to_sock", data.msgGroupId);
            }
          }
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Card
        style={{ marginTop: "10px" }}
        title="212. CONTAINER ĐƯỢC XẾP DỠ XUỐNG CẢNG/KHO/BÃI"
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <VesselSelect ref={vesselSelectRef} data={dataViewsels} />
          </Col>
        </Row>
      </Card>
      <Card style={{ marginTop: "10px" }}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              style={{ borderRadius: "0px", height: "100%" }}
              className="b-card"
            >
              <ToolBar
                buttonConfig={[
                  toolBarButtonTypes.load,
                  toolBarButtonTypes.send,
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
      </Card>
    </>
  );
};
export default Msg212Container;
