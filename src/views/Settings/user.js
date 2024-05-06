/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Flex, Row, Typography } from "antd";
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
const { Title } = Typography;

export default function User() {
    const onFocus = () => { };
    const gridRef = React.createRef();
    const [rows, setRows] = React.useState([]);
    React.useEffect(async () => {
        try {

        } catch (error) {
            console.log(error);
        }
    }, []);
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
            key: "TransportIdentity",
            name: "Nhóm người dùng",
            width: 180,
            type: columnTypes.TextEditor,
        },
        {
            key: "TransportCallSign",
            name: "Tên đăng nhập",
            width: 180,
            type: columnTypes.TextEditor,
        },
        {
            key: "TransportIMONumber",
            name: "Tên người dùng",
            width: 180,
            type: columnTypes.TextEditor,
        },
        {
            key: "ArrivalDeparture",
            name: "Mật khẩu",
            width: 180,
            type: columnTypes.DatePicker,
        },
        {
            key: "NumberOfJourney",
            name: "Ngày sinh",
            width: 180,
            type: columnTypes.TextEditor,
        },
        {
            key: "BillOfLading",
            name: "Email",
            width: 180,
            type: columnTypes.TextEditor,
        },
        {
            key: "CargoCtrlNo",
            name: "SĐT",
            width: 180,
            type: columnTypes.TextEditor,
        },
        {
            key: "CntrNo",
            name: "Trạng thái",
            width: 180,
            type: columnTypes.TextEditor,
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
                        <ToolBar
                            buttonConfig={[
                                toolBarButtonTypes.load,
                                toolBarButtonTypes.send,
                                toolBarButtonTypes.cancel,
                                toolBarButtonTypes.exportexcel,
                            ]}
                            handleConfirm={buttonConfirm}
                        />
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
