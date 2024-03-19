import * as React from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "../../assets/css/ReactGrid-css/custom.css";
import "../../assets/scss/custom-table.scss";
import { Col, Row, Space, Input, Divider, Button } from "antd";
import { FileExcelTwoTone, SearchOutlined } from "@ant-design/icons";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: [],
      filterData: ''
    };
    this.dividerStyle = { margin: "5px 0 5px", borderColor: "#dededede" };
    this.columns = this.props.config?.columns || [];
  }

  // rowid: text & cells: [{}]
  componentDidMount() {
    let row;
    let loadedData = this.props.config?.dataSource;
    let header = this.props.config?.header;
    let temp = loadedData?.map((item, idx) => ({
      rowId: idx,
      cells: Object.values(item)?.map((values, i) => {
        if (values === "select") {
          let obj = {};
          obj["type"] = "checkbox";
          obj["checked"] = false;
          obj["index"] = i;
          return obj;
        } else {
          let obj = {};
          obj["type"] = "text";
          obj["text"] = values;
          obj["index"] = i;
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
      dataTable: row,
    });
  }


  render() {
    return (
      <Row>
        <Col span={24} >
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Space >
              <p>Tìm:</p>
              <Input
                onChange={(e) => {
                  this.setState({
                    filterData: e.target.value
                  })
                }} />
              <Divider type="vertical" style={this.dividerStyle} />
              <SearchOutlined />
            </Space>
            {
              this.props.config.footer === true ?
                <Col span={24}>
                  <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Space>
                      {
                        this.state.dataTable.filter(p => p.selected === true).length > 0
                          ?
                          'Đã chọn:' `${this.state.dataTable.filter(p => p.selected === true).length || 0}`
                          : ''
                      }
                      <Space size={5} style={{ fontWeight: 'bold', fontSize: '13px' }}>
                        Số dòng: &nbsp; {this.state.dataTable.filter(p => p.rowId !== 'header').length || 0}
                        <Divider type="vertical" style={this.dividerStyle} />
                        Thành công: &nbsp; {this.state.dataTable.filter(p => p.STATUS === 'SUCCESS').length || 0}
                        <Divider type="vertical" style={this.dividerStyle} />

                        Thất bại: &nbsp; {this.state.dataTable.filter(p => p.STATUS === 'FAIL').length || 0}
                        <Divider type="vertical" style={this.dividerStyle} />
                        Chưa gửi: &nbsp; {this.state.dataTable.filter(p => p.STATUS === 'READY').length || 0}

                        <Divider type="vertical" style={this.dividerStyle} />
                        <Button icon={<FileExcelTwoTone />} size='small' />
                      </Space>
                    </Space>
                  </Space>
                </Col>
                : ''
            }
          </Space>
        </Col>
        <Divider style={{ margin: '5px 0 5px', borderColor: '#dededede' }} />
        <Col span={24}>
          <div className="b-table">
            <ReactGrid
              ref={this.props.tableRef}
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

        </Col>
      </Row>
    )
  }
}
export default Table;
