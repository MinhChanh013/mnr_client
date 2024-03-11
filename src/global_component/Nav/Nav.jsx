import React from 'react';
import { ConfigProvider, Menu } from 'antd';
import { AppstoreOutlined, BookOutlined, BoxPlotOutlined, ClusterOutlined, DotChartOutlined, FileTextOutlined, GoldOutlined, InboxOutlined, RadarChartOutlined, ReconciliationOutlined, UnorderedListOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';

const items = [
    {
        label: 'Danh mục',
        key: 'Directory',
        icon: <AppstoreOutlined />,
        children: [
            {
                type: 'group',
                label: 'Container',
                children: [
                    {
                        label: 'Manifest - Loading list',
                        icon: <BoxPlotOutlined />,
                        key: 'directory:1',
                    },
                    {
                        icon: <BoxPlotOutlined />,
                        label: 'Thông tin container biến động',
                        key: 'directory:2',
                    },
                    {
                        icon: <BoxPlotOutlined />,
                        label: 'Loại và kích cỡ container',
                        key: 'directory:3',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Hàng kiện',
                children: [
                    {
                        label: 'Manifest - Loading list',
                        key: 'directory:4',
                        icon: <InboxOutlined />
                    },
                    {
                        label: 'Thông tin hàng kiện getin',
                        key: 'directory:5',
                        icon: <InboxOutlined />
                    },
                    {
                        label: 'Thông tin hàng kiện getout',
                        key: 'directory:6',
                        icon: <InboxOutlined />
                    },
                ],
            },
            {
                type: 'group',
                label: 'Hàng rời',
                children: [
                    {
                        label: 'Manifest - Loading list',
                        key: 'directory:7',
                        icon: <GoldOutlined />
                    },
                    {
                        label: 'Thông tin hàng rời getin',
                        key: 'directory:8',
                        icon: <GoldOutlined />
                    },
                    {
                        label: 'Thông tin hàng rời getout',
                        key: 'directory:9',
                        icon: <GoldOutlined />
                    },
                ],
            },
            {
                type: 'group',
                label: 'Hàng lỏng',
                children: [
                    {
                        label: 'Manifest - Loading list',
                        key: 'directory:10',
                        icon: <ReconciliationOutlined />
                    },
                    {
                        label: 'Thông tin hàng lỏng getin',
                        key: 'directory:11',
                        icon: <ReconciliationOutlined />
                    }, {
                        label: 'Thông tin hàng lỏng getout',
                        key: 'directory:12',
                        icon: <ReconciliationOutlined />
                    }, {
                        label: 'Loại hàng lỏng',
                        key: 'directory:13',
                        icon: <ReconciliationOutlined />
                    },
                ],
            },
            {
                type: 'group',
                label: 'Thông tin tàu',
                children: [
                    {
                        label: 'Thông tin chuyến tàu',
                        key: 'directory:14',
                        icon: <BookOutlined />
                    },
                    {
                        label: 'Đồng bộ thông tin tàu',
                        key: 'directory:15',
                        icon: <BookOutlined />
                    },
                ],
            },
            {
                type: 'group',
                label: 'Danh mục',
                children: [
                    {
                        label: 'Danh mục phương án',
                        key: 'directory:16',
                        icon: <UnorderedListOutlined />
                    },
                    {
                        label: 'Danh mục đơn vị tính',
                        key: 'directory:17',
                        icon: <UnorderedListOutlined />
                    },
                    {
                        label: 'Danh mục Chi cục Hải quan',
                        key: 'directory:18',
                        icon: <UnorderedListOutlined />
                    },
                ],
            },
        ],
    },
    {
        label: 'Thống kê',
        key: 'Statistic',
        icon: <DotChartOutlined />,
        children: [
            {
                label: 'Tờ Khai HQ',
                icon: <FileTextOutlined />,
                key: 'statistic:1',
            },
            {
                icon: <RadarChartOutlined />,
                label: 'Thống kê sản lượng',
                key: 'statistic:2',
            },
            {
                icon: <ReconciliationOutlined />,
                label: 'Báo cáo container nhập khẩu',
                key: 'statistic:3',
            },
        ]
    },
    {
        label: 'Người dùng',
        key: 'User',
        icon: <UserSwitchOutlined />,
        children: [
            {
                label: 'Quản lý người dùng',
                icon: <UserOutlined />,
                key: 'user:1',
            },
            {
                icon: <ClusterOutlined />,
                label: 'Phân quyền người dùng',
                key: 'user:2',
            },
        ]
    }
];

const Nav = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                    },
                },
            }}
        >
            <Menu triggerSubMenuAction="click" className='b-nav' mode='horizontal' style={{
                backgroundColor: "#3367D6",
                borderColor: "transparent"
            }} items={items} />
        </ConfigProvider>
    );
};

export default Nav;