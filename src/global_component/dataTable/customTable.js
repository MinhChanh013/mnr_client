import * as React from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import '../../assets/css/ReactGrid-css/custom.css';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTable: []
        };
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
                    obj['checked'] = true;
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
        );
    }
}
export default Table;