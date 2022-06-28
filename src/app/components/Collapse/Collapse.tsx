import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../Icon'

import { CollapseStyle } from './Collapse.style'

function Collapse(props) {
    const { propsIsShow, children, title } = props

    const [isShow, setIsShow] = useState(propsIsShow)

    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD check propsIsShow, save isShow
    useEffect(() => {
        setIsShow(propsIsShow)
    }, [propsIsShow])
    // feature/#18466_Doubleclick_control_is_change_content <<---

    const handleShowListContent = () => {
        setIsShow(!isShow)
    }

    return (
        <CollapseStyle>
            <div
                className="collapse-header py-16 d-flex items-center cursor-pointer gap-8"
                onClick={handleShowListContent}
            >
                <div>
                    <Icon
                        iconName={isShow ? `ChevronDown` : `ChevronRight`}
                        className="collapse-header_icon"
                    />
                </div>
                <label className="d-flex items-center cursor-pointer">
                    {title}
                </label>
            </div>
            <div className={`collapse-content ${isShow ? `open` : `close`}`}>
                {children}
            </div>
        </CollapseStyle>
    )
}

Collapse.defaultProps = {
    title: '',
    propsIsShow: false,
    children: <></>,
}

Collapse.propTypes = {
    title: PropTypes.string,
    propsIsShow: PropTypes.bool,
    children: PropTypes.node,
}

export default Collapse
