import * as React from "react";
import Table from '../../global_component/dataTable/customTable.js'
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import { Button, Card, Col, Divider, Input, Radio, Row, Space, Select } from 'antd';
import { CloudDownloadOutlined, SendOutlined } from '@ant-design/icons';

class Msg3668Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [{ tentau: '', hohieu: '', imo: '', ngaytau: '', sochuyen: '', sovandon: '', sodinhdanh: '', cntrno: '', sealno: '', fe: '', descript: '', khoathamchieu: '' }]

        };
        this.style = { borderColor: '#ffb13d', color: '#ffb13d', marginBottom: '2px' };
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
                <Row gutter={[8, 8]} style={{ marginTop: '10px' }} >
                    <Col span={24}>
                        <Card style={{ borderRadius: '0px' }} className='b-card' title='3668. GỬI GETIN CONTAINER'>
                            <Row gutter={[0, 0]}>
                                <Col span={24}>
                                    <VesselSelect />
                                </Col>
                                <Divider style={this.style}> Lọc dữ liệu </Divider>
                                <Col span={24}>
                                    <Row gutter={[24, 24]}>
                                        <Col span={24}>
                                            <Row style={{ alignItems: 'center' }}>
                                                <Col>
                                                    <Space>
                                                        <Radio.Group>
                                                            <Radio value={1}>Tất cả</Radio>
                                                            <Radio value={2}>Nhập</Radio>
                                                            <Radio value={3}>Xuất</Radio>
                                                            <Radio value={4}>Nội địa</Radio>
                                                        </Radio.Group>
                                                        <Divider className="b-vertical-divider" type="vertical" />
                                                        <Radio.Group>
                                                            <Radio value={1}>Hàng ngoại</Radio>
                                                            <Radio value={2}>Hàng nội</Radio>
                                                        </Radio.Group>
                                                        <Divider className="b-vertical-divider" type="vertical" />
                                                        <Radio.Group>
                                                            <Radio value={'F'}>Hàng</Radio>
                                                            <Radio value={'E'}>Rỗng</Radio>
                                                        </Radio.Group>
                                                        <Divider className="b-vertical-divider" style={{ marginLeft: '12px' }} type="vertical" />
                                                    </Space>
                                                </Col>
                                                <Col span={3}>
                                                    <Select
                                                        className="b-field"
                                                        placeholder="Trạng thái thông điệp"
                                                        options={[
                                                            { value: '1', label: 'Tất cả' },
                                                            { value: '2', label: '2' },
                                                            { value: '3', label: '3' },
                                                            { value: '4', label: '4' },
                                                        ]} />
                                                </Col>
                                                        <Divider className="b-vertical-divider" style={{ marginLeft: '12px' }} type="vertical" />
                                                <Col span={3}>
                                                    <Select
                                                        className="b-field"
                                                        placeholder="Trạng thái thông điệp"
                                                        options={[
                                                            { value: '1', label: 'Tất cả' },
                                                            { value: '2', label: '2' },
                                                            { value: '3', label: '3' },
                                                            { value: '4', label: '4' },
                                                        ]} />
                                                </Col>
                                                        <Divider className="b-vertical-divider" style={{ marginLeft: '12px' }} type="vertical" />
                                                <Col span={3}>
                                                    <Select
                                                        className="b-field"
                                                        placeholder="Trạng thái cont"
                                                        options={[
                                                            { value: 'all', label: 'Tất cả' },
                                                            { value: 's', label: 'Chưa ra' },
                                                            { value: 'c', label: 'Đã ra' },
                                                        ]} />
                                                </Col>
                                            </Row>
                                            <Button type="primary" icon={<CloudDownloadOutlined />} style={{ backgroundColor: '#50a81d', marginTop: '8px' }}>Nạp dữ liệu</Button>
                                        </Col>
                                        {/* <Col span={24}>
                                            <Row gutter={[8, 8]} style={{ alignItems: 'center' }}>
                                                <Col span={3}>
                                                    <Input
                                                        className="b-field"
                                                        placeholder="Nhập số cont"
                                                    />
                                                </Col>
                                                <Divider className="b-vertical-divider" style={{ marginLeft: '12px' }} type="vertical" />
                                                <Col span={3}>
                                                    <Select
                                                        className="b-field"
                                                        placeholder="Trạng thái thông điệp"
                                                        options={[
                                                            { value: '1', label: 'Tất cả' },
                                                            { value: '2', label: '2' },
                                                            { value: '3', label: '3' },
                                                            { value: '4', label: '4' },
                                                        ]} />
                                                </Col>
                                                <Col span={3}>
                                                    <Select
                                                        className="b-field"
                                                        placeholder="Trạng thái cont"
                                                        options={[
                                                            { value: 'all', label: 'Tất cả' },
                                                            { value: 's', label: 'Chưa ra' },
                                                            { value: 'c', label: 'Đã ra' },
                                                        ]} />
                                                </Col>
                                                <Divider className="b-vertical-divider" type="vertical" />
                                                <Button type="primary" icon={<CloudDownloadOutlined />} style={{ backgroundColor: '#50a81d' }}>Nạp dữ liệu</Button>
                                            </Row>
                                        </Col> */}
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card style={{ borderRadius: '0px', height: '100%' }} className="b-card">
                            <Row gutter={[8, 8]} >
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
                    </Col>
                </Row>
            </>
        );
    }
}
export default Msg3668Container;
