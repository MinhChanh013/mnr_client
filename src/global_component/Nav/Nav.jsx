import { ConfigProvider, Drawer, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { itemsMenu } from '../../constants';
import { useActiveNav } from '../../hooks/useNav';
import SubNav from '../SubNav/SubNav';

const Nav = () => {
    const [activeNav, setActiveNav] = useState(false)
    const [navSelected, setNavSelected] = useState()
    const [keySelected, setKeySelected] = useState()

    const handleActiveNav = (itemNav) => {
        setActiveNav(true)
        setNavSelected(itemsMenu[itemsMenu.findIndex((item) => item.key === itemNav.key)])
    }

    const handlePlayIcon = (itemNav) => {
        const element = document.querySelectorAll("lord-icon");
        if (element) {
            element[itemsMenu.findIndex((item) => item.key === itemNav.key)].playerInstance.playFromBeginning()
        }
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            const width = document.body.clientWidth;
            if (width <= 1169) {
                setActiveNav(false)
            }
        })
    }, [])

    const handleCloseNav = () => {
        setActiveNav(false)
    }

    useActiveNav([activeNav], !activeNav, (navActive) => {
        setKeySelected(navActive[navActive.length - 1])
    })

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
                    onDeselect={(item) => {
                        handleActiveNav(item)
                        setActiveNav(!activeNav)
                    }}
                    onSelect={item => {
                        handleActiveNav(item)
                        setKeySelected(item.key)
                    }}
                    triggerSubMenuAction="click"
                    className='b-nav'
                    onClick={(item) => handlePlayIcon(item)}
                    mode='horizontal'
                    items={itemsMenu}
                    selectedKeys={keySelected}
                />
            </ConfigProvider>
            <Drawer
                className='b__nav-drawer'
                height={335}
                zIndex={30}
                placement={"top"}
                closable={true}
                closeIcon={null}
                onClose={handleCloseNav}
                open={activeNav}
                key={"top"}
            >
                <SubNav activeNav={activeNav} itemMenu={navSelected} funcClose={handleCloseNav} />
            </Drawer>
        </>
    );
};

export default Nav;