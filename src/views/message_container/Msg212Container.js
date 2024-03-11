import * as React from "react";
import Table from '../../global_component/dataTable/customTable.js'
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import { Card, Row, Col, Space, Input, Divider, Button } from 'antd';
import { CloudDownloadOutlined, SendOutlined } from '@ant-design/icons';

class Msg212Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [{ tentau: '', hohieu: '', imo: '', ngaytau: '', sochuyen: '', sovandon: '', sodinhdanh: '', cntrno: '', sealno: '', fe: '', descript: '', khoathamchieu: '' }]
        };
        this.columns = [
            { columnId: 'tentau', width: 150 },
            { columnId: 'hohieu', width: 150 },
            { columnId: 'imo', width: 150 },
            { columnId: 'ngaytau', width: 150 },
            { columnId: 'sochuyen', width: 150 },
            { columnId: 'sovandon', width: 150 },
            { columnId: 'sodinhdanh', width: 150 },
            { columnId: 'cntrno', width: 150 },
            { columnId: 'sealno', width: 150 },
            { columnId: 'fe', width: 150 },
            { columnId: 'descript', width: 150 },
            { columnId: 'khoathamchieu', width: 150 },
        ];
        this.header = {
            rowId: 'header',
            cells:
                [
                    { type: 'header', text: 'Tên Tàu' },
                    { type: 'header', text: 'Hô Hiệu Tàu' },
                    { type: 'header', text: 'Số IMO' },
                    { type: 'header', text: 'Ngày Tàu Đến/Đi' },
                    { type: 'header', text: 'Số vận đơn' },
                    { type: 'header', text: 'Số Chuyến' },
                    { type: 'header', text: 'Số Định Danh' },
                    { type: 'header', text: 'Số Container' },
                    { type: 'header', text: 'Số Chì' },
                    { type: 'header', text: 'Full/Empty' },
                    { type: 'header', text: 'Mô Tả HH' },
                    { type: 'header', text: 'Khóa Tham Chiếu' },
                ]
        };
    }

    // rowid: text & cells [{}]
    componentDidMount() {
    }

    render() {
        return (
            <>
                <Card style={{ marginTop: '10px' }} title='212. CONTAINER ĐƯỢC XẾP DỠ XUỐNG CẢNG/KHO/BÃI'>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <VesselSelect />
                        </Col>
                        <Col span={3} style={{ marginTop: '8px' }}>
                            <Button style={{ backgroundColor: '#50a81d' }} type='primary'>Nạp dữ liệu</Button>
                        </Col>
                    </Row>
                </Card >
                <Card style={{ marginTop: '10px' }}>
                    <Row gutter={[8, 8]}>
                        <Col span={24} style={{ justifyContent: 'space-between' }}>
                            <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                <Col>
                                    <Space>
                                        <p>Tìm:</p>
                                        <Input />
                                    </Space>
                                </Col>
                                <Col>
                                    <Button type="primary" icon={<SendOutlined />} style={{ backgroundColor: '#f5a442' }}>Gửi thông điệp</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Divider className="b-horizontal-divider" />
                        <Col span={24}>
                            <Table config={{ columns: this.columns, header: this.header, dataSource: this.state.dataTable }} />
                        </Col>
                    </Row>
                </Card>
            </>
        );
    }
}
export default Msg212Container;
