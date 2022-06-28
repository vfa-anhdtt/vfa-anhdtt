import React from 'react'
import PropTypes from 'prop-types'

import { Collapse } from '../../../Collapse'
import { TextFieldSelect } from '../../../TextField'
import { Toggle } from '../../../Toggle'
import { ColorPicker } from '../../../ColorPicker'

import {
    FONT_FAMILY_LIST,
    FONT_SIZE_LIST,
    BORDER_WIDTH_LIST,
    VERTICAL_ALIGN_LIST,
    ALIGN_LIST,
    CONTROLS_TYPES,
    BORDER_TYPE_LIST,
} from '../../../../../constants'

import {
    DisplayPropertiesStyle,
    DisplayInputStyle,
} from './DisplayProperties.style'

function DisplayProperties(props) {
    const {
        fontFamily,
        onChange,
        fontSize,
        color,
        bold,
        backgroundColor,
        italics,
        underline,
        borderOrNot,
        borderColor,
        borderWidth,
        verticalAlign,
        align,
        type,
        borderType,
    } = props

    function handleOnChangeSelect(name, option) {
        const { value } = option

        onChange(name, value)
    }

    function handleOnChangeToggle(name, checked) {
        onChange(name, checked)
    }

    function handleOnChangeColorPicker(name, value) {
        onChange(name, value)
    }

    /**
     * feature/#17434_Property_image
     * Creates show TextFieldSelect fontFamily
     * @param
     * @returns {Element} component TextFieldSelect
     **/
    function showFontFamily() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { LINE, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---

        const show = []
        // feature/#17434_Property_image --->>
        // ADD check not is IMAGE, show input fontFamily
        if (![LINE, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <div key={0}>
                    <TextFieldSelect
                        options={FONT_FAMILY_LIST}
                        dropDownStyle={DisplayInputStyle}
                        onChange={handleOnChangeSelect}
                        name="fontFamily"
                        defaultSelectedKey={fontFamily}
                    >
                        文字フォント
                    </TextFieldSelect>
                </div>
            )
        }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show TextFieldSelect fontSize
     * @param
     * @returns {Element} component TextFieldSelect
     **/
    function showFontSize() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { LINE, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---

        const show = []
        // feature/#17434_Property_image --->>
        // ADD check not is IMAGE, show input fontSize
        if (![LINE, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <div key={0}>
                    <TextFieldSelect
                        options={FONT_SIZE_LIST}
                        dropDownStyle={DisplayInputStyle}
                        onChange={handleOnChangeSelect}
                        name="fontSize"
                        defaultSelectedKey={fontSize}
                    >
                        文字サイズ
                    </TextFieldSelect>
                </div>
            )
        }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show ColorPicker color
     * @param
     * @returns {Element} component ColorPicker
     **/
    function showFontColor() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { LINE, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---

        const show = []

        // feature/#17434_Property_image --->>
        // ADD check not is IMAGE, show input fontColor
        if (![LINE, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <div key={0}>
                    <ColorPicker
                        label="文字色"
                        name="color"
                        id="color"
                        onChange={handleOnChangeColorPicker}
                        color={color}
                    />
                </div>
            )
        }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show Toggle font bold
     * @param
     * @returns {Element} component Toggle
     **/
    function showFontBold() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { LINE, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---

        const show = []

        // feature/#17434_Property_image --->>
        // ADD check not is IMAGE, show input fontBold
        if (![LINE, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <div key={0}>
                    <Toggle
                        label="太字"
                        onChange={handleOnChangeToggle}
                        name="bold"
                        checked={bold}
                    />
                </div>
            )
        }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show Toggle font italics
     * @param
     * @returns {Element} component Toggle
     **/
    function showFontItalic() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { LINE, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---

        const show = []

        // feature/#17434_Property_image --->>
        // ADD check not is IMAGE, show input font Italic
        if (![LINE, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <div key={0}>
                    <Toggle
                        checked={italics}
                        label="斜体"
                        name="italics"
                        onChange={handleOnChangeToggle}
                    />
                </div>
            )
        }

        return show
    }

    function showFontUnderline() {
        const { type } = props
        const { LABEL } = CONTROLS_TYPES

        const show = []

        if ([LABEL].includes(type)) {
            show.push(
                <div key={0}>
                    <Toggle
                        checked={underline}
                        label="下線"
                        name="underline"
                        onChange={handleOnChangeToggle}
                    />
                </div>
            )
        }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show ColorPicker backgroundColor
     * @param
     * @returns {Element} component ColorPicker
     **/
    function showBackgroundColor() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { SIGNATURE, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---

        const { type } = props

        const show = []

        // feature/#17434_Property_image --->>
        // ADD check not is IMAGE, show input background color
        if (![SIGNATURE, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <div key={0}>
                    <ColorPicker
                        label="背景色"
                        name="backgroundColor"
                        id="backgroundColor"
                        onChange={handleOnChangeColorPicker}
                        color={backgroundColor}
                    />
                </div>
            )
        }

        return show
    }

    function showBorderOrNot() {
        const { LINE } = CONTROLS_TYPES

        const show = []

        if (![LINE].includes(type)) {
            show.push(
                <div key={0}>
                    <Toggle
                        checked={borderOrNot}
                        label="枠線有無"
                        name="borderOrNot"
                        onChange={handleOnChangeToggle}
                    />
                </div>
            )
        }

        return show
    }

    function showBorderColor() {
        const { LINE } = CONTROLS_TYPES

        const show = []

        if (![LINE].includes(type)) {
            show.push(
                <div key={0}>
                    <ColorPicker
                        label="ボーダの色"
                        name="borderColor"
                        id="borderColor"
                        onChange={handleOnChangeColorPicker}
                        color={borderColor}
                    />
                </div>
            )
        }

        return show
    }

    function showBorderWidth() {
        const { LINE } = CONTROLS_TYPES

        const show = []

        if (![LINE].includes(type)) {
            show.push(
                <div key={0}>
                    <TextFieldSelect
                        options={BORDER_WIDTH_LIST}
                        dropDownStyle={DisplayInputStyle}
                        onChange={handleOnChangeSelect}
                        name="borderWidth"
                        defaultSelectedKey={borderWidth}
                    >
                        サイズボーダー
                    </TextFieldSelect>
                </div>
            )
        }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show TextFieldSelect verticalAlign
     * @param
     * @returns {Element} component TextFieldSelect
     **/
    function showVerticalAlign() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { SIGNATURE, LINE, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---

        const { type } = props

        const show = []

        // feature/#17434_Property_image --->>
        // ADD check not is IMAGE, show input Vertical Align
        if (![SIGNATURE, LINE, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <div key={0}>
                    <TextFieldSelect
                        options={VERTICAL_ALIGN_LIST}
                        dropDownStyle={DisplayInputStyle}
                        onChange={handleOnChangeSelect}
                        name="verticalAlign"
                        defaultSelectedKey={verticalAlign}
                    >
                        文字位置縦
                    </TextFieldSelect>
                </div>
            )
        }
        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show TextFieldSelect align
     * @param
     * @returns {Element} component TextFieldSelect
     **/
    function showAlign() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { SIGNATURE, LINE, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---
        const { type } = props

        const show = []

        // feature/#17434_Property_image --->>
        // ADD check not is IMAGE, show input Align
        if (![SIGNATURE, LINE, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <div key={0}>
                    <TextFieldSelect
                        options={ALIGN_LIST}
                        dropDownStyle={DisplayInputStyle}
                        onChange={handleOnChangeSelect}
                        name="align"
                        defaultSelectedKey={align}
                    >
                        文字位置横
                    </TextFieldSelect>
                </div>
            )
        }

        return show
    }

    function showBorderType() {
        const { LINE } = CONTROLS_TYPES
        const { type } = props

        const show = []

        if ([LINE].includes(type)) {
            show.push(
                <div key={0}>
                    <TextFieldSelect
                        key={0}
                        options={BORDER_TYPE_LIST}
                        dropDownStyle={DisplayInputStyle}
                        onChange={handleOnChangeSelect}
                        name="borderType"
                        defaultSelectedKey={borderType}
                    >
                        線種類
                    </TextFieldSelect>
                </div>
            )
        }

        return show
    }

    return (
        <DisplayPropertiesStyle>
            <div className="properties-display">
                <Collapse title="表示">
                    <div className="d-flex flex-col p-16 gap-16">
                        {showFontFamily()}
                        {showFontSize()}
                        {showFontBold()}
                        {showFontItalic()}
                        {showFontUnderline()}
                        {showBackgroundColor()}
                        {showFontColor()}
                        {showBorderOrNot()}
                        {showBorderColor()}
                        {showBorderWidth()}
                        {showVerticalAlign()}
                        {showAlign()}
                        {showBorderType()}
                    </div>
                </Collapse>
            </div>
        </DisplayPropertiesStyle>
    )
}

DisplayProperties.defaultProps = {
    fontFamily: '',
    fontSize: 16,
    color: '#000000',
    onChange: () => {},
    bold: false,
    italics: false,
    underline: false,
    backgroundColor: '#ffffff',
    borderOrNot: false,
    borderColor: '#ffffff',
    borderWidth: 1,
    verticalAlign: 'middle',
    align: 'center',
    type: CONTROLS_TYPES.LABEL,
    borderType: 'solid',
}

DisplayProperties.propTypes = {
    fontFamily: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    bold: PropTypes.bool,
    italics: PropTypes.bool,
    underline: PropTypes.bool,
    backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderOrNot: PropTypes.bool,
    borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    verticalAlign: PropTypes.string,
    align: PropTypes.string,
    type: PropTypes.string,
    borderType: PropTypes.string,
}
export default DisplayProperties
