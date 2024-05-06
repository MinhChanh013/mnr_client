/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Flex, Row, Typography, Space } from "antd";
import * as React from "react";
import DataGrid, {
    columnTypes,
    selectionTypes,
    paginationTypes
} from "../../global_component/DataGrid/index.jsx";
import ToolBar, {
    toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";
import SearchBox from "../../global_component/SearchBox/index.jsx";
const { Title } = Typography;

export default function User() {
    const onFocus = () => { };
    const gridRef = React.createRef();
    const [dataTable, setDataTable] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    const NewItem = [
        {
            CntrSztp: "",
            IsoSztp: "",
            ContType: "",
            ContSize: "",
        },
    ];
    const columns = basicRenderColumns([
        {
            key: "ID",
            name: "ID",
            width: 180,
            visible: true,
        },
        {
            key: "STT",
            name: "STT",
            width: 100,
        },
        {
            key: "group_user",
            name: "Nhóm người dùng",
            width: 180,
            type: columnTypes.TextEditor,
            editable: true
        },
        {
            key: "username",
            name: "Tên đăng nhập",
            width: 180,
            type: columnTypes.TextEditor,
            editable: true
        },
        {
            key: "fullname",
            name: "Họ và tên",
            width: 180,
            type: columnTypes.TextEditor,
            editable: true
        },
        {
            key: "password",
            name: "Mật khẩu",
            width: 180,
            type: columnTypes.Password,
            editable: true
        },
        {
            key: "birthday",
            name: "Ngày sinh",
            width: 180,
            type: columnTypes.DatePicker,
            editable: true
        },
        {
            key: "email",
            name: "Email",
            width: 180,
            type: columnTypes.TextEditor,
            editable: true
        },
        {
            key: "telephone",
            name: "SĐT",
            width: 180,
            type: columnTypes.TextEditor,
            editable: true
        },
        {
            key: "status",
            name: "Trạng thái",
            width: 180,
            type: columnTypes.Checkbox,
            editable: true
        },
    ]);

    function removeRow(index) {
        const newRow = [...rows];
        newRow.splice(index, 1);
        setRows(newRow);
    }
    const buttonConfirm = (props) => {
        switch (props.type) {
            case "delete":
                removeRow(1);
                break;
            case "add":
                setRows([NewItem, ...rows]);
                break;
            case "export_excel":
                gridRef.current?.exportExcel();
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Row
                gutter={[8, 8]}
                style={{ marginTop: "8px", marginLeft: "4px", marginRight: "4px" }}
            >
                <Col span={24}>
                    <Card
                        className="main-card"
                    >

                        <Space style={{justifyContent: 'space-between', width: '100%'}}>
                            <ToolBar
                                buttonConfig={[
                                    toolBarButtonTypes.add,
                                    toolBarButtonTypes.delete,
                                    toolBarButtonTypes.save,
                                ]}
                                handleConfirm={buttonConfirm}
                            />
                            <SearchBox
                                style={{ width: "100%" }}
                                data={dataTable}
                                onChange={setRows}
                            ></SearchBox>
                        </Space>
                        <DataGrid
                            ref={gridRef}
                            direction="ltr"
                            columnKeySelected="ID"
                            selection={selectionTypes.single}
                            columns={columns}
                            rows={rows}
                            setRows={setRows}
                            onFocus={onFocus}
                            pagination={paginationTypes.pagination}
                            limit={5}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
}
