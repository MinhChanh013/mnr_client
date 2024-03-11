import * as React from "react";
import { Button, Col, Divider, Input, Row, Space, Typography } from 'antd';

class VesselSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [],
        };
        this.borderStyle = { borderBottom: '1px dashed' }
    }

    // rowid: text & cells [{}]
    componentDidMount() {
    }

    render() {
        return (
            <>
                <Row gutter={[24, 24]} style={{ alignItems: 'center' }}>
                    <Col span={3} style={{ justifyContent: 'center' }}>
                        <Button type='primary' style={{ marginTop: '1vh' }} block>Chọn chuyến tàu</Button>
                    </Col>
                    <Col span={8} style={this.borderStyle}>
                        <Space>
                            <Typography>
                                Tên tàu:
                            </Typography>
                            <Typography>
                                HAC
                            </Typography>
                        </Space>
                    </Col>
                    <Col>
                        <Typography>/</Typography>
                    </Col>
                    <Col span={4} style={this.borderStyle}>
                        <Space>
                            <Typography>
                                Chuyến N/X:
                            </Typography>
                            <Typography>
                                0024E / 0024W
                            </Typography>
                        </Space>
                    </Col>
                    <Col>
                        <Typography>/</Typography>
                    </Col>
                    <Col span={3} style={this.borderStyle}>
                        <Space>
                            <Typography>
                                ETA:
                            </Typography>
                            <Typography>
                                27/02/2024
                            </Typography>
                        </Space>
                    </Col>
                    <Col>
                        <Typography>/</Typography>
                    </Col>
                    <Col span={3} style={this.borderStyle}>
                        <Space>
                            <Typography>
                                ETD:
                            </Typography>
                            <Typography>
                                29/02/2024
                            </Typography>
                        </Space>
                    </Col>
                </Row>
            </>
        );
    }
}
export default VesselSelect;
