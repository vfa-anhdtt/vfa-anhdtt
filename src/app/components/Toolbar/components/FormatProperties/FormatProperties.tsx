import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Collapse } from '../../../Collapse'
import { TextField } from '../../../TextField'
import { CONTROLS_TYPES } from '../../../../../constants'
import { Toggle } from '../../../Toggle'

import { FormatPropertiesStyle } from './FormatProperties.style'

function FormatProperties(props) {
    const { tooltip, onChange, placeHolder } = props

    const [stateTooltip, setStateTooltip] = useState(tooltip)

    const [statePlaceHolder, setStatePlaceHolder] = useState(placeHolder)

    useEffect(() => {
        setStateTooltip(tooltip)
    }, [tooltip])

    useEffect(() => {
        setStatePlaceHolder(placeHolder)
    }, [placeHolder])

    function handleOnChange(e) {
        const {
            target: { value, name },
        } = e

        switch (name) {
            case 'tooltip':
                setStateTooltip(value)
                break
            case 'placeHolder':
                setStatePlaceHolder(value)
                break
            default:
                break
        }

        onChange(name, value)
    }

    function handleOnChangeToggle(name, checked) {
        onChange(name, checked)
    }

    function showText() {
        const { type } = props

        const { TEXTBOX } = CONTROLS_TYPES

        const show = []

        if ([TEXTBOX].includes(type)) {
            show.push(
                <div key={0}>
                    <TextField
                        value={statePlaceHolder}
                        onChange={handleOnChange}
                        name="placeHolder"
                    >
                        プレースホルダー
                    </TextField>
                </div>
            )
        }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show TextField tooltip
     * @param
     * @returns {Element} component TextField
     **/
    function showTooltip() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { TEXTBOX, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---

        const { type } = props

        const show = []
        // feature/#17434_Property_image --->>
        // ADD check there is IMAGE, show input tooltip
        if ([TEXTBOX, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <div key={0}>
                    <TextField
                        value={stateTooltip}
                        onChange={handleOnChange}
                        name="tooltip"
                    >
                        ツールチップ
                    </TextField>
                </div>
            )
        }

        return show
    }

    function showChecked() {
        const { RADIO, CHECKBOX } = CONTROLS_TYPES

        const { type, checked } = props

        const show = []

        if ([RADIO, CHECKBOX].includes(type)) {
            show.push(
                <div key={0}>
                    <Toggle
                        checked={checked}
                        label="チェック状態"
                        name="checked"
                        onChange={handleOnChangeToggle}
                    />
                </div>
            )
        }

        return show
    }

    return (
        <FormatPropertiesStyle>
            <div className="properties-format">
                <Collapse title="データプロパティ">
                    <div className="d-flex flex-col p-16 gap-16">
                        {showTooltip()}
                        {showText()}
                        {showChecked()}
                    </div>
                </Collapse>
            </div>
        </FormatPropertiesStyle>
    )
}

FormatProperties.defaultProps = {
    onChange: () => {},
    tooltip: '',
    placeHolder: '',
    type: '',
    checked: false,
}

FormatProperties.propTypes = {
    onChange: PropTypes.func,
    tooltip: PropTypes.string,
    placeHolder: PropTypes.string,
    type: PropTypes.string,
    checked: PropTypes.bool,
}
export default FormatProperties
