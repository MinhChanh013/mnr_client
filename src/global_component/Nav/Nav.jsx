import { ConfigProvider, Drawer, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import SubNav from '../SubNav/SubNav';
import { itemsMenu } from '../../constants';

const Nav = () => {
    const [activeNav, setActiveNav] = useState(false)
    const [navSelected, setNavSelected] = useState()

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
                    items={itemsMenu}
                />
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