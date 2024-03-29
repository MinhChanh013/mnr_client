import { Col, Typography, Row, Divider, Space, Form } from "antd";
import { Fragment, useMemo } from "react";
import RadioGroupFilter from "./RadioGroupFilter";
import InputFilter from "./InputFilter";
import RangePickerFilter from "./RangePickerFilter";
import TextAreaFilter from "./TextAreaFilter";
import CheckboxFilter from "./CheckboxFilter";

const { Text } = Typography;

const pickComponent = (type) =>
({
  [filterType.radio]: RadioGroupFilter,
  [filterType.input]: InputFilter,
  [filterType.rangePicker]: RangePickerFilter,
  [filterType.textarea]: TextAreaFilter,
  [filterType.checkbox]: CheckboxFilter,
}[type]);

export const filterType = {
  radio: "radio",
  input: "input",
  rangePicker: "rangePicker",
  textarea: "textarea",
  checkbox: "checkbox",
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
      <Row gutter={[0, 0]} style={{ marginTop: '10px' }}>
        {items.map(({ type, label, config, divider }, index) => {
          const Component = pickComponent(type);
          return (
            <Fragment key={`${label}-${index}`}>
              <Col span={type === 'input' ? 8 :  24} >
                <Typography style={config.style || {}} strong={true}>{label}</Typography>
              </Col>
              <Col span={type === 'input' ? 16 : 24}>
                <Form.Item name={config.name} >
                  <Component {...config} />
                </Form.Item>
              </Col>
              {
              divider === true
                ?
                <>
                  {items.length - 1 !== index && (
                    <Divider
                      style={{
                        marginTop: "10px",
                        borderColor: "#d1cccc",
                      }}
                    />
                  )}
                </>
                : ''
            }
            </Fragment>
          );
        })}
      </Row>
    </Form>
  );
};
