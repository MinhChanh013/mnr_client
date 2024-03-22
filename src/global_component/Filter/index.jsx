import { Col, Typography, Row, Divider, Space } from "antd";
import { Fragment } from "react";
import RadioGroupFilter from "./RadioGroupFilter";
import InputFilter from "./InputFilter";
import RangePickerFilter from "./RangePickerFilter";

const style = {
  borderColor: "#ffb13d",
  color: "#ffb13d",
  marginBottom: "5px",
};

const { Text } = Typography;

const pickComponent = (type) =>
  ({
    [filterType.radio]: RadioGroupFilter,
    [filterType.input]: InputFilter,
    [filterType.rangePicker]: RangePickerFilter,
  }[type]);

export const filterType = {
  radio: "radio",
  input: "input",
  rangePicker: "rangePicker",
};

export const Filter = (
  /** @type {{items: Array<{type: String, label: String, config: any}>, filterRef: any}} */ {
    items = [],
    filterRef = null,
  }
) => {
  return (
    <form ref={filterRef}>
      <Divider style={style}> Lọc dữ liệu </Divider>

      <Row gutter={[0, 5]}>
        {items.map(({ type, label, config }, index) => {
          const Component = pickComponent(type);

          return (
            <Fragment key={`${label}-${index}`}>
              <Col span={24}>
                <Text strong={true}>{label}</Text>
                <Space style={{ display: "block", marginTop: "5px" }}>
                  <Component {...config} />
                </Space>

                {items.length - 1 !== index && (
                  <Divider
                    style={{
                      marginTop: "10px",
                      borderColor: "#d1cccc",
                    }}
                  />
                )}
              </Col>
            </Fragment>
          );
        })}
      </Row>
    </form>
  );
};
