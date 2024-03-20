/* eslint-disable react-hooks/exhaustive-deps */
import { FileExcelTwoTone, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Space } from "antd";
import * as React from "react";
import "../../assets/css/ReactGrid-css/custom.css";
import "../../assets/scss/custom-table.scss";
import { defineCustomElements } from "@revolist/revogrid/loader";
import { RevoGrid } from "@revolist/revogrid-react";

const dividerStyle = { margin: "5px 0 5px", borderColor: "#dededede" };

const RevoTable = ({ config, tableRef }) => {
    const { dataSource, header, footer, columns } = config
    const [dataTable, setDataTable] = React.useState([])
    defineCustomElements();

    return (
        <Row>
            <Col span={24} >

            </Col>
            <Divider style={{ margin: '3px 0 5px', borderColor: '#dededede' }} />
            <Col span={24}>
                <div>
                    <RevoGrid
                        autoSize={true}
                        resize={true}
                        autoSizeColumn={true}
                        theme={'compact'}
                        exporting={true}
                        columns={columns}
                        source={dataSource}
                        onAfteredit={(e) => {
                            console.log(e.detail);
                        }}
                    />
                </div>
                <Divider style={dividerStyle} />
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Space style={{ paddingTop: '' }}>
                        <p>Tìm:</p>
                        <Input
                            onChange={(e) => { }} />
                        <Divider type="vertical" style={dividerStyle} />
                        <SearchOutlined />
                    </Space>
                    {
                        footer === true ?
                            <Col span={24}>
                                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                                    <Space>
                                        {
                                            dataTable.filter(p => p.selected === true).length > 0
                                                ?
                                                'Đã chọn:' `${dataTable.filter(p => p.selected === true).length || 0}`
                                                : ''
                                        }
                                        <Space size={5} style={{ fontWeight: 'bold', fontSize: '13px' }}>
                                            Số dòng: &nbsp; {dataTable.filter(p => p.rowId !== 'header').length || 0}
                                            <Divider type="vertical" style={dividerStyle} />
                                            Thành công: &nbsp; {dataTable.filter(p => p.STATUS === 'SUCCESS').length || 0}
                                            <Divider type="vertical" style={dividerStyle} />

                                            Thất bại: &nbsp; {dataTable.filter(p => p.STATUS === 'FAIL').length || 0}
                                            <Divider type="vertical" style={dividerStyle} />
                                            Chưa gửi: &nbsp; {dataTable.filter(p => p.STATUS === 'READY').length || 0}

                                            <Divider type="vertical" style={dividerStyle} />
                                            <Button icon={<FileExcelTwoTone />} size='small' />
                                        </Space>
                                    </Space>
                                </Space>
                            </Col>
                            : ''
                    }
                </Space>
            </Col>
        </Row>

    );
}
export default RevoTable;

