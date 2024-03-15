import * as React from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import '../../assets/css/ReactGrid-css/custom.css';
import '../../assets/scss/custom-table.scss';
import { Col, Row, Space, Input, Divider, Button } from "antd";
import { FileExcelTwoTone, SearchOutlined } from "@ant-design/icons";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []
        };
        this.dividerStyle = { margin: '5px 0 5px', borderColor: '#dededede' };
        this.columns = this.props.config?.columns || []
    }

    // rowid: text & cells: [{}]
    componentDidMount() {
        let row;
        let loadedData = this.props.config?.dataSource;
        let header = this.props.config?.header
        let temp = loadedData?.map((item, idx) => ({
            rowId: idx,
            cells: Object.values(item)?.map((values, i) => {
                if (values === 'select') {
                    let obj = {};
                    obj['type'] = 'checkbox';
                    obj['checked'] = false;
                    obj['index'] = i;
                    return obj;
                } else {
                    let obj = {};
                    obj['type'] = 'text';
                    obj['text'] = values;
                    obj['index'] = i;
                    return obj;
                }
            }),
        }));
        if (temp) {
            row = [header, ...temp];
        } else {
            row = [header];
        }
        console.log(row);
        this.setState({
            dataTable: row
        })
    }

    render() {
        return (
            <Row>
                <Col span={24} >
                    <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                        <Space >
                            <p>Tìm:</p>
                            <Input />
                        </Space>
                        {
                            this.state.dataTable.filter(p => p.selected === true).length > 0
                                ?
                                <Space style={{ fontSize: '13px' }}>
                                    Đã chọn: {this.state.dataTable.filter(p => p.selected === true).length || 0}
                                </Space>
                                : ''
                        }
                        <Button icon={<SearchOutlined />}>Tìm kiếm nâng cao</Button>
                    </Space>
                </Col>
                <Divider style={{ margin: '5px 0 5px', borderColor: '#dededede' }} />
                <Col span={24}>
                    <div className="b-table">
                        <ReactGrid
                            enableRangeSelection
                            rows={this.state.dataTable}
                            columns={this.columns}
                            onCellsChanged={(changedCell) => {
                                let tempTable = [...this.state.dataTable];
                                tempTable.map((item) => {
                                    if (item.rowId === changedCell[0]?.rowId) {
                                        item.cells[changedCell[0]?.newCell.index].text = changedCell[0]?.newCell.text;
                                    }
                                    return item;
                                });
                                this.setState({
                                    dataTable: tempTable
                                });
                            }}
                        />
                    </div>
                    <Divider style={this.dividerStyle} />
                    {
                        this.props.config.footer === true ?
                            <Col span={24}>
                                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                                    <Space>
                                        <Button icon={<FileExcelTwoTone />} size='small'>Xuất Excel</Button>
                                        <Space size={20} style={{ fontWeight: 'bold', fontSize: '13px' }}>
                                            Chưa gửi: &nbsp; {this.state.dataTable.filter(p => p.STATUS === 'READY').length || 0}
                                            <Divider type="vertical" style={this.dividerStyle} />

                                            Thành công: &nbsp; {this.state.dataTable.filter(p => p.STATUS === 'SUCCESS').length || 0}
                                            <Divider type="vertical" style={this.dividerStyle} />

                                            Thất bại: &nbsp; {this.state.dataTable.filter(p => p.STATUS === 'FAIL').length || 0}
                                        </Space>
                                    </Space>
                                    <Space style={{ fontWeight: 'bold', fontSize: '13px' }}>
                                        Số dòng: &nbsp; {this.state.dataTable.filter(p => p.rowId !== 'header').length || 0}
                                    </Space>
                                </Space>
                                <Divider style={{ margin: '5px 0 5px', borderColor: '#dededede' }} />
                            </Col>
                            : ''
                    }
                </Col>
            </Row>

        );
    }
}
export default Table;