import * as React from "react";
import Table from '../../global_component/dataTable/customTable.js'
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import { Card, Col, Divider, Radio, Row, Typography } from 'antd';
import { ButtonType } from "../../global_component/EventButton/ButtonType.js";
import { EventButtons } from "../../global_component/EventButton/buttons.js";
const { Text } = Typography;
class Msg3668Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: [{ chon: 'select', tentau: '', imo: '', sovandon: '', sodinhdanh: '', socontainer: '', ngaygetin: '', abc: '', chuyentau: '', nhapxuat: '' }],

        };
        this.style = { borderColor: '#ffb13d', color: '#ffb13d', marginBottom: '2px' };
        this.columns = [
            { columnId: 'select', width: 150 },
            { columnId: 'tentau', width: 150 },
            { columnId: 'imo', width: 150 },
            { columnId: 'sovandon', width: 150 },
            { columnId: 'sodinhdanh', width: 150 },
            { columnId: 'socontainer', width: 150 },
            { columnId: 'ngaygetin', width: 150 },
            { columnId: 'abc', width: 150 },
            { columnId: 'chuyentau', width: 150 },
            { columnId: 'nhapxuat', width: 150 },
        ];
        this.header = {
            rowId: 'header',
            cells:
                [
                    { type: 'header', text: 'Chọn' },
                    { type: 'header', text: 'Tên Tàu' },
                    { type: 'header', text: 'Số IMO' },
                    { type: 'header', text: 'Số Vận Đơn' },
                    { type: 'header', text: 'Số Định Danh' },
                    { type: 'header', text: 'Số Container' },
                    { type: 'header', text: 'Ngày Getin' },
                    { type: 'header', text: 'ABC' },
                    { type: 'header', text: 'Chuyến Tàu' },
                    { type: 'header', text: 'Nhập/Xuất' },
                ]
        };
    }

    // rowid: text & cells [{}]
    componentDidMount() {
    }

    render() {
        return (
            <>
                <Row gutter={[16, 16]} style={{ marginTop: '15px' }}>
                    <Col span={7}>
                        <Card title='366.8 - GỬI GETIN CONTAINER' style={{ borderRadius: '0px' }} className='b-card'>
                            <Row>
                                <Col span={24}>
                                    <EventButtons config={{ type: ButtonType.LOAD }} />
                                    <Divider style={{ margin: '5px 0 5px', borderColor: '#dededede' }} />
                                </Col>
                                <Col span={24}>
                                    <VesselSelect />
                                </Col>
                                <Divider style={this.style}> Lọc dữ liệu </Divider>
                                <Col span={24}>
                                    <Row gutter={[8, 8]}>
                                        <Col span={24}>
                                            <Text strong={true}>Hướng</Text>
                                        </Col>
                                        <Col span={24}>
                                            <Radio.Group>
                                                <Radio value={1}>Tất cả</Radio>
                                                <Radio value={2}>Nhập</Radio>
                                                <Radio value={3}>Xuất</Radio>
                                                <Radio value={4}>Nội địa</Radio>
                                            </Radio.Group>
                                        </Col>
                                        <Divider style={{ marginTop: '1px', marginBottom: '1px', borderColor: '#d1cccc' }} />
                                        <Col span={24}>
                                            <Text strong={true}>Hàng Nội / Ngoại</Text>
                                        </Col>
                                        <Col span={24}>
                                            <Radio.Group>
                                                <Radio value={1}>Tất cả</Radio>
                                                <Radio value={2}>Hàng ngoại</Radio>
                                                <Radio value={3}>Hàng nội</Radio>
                                            </Radio.Group>
                                        </Col>
                                        <Divider style={{ marginTop: '1px', marginBottom: '1px', borderColor: '#d1cccc' }} />
                                        <Col span={24}>
                                            <Text strong={true}>Hàng / Rỗng</Text>
                                        </Col>
                                        <Col span={24} >
                                            <Radio.Group>
                                                <Radio value={'A'}>Tất cả</Radio>
                                                <Radio value={'F'}>Hàng</Radio>
                                                <Radio value={'E'}>Rỗng</Radio>
                                            </Radio.Group>
                                        </Col>
                                        <Divider style={{ marginTop: '1px', marginBottom: '1px', borderColor: '#d1cccc' }} />
                                        <Col span={24}>
                                            <Text strong={true}>Trạng thái thông điệp</Text>
                                        </Col>
                                        <Col span={24}>
                                            <Radio.Group>
                                                <Radio value={'all'}>Tất cả</Radio>
                                                <Radio value={'s'}>Thành công</Radio>
                                                <Radio value={'c'}>Thất bại</Radio>
                                                <Radio value={'n'}>Chưa gửi</Radio>
                                            </Radio.Group>
                                        </Col>
                                        <Divider style={{ marginTop: '1px', marginBottom: '1px', borderColor: '#d1cccc' }} />
                                        <Col span={24}>
                                            <Text strong={true}>Trạng thái container ra khỏi cảng</Text>
                                        </Col>
                                        <Col span={24}>
                                            <Radio.Group>
                                                <Radio value={'all'}>Tất cả</Radio>
                                                <Radio value={'s'}>Chưa ra </Radio>
                                                <Radio value={'c'}>Đã ra </Radio>
                                            </Radio.Group>
                                        </Col>
                                        <Col style={{ margin: 'auto' }}>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={17}>
                        <Card style={{ borderRadius: '0px', height: '100%' }} className="b-card">
                            <Table config={{ columns: this.columns, header: this.header, dataSource: this.state.dataTable, footer: true }} />
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
}
export default Msg3668Container;