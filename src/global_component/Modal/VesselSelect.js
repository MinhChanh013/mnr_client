import { CloseOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Modal, Row, Space, Typography } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { textEditor } from "react-data-grid";
import DataGrid, { columnTypes, selectionTypes } from "../DataGrid";
import "./vessel-select.scss";
import dayjs from "dayjs";
import { FORMAT_DATETIME } from "../../constants";

const { Text } = Typography;

const VesselButton = ({ children, onClick }) => (
  <Button
    style={{
      backgroundColor: "#f3f3f3",
      marginBottom: "2px",
      borderRadius: "2px",
      width: "20px",
      height: "20px",
      display: "grid",
      placeContent: "center",
    }}
    size="small"
    onClick={onClick}
  >
    {children}
  </Button>
);

function VesselLabel({ children }) {
  return <Text style={{ minWidth: "100px" }}>{children}</Text>;
}

function VesselValue({ children }) {
  return <Text style={{ minWidth: "100px" }}>{children}</Text>;
}

// Remove error "ResizeObserver loop completed with undelivered notifications."
const debounce = (callback) => {
  let tid;
  return function (...args) {
    const ctx = "";
    tid && clearTimeout(tid);
    tid = setTimeout(() => {
      callback.apply(ctx, args);
    }, 0);
  };
};

const _ = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ {
  constructor(callback) {
    callback = debounce(callback, 20);
    super(callback);
  }
};

const VesselSelect = forwardRef(({ data }, ref) => {
  const vesselTable = useRef();
  const [vesselRowSelect, setVesselRowSelect] = useState(() => new Set());
  const [open, setOpen] = useState(false);
  const [viewvessels, setViewvessels] = useState({});
  const [vesselSelect, setVesselSelect] = useState({});

  const columns = [
    {
      key: "ID",
      name: "ID",
      editable: false,
      visible: true,
      editable: false,
    },
    {
      key: "VesselName",
      name: "Tên tàu",
      width: 180,
      renderEditCell: textEditor,
      editable: false,
    },
    {
      key: "VoyageStatus",
      name: "C.Nhập/Xuất",
      width: 120,
      renderEditCell: textEditor,
      editable: false,
    },
    {
      key: "ETA",
      name: "Ngày Cập",
      type: columnTypes.DatePicker,
      editable: false,
    },
    {
      key: "ETD",
      name: "Ngày Rời",
      type: columnTypes.DatePicker,
      editable: false,
    },
  ];

  useEffect(() => {
    if (data) {
      const dataViewsels = data.map((row) => {
        return columns.reduce((acc, column) => {
          const keyValue = column.key;

          switch (keyValue) {
            case "VoyageStatus":
              acc[keyValue] = `${row.InboundVoyage} / ${row.OutboundVoyage}`;
              break;
            case "ETA":
            case "ETD":
              acc[keyValue] = dayjs(row[keyValue]).format(FORMAT_DATETIME);
              break;
            default:
              keyValue === "Select"
                ? (acc[keyValue] = "select")
                : (acc[keyValue] = !!row[keyValue] ? `${row[keyValue]}` : "");
              break;
          }
          return acc;
        }, {});
      });
      setViewvessels(dataViewsels);
    }
  }, [data]);

  const handleConfirmsSelect = () => {
    const vesselRowData = vesselTable.current?.getSelectedRows();
    if (vesselRowData) {
      const idVesselSelected = vesselRowData.values().next().value;
      if (idVesselSelected && data) {
        setVesselSelect(
          data[data.findIndex((item) => item.ID === idVesselSelected)]
        );
      }
    }
    setOpen(false);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        getSelectedVessel: () => vesselSelect,
      };
    },
    [vesselSelect]
  );

  return (
    <>
      <Row style={{ gap: "15px" }}>
        <Col span={24} style={{ borderBottom: "1px dashed" }}>
          <Space
            style={{
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <Space>
              <VesselLabel>Tên tàu:</VesselLabel>
              <VesselValue>
                {Object.values(vesselSelect).length > 0
                  ? vesselSelect.VesselName
                  : ""}
              </VesselValue>
            </Space>
            <Flex gap="5px">
              <VesselButton onClick={() => setVesselSelect({})}>
                <CloseOutlined style={{ fontSize: "13px" }} />
              </VesselButton>

              <VesselButton onClick={() => setOpen(true)}>
                <UnorderedListOutlined style={{ fontSize: "13px" }} />
              </VesselButton>
            </Flex>
          </Space>
        </Col>

        <Col span={24} style={{ borderBottom: "1px dashed" }}>
          <Space>
            <VesselLabel>Chuyến N/X:</VesselLabel>
            <VesselValue>
              {Object.values(vesselSelect).length > 0
                ? vesselSelect?.InboundVoyage +
                  " / " +
                  vesselSelect?.OutboundVoyage
                : ""}
            </VesselValue>
          </Space>
        </Col>

        <Col span={24}>
          <Row>
            <Col span={11} style={{ borderBottom: "1px dashed" }}>
              <Space>
                <VesselLabel>ETA:</VesselLabel>
                <VesselValue>
                  {Object.values(vesselSelect).length > 0
                    ? dayjs(vesselSelect.ETA).format(FORMAT_DATETIME)
                    : ""}
                </VesselValue>
              </Space>
            </Col>
            <Col span={2}></Col>
            <Col span={11} style={{ borderBottom: "1px dashed" }}>
              <Space>
                <VesselLabel>ETD:</VesselLabel>
                <VesselValue>
                  {Object.values(vesselSelect).length > 0
                    ? dayjs(vesselSelect.ETD).format(FORMAT_DATETIME)
                    : ""}
                </VesselValue>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        open={open}
        maskClosable={false}
        width={700}
        className="vessel-modal"
        onOk={handleConfirmsSelect}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleConfirmsSelect}>
            Chọn
          </Button>,
        ]}
        title={
          <Text style={{ width: "100%", fontSize: "1rem" }}>
            Chọn Chuyến Tàu
          </Text>
        }
      >
        <Card className="vessel-select">
          <DataGrid
            ref={vesselTable}
            direction="ltr"
            columns={columns}
            columnKeySelected="ID"
            rows={viewvessels}
            selectedRows={vesselRowSelect}
            setSelectedRows={setVesselRowSelect}
            selection={selectionTypes.single}
            onCellClick
            onCellDoubleClick = {handleConfirmsSelect}
          />
        </Card>
      </Modal>
    </>
  );
});

export default VesselSelect;
