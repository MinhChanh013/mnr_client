import {
  Button,
  Card,
  Col,
  Flex,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { DeleteOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import { useRef, useState } from "react";
import { ReactGrid } from "@silevis/reactgrid";

const { Text } = Typography;

const VesselButton = ({ children, onClick }) => (
  <Button
    style={{
      backgroundColor: "#f3f3f3",
      marginBottom: "2px",
    }}
    onClick={onClick}
    icon={children}
  />
);

function VesselLabel({ children }) {
  return (
    <Text style={{ minWidth: "100px", fontWeight: "bold" }}>{children}</Text>
  );
}

function VesselValue({ children }) {
  return <Text style={{ minWidth: "100px" }}>{children}</Text>;
}

function VesselModalSelect(props) {
  const columns = [
    { columnId: "ten_tau" },
    { columnId: "chuyen_nhap_xuat" },
    { columnId: "ngay_cap" },
    { columnId: "ngay_roi" },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "Tên Tàu" },
      { type: "header", text: "C. Nhập/Xuất" },
      { type: "header", text: "Ngày Cập" },
      { type: "header", text: "Ngày Rời" },
    ],
  };
  const { setOpen, open } = props;
  const [disabled, setDisabled] = useState(true);
  const draggleRef = useRef(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const rows = [header];

  return (
    <Modal
      title={
        <Text
          style={{
            width: "100%",
            cursor: "move",
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
        >
          Chọn Chuyến Tàu
        </Text>
      }
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      maskClosable={false}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          nodeRef={draggleRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
      width={700}
    >
      <Space>
        <Text>Tìm:</Text>
        <Input />
      </Space>

      <Card style={{ marginTop: "25px" }}>
        <ReactGrid
          rows={rows}
          columns={columns}
          enableFullWidthHeader
          enableFillHandle
          enableRangeSelection
          stickyTopRows={1}
        />
      </Card>
    </Modal>
  );
}

export default function VesselSelect() {
  const [openModalDraggle, setOpenModalDraggle] = useState(false);

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
              <VesselValue>Tên tàu:</VesselValue>
            </Space>
            <Flex gap="10px">
              <VesselButton>
                <DeleteOutlined style={{ fontSize: "13px" }} />
              </VesselButton>

              <VesselButton onClick={() => setOpenModalDraggle(true)}>
                <UnorderedListOutlined style={{ fontSize: "13px" }} />
              </VesselButton>
            </Flex>
          </Space>
        </Col>

        <Col span={24} style={{ borderBottom: "1px dashed" }}>
          <Space>
            <VesselLabel>Chuyến N/X:</VesselLabel>
            <VesselValue>VesselValue</VesselValue>
          </Space>
        </Col>

        <Col span={24}>
          <Row>
            <Col span={11} style={{ borderBottom: "1px dashed" }}>
              <Space>
                <VesselLabel>ETA:</VesselLabel>
                <VesselValue>VesselValue</VesselValue>
              </Space>
            </Col>
            <Col span={2}></Col>
            <Col span={11} style={{ borderBottom: "1px dashed" }}>
              <Space>
                <VesselLabel>ETD:</VesselLabel>
                <VesselValue>VesselValue</VesselValue>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <VesselModalSelect
        setOpen={setOpenModalDraggle}
        open={openModalDraggle}
      />
    </>
  );
}
