import React from 'react';
import { ConfigProvider, Menu } from 'antd';
import { BookOutlined, BoxPlotOutlined, GoldOutlined, InboxOutlined, QrcodeOutlined, ReconciliationOutlined, UnorderedListOutlined } from '@ant-design/icons';

const items = [
    {
        label: 'Danh mục',
        key: 'SubMenu',
        icon: <QrcodeOutlined />,
        children: [
            {
                type: 'group',
                label: 'Container',
                children: [
                    {
                        label: 'Manifest - Loading list',
                        icon: <BoxPlotOutlined />,
                        key: 'setting:1',
                    },
                    {
                        icon: <BoxPlotOutlined />,
                        label: 'Thông tin container biến động',
                        key: 'setting:2',
                    },
                    {
                        icon: <BoxPlotOutlined />,
                        label: 'Loại và kích cỡ container',
                        key: 'setting:3',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Hàng kiện',
                children: [
                    {
                        label: 'Manifest - Loading list',
                        key: 'setting:4',
                        icon: <InboxOutlined />
                    },
                    {
                        label: 'Thông tin hàng kiện getin',
                        key: 'setting:5',
                        icon: <InboxOutlined />
                    },
                    {
                        label: 'Thông tin hàng kiện getout',
                        key: 'setting:6',
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
                        key: 'setting:7',
                        icon: <GoldOutlined />
                    },
                    {
                        label: 'Thông tin hàng rời getin',
                        key: 'setting:8',
                        icon: <GoldOutlined />
                    },
                    {
                        label: 'Thông tin hàng rời getout',
                        key: 'setting:9',
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
                        key: 'setting:10',
                        icon: <ReconciliationOutlined />
                    },
                    {
                        label: 'Thông tin hàng lỏng getin',
                        key: 'setting:11',
                        icon: <ReconciliationOutlined />
                    }, {
                        label: 'Thông tin hàng lỏng getout',
                        key: 'setting:12',
                        icon: <ReconciliationOutlined />
                    }, {
                        label: 'Loại hàng lỏng',
                        key: 'setting:13',
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
                        key: 'setting:14',
                        icon: <BookOutlined />
                    },
                    {
                        label: 'Đồng bộ thông tin tàu',
                        key: 'setting:15',
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
                        key: 'setting:16',
                        icon: <UnorderedListOutlined />
                    },
                    {
                        label: 'Danh mục đơn vị tính',
                        key: 'setting:17',
                        icon: <UnorderedListOutlined />
                    },
                    {
                        label: 'Danh mục Chi cục Hải quan',
                        key: 'setting:18',
                        icon: <UnorderedListOutlined />
                    },
                ],
            },
        ],
    },

];

const Nav = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        // itemSelectedColor: "#fff",
                        // itemColor: "#000",
                    },
                },
            }}
        >
            <Menu className='b-nav' mode='horizontal' style={{
                width: "150px",
                backgroundColor: "#3367D6",
            }} items={items} />
        </ConfigProvider>
    );
};

export default Nav;