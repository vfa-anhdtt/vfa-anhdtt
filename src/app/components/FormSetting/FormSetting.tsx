import React, { useState } from 'react'
import {
    Dialog as DialogDefault,
    DialogType,
    DialogFooter,
} from '@fluentui/react/lib/Dialog'
import { TextField } from '../TextField'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'

import { setOpenFormSettingAction } from '../../../stores/control/ControlAction'
import {
    setSizePageAction,
    setPropsControlsAction,
} from '../../../stores/display/DisplayAction'

import { HeaderFormSettingStyle, FormSettingDetails } from './FormSetting.style'
import { TAB_TITLE, DEFAULT_VALUE } from './FormSettingConstants'
import { useStore } from '../../../hooks'

import GeneralSetting from './GeneralSetting'
import FontSetting from './FontSetting'
import DisplaySetting from './DisplaySetting'
import ControlSetting from './ControlSetting'

/**
 * #17459: form setting
 * @returns
 */
const FormSetting = () => {
    //add color for background modal
    const modalPropsStyles = { main: { background: '#DAE8FC' } }

    //number of selected tab
    const [numberTab, setNumberTab] = useState(1)

    // feature/#18448_change_text_and_font_size_default --->>
    // MOD default value
    //selected page size before update
    const [pageSize, setPageSize] = useState(DEFAULT_VALUE.SIZE_PAGE)

    //selected pager orientation before update
    const [paperOrientation, setPaperOrientation] = useState(DEFAULT_VALUE.PAPER_ORIENTATION)

    //selected font family before update
    const [fontFamily, setFontFamily] = useState(DEFAULT_VALUE.FONT_FAMILY)

    // feature/#18643_update_form_setting -->>
    // ADD props default for textbox

    //selected font size before update
    const [fontSize, setFontSize] = useState(DEFAULT_VALUE.FONT_SIZE)
    // feature/#18448_change_text_and_font_size_default <<---

    //selected font style before update
    const [fontStyle, setFontStyle] = useState({ bold: false, italic: false })
    
    //selected font color before update
    const [color, setColor] = useState('')

    //selected font color for tooltip before update
    const [colorTooltip, setColorTooltip] = useState('')

    //selected font color for placehoder before update
    const [colorPlacehoder, setColorPlacehoder] = useState(DEFAULT_VALUE.COLOR_PLACEHODER)

    //selected font color for tooltip before update
    const [fontFamilyTooltip, setFontFamilyTooltip] = useState('')
    // feature/#18643_update_form_setting <<--

    const [state, dispatch] = useStore()

    const {
        formSetting: { isShowFormSetting },
        sizeKonva,
        propsControls,
    } = state

    /**
     * #17459: form setting
     * close form setting
     */
    const closeFormSetting = () => {
        dispatch(setOpenFormSettingAction(false))
    }

    /**
     * #17459: form setting
     * update value form setting and close form setting
     */
    const submitFormSetting = () => {
        const getProps = {
            fontFamily,
            fontSize,
            bold: fontStyle.bold,
            italics: fontStyle.italic,
            color,

            // feature/#18643_update_form_setting -->>
            // ADD props default for textbox
            colorTooltip,
            colorPlacehoder,
            fontFamilyTooltip,
            // feature/#18643_update_form_setting <<--
        }
        dispatch(setSizePageAction(pageSize + paperOrientation))
        dispatch(setPropsControlsAction(getProps))
        closeFormSetting()
    }

    /**
     * #17459: form setting
     * return content of selected tab
     * @returns 
     */
    const showDetailsTab = () => {
        switch (numberTab) {
            case TAB_TITLE.FONT_SETTING:
                return (
                    <FontSetting
                        properties={propsControls}
                        propsFontFamily={setFontFamily}
                        propsFontSize={setFontSize}
                        propsFontStyle={setFontStyle}
                        propsColor={setColor}
                        
                        // feature/#18643_update_form_setting -->>
                        // ADD props default for textbox
                        propsColorTooltip={setColorTooltip}
                        propsColorPlacehoder={setColorPlacehoder}
                        propsFontFamilyTooltip={setFontFamilyTooltip}
                        // feature/#18643_update_form_setting <<--
                    />
                )
            case TAB_TITLE.DISPLAY_SETTING:
                return <DisplaySetting />
            case TAB_TITLE.CONTROL_SETTING:
                return <ControlSetting />
            default:
                return (
                    <GeneralSetting
                        pageSize={sizeKonva.type}
                        propsSetPageSize={setPageSize}
                        propsPaperOrientation={setPaperOrientation}
                    />
                )
        }
    }

    return (
        <DialogDefault
            hidden={!isShowFormSetting}
            onDismiss={closeFormSetting}
            dialogContentProps={{
                showCloseButton: true,
                type: DialogType.normal,
                // title: 'Dialog Box Title',
                // subText: 'dialog box message description.'
            }}
            styles={modalPropsStyles}
            minWidth={800}
        >
            <HeaderFormSettingStyle>
                <h2>フォーム設定</h2>
                <p>申請書ID 0000000000001</p>
                <TextField> 名称 </TextField>
            </HeaderFormSettingStyle>

            <FormSettingDetails>
                <div className="formLeft">
                    <div
                        className={
                            numberTab !== TAB_TITLE.GENERAL_SETTING
                                ? 'titlePage'
                                : 'titleActive'
                        }
                        onClick={() => setNumberTab(TAB_TITLE.GENERAL_SETTING)}
                    >
                        1．基本設定
                    </div>
                    <div
                        className={
                            numberTab !== TAB_TITLE.FONT_SETTING
                                ? 'titlePage'
                                : 'titleActive'
                        }
                        onClick={() => setNumberTab(TAB_TITLE.FONT_SETTING)}
                    >
                        2．共通フォント設定
                    </div>
                    <div
                        className={
                            numberTab !== TAB_TITLE.DISPLAY_SETTING
                                ? 'titlePage'
                                : 'titleActive'
                        }
                        onClick={() => setNumberTab(TAB_TITLE.DISPLAY_SETTING)}
                    >
                        3．共通表示設定
                    </div>
                    <div
                        className={
                            numberTab !== TAB_TITLE.CONTROL_SETTING
                                ? 'titlePage'
                                : 'titleActive'
                        }
                        onClick={() => setNumberTab(TAB_TITLE.CONTROL_SETTING)}
                    >
                        4．制御設定
                    </div>
                </div>
                <div className="formRight">{showDetailsTab()}</div>
            </FormSettingDetails>
            <DialogFooter>
                <PrimaryButton onClick={submitFormSetting} text="更新する" />
                <DefaultButton onClick={closeFormSetting} text="閉じる" />
            </DialogFooter>
        </DialogDefault>
    )
}

export default FormSetting
