import React, { useState } from 'react';
import { ConfigProvider, Drawer, Menu } from 'antd';
import { BookOutlined, BoxPlotOutlined, ClusterOutlined, DotChartOutlined, FileTextOutlined, GoldOutlined, InboxOutlined, RadarChartOutlined, ReconciliationOutlined, SettingOutlined, UnorderedListOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import SubNav from '../SubNav/SubNav';
defineElement(lottie.loadAnimation);

const items = [
    {
        label: 'Danh mục',
        key: 'Directory',
        icon: <lord-icon
            className="Directory"
            colors="outline:#fff,primary:#fff"
            src="https://cdn.lordicon.com/nizfqlnk.json"
            trigger="loop-on-hover"
            delay="200"
        >
        </lord-icon>,
        child: [
            {
                label: 'Container',
                key: "container1",
                icon: <BoxPlotOutlined />,
                child: [
                    {
                        label: 'Manifest - Loading list',
                        key: 'directory:1',
                    },
                    {
                        label: 'Thông tin container biến động',
                        key: 'directory:2',
                    },
                    {
                        label: 'Loại và kích cỡ container',
                        key: 'directory:3',
                    },
                ],
            },
            {

                label: 'Hàng kiện',
                key: "container2",
                icon: <InboxOutlined />,
                child: [
                    {
                        label: 'Manifest - Loading list',
                        key: 'directory:4',
                    },
                    {
                        label: 'Thông tin hàng kiện getin',
                        key: 'directory:5',
                    },
                    {
                        label: 'Thông tin hàng kiện getout',
                        key: 'directory:6',
                    },
                ],
            },
            {

                label: 'Hàng rời',
                key: "container3",
                icon: <GoldOutlined />,
                child: [
                    {
                        label: 'Manifest - Loading list',
                        key: 'directory:7',
                    },
                    {
                        label: 'Thông tin hàng rời getin',
                        key: 'directory:8',
                    },
                    {
                        label: 'Thông tin hàng rời getout',
                        key: 'directory:9',
                    },
                ],
            },
            {
                label: 'Hàng lỏng',
                key: "container4",
                icon: <ReconciliationOutlined />,
                child: [
                    {
                        label: 'Manifest - Loading list',
                        key: 'directory:10',
                    },
                    {
                        label: 'Thông tin hàng lỏng getin',
                        key: 'directory:11',
                    }, {
                        label: 'Thông tin hàng lỏng getout',
                        key: 'directory:12',
                    }, {
                        label: 'Loại hàng lỏng',
                        key: 'directory:13',
                    },
                ],
            },
            {

                label: 'Thông tin tàu',
                key: "infor",
                icon: <BookOutlined />,
                child: [
                    {
                        label: 'Thông tin chuyến tàu',
                        key: 'directory:14',
                    },
                    {
                        label: 'Đồng bộ thông tin tàu',
                        key: 'directory:15',
                    },
                ],
            },
            {

                label: 'Danh mục',
                key: "list",
                icon: <UnorderedListOutlined />,
                child: [
                    {
                        label: 'Danh mục phương án',
                        key: 'directory:16',
                    },
                    {
                        label: 'Danh mục đơn vị tính',
                        key: 'directory:17',
                    },
                    {
                        label: 'Danh mục Chi cục Hải quan',
                        key: 'directory:18',
                    },
                ],
            },
        ],
    },
    {
        label: 'Báo cáo - Thống kê',
        key: 'Statistic',
        icon: <lord-icon
            className="Statistic"
            colors="outline:#fff,primary:#fff"
            src="https://cdn.lordicon.com/whrxobsb.json"
            trigger="loop-on-hover"
            delay="200"
        >
        </lord-icon>,
        child: [
            {
                label: 'Thống kê',
                icon: <FileTextOutlined />,
                key: 'statistic:1',
                child: [
                    {
                        label: "Tờ khai HQ"
                    },
                    {
                        label: "Thống kê sản lượng"
                    },
                    {
                        label: "Báo cáo container nhập xuất"
                    },
                ]
            },
            {
                icon: <RadarChartOutlined />,
                label: 'Báo cáo cảng',
                key: 'statistic:2',
                child: []
            },
            {
                icon: <ReconciliationOutlined />,
                label: 'Báo cáo hải quan',
                key: 'statistic:3',
                child: []
            },
        ]
    },
    {
        label: 'Hệ thống',
        key: 'User',
        icon: <lord-icon
            className="User"
            colors="outline:#fff,primary:#fff"
            src="https://cdn.lordicon.com/lecprnjb.json"
            trigger="loop-on-hover"
            delay="200"
        >
        </lord-icon>,
        child: [
            {
                label: 'Người dùng',
                icon: <UserOutlined />,
                key: 'user:1',
                child: [
                    { label: "Quản lý người dùng" },
                    { label: "Phân quyền người dùng" },
                ]
            },
            {
                icon: <ClusterOutlined />,
                label: 'Cấu hình',
                key: 'user:2',
                child: []
            },
            {
                icon: <SettingOutlined />,
                label: 'Cài đặt',
                key: 'user:3',
                child: [
                    {
                        label: "Lịch sử đăng nhập",
                        key: "history",
                    },
                    {
                        label: "Quản lý thông điệp",
                        key: "manage",
                    },
                    {
                        label: "Cấu hình hệ thống",
                        key: "system",
                    },
                    {
                        label: "Cấu hình gửi thông điệp",
                        key: "logout",
                    },
                ]
            },
        ]
    }
];

const Nav = () => {
    const [activeNav, setActiveNav] = useState(false)
    const [navSelected, setNavSelected] = useState()

    const handleActiveNav = (itemNav) => {
        setActiveNav(true)
        setNavSelected(items[items.findIndex((item) => item.key === itemNav.key)])
    }

    const handlePlayIcon = (itemNav) => {
        console.log("click");
        const element = document.querySelectorAll("lord-icon");
        if (element) {
            element[items.findIndex((item) => item.key === itemNav.key)].playerInstance.playFromBeginning()
        }
    }
    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemColor: "#fff",
                            itemHoverColor: "#fff",
                            itemSelectedColor: "#fff !important"
                        },
                    },
                }}
            >
                <Menu
                    onDeselect={() => setActiveNav(!activeNav)}
                    onSelect={item => handleActiveNav(item)}
                    triggerSubMenuAction="click"
                    className='b-nav'
                    onClick={(item) => handlePlayIcon(item)}
                    mode='horizontal'
                    items={items} />
            </ConfigProvider>
            <Drawer
                className='b__nav-drawer'
                height={385}
                zIndex={30}
                placement={"top"}
                closable={true}
                closeIcon={null}
                onClose={() => {
                    setActiveNav(false)
                }}
                open={activeNav}
                key={"top"}
            >
                <SubNav itemMenu={navSelected} />
            </Drawer>
        </>
    );
};

export default Nav;