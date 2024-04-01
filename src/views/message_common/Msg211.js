import { Card, Col, Row, Form, message, Typography, Select, Space, Upload, Button } from "antd";
import { useState, useEffect } from "react";
import * as React from "react";
import { socket } from "../../socket.js";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import ToolBar, { toolBarButtonTypes } from "../../global_component/ToolbarButton/ToolBar.js";
import DataGrid, {
    columnTypes,
    selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import {  send } from "../../apis/message_common/211.js";
import { FORMAT_DATETIME } from "../../constants/index.js";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";

const Msg211 = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);
    const vesselSelectRef = React.useRef();
    const [vesselData, setVessel] = useState([]);
    const gridRef = React.createRef();
    const onFocus = () => { };
    const columns = [
        {
            key: 'IDRef',
            name: 'IDRef',
            visible: false,
            editable: false
        },
        {
            key: "TransportIdentity",
            name: "Tên Tàu",
            width: 180,
            type: columnTypes.TextEditor,
            editable: true,
        },
        {
            key: "TransportCallSign",
            name: "Call Sign",
            width: 100,
            type: columnTypes.TextEditor,
        },
        {
            key: "TransportIMO",
            name: "Số IMO",
            width: 100,
            type: columnTypes.TextEditor,
        },
        {
            key: "ETA",
            name: "Ngày Tàu Đến",
            width: 100,
            type: columnTypes.TextEditor,
        },
        {
            key: "ETD",
            name: "Ngày Tàu Rời",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "InboundVoyage",
            name: "Chuyến Nhập",
            width: 200,
            type: columnTypes.DatePicker,
        },
        {
            key: "OutboundVoyage",
            name: "Chuyến Xuất",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "MsgRef",
            name: "Khóa Tham Chiếu",
            width: 150,
            type: columnTypes.TextEditor,
        },

    ];

    const buttonConfirm = async (props) => {
        if (props.type === 'load') {
        }

        if (props.type === 'send') {
            const idMsgRowData = gridRef.current?.getSelectedRows();
            const listMsgRowSelect = [];
            idMsgRowData.forEach((idMsgSelected) => {
                listMsgRowSelect.push(
                    rows[rows.findIndex((item) => item.IDRef === idMsgSelected)]
                );
            });
            try {
                const data = await send(listMsgRowSelect);
                if (data) {
                    if (data.deny) {
                        message.error(data.deny)
                        return;
                    }
                    if (data.data && data.data.dont_send_again) {
                        message.success(data.data.dont_send_again)
                    }

                    if (data.data && data.data.xmlComplete.length > 0) {
                        console.log(data.xmlComplete);
                        message.success('"Thông điệp đã được đưa vào hàng đợi!"');
                        socket.emit("mess_to_sock", "click");
                    }

                    if (data.msgGroupId) {
                        message.success('Thông điệp đã được đưa vào hàng đợi!');
                        socket.emit("mess_to_sock", data.msgGroupId);
                    }

                    if (data.result) {
                        alert(data.result);
                    }
                    if (data.msgRef_array) {
                        for (let i = 0; i < data.msgRef_array.length; i++) {
                            // var cntrNo = data.msgRef_array[i].split(":")[0];
                            // var msgRef = data.msgRef_array[i].split(":")[1].toUpperCase();
                            // var trarr = $("#contenttable tr");
                        }
                    }
                }
            } catch (error) {
                console.log(error);
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
                <Col span={24}>
                    <Card
                        title={'[211] \r\n SƠ ĐỒ VỊ TRÍ XẾP DỠ'}
                        style={{ borderRadius: "0px", height: '100%' }}
                        className="b-card"
                    >
                        <Row >
                            <Col span={4}>
                                <ToolBar
                                    buttonConfig={[toolBarButtonTypes.send]}
                                    handleConfirm={buttonConfirm}
                                />
                            </Col>
                            <Col span={4}>
                                <Filter
                                    filterRef={filterRef}
                                    items={[
                                        {
                                            type: filterType.radio,
                                            config: {
                                                name: 'imextype',
                                                defaultValue: 1,
                                                options: [
                                                    { label: 'Đăng ký', value: 1 },
                                                    { label: 'Sửa đổi', value: 2 }
                                                ]
                                            },
                                        },
                                    ]}
                                />
                            </Col>
                            <Col span={16}>
                                <Row gutter={[0, 16]}>
                                    <Col span={9}>
                                        <Typography>Loại hàng</Typography>
                                    </Col>
                                    <Col span={9}>
                                        <Select
                                        style={{width: '100%'}}
                                        className="b-select"
                                         options={[
                                            {
                                                value: 'cont',
                                                label: 'Hàng Container',
                                            },
                                            {
                                                value: 'package',
                                                label: 'Hàng Kiện',
                                            },
                                            {
                                                value: 'dispatch',
                                                label: 'Hàng Rời',
                                            },
                                            {
                                                value: 'liquid',
                                                label: 'Hàng Lỏng',
                                            },
                                        ]} />
                                    </Col>
                                    <Col span={9}>
                                        <Typography>{"Tệp đính kèm (< 25MB)"}</Typography>
                                    </Col>
                                    <Col span={9}>
                                        <Upload>
                                            <Button icon={<UploadOutlined />} style={{borderRadius: 0, backgroundColor : '#bcb9b930'}}>Chọn tệp</Button>
                                        </Upload>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Msg211;