import { Col, Divider, Form, Row, Typography } from "antd";
import { Fragment, useMemo } from "react";
import CheckboxFilter from "./CheckboxFilter";
import InputFilter from "./InputFilter";
import RadioGroupFilter from "./RadioGroupFilter";
import RangePickerFilter from "./RangePickerFilter";
import TextAreaFilter from "./TextAreaFilter";
import SelectFilter from "./SelectFilter";

import "./Filter.scss";

const { Text } = Typography;
const pickComponent = (type) =>
  ({
    [filterType.radio]: RadioGroupFilter,
    [filterType.input]: InputFilter,
    [filterType.rangePicker]: RangePickerFilter,
    [filterType.textarea]: TextAreaFilter,
    [filterType.checkbox]: CheckboxFilter,
    [filterType.select]: SelectFilter,
  }[type]);

export const filterType = {
  radio: "radio",
  input: "input",
  rangePicker: "rangePicker",
  textarea: "textarea",
  checkbox: "checkbox",
  select: "select",
};

export const Filter = (
  /** @type {{items: Array<{type: String, label: String, config: any}>, form: FormInstance<any>}} */ {
    items = [],
    form = null,
  }
) => {
  const initValues = useMemo(() => {
    const result = items.reduce((init, { config }) => {
      init[config["name"]] = config["defaultValue"];
      return init;
    }, {});

    return result;
  }, [items]);

  return (
    <Form form={form} initialValues={initValues}>
      <Row gutter={[0, 0]} style={{ marginTop: "10px" }}>
        {items.map(({ type, label, config, divider = true }, index) => {
          const Component = pickComponent(type);
          return (
            <Fragment key={`${label}-${index}`}>
              <Col span={type === "input" ? 8 : 24}>
                <Text style={config.style || {}} strong>
                  {label}
                </Text>
              </Col>
              <Col span={type === "input" ? 16 : 24}>
                <Form.Item style={{ marginBottom: "4px" }} name={config.name}>
                  <Component {...config} />
                </Form.Item>
              </Col>
              {divider === true ? (
                <>
                  {items.length - 1 !== index && (
                    <Divider
                      style={{
                        margin: "10px 0px",
                        borderColor: "#d1cccc",
                      }}
                    />
                  )}
                </>
              ) : (
                ""
              )}
            </Fragment>
          );
        })}
      </Row>
    </Form>
  );
};
