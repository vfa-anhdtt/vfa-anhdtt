import React, { useState, useEffect, useRef } from 'react'
import { Dropdown } from '@fluentui/react/lib/Dropdown'
import { FontSettingStyle } from './FontSetting.style'
import { RowStyle, RowBlueStyle } from '../FormSetting.style'
import { Toggle } from '../../Toggle'
import { ColorPicker } from '../../ColorPicker'
import { DROPDOWN_DATA, FONT_STYLE } from '../FormSettingConstants'

/**
 * #17459: form setting
 * @param props from FormSetting
 * @returns
 */
const FontSetting = (props) => {
    // feature/#18643_update_form_setting -->>
    // ADD new props
    const {
        propsFontFamily,
        propsFontSize,
        propsFontStyle,
        propsColor,
        propsColorTooltip,
        propsColorPlacehoder,
        propsFontFamilyTooltip,
        properties,
    } = props
    // feature/#18643_update_form_setting <<--

    //font family for example text
    const fontFamily = useRef('')

    //font family for example text
    const fontNote = useRef('')

    //font size for example text
    const sizeText = useRef('')

    //color for example text
    const [color, setColor] = useState(props.properties.color)

    //color for placehoder Textbox
    const [placehoderColor, setPlacehoderColor] = useState(props.properties.colorPlacehoder)

    //color for tooltip Textbox
    const [noteColor, setNoteColor] = useState(props.properties.colorTooltip)

    //bold for example text
    const [bold, setBold] = useState(props.properties.bold)

    //italic for example text
    const [italic, setItalic] = useState(props.properties.italics)

    /**
     * #17459: form setting
     * set color page
     * @param name : name of the color picker
     * @param value : event of the color picker
     */
    const handleOnChangeColor = (name, value) => {
        setColor(value)
        propsColor(value)
    }

    /**
     * #18643: update_form_setting
     * set color plahoder Textbox
     * @param name : name of the color picker
     * @param value : event of the color picker
     */
    const handleChangePlacehoderColor = (name, value) => {
        setPlacehoderColor(value)
        propsColorPlacehoder(value)
    }

    /**
     * #18643: update_form_setting
     * set color tooltip Textbox
     * @param name : name of the color picker
     * @param value : event of the color picker
     */
    const handleOnChangeNoteColor = (name, value) => {
        setNoteColor(value)
        propsColorTooltip(value)
    }

    /**
     * #18643: update_form_setting
     * set font family tooltip Textbox
     * @param option : value of the dropdown
     * @param e : event of the dropdowm
     */
    const getFontNote = (e, option) => {
        propsFontFamilyTooltip(option.key)
        fontNote.current = option.key
    }

    /**
     * #17459: form setting
     * set font style for example text
     * @param name : name of the toggle
     * @param value : event of the toggle
     */
    const handleOnChangeToggle = (name, value) => {
        if (name === FONT_STYLE.BOLD) {
            setBold(value)
        } else {
            setItalic(value)
        }
    }

    /**
     * #17459: form setting
     * set font family controls + font family for example text
     * @param option : value of the dropdown
     * @param e : event of the dropdowm
     */
    const getFontFamily = (e, option) => {
        propsFontFamily(option.key)
        fontFamily.current = option.key
    }

    /**
     * #17459: form setting
     * set font size + font size for example text
     * @param option : value of the dropdown
     * @param e : event of the dropdowm
     */
    const getFontSize = (e, option) => {
        propsFontSize(option.key)
        sizeText.current = option.key
    }

    /**
     * #17459: form setting
     * set font style controls
     */
    useEffect(() => {
        propsFontStyle({ bold, italic })
    }, [bold, italic])

    return (
        <FontSettingStyle
            props-bold={bold}
            props-italic={italic}
            props-family={fontFamily.current}
            props-color={color}
            props-size={sizeText.current}
        >
            <RowBlueStyle>
                <div className="leftRow">文字フォント</div>
                <div className="rightRow">
                    <Dropdown
                        options={DROPDOWN_DATA.FONT_FAMILY}
                        defaultSelectedKey={properties.fontFamily}
                        onChange={(e, option) => getFontFamily(e, option)}
                    />
                </div>
            </RowBlueStyle>
            <RowStyle>
                <div className="leftRow">文字サイズ</div>
                <div className="rightRow">
                    <Dropdown
                        options={DROPDOWN_DATA.FONT_SIZE}
                        defaultSelectedKey={properties.fontSize}
                        className="custom-Dropdown"
                        onChange={(e, option) => getFontSize(e, option)}
                    />
                </div>
            </RowStyle>
            <RowBlueStyle>
                <div className="leftRow">スタイル</div>
                <div className="rightRow">
                    <Toggle
                        label="太字"
                        name={FONT_STYLE.BOLD}
                        checked={bold}
                        onChange={handleOnChangeToggle}
                    />
                    <Toggle
                        label="斜字"
                        name={FONT_STYLE.ITALIC}
                        checked={italic}
                        onChange={handleOnChangeToggle}
                    />
                </div>
            </RowBlueStyle>
            <RowStyle>
                <div className="leftRow">文字色</div>
                <div className="rightRow">
                    <ColorPicker
                        key={0}
                        label=""
                        name="color"
                        onChange={handleOnChangeColor}
                        color={color}
                    />
                </div>
            </RowStyle>

            <RowStyle />
            <RowStyle>
                <div className="leftRow">プレビュー</div>
            </RowStyle>
            <RowStyle>
                <textarea value="Aaあぁアァ亜宇" disabled></textarea>
            </RowStyle>

            {/* feature/#18643_update_form_setting -->>
            MOD layout */}
            <RowStyle>
                <h3>プレースホルダー</h3>
            </RowStyle>
            <RowBlueStyle>
                <div className="leftRow">文字色</div>
                <div className="rightRow">
                    <ColorPicker
                        key={1}
                        label=""
                        name="color"
                        onChange={handleChangePlacehoderColor}
                        color={placehoderColor}
                    />
                </div>
            </RowBlueStyle>

            <RowStyle>
                <h3>ツールチップ</h3>
            </RowStyle>
            <RowBlueStyle>
                <div className="leftRow">文字フォント</div>
                <div className="rightRow">
                    <Dropdown
                        options={DROPDOWN_DATA.FONT_FAMILY}
                        defaultSelectedKey={properties.fontFamilyTooltip}
                        onChange={(e, option) => getFontNote(e, option)}
                    />
                </div>
            </RowBlueStyle>

            <RowStyle>
                <div className="leftRow">文字色</div>
                <div className="rightRow">
                    <ColorPicker
                        key={2}
                        label=""
                        name="color"
                        onChange={handleOnChangeNoteColor}
                        color={noteColor}
                    />
                </div>
            </RowStyle>
            {/* feature/#18643_update_form_setting <<-- */}
        </FontSettingStyle>
    )
}

export default FontSetting
