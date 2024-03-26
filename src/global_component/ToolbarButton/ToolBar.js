/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Button, Divider, Modal, Space } from "antd";
import {
    CloseOutlined,
    CloudDownloadOutlined,
    DeleteOutlined,
    SendOutlined,
    WarningOutlined,
    FileExcelOutlined,
} from "@ant-design/icons";
import * as React from "react";

export const toolBarButtonTypes = {
    load: {
        id: 'load',
        label: "Nạp dữ liệu",
        fontColor: "#2399fa",
        icon: <CloudDownloadOutlined style={{ stroke: "#2399fa", strokeWidth: 30 }} />,
    },
    send: {
        id: 'send',
        label: "Gởi thông điệp",
        fontColor: "#f5a442",
        icon: <SendOutlined style={{ stroke: "#f5a442", strokeWidth: 30 }} />,
        alert: true,
        message: 'Bạn có muốn gởi thông điệp?'
    },
    cancel: {
        id: 'cancel',
        label: "Hủy gửi",
        fontColor: "#f54f40",
        icon: <CloseOutlined style={{ stroke: "#f54f40", strokeWidth: 30 }} />,
        alert: true,
        message: 'Bạn có muốn hủy gửi thông điệp?'
    },
    cancelgetin: {
        id: 'cancelgetin',
        label: "Hủy getin",
        fontColor: "#f54f40",
        icon: <CloseOutlined style={{ stroke: "#f54f40", strokeWidth: 30 }} />,
        alert: true,
        message: 'Bạn có muốn hủy getin?'
    },
    save: {
        id: 'save',
        label: "Lưu dữ liệu",
        fontColor: "#50a81d",
        icon: <CloudDownloadOutlined style={{ stroke: "#50a81d", strokeWidth: 30 }} />,
        alert: true,
        message: 'Bạn có muốn lưu dữ liệu?'
    },
    delete: {
        id: 'delete',
        label: "Xóa dòng",
        fontColor: "#f54f40",
        icon: <DeleteOutlined style={{ stroke: "#f54f40", strokeWidth: 30 }} />,
        alert: true,
        message: 'Bạn có muốn xóa dữ liệu?'
    },
    deletegetout: {
        id: 'delete getout',
        label: "Xóa Getout",
        fontColor: "#f54f40",
        icon: <DeleteOutlined style={{ stroke: "#f54f40", strokeWidth: 30 }} />,
        alert: true,
        message: 'Bạn có muốn xóa getout?'
    },
    newdeclare: {
        id: 'new declare',
        label: "Quét tờ khai mới",
        fontColor: "#2399fa",
        icon: <SendOutlined style={{ stroke: "#2399fa", strokeWidth: 30 }} />,
    },
    exportexcel: {
        id: 'export excel',
        label: "Xuất Excel",
        fontColor: "#2399fa",
        icon: <FileExcelOutlined/>,
    }
}

const ToolBar = ({ buttonConfig, cardConfig, handleConfirm}) => {
    const [openModal] = useState(false);
    return (
        <>
            <div style={{ padding: '4px 4px' }}>
                <Space size={0}>
                    {
                        buttonConfig.map((item, index) => {
                            return (
                                <>
                                    {
                                        index !== 0
                                            ?
                                            <Divider
                                                key={index}
                                                type="vertical"
                                                style={{
                                                    backgroundImage: 'linear-gradient(rgba(153, 153, 153, 0.1) 0px, rgb(179 176 176) 40%, rgb(169 167 167) 60%, rgba(153, 153, 153, 0.1) 100%)',
                                                    height: '24px',
                                                    width: '1.8px',
                                                    paddingRight: '1px',
                                                    borderRadius: 0
                                                }}
                                            />
                                            :
                                            ''
                                    }
                                    <Button
                                        key={item.id}
                                        type='text'
                                        icon={item.icon}
                                        onClick={() => {
                                            if (item.alert) {
                                                Modal.confirm({
                                                    title: 'Cảnh báo!',
                                                    content: item.message,
                                                    open: { openModal },
                                                    icon: < WarningOutlined />,
                                                    okText: 'Xác nhận',
                                                    cancelText: 'Hủy',
                                                    onCancel: () => {
                                                        return;
                                                    },
                                                    onOk: () => {
                                                        handleConfirm({type: item.id})
                                                    },
                                                    footer: (_, { OkBtn, CancelBtn }) => (
                                                        <>
                                                            <CancelBtn />
                                                            <OkBtn />
                                                        </>
                                                    ),
                                                });
                                            } else {
                                                handleConfirm({type: item.id});
                                            }
                                        }}
                                        style={{
                                            color: item.fontColor
                                        }}
                                    >
                                        {item.label.toUpperCase()}
                                    </Button >
                                </>
                            )
                        })
                    }
                </Space>
            </div >
        </>
    );
}
export default ToolBar;

