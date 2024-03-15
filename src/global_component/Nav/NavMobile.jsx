import React from 'react'
import { Menu } from "antd"
import { itemsMenu } from "../../constants/index"
import { convertChildToChildren } from '../../utils'

const NavMobile = () => {
    return (
        <Menu className='b-navMobile' items={convertChildToChildren(itemsMenu)} mode="inline" />
    )
}

export default NavMobile