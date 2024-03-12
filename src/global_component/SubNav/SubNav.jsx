import { Col, ConfigProvider, Empty, List, Menu, Row, } from 'antd'
import chunk from 'lodash.chunk';
import React, { useMemo, useState } from 'react'


const SubNav = (props) => {
    const { itemMenu } = props
    const [itemSelected, settItemSelected] = useState()
    const [keySelected, setKeySelected] = useState("")
    const items = useMemo(() => {
        settItemSelected()
        setKeySelected("")
        return itemMenu.child
    }, [itemMenu])
    return (
        <Row gutter={[16, 16]} style={{ marginTop: "15px", height: "100%" }}>
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
                        className="b-nav"
                        style={{
                            backgroundColor: "#3f72e0ad",
                            maxHeight: "270px",
                            overflowY: "auto",
                            borderInlineColor: "#fff",
                            height: "100%",
                            borderRadius: "4px"
                        }}
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
                    <Row gutter={[16, 16]}>
                        {
                            chunk(itemSelected.child, 5).map((item) => (
                                <Col>
                                    <List
                                        dataSource={item}
                                        renderItem={(item) => (
                                            <List.Item className='b-sub__nav'
                                                style={{
                                                    color: "#fff", borderColor: "rgb(232 211 211)",
                                                    cursor: "pointer", padding: "12px 5px"
                                                }}>
                                                {item.label ?? ""}
                                            </List.Item>
                                        )}
                                    />
                                </Col>
                            ))
                        }
                    </Row> :
                    <Empty style={{ color: "#fff" }}
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{ height: 60 }}
                        description={
                            <span style={{ color: "#fff" }}>
                                {itemSelected && itemSelected.child && itemSelected.child.length === 0 ? "Đang phát triển" : "No Selected"}

                            </span>
                        }
                    />
                }
            </Col>
        </Row>
    )
}

export default SubNav