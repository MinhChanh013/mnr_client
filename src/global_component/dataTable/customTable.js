/* eslint-disable react-hooks/exhaustive-deps */
import { FileExcelTwoTone, SearchOutlined } from "@ant-design/icons";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { Button, Col, Divider, Input, Row, Space } from "antd";
import * as React from "react";
import "../../assets/css/ReactGrid-css/custom.css";
import "../../assets/scss/custom-table.scss";

const dividerStyle = { margin: "5px 0 5px", borderColor: "#dededede" };

const Table = ({ config, tableRef }) => {
  const { dataSource, header, footer, columns } = config
  const [dataTable, setDataTable] = React.useState([])

  React.useEffect(() => {
    handleGetDataTable(dataSource)
  }, [dataSource])

  const handleGetDataTable = (dataTable) => {
    const temp = dataTable?.map((item, idx) => ({
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

    let row
    if (temp) {
      row = [header, ...temp];
    } else {
      row = [header];
    }
    setDataTable(row)
  }

  const handelSearch = (valueText) => {
    const dataTableSearch = dataSource.filter((data) => {
      return Object.values(data).some(value => value.toLowerCase().includes(valueText.toLowerCase()));
    })

    handleGetDataTable(dataTableSearch)
  }

  return (
    <Row>
      <Col span={24} >
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Space >
            <p>Tìm:</p>
            <Input
              onChange={(e) => { handelSearch(e.target.value) }} />
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
      <Divider style={{ margin: '5px 0 5px', borderColor: '#dededede' }} />
      <Col span={24}>
        <div className="b-table">
          <ReactGrid
            ref={tableRef}
            enableRangeSelection
            rows={dataTable}
            columns={columns}
            onCellsChanged={(changedCell) => {
              let tempTable = [...dataTable];
              tempTable.map((item) => {
                if (item.rowId === changedCell[0]?.rowId) {
                  item.cells[changedCell[0]?.newCell.index].text = changedCell[0]?.newCell.text;
                }
                return item;
              });
              setDataTable(tempTable)
            }}
          />
        </div>
        <Divider style={dividerStyle} />

      </Col>
    </Row>
  );
}
export default Table;
