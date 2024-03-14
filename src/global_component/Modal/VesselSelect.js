import * as React from "react";
import { Button, Col, Row, Space, Typography } from 'antd';
import { UnorderedListOutlined } from "@ant-design/icons";
const { Text } = Typography

class VesselSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
        };
        this.borderStyle = { borderBottom: '1px dashed' };
        this.textStyle = { fontSize: '16px' }
    }

    // rowid: text & cells [{}]
    componentDidMount() {
    }

    render() {
        return (
            <>
                <Row gutter={[4, 4]} style={{ alignItems: 'center' }}>
                    <Col span={24} style={{ justifyContent: 'center' }}>
                    </Col>
                    <Col span={23} style={this.borderStyle}>
                        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                            <Space>
                                <Text style={this.textStyle}>
                                    Tên tàu:
                                </Text>
                                <Text style={this.textStyle}>
                                    HAC
                                </Text>
                            </Space>
                            <Button
                                style={{ backgroundColor: '#f3f3f3', width: '2vw' }}
                                block
                                icon={<UnorderedListOutlined />}>
                            </Button>
                        </Space>
                    </Col>
                    <Col span={23} style={this.borderStyle}>
                        <Space>
                            <Text style={this.textStyle}>
                                Chuyến N/X:
                            </Text>
                            <Text style={this.textStyle}>
                                0024E / 0024W
                            </Text>
                        </Space>
                    </Col>
                    <Col span={11} style={this.borderStyle}>
                        <Space>
                            <Text style={this.textStyle}>
                                ETA:
                            </Text>
                            <Text style={this.textStyle}>
                                27/02/2024
                            </Text>
                        </Space>
                    </Col>
                    /
                    <Col span={11} style={this.borderStyle}>
                        <Space>
                            <Text style={this.textStyle}>
                                ETD:
                            </Text>
                            <Text style={this.textStyle}>
                                29/02/2024
                            </Text>
                        </Space>
                    </Col>
                </Row>
            </>
        );
    }
}
export default VesselSelect;
