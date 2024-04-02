import { Menu } from "antd"
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { itemsMenu } from "../../constants/index"
import { convertChildToChildren } from '../../utils'

const NavMobile = ({ funcClose, keySelected, defaultOpenKeys }) => {
    const navigate = useNavigate()

    const handleActiveNav = (keyPath) => {
        const lengthKeyPath = keyPath.length
        let itemMenuSelect = itemsMenu
        for (let index = lengthKeyPath - 1; index >= 0; index--) {
            const itemMenuChild = itemMenuSelect[itemMenuSelect.findIndex((item) => {
                return item.key === keyPath[index]
            })]
            if (index === 0) {
                itemMenuSelect = itemMenuChild
            } else itemMenuSelect = itemMenuChild.child
        }
        navigate(itemMenuSelect.href)
        funcClose()
    }


    return (
        <>
            {defaultOpenKeys ?
                <Menu
                    onSelect={({ keyPath }) => {
                        localStorage.setItem("nav", keyPath);
                        handleActiveNav(keyPath)
                    }}
                    className='b-navMobile'
                    items={convertChildToChildren(itemsMenu)}
                    mode="inline"
                    selectedKeys={keySelected}
                    defaultOpenKeys={defaultOpenKeys}
                /> : ""
            }
        </>
    )
}

export default NavMobile