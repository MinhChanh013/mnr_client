import { BookOutlined, BoxPlotOutlined, ClusterOutlined, FileTextOutlined, GoldOutlined, InboxOutlined, RadarChartOutlined, ReconciliationOutlined, SettingOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { ConfigProvider, Drawer, Menu } from 'antd';
import React, { useState } from 'react';
import SubNav from '../SubNav/SubNav';

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
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/vdjwmfqs.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200"
                        >
                        </lord-icon>,
                        key: 'directory:1',
                    },
                    {
                        label: 'Thông tin container biến động',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200"
                        >
                        </lord-icon>,
                        key: 'directory:2',
                    },
                    {
                        label: 'Loại và kích cỡ container',
                        key: 'directory:3',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/qzlhsleu.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
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
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/vdjwmfqs.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200"
                        >
                        </lord-icon>,
                    },
                    {
                        label: 'Thông tin hàng kiện getin',
                        key: 'directory:5',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/rbbnmpcf.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    },
                    {
                        label: 'Thông tin hàng kiện getout',
                        key: 'directory:6',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/ijahpotn.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
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
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/vdjwmfqs.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200"
                        >
                        </lord-icon>
                    },
                    {
                        label: 'Thông tin hàng rời getin',
                        key: 'directory:8',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/rbbnmpcf.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    },
                    {
                        label: 'Thông tin hàng rời getout',
                        key: 'directory:9',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/ijahpotn.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
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
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/vdjwmfqs.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200"
                        >
                        </lord-icon>
                    },
                    {
                        label: 'Thông tin hàng lỏng getin',
                        key: 'directory:11',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/rbbnmpcf.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    }, {
                        label: 'Thông tin hàng lỏng getout',
                        key: 'directory:12',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/ijahpotn.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    }, {
                        label: 'Loại hàng lỏng',
                        key: 'directory:13',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/eouimtlu.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
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
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/vdjwmfqs.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200"
                        >
                        </lord-icon>
                    },
                    {
                        label: 'Đồng bộ thông tin tàu',
                        key: 'directory:15',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/ercyvufy.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
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
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/vdjwmfqs.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    },
                    {
                        label: 'Danh mục đơn vị tính',
                        key: 'directory:17',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/rguiapej.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    },
                    {
                        label: 'Danh mục Chi cục Hải quan',
                        key: 'directory:18',
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/tzdwqlbp.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
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
                        label: "Tờ khai HQ",
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/zrtfxghu.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    },
                    {
                        label: "Thống kê sản lượng",
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/pqirzoux.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    },
                    {
                        label: "Báo cáo container nhập xuất",
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/vdjwmfqs.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
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
                    {
                        label: "Quản lý người dùng", icon: <lord-icon
                            src="https://cdn.lordicon.com/kthelypq.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200"
                        />
                    },
                    {
                        label: "Phân quyền người dùng",
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/kddybgok.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    },
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
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/vuiggmtc.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    },
                    {
                        label: "Quản lý thông điệp",
                        key: "manage",
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/xtnsvhie.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    },
                    {
                        label: "Cấu hình hệ thống",
                        key: "system",
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/lecprnjb.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
                    },
                    {
                        label: "Cấu hình gửi thông điệp",
                        key: "logout",
                        icon: <lord-icon
                            src="https://cdn.lordicon.com/fdxqrdfe.json"
                            colors="outline:#fff,primary:#fff"
                            trigger="loop-on-hover"
                            delay="200">
                        </lord-icon>
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
                height={335}
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