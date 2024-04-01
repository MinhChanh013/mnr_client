import { Card, Col, Row, Form, message } from "antd";
import { useState, useEffect } from "react";
import * as React from "react";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import ToolBar, { toolBarButtonTypes } from "../../global_component/ToolbarButton/ToolBar.js";
import DataGrid, {
    columnTypes,
    selectionTypes,
} from "../../global_component/DataGrid/index.jsx";
import { searchVessels, load, send } from "../../apis/message_container/CSHT214.js";
import { socket } from "../../socket.js";
import { FORMAT_DATETIME } from "../../constants/index.js";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/slices/LoadingSlices.js";
import dayjs from "dayjs";

const Msg214ContainerCSHT = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const vesselSelectRef = React.useRef();
    const [vesselData, setVessel] = useState([]);
    const [rows, setRows] = React.useState([]);
    const gridRef = React.createRef();
    const onFocus = () => { };
    const columns = [
        {
            key: "ID",
            name: "ID",
            visible: false,
        },
        {
            key: "JobStatus",
            name: "Hành Động",
            width: 180,
            type: columnTypes.TextEditor,
            editable: true,
        },
        {
            key: "StatusMarker",
            name: "Trạng Thái",
            width: 100,
            type: columnTypes.TextEditor,
        },
        {
            key: "DeclareNo",
            name: "Số Tờ Khai",
            width: 100,
            type: columnTypes.TextEditor,
        },
        {
            key: "DeclareIssueDate",
            name: "Ngày Tờ Khai",
            width: 100,
            type: columnTypes.TextEditor,
        },
        {
            key: "NatureOfTransaction",
            name: "Mã LH",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "DeclarationOffice",
            name: "Mã HQ Mở TK",
            width: 200,
            type: columnTypes.DatePicker,
        },
        {
            key: "CntrNo",
            name: "Số Container",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "SealNo",
            name: "Số Chì",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "TransportIdentity",
            name: "Tên Tàu",
            width: 200,
            type: columnTypes.DatePicker,
        },
        {
            key: "NumberOfJourney",
            name: "Số Chuyến",
            width: 150,
            type: columnTypes.TextEditor,
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
            key: "CargoWeight",
            name: "Tổng Trọng Lượng",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "WeightUnitCode",
            name: "ĐVT",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "BillOfLading",
            name: "Số Vận Đơn",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "CargoCtrlNo",
            name: "Số Định Danh",
            width: 150,
            type: columnTypes.TextEditor,
        },
        {
            key: "Content",
            name: "Ghi Chú",
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
        {
            key: "ResponseText",
            name: "Nội Dung Phản Hồi",
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
            const dataFormFilter = form.getFieldsValue();
            const dataVesselSelect = vesselSelectRef.current?.getSelectedVessel();
            let fromdate, todate;
            if (dataFormFilter.dateFromTo) {
                fromdate = dayjs(dataFormFilter.dateFromTo[0]).format(
                    FORMAT_DATETIME
                );
                todate = dayjs(dataFormFilter.dateFromTo[1]).format(FORMAT_DATETIME);
            }
            delete dataFormFilter.dateFromTo;
            const formData = {
                ...dataFormFilter,
                fromdate,
                todate,
                voyagekey: dataVesselSelect ? dataVesselSelect.VoyageKey : "",
                imextype: 3
            };
            handleLoadData(formData);
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

    useEffect(async () => {
        try {
            const loadVessel = await searchVessels({});
            if (loadVessel.success) {
                setVessel(loadVessel.data);
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleLoadData = async (formData) => {
        try {
            dispatch(setLoading(true));
            const resultDataMsg465 = await load(formData);
            if (resultDataMsg465.data.length > 0) {
                const dataMsg465 = resultDataMsg465.data.map((row) => {
                    return columns.reduce((acc, column) => {
                        // handle logic data
                        const keyValue = column.key;
                        const rowValue = row[keyValue];
                        switch (keyValue) {
                            case "ImExType":
                                acc[keyValue] =
                                    rowValue === 1 ? "Nhập" : rowValue === 2 ? "Xuất" : "Nội Địa";
                                break;
                            case "StatusMarker":
                                if (row["SuccessMarker"]) {
                                    acc[keyValue] = "Thành công";
                                } else if (row["ErrorMarker"]) {
                                    acc[keyValue] = "Thất bại";
                                } else acc[keyValue] = "Chưa gửi";
                                break;
                            case "StatusOfGood":
                                rowValue === 1
                                    ? (acc[keyValue] = "Full")
                                    : (acc[keyValue] = "Empty");
                                break;
                            default:
                                acc[keyValue] = !!row[keyValue] ? `${row[keyValue]}` : "";
                                break;
                        }
                        return acc;
                    }, {});
                });
                setRows(dataMsg465);
            } else {
                console.log('-----------------')
                setRows([]);
                message.error('Không tìm thấy dữ liệu dữ liệu!');
            }
            dispatch(setLoading(false));
        } catch (error) {
            console.log(error);
        }
    };

    const filterRef = React.useRef();

    return (
        <>
            <Row
                gutter={[8, 8]}
                style={{ marginTop: "8px", marginLeft: "4px", marginRight: "4px" }}
            >
                <Col span={6}>
                    <Card
                        title={'[CSHT].214 \n DS CONTAINER CỦA TK CHƯA NỘP PHÍ'}
                                    style={{ borderRadius: "0px", height: '100%' }}
                        className="b-card"
                    >
                        <Row style={{ padding: "0 24px" }}>
                            <Col span={24}>
                                <VesselSelect data={vesselData} ref={vesselSelectRef} />
                            </Col>
                            <Filter
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
                            />
                        </Row>
                    </Card>
                </Col>
                <Col span={18}>
                    <Card
                        className="main-card"
                    >
                        <ToolBar
                            buttonConfig={[toolBarButtonTypes.load, toolBarButtonTypes.send]}
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
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Msg214ContainerCSHT;
