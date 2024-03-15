import { Flex, Input, Typography } from "antd";

const { Text } = Typography;

function VesselLabel({ children }) {
  return <Text style={{ minWidth: "100px" }}>{children}</Text>;
}
function VesselInput({ value }) {
  return <Input readOnly style={{ flex: 1 }} size="middle" value={value} />;
}

export default function VesselSelect() {
  return (
    <Flex style={{ flexDirection: "column", gap: "10px" }}>
      <label style={{ width: "100%" }}>
        <Flex align="center">
          <VesselLabel>Tên Tàu</VesselLabel>
          <VesselInput value="" />
        </Flex>
      </label>
      <label style={{ width: "100%" }}>
        <Flex align="center">
          <VesselLabel>Chuyến N/X</VesselLabel>
          <VesselInput value="" />
        </Flex>
      </label>
      <label style={{ width: "100%" }}>
        <Flex align="center">
          <VesselLabel>ETA/ETD</VesselLabel>
          <VesselInput value="" />
        </Flex>
      </label>
    </Flex>
  );
}
