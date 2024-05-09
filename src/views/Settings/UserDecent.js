/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Form, Row, Flex, Input, Typography } from "antd";
import * as React from "react";
import DataGrid, {
    columnTypes,
    paginationTypes,
    selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import ToolBar, {
    toolBarButtonTypes,
} from "../../global_component/ToolbarButton/ToolBar.js";
import { basicRenderColumns } from "../../utils/dataTable.utils.js";


const { Search } = Input;

export default function UserDecent() {
    const onFocus = () => { };
    const gridRef = React.createRef();
    const [rows, setRows] = React.useState([]);
    const [form] = Form.useForm();

    const PageColumns = basicRenderColumns([
        {
            key: "ID",
            name: "ID",
            visible: true,
        },
        {
            key: "Function",
            name: "Chức năng",
            type: columnTypes.TextEditor,
            editable: true,
        },
        {
            key: "All",
            name: "Tất cả",
            type: columnTypes.TextEditor,
        },
        {
            key: "View",
            name: "Xem",
            type: columnTypes.TextEditor,
        },
        {
            key: "Save",
            name: "Lưu",
            type: columnTypes.TextEditor,
        },
        {
            key: "Delete",
            name: "Xóa",
            type: columnTypes.TextEditor,
        },
    ]);

    const UserColumns = basicRenderColumns([
        {
            key: "ID",
            name: "ID",
            visible: true,
        },
        {
            key: "user",
            name: "Tên đăng nhập",
            type: columnTypes.TextEditor,
            editable: true,
        },
        {
            key: "fullname",
            name: "Họ và tên",
            type: columnTypes.TextEditor,
        },
        {
            key: "birthday",
            name: "Ngày sinh",
            type: columnTypes.TextEditor,
        },
        {
            key: "Email",
            name: "Email",
            type: columnTypes.TextEditor,
        },
        {
            key: "Status",
            name: "Trạng thái",
            type: columnTypes.TextEditor,
        },
    ]);

    const buttonConfirm = async (props) => {
        const dataFormFilter = form.getFieldsValue();
        switch (props.type) {
            case "load":
                handleLoadData();
                break;
            default:
                break;
        }
    };

    const handleLoadData = async (formData) => {

    };

    return (
        <>
            <Row
                gutter={[8, 8]}
                style={{ marginTop: "8px", marginLeft: "4px", marginRight: "4px" }}
            >
                <Col span={7}>
                    <Card
                        title={"PHÂN QUYỀN NGƯỜI DÙNG"}
                        style={{ borderRadius: "0px", height: "100%" }}
                        className="b-card"
                    >
                        <Row className="b-row" gutter={[16, 16]}>
                            <Col span={24}>
                                <Filter
                                    form={form}
                                    items={[
                                        {
                                            type: filterType.select,
                                            label: "Nhóm",
                                            config: {
                                                name: "group_user",
                                                defaultValue: "",
                                                options: [
                                                    {
                                                        label: "Tất cả",
                                                        value: "",
                                                    },
                                                    {
                                                        label: "Nhập",
                                                        value: "1",
                                                    },
                                                    {
                                                        label: "Xuất",
                                                        value: "2",
                                                    },
                                                    {
                                                        label: "Nội địa",
                                                        value: "3",
                                                    },
                                                ],
                                            },
                                        },
                                        {
                                            type: filterType.select,
                                            label: "Chức năng",
                                            config: {
                                                name: "function",
                                                defaultValue: "",
                                                options: [
                                                    {
                                                        label: "Tất cả",
                                                        value: "",
                                                    },
                                                    {
                                                        label: "Hàng ngoại",
                                                        value: "1",
                                                    },
                                                    {
                                                        label: "Hàng nội",
                                                        value: "2",
                                                    },
                                                ],
                                            },
                                        },
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={17}>
                    <Card className="main-card">
                        <Flex justify="space-between" style={{ padding: "10px 5px" }}>
                            <ToolBar
                                buttonConfig={[
                                    toolBarButtonTypes.add,
                                    toolBarButtonTypes.delete,
                                    toolBarButtonTypes.save,
                                ]}
                                handleConfirm={buttonConfirm}
                            />
                            <Search
                                style={{ width: "20%" }}
                                placeholder="Tìm kiếm"
                                className="HeaderSearch"
                                onChange={(e) => {

                                }}
                            ></Search>
                        </Flex>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Typography
                                    style={{ fontWeight: "600", marginBottom: "6px", marginLeft: '12px' }}
                                >
                                    DANH SÁCH MÀN HÌNH
                                </Typography>
                                <DataGrid
                                    ref={gridRef}
                                    direction="ltr"
                                    columnKeySelected="ID"
                                    selection={selectionTypes.multi}
                                    columns={PageColumns}
                                    rows={[]}
                                    setRows={setRows}
                                    onFocus={onFocus}
                                    pagination={paginationTypes.scroll}
                                    limit={5}
                                />
                            </Col>
                            <Col span={24} style={{ paddingTop: 12 }}>
                                <Typography
                                    style={{ fontWeight: "600", marginBottom: "6px", marginLeft: '12px' }}
                                >
                                    DANH SÁCH USER
                                </Typography>
                                <DataGrid
                                    ref={gridRef}
                                    direction="ltr"
                                    columnKeySelected="ID"
                                    selection={selectionTypes.multi}
                                    columns={UserColumns}
                                    rows={rows}
                                    setRows={setRows}
                                    onFocus={onFocus}
                                    pagination={paginationTypes.scroll}
                                    limit={5}
                                />
                            </Col>
                        </Row>
                    </Card>

                </Col>
            </Row>
        </>
    );
}
