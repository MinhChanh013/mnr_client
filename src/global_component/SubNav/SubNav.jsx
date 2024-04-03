import { Col, ConfigProvider, Empty, Menu, Row, } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveNav } from '../../hooks/useNav';
import { generateString } from '../../utils';

const SubNav = (props) => {
    const { itemMenu, funcClose, activeNav } = props
    const navigate = useNavigate()
    const [itemSelected, settItemSelected] = useState()
    const [keySelected, setKeySelected] = useState("")
    const items = useMemo(() => itemMenu.child, [itemMenu])

    useActiveNav([activeNav, items], activeNav, (navActive) => {
        const keySelected = navActive[navActive.length - 2]
        setKeySelected(keySelected)
        settItemSelected(items[items.findIndex((item) => item.key === keySelected)])
    })

    return (
        <Row className='b__sub' gutter={[16, 16]} >
            <Col xl={4} lg={5} md={6}>
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                itemColor: "#fff",
                                itemHoverColor: "#fff",
                            },
                        },
                    }}
                >
                    <Menu
                        className='b__nav-sub'
                        selectedKeys={keySelected}
                        mode="inline"
                        items={items}
                        onSelect={(itemSelected) => {
                            setKeySelected(itemSelected.key)
                            settItemSelected(items[items.findIndex((item) => item.key === itemSelected.key)])
                        }}
                    />
                </ConfigProvider>
            </Col>
            <Col xl={20} lg={19} md={18} >
                {itemSelected && itemSelected.child && itemSelected.child.length > 0 ?
                    <Row style={{ width: "100%" }} className="b__subnav-item">
                        {itemSelected.child.map((sub, index) => (
                            <Col
                                className={window.location.href.includes(sub.href) ? "active" : ""}
                                onClick={() => {
                                    navigate(sub.href)
                                    localStorage.setItem("nav", [sub.key, keySelected, itemMenu.key]);
                                    funcClose()
                                }}
                                style={{ '--i': index + 1 }} xl={5} lg={7} md={11}
                                key={sub.key + generateString(5)}>
                                {sub.icon}
                                {sub.label ?? ""}
                            </Col>
                        ))}
                    </Row>
                    :
                    <Empty style={{ color: "#fff" }}
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{ height: 60 }}
                        description={
                            <span style={{ color: "#fff" }}>
                                {itemSelected && itemSelected.child && itemSelected.child.length === 0 ?
                                    "Đang phát triển" : "No Selected"}
                            </span>
                        }
                    />
                }
            </Col >
        </Row >
    )
}

export default SubNav