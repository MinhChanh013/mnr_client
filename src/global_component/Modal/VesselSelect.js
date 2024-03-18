import { useState } from "react";

import { Button, Card, Col, Flex, Modal, Row, Space, Typography } from "antd";
import { CloseOutlined, UnorderedListOutlined } from "@ant-design/icons";

import Table from "../dataTable/customTable";

import "./vessel-select.scss";
import { useMessage3668Context } from "../../contexts/Message3668Container";

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
  return (
    <Text style={{ minWidth: "100px", fontWeight: "bold" }}>{children}</Text>
  );
}

function VesselValue({ children }) {
  return <Text style={{ minWidth: "100px" }}>{children}</Text>;
}

function VesselModalSelect({ setOpen, open }) {
  const { tableRef, handleSelectRow } = useMessage3668Context();

  const columns = [
    { columnId: "select", width: 150 },
    { columnId: "VesselName", width: 165 },
    { columnId: "InboundVoyage", width: 165 },
    { columnId: "OutboundVoyage", width: 165 },
    { columnId: "ETA", width: 165 },
    { columnId: "ETD", width: 165 },
  ];
  const header = {
    rowId: "header",
    cells: [
      { type: "header", text: "Chọn" },
      { type: "header", text: "Tên Tàu" },
      { type: "header", text: "Chuyến Nhập" },
      { type: "header", text: "Chuyến Xuất" },
      { type: "header", text: "Ngày Cập" },
      { type: "header", text: "Ngày Rời" },
    ],
  };
  const dataTable = [
    {
      chon: "select",
      VesselName: "vessel 1",
      InboundVoyage: "123S",
      OutboundVoyage: "222B",
      ETA: "2022-11-18 11:07:09",
      ETD: "2022-11-20 11:08:20",
    },
  ];

  return (
    <Modal
      open={open}
      maskClosable={false}
      width={700}
      className="vessel-modal"
      onOk={() => {
        handleSelectRow();
        // setOpen(false)
      }}
      onCancel={() => setOpen(false)}
      title={
        <Text style={{ width: "100%", fontSize: "1rem" }}>Chọn Chuyến Tàu</Text>
      }
    >
      <Card className="vessel-select">
        <Table
          tableRef={tableRef}
          config={{ columns, header, dataSource: dataTable }}
        />
      </Card>
    </Modal>
  );
}

export default function VesselSelect() {
  const [openModal, setOpenModal] = useState(false);

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
            <Flex gap="5px">
              <VesselButton>
                <CloseOutlined style={{ fontSize: "13px" }} />
              </VesselButton>

              <VesselButton onClick={() => setOpenModal(true)}>
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
      <VesselModalSelect open={openModal} setOpen={setOpenModal} />
    </>
  );
}
