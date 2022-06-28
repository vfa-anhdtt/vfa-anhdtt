import React, { useState, useMemo, useEffect } from 'react'
import { Dropdown } from '@fluentui/react/lib/Dropdown'
import { ControlSettingStyle } from './ControlSetting.style'
import { RowStyle, RowBlueStyle } from '../FormSetting.style'
import { DROPDOWN_DATA } from '../FormSettingConstants'

/**
 * #17459: form setting
 * @param props from FormSetting
 * @returns 
 */
const ControlSetting = () => {

    return (
        <ControlSettingStyle>
            <RowBlueStyle>
                <div className='leftRow'>西暦・知暦</div>
                <div className='rightRow'>
                    <Dropdown
                        id={`dropdown`}
                        options={DROPDOWN_DATA.CALENDAR}
                        placeholder='会社設定'
                    />
                </div>
            </RowBlueStyle>
            <RowStyle>
                <div className='leftRow'>入力ガイダンス</div>
                <div className='rightRow'>
                    <Dropdown
                        id={`dropdown`}
                        options={DROPDOWN_DATA.GUIDE_INPUT}
                        placeholder='ガイドエリア表示'
                    />
                </div>
            </RowStyle>
        </ControlSettingStyle>
    )
}

export default ControlSetting