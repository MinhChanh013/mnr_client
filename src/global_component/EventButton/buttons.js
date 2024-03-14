import * as React from "react";
import { Button, Space, Row, Col } from "antd";
import { ButtonType } from "./ButtonType";
import { CloudDownloadOutlined, SendOutlined } from "@ant-design/icons";
export class EventButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let props = this.props.config
        for (let i = 0; i < props.length; i++) {
            
          }
        return (
            <Row gutter={[24,24]}>
                {
                    props?.type === ButtonType.LOAD || props?.type === ButtonType.ALL
                        ?
                        <Col span={4}>
                            <Button size='small' type="primary" icon={<CloudDownloadOutlined />} style={{ backgroundColor: '#2399fa' }}>Nạp</Button>
                        </Col>
                        : ''
                }
                {
                    props?.type === ButtonType.SEND || props?.type === ButtonType.ALL
                        ?
                        <Col span={4}>
                            <Button type="primary" icon={<SendOutlined />} style={{ backgroundColor: '#f5a442' }}>Gửi</Button>
                        </Col>
                        : ''
                }
                {
                    props?.type === ButtonType.CANCEL || props?.type === ButtonType.ALL
                        ?
                        <Col span={4}>
                            <Button type="primary" icon={<SendOutlined />} style={{ backgroundColor: '#f54f40' }}>Hủy gửi</Button>
                        </Col>
                        : ''
                }
                {
                    props?.type === ButtonType.CANCEL_GETIN || props?.type === ButtonType.ALL
                        ?
                        <Col span={4}>
                            <Button type="primary" icon={<SendOutlined />} style={{ backgroundColor: '#f54f40' }}>Hủy Getin</Button>
                        </Col>
                        : ''
                }
                {
                    props?.type === ButtonType.SAVE || props?.type === ButtonType.ALL
                        ?
                        <Col span={4}>
                            <Button type="primary" icon={<SendOutlined />} style={{ backgroundColor: '#50a81d' }}>Lưu</Button>
                        </Col>
                        : ''
                }
            </Row>
        )
    }
}