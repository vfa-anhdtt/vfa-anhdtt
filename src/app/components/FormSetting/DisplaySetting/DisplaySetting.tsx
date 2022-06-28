import React, { useState, useMemo, useEffect } from 'react'
import { Dropdown } from '@fluentui/react/lib/Dropdown'
import { DisplaySettingStyle } from './DisplaySetting.style'
import { RowStyle, RowBlueStyle } from '../FormSetting.style'
import { TextField } from '../../TextField'
import { DROPDOWN_DATA } from '../FormSettingConstants'

/**
 * #17459: form setting
 * @param props from FormSetting
 * @returns
 */
const DisplaySetting = () => {
    const labelStyles = { root: { fontWeight: 100, fontSize: '16px' } }

    const [leftArea, setLeftArea] = useState()
    const [rightArea, setRightArea] = useState()
    const [topArea, setTopArea] = useState()
    const [botArea, setBotArea] = useState()

    /**
     * #17459: form setting
     * set padding something left/right/top/bottom
     * @param e : event of the input
     */
    const getLeftArea = (e) => {
        setLeftArea(e.target.value)
    }
    const getRightArea = (e) => {
        setRightArea(e.target.value)
    }
    const getTopArea = (e) => {
        setTopArea(e.target.value)
    }
    const getBotArea = (e) => {
        setBotArea(e.target.value)
    }

    return (
        <DisplaySettingStyle>
            <RowBlueStyle>
                <div className="leftRow">横位置</div>
                <div className="rightRow">
                    <Dropdown
                        id={`dropdown`}
                        options={DROPDOWN_DATA.HORIZON_POSITION}
                        placeholder="左寄せ"
                    />
                </div>
            </RowBlueStyle>
            <RowStyle>
                <div className="leftRow">縦位置</div>
                <div className="rightRow">
                    <Dropdown
                        id={`dropdown`}
                        options={DROPDOWN_DATA.VERTICAL_POSITION}
                        placeholder="中央揃え"
                    />
                </div>
            </RowStyle>
            <RowBlueStyle>
                <div className="leftRow">余白パディング</div>
                <div className="rightRow">
                    <div className="d-flex mr-35">
                        <TextField
                            labelStyle={labelStyles}
                            className="w-90 mx-5"
                            value={topArea}
                            onChange={getTopArea}
                        >
                            上
                        </TextField>
                        <p>mm</p>
                    </div>
                    <div className="d-flex">
                        <TextField
                            labelStyle={labelStyles}
                            className="w-90 mx-5"
                            value={botArea}
                            onChange={getBotArea}
                        >
                            下
                        </TextField>
                        <p>mm</p>
                    </div>
                </div>
            </RowBlueStyle>
            <RowBlueStyle>
                <div className="leftRow"></div>
                <div className="rightRow">
                    <div className="d-flex mr-35">
                        <TextField
                            labelStyle={labelStyles}
                            className="w-90 mx-5"
                            value={rightArea}
                            onChange={getRightArea}
                        >
                            右
                        </TextField>
                        <p>mm</p>
                    </div>
                    <div className="d-flex">
                        <TextField
                            labelStyle={labelStyles}
                            className="w-90 mx-5 fs-16"
                            value={leftArea}
                            onChange={getLeftArea}
                        >
                            左
                        </TextField>
                        <p>mm</p>
                    </div>
                </div>
            </RowBlueStyle>
        </DisplaySettingStyle>
    )
}

export default DisplaySetting
