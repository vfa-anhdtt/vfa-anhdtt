// feature/#18466_Doubleclick_control_is_change_content --->>
// ADD FC
import React, { FC } from 'react'
// feature/#18466_Doubleclick_control_is_change_content <<---

import { useHistory } from 'react-router-dom'

import { ActionButton, IconButton, DftButton } from '../Button'

import { HeaderStyle, styleButtonRefresh } from './Header.style'

const iconChevronLeft = { iconName: 'ChevronLeft' }
const iconSettings = { iconName: 'Settings' }
const iconHelp = { iconName: 'Help' }
const iconRefresh = { iconName: 'Refresh' }

/**
 * feature/#18466_Doubleclick_control_is_change_content
 * interface HeaderProps
 */
interface HeaderProps {
    isPageReview?: boolean
}

const Header: FC<HeaderProps> = ({ isPageReview }) => {
    const history = useHistory()

    const gotoHome = () => {
        history.push(`/home`)
    }

    /**
     * feature/#18466_Doubleclick_control_is_change_content
     * show button go Home page
     * @param
     * @returns {Element}
     **/
    const showButtonGoToHome = () => {
        const show = []
        // check `isPageReview` is true, show button
        if (isPageReview) {
            show.push(
                <ActionButton
                    key="btnHome"
                    iconProps={iconChevronLeft}
                    onClick={gotoHome}
                >
                    申請書の編集
                </ActionButton>
            )
        }
        return show
    }

    return (
        <HeaderStyle>
            <div className="header d-flex py-16 h-56 items-center justify-between">
                <div className="header-left">
                    {/* feature/#18466_Doubleclick_control_is_change_content --->> */}
                    {/* MOD check show button go Home page */}
                    {showButtonGoToHome()}
                    {/* feature/#18466_Doubleclick_control_is_change_content <<--- */}
                </div>
                <div className="header-right d-flex items-center justify-between gap-y-2">
                    <IconButton iconProps={iconSettings} title="設定" />
                    <IconButton iconProps={iconHelp} title="ヘルプ" />
                    <DftButton
                        text="更新"
                        iconProps={iconRefresh}
                        style={styleButtonRefresh}
                    />
                </div>
            </div>
        </HeaderStyle>
    )
}

// feature/#18466_Doubleclick_control_is_change_content --->>
// ADD defaultProps, set default value `isPageReview`
Header.defaultProps = {
    isPageReview: false,
}
// feature/#18466_Doubleclick_control_is_change_content <<---

export default Header
