import { Card, Checkbox, Col, Input, Row, Space, message } from "antd";
import * as React from "react";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import ToolBar, { toolBarButtonTypes } from "../../global_component/ToolbarButton/ToolBar.js";
import DataGrid, {
    columnTypes,
    selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { send } from "../../apis/message_container/367.js";
import Typography from "antd/es/typography/Typography.js";

const { TextArea } = Input;

const Msg367Container = () => {
    const [declareNo, setDeclareNo] = React.useState('');
    const [HQno, setHQno] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const gridRef = React.createRef();
    const onFocus = () => { };
    const columns = [
        {
            key: "StatusMarker",
            name: "Trạng Thái",
            width: 100,
            type: columnTypes.TextEditor,
        },
        {
            key: "CntrNo",
            name: "Số Container",
            width: 100,
            type: columnTypes.TextEditor,
        },
        {
            key: "ResponseFnc",
            name: "Mã Phản Hồi",
            width: 100,
            type: columnTypes.TextEditor,
        },
        {
            key: "ResponseText",
            name: "Nội Dung Phản Hồi",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "MsgRef",
            name: "Khóa Tham Chiếu",
            width: 200,
            type: columnTypes.DatePicker,
        },
        {
            key: "ImExType",
            name: "Nhập/Xuất",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "TransportIdentity",
            name: "Tên Tàu",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "NumberOfJourney",
            name: "Số Chuyến",
            width: 200,
            type: columnTypes.DatePicker,
        },
        {
            key: "ArrivalDeparture",
            name: "Ngày Tàu Đến/Rời",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "StatusOfGood",
            name: "Full/Empty",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "CommodityDescription",
            name: "Mô Tả HH",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "Remark",
            name: "Ghi Chú",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "DeclareNo",
            name: "Số TK",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "DeclareIssueDate",
            name: "Ngày Tờ Khai",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "DeclarationOffice",
            name: "Mã CC Mở TK",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "NatureOfTransaction",
            name: "Loại Hình XKN",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "DeclarationOfficeControl",
            name: "Mã CC HQGS",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "DeclarationChannel",
            name: "Mã Luồng TK",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "CustomsStatus",
            name: "Trạng Thái TK",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "EnterpriseIdentity",
            name: "MST DN",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "EnterpriseName",
            name: "Tên DN",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "AcceptanceNo",
            name: "Số Tiếp Nhận",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "AcceptanceTime",
            name: "Ngày Tiếp Nhận",
            width: 150,
            type: columnTypes.TextEditor,
        },


    ];

    const buttonConfirm = async (props) => {
        if (props.type === 'send') {
            let dataSend = { declareNo: declareNo, declareOffice: HQno};
            const resolve = await send(dataSend);
            if (resolve.success) {
                message.success('Thành công!');
            } else {
                message.error('Thất bại!');
            }
        }
    }

    const filterRef = React.useRef();

    return (
        <>
            <Row
                gutter={[8, 8]}
                style={{ marginTop: "8px", marginLeft: "4px", marginRight: "4px" }}
            >
                <Col span={6}>
                    {/* *MỞ NÚT NÀY LÊN VÀ CHẠY TEST ĐỂ XEM KẾT QUẢ HIỂN THỊ RA GIAO DIỆN. */}
                    {/* <Button onClick={handleSelectFilterData}>Test</Button> */}
                    <Card
                        title="367 [CONTAINER] -TỜ KHAI ĐỦ ĐIỀU KIỆN QUA KVGS"
                        style={{ borderRadius: "0px" }}
                        className="b-card"
                    >
                        <Row style={{ padding: "0 24px" }}>
                            <Space direction='vertical' size={8}>
                                <Row gutter={[8, 8]}>
                                    <Col span={24}>
                                        <Space>
                                            <Checkbox defaultChecked={true}> Tự động gửi truy vấn với QR Code mới</Checkbox>
                                            <Checkbox defaultChecked={true}>Truy vấn Biên Lai</Checkbox>
                                        </Space>
                                    </Col>
                                    <Col span={24}>
                                        <TextArea />
                                    </Col>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={8}>
                                                <Typography>Mã HQGS</Typography>
                                            </Col>
                                            <Col span={16}>
                                                <Input />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={8}>
                                                <Typography>Mã Đơn Vị</Typography>
                                            </Col>
                                            <Col span={16}>
                                                <Input />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={8}>
                                                <Typography>Luồng</Typography>
                                            </Col>
                                            <Col span={16}>
                                                <Input />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={8}>
                                                <Typography>Tình Trạng TK</Typography>
                                            </Col>
                                            <Col span={16}>
                                                <Input />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={8}>
                                                <Typography>Số Chì HQ</Typography>
                                            </Col>
                                            <Col span={16}>
                                                <Input />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={8}>
                                                <Typography>Số Vận Đơn</Typography>
                                            </Col>
                                            <Col span={16}>
                                                <Input />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={8}>
                                                <Typography>Số Container</Typography>
                                            </Col>
                                            <Col span={16}>
                                                <Input />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={8}>
                                                <Typography>Số Tờ Khai</Typography>
                                            </Col>
                                            <Col span={16}>
                                                <Input onChange={(e) => { setDeclareNo(e.target.value); console.log(e.target.value) }} />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row>
                                            <Col span={8}>
                                                <Typography>Mã ĐK HQ</Typography>
                                            </Col>
                                            <Col span={16}>
                                                <Input onChange={(e) => { setHQno(e.target.value); console.log(e.target.value) }} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Space>
                            {/* <Filter
                                filterRef={filterRef}
                                items={[
                                    {
                                        type: filterType.radio,
                                        label: "Hướng",
                                        config: {
                                            name: "imextype",
                                            defaultValue: "1",
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
                                        type: filterType.radio,
                                        label: "Loại hàng",
                                        config: {
                                            name: "isLF",
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
                                    {
                                        type: filterType.radio,
                                        label: "Tình Trạng Container",
                                        config: {
                                            name: "isLF",
                                            defaultValue: "",
                                            options: [
                                                {
                                                    label: "Tất cả",
                                                    value: "",
                                                },
                                                {
                                                    label: "Đã ra khỏi cảng",
                                                    value: "1",
                                                },
                                                {
                                                    label: "Chưa ra khỏi cảng",
                                                    value: "2",
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        type: filterType.radio,
                                        label: "Trạng thái thông điệp",
                                        config: {
                                            name: "marker",
                                            defaultValue: "",
                                            options: [
                                                {
                                                    label: "Tất cả",
                                                    value: "",
                                                },
                                                {
                                                    label: "Thành công",
                                                    value: "SuccessMarker",
                                                },
                                                {
                                                    label: "Thất bại",
                                                    value: "ErrorMarker",
                                                },
                                                {
                                                    label: "Chưa gửi",
                                                    value: "UnMarker",
                                                },
                                            ],
                                        },
                                    },
                                ]}
                            /> */}
                        </Row>
                    </Card>
                </Col>
                <Col span={18}>
                    <ToolBar
                        buttonConfig={[toolBarButtonTypes.newdeclare, toolBarButtonTypes.send]}
                        handleConfirm={buttonConfirm}
                    />
                    <Card
                        style={{ borderRadius: "0px", height: "100%" }}
                        className="b-card"
                    >
                        <DataGrid
                            ref={gridRef}
                            direction="ltr"
                            columnKeySelected="ID"
                            selection={selectionTypes.single}
                            columns={columns}
                            rows={rows}
                            setRows={setRows}
                            onFocus={onFocus}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Msg367Container;
