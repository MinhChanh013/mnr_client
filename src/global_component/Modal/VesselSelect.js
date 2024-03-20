import { useState } from "react";
import { Button, Card, Col, Flex, Modal, Row, Space, Typography } from "antd";
import { CloseOutlined, UnorderedListOutlined } from "@ant-design/icons";

import Table from "../dataTable/customTable";

import "./vessel-select.scss";

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

export default function VesselSelect() {
  const [vessel, setVessel] = useState({});
  const [display, setDisplay] = useState({});
  const [open, setOpen] = useState(false);
  const columns = [
    { columnId: "select", width: 150 },
    { columnId: "VesselName", width: 165 },
    { columnId: "InboundVoyage", width: 165 },
    { columnId: "OutboundVoyage", width: 165 },
    { columnId: "ETA", width: 165 },
    { columnId: "ETD", width: 165 },
    { columnId: "VOYAGEKEY", width: 0 },
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
      { type: "header", text: "VOYAGEKEY" },
    ],
  };
  const dataTable = [
    {
      chon: "select",
      InboundVoyage: "123S",
      VesselName: "vessel 1",
      OutboundVoyage: "222B",
      ETA: "2022-11-18 11:07:09",
      ETD: "2022-11-20 11:08:20",
      VOYAGEKEY: 'ASDKASDAS'
    },
  ];

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
                {
                  Object.values(vessel).length > 0
                    ?
                    vessel.VesselName
                    : ''
                }
              </VesselValue>
            </Space>
            <Flex gap="5px">
              <VesselButton>
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
              {
                Object.values(vessel).length > 0
                  ?
                  vessel?.InboundVoyage + ' / ' + vessel?.OutboundVoyage
                  : ''
              }
            </VesselValue>
          </Space>
        </Col>

        <Col span={24}>
          <Row>
            <Col span={11} style={{ borderBottom: "1px dashed" }}>
              <Space>
                <VesselLabel>ETA:</VesselLabel>
                <VesselValue>
                {
                  Object.values(vessel).length > 0
                    ?
                    vessel.ETA
                    : ''
                }

                </VesselValue>
              </Space>
            </Col>
            <Col span={2}></Col>
            <Col span={11} style={{ borderBottom: "1px dashed" }}>
              <Space>
                <VesselLabel>ETD:</VesselLabel>
                <VesselValue>
                {
                  Object.values(vessel).length > 0
                    ?
                    vessel.ETD
                    : ''
                }

                </VesselValue>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      < Modal
        open={open}
        maskClosable={false}
        width={700}
        className="vessel-modal"
        onOk={() => {
          setOpen(false)
        }}
        onCancel={() => setOpen(false)}
        title={
          <Text style={{ width: "100%", fontSize: "1rem" }}>Chọn Chuyến Tàu</Text>
        }
      >
        <Card className="vessel-select">
          <Table
            config={{ columns, header, dataSource: dataTable }}
            handleSelect={(vesselData) => {
              let obj = {}
              vesselData[0].cells.filter(p => p.column).map(p => obj[p.column] = p.text);
              setVessel(obj);
              setDisplay(obj);
            }}
          />
        </Card>
      </Modal>
    </>
  );
}
