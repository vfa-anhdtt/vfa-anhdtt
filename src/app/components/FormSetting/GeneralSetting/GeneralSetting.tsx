import React, { useState } from 'react'
import { Dropdown } from '@fluentui/react/lib/Dropdown'
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup'
import { GeneralSettingStyle } from './GeneralSetting.style'
import { RowStyle, RowBlueStyle } from '../FormSetting.style'
import { InputField } from '../../InputField'

import { DROPDOWN_DATA, PAPER_ORIENTATION } from '../FormSettingConstants'

/**
 * #17459: form setting
 * @param props from FormSetting
 * @returns
 */
const GeneralSetting = (props) => {
    const { pageSize, propsSetPageSize, propsPaperOrientation } = props

    //width of grid
    const [gridWidth, setGridWidth] = useState(0)

    //speed of mouse
    const [movementWidth, setMovementWidth] = useState(0)

    //width of something
    const [changeWidth, setChangeWidth] = useState(0)

    /**
     * #17459: form setting
     * check is number or not
     * @param num : value of the input
     * @return
     */
    const isNumber = (num) => {
        if (num.match(/^\d+$/) || num === '') {
            return true
        }
    }

    /**
     * #17459: form setting
     * set Grid width
     * @param e : event of the input
     */
    const getGridWidth = (e) => {
        if (isNumber(e.target.value)) {
            setGridWidth(e.target.value)
        }
    }

    /**
     * #17459: form setting
     * set speed of mouse when move controls
     * @param e : event of the input
     */
    const getMovementWidth = (e) => {
        if (isNumber(e.target.value)) {
            setMovementWidth(e.target.value)
        }
    }

    /**
     * #17459: form setting
     * set width of zoom in / zoom out
     * @param e : event of the input
     */
    const getChangeWidth = (e) => {
        if (isNumber(e.target.value)) {
            setChangeWidth(e.target.value)
        }
    }

    /**
     * #17459: form setting
     * set page size in Form setting
     * @param e : event of the dropdown
     * @param option: value of the selected option
     */
    const getSizePage = (e, option) => {
        propsSetPageSize(option.key)
    }

    /**
     * #17459: form setting
     * set paper orientation in Form setting
     * @param e : event of the dropdown
     * @param option: value of the selected option
     */
    const getPaperOrientation = (e, option) => {
        if (option.key) {
            propsPaperOrientation(option.key)
        }
    }

    return (
        <GeneralSettingStyle>
            <RowBlueStyle>
                <div className="leftRow">用紙サイズ</div>
                <div className="rightRow">
                    <Dropdown
                        id={`dropdown`}
                        options={DROPDOWN_DATA.SIZE_PAGE}
                        defaultSelectedKey={pageSize.slice(0, 2)}
                        onChange={(e, option) => getSizePage(e, option)}
                    />
                </div>
            </RowBlueStyle>
            <RowStyle>
                <div className="leftRow">用紙の向き</div>
                <div className="rightRow">
                    <ChoiceGroup
                        options={PAPER_ORIENTATION}
                        defaultSelectedKey={pageSize.slice(2, pageSize.length)}
                        onChange={(e, option) => getPaperOrientation(e, option)}
                    ></ChoiceGroup>
                </div>
            </RowStyle>
            <RowBlueStyle>
                <div className="leftRow">グリッド幅</div>
                <div className="rightRow">
                    <InputField
                        className="w-180 mr-10 mt-10"
                        value={gridWidth}
                        onChange={getGridWidth}
                    />
                    <p>mm</p>
                </div>
            </RowBlueStyle>
            <RowStyle>
                <div className="leftRow">移動幅</div>
                <div className="rightRow">
                    <InputField
                        className="w-180 mr-10 mt-10"
                        value={movementWidth}
                        onChange={getMovementWidth}
                    />
                    <p>mm</p>
                </div>
            </RowStyle>
            <RowBlueStyle>
                <div className="leftRow">拡大・縮小幅</div>
                <div className="rightRow">
                    <InputField
                        value={changeWidth}
                        onChange={getChangeWidth}
                        className="w-180 mr-10 mt-10 "
                    />
                    <p>mm</p>
                </div>
            </RowBlueStyle>
        </GeneralSettingStyle>
    )
}

export default GeneralSetting
