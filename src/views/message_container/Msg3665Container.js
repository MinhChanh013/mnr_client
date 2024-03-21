import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import * as React from "react";
import VesselSelect from "../../global_component/Modal/VesselSelect.js";
import {
    buttonTypes,
    renderEventButtons,
} from "../../global_component/EventButtons/index.jsx";
import { load, searchVessels } from "../../apis/message_container/3668.js";
import { Filter, filterType } from "../../global_component/Filter/index.jsx";
import { getFormData } from "../../utils";
import RevoTable from "../../global_component/dataTable/revoTable.js";
import ToolBar, { Type } from "../../global_component/ToolbarButton/ToolBar.js";

export default function Msg3665Container() {
    const [dataTable, setDataTable] = useState([]);
    const [vesselData, setVesselData] = useState([]);

    const style = {
        borderColor: "#ffb13d",
        color: "#ffb13d",
        marginBottom: "2px",
    };
    // setDataTable([{ JobStatus: 'READY', Status: 'ACCEPT', BillOfLading: 'KBHCM-009-001-24JP	', CargoCtrlNo: '', CntrNo: 'CSNU7375605', Getin: '2024-02-26 14:22:00	', TransportIdentity: 'MANET', NumberOfJourney: '026S', ArrivalDeparture: '2024-02-24 18:30:00	', ImExType: 'Nhập', StatusOfGood: 'Full', JobModeIn: 'NKN', CargoWeight: '15093', SealNo: 'OOLJCT8469', CommodityDescription: 'GP' }])
    const columns = [
        { prop: "Select", name: 'Chọn', size: 80 },
        { prop: "JobStatus", name: 'Hành Động' },
        { prop: "Status", name: 'Trạng Thái', sortable: true, size: 150 },
        { prop: "BillOfLading", name: 'Số Vận Đơn', resize: true, size: 150 },
        { prop: "CargoCtrlNo", name: 'Số Định Danh' },
        { prop: "CntrNo", name: 'Số Container' },
        { prop: "GetIn", name: 'Ngày Getin' },
        { prop: "TransportIdentity", name: 'Tên Tàu' },
        { prop: "NumberOfJourney", name: 'Số Chuyến' },
        { prop: "ArrivalDeparture", name: 'Ngày Tàu Đến' },
        { prop: "ImExType", name: 'Nhập/Xuất' },
        { prop: "StatusOfGood", name: 'Full/Empty' },
        { prop: "JobModeIn", name: 'Phương Án Vào' },
        { prop: "CargoWeight", name: 'Trọng Lượng' },
        { prop: "SealNo", name: 'Số Chì' },
        { prop: "CommodityDescription", name: 'Mô Tả HH' },
        { prop: "ContainerLocation", name: 'Vị Trí Cont' },
        { prop: "Content", name: 'Ghi Chú' },
        { prop: "AcceptanceNo", name: 'Số Tiếp Nhận' },
        { prop: "AcceptanceTime", name: 'Ngày Tiếp Nhận' },
        { prop: "ResponseText", name: 'Nội Dung Phản Hồi' },
        { prop: "MsgRef", name: 'Khóa Tham Chiếu' },
    ];

    //* CÁCH LẤY DỮ LIỆU TỪ FILTER.
    const filterRef = React.useRef();
    // const handleSelectFilterData = () => {
    //* KHI HÀM NÀY CHẠY THÌ CỰA THEO filterRef ĐỂ LẤY DỮ LIỆU,
    //   console.log({
    //     data: getFormData(filterRef.current),
    //   });
    // };

    return (
        <>
            <Row gutter={[8, 8]} style={{ marginTop: "8px", marginLeft: '4px', marginRight: '4px' }}>
                <Col span={6}>
                    {/* *MỞ NÚT NÀY LÊN VÀ CHẠY TEST ĐỂ XEM KẾT QUẢ HIỂN THỊ RA GIAO DIỆN. */}
                    {/* <Button onClick={handleSelectFilterData}>Test</Button> */}
                    <Card
                        title="366.5 - HIỆU CHỈNH CONTAINER GETIN"
                        style={{ borderRadius: "0px" }}
                        className="b-card"
                    >
                        <Row style={{ padding: "0 24px" }}>
                            <Col span={24}>
                                <VesselSelect />
                            </Col>

                            <Filter
                                filterRef={filterRef}
                                items={[
                                    {
                                        type: filterType.radio,
                                        label: "Hướng",
                                        config: {
                                            name: "imextype",
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
                                            options: [
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
                                        label: "Trạng thái thông điệp",
                                        config: {
                                            name: "marker",
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
                                    {
                                        type: filterType.radio,
                                        label: "Trạng thái container ra khỏi cảng",
                                        config: {
                                            name: "getout",
                                            options: [
                                                {
                                                    label: "Tất cả",
                                                    value: "",
                                                },
                                                {
                                                    label: "Chưa ra",
                                                    value: "1",
                                                },
                                                {
                                                    label: "Đã ra",
                                                    value: "2",
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        type: filterType.radio,
                                        label: "Loại hàng",
                                        config: {
                                            name: "fe",
                                            options: [
                                                {
                                                    label: "Tất cả",
                                                    value: "",
                                                },
                                                {
                                                    label: "Full",
                                                    value: "1",
                                                },
                                                {
                                                    label: "Empty",
                                                    value: "0",
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        type: filterType.rangePicker,
                                        label: "Khoản",
                                        config: {
                                            name: "dateFromTo",
                                            placeholder: ["Từ", "Đến"],
                                            value: "",
                                        },
                                    },
                                    {
                                        type: filterType.input,
                                        label: "Số Cont",
                                        config: {
                                            name: "cntrNo",
                                            placeholder: "",
                                            value: "",
                                        },
                                    },
                                ]}
                            />
                        </Row>
                    </Card>
                </Col>
                <Col span={18}>
                    <ToolBar buttonConfig={[Type.send, Type.load, Type.cancel, Type.cancelgetin, Type.save, Type.delete]}  />
                    <Card
                        style={{ borderRadius: "0px", height: "100%" }}
                        className="b-card"
                    >
                        <RevoTable
                            config={{
                                columns: columns,
                                dataSource: dataTable,
                                footer: true,
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
}
