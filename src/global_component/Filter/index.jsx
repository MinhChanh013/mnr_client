import {
  Col,
  DatePicker,
  Input,
  Typography,
  Radio,
  Row,
  Divider,
  Space,
} from "antd";
import { Fragment } from "react";

const { Text } = Typography;

export const RadioGroupFilter = ({
  options = [],
  name = "",
  defaultValue = [0],
}) => {
  return (
    <Radio.Group
      name={name}
      defaultValue={defaultValue}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "5px",
      }}
    >
      {options.map(({ value, label }) => (
        <Radio value={value}>{label}</Radio>
      ))}
    </Radio.Group>
  );
};

export const InputFilter = ({ name = "", placeholder = "" }) => {
  return <Input name={name} placeholder={placeholder} />;
};

const { RangePicker } = DatePicker;
export const RangePickerFilter = ({ name = "", placeholder = "" }) => {
  return (
    <RangePicker
      style={{ width: "100%" }}
      name={name}
      placeholder={placeholder}
    />
  );
};

export const filterType = {
  radio: "radio",
  input: "input",
  rangePicker: "rangePicker",
};
const pickComponent = (type) =>
  ({
    [filterType.radio]: RadioGroupFilter,
    [filterType.input]: InputFilter,
    [filterType.rangePicker]: RangePickerFilter,
  }[type]);

const style = {
  borderColor: "#ffb13d",
  color: "#ffb13d",
  marginBottom: "5px",
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
            <Fragment>
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
