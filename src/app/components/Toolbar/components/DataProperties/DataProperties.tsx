import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Collapse } from '../../../Collapse'
import { TextField } from '../../../TextField'
import { CONTROLS_TYPES } from '../../../../../constants'

import { DataPropertiesStyle } from './DataProperties.style'
import { setOpenCalculationDialogAction } from '../../../../../stores/control/ControlAction'
import { useStore } from '../../../../../hooks'
import { Label } from '@fluentui/react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
// feature/#18466_Doubleclick_control_is_change_content --->>
// ADD isObjectEmpty, structuredClone
import { isObjectEmpty, structuredClone } from '../../../../../utils'
// feature/#18466_Doubleclick_control_is_change_content <<---

function DataProperties(props) {
    const [state, dispatch] = useStore()
    const { selectedControl } = state

    const {
        url,
        onChange,
        text,
        doubleSelectedControl,
        id,
        clearDoubleSelectedControl,
    } = props

    const [stateUrl, setStateUrl] = useState(url)

    const [stateText, setStateText] = useState(text)

    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD isObjectEmpty
    const [isShowCollapse, handleShowCollapse] = useState(false)
    // feature/#18466_Doubleclick_control_is_change_content <<---

    useEffect(() => {
        setStateUrl(url)
    }, [url])

    useEffect(() => {
        setStateText(text)
    }, [text])

    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD check doubleSelectedControl
    useEffect(() => {
        // check doubleSelectedControl and id,
        // update isShowCollapse and clear doubleSelectedControl
        if (
            !isObjectEmpty(doubleSelectedControl) &&
            doubleSelectedControl.id === id
        ) {
            handleShowCollapse(true)
            clearDoubleSelectedControl()
        }
    }, [doubleSelectedControl])
    // feature/#18466_Doubleclick_control_is_change_content <<---

    function handleOnChange(e) {
        const {
            target: { value, name },
        } = e

        switch (name) {
            case 'url':
                setStateUrl(value)
                break
            case 'text':
                setStateText(value)
                break
            default:
                break
        }

        onChange(name, value)
    }

    function showText() {
        const { type } = props

        const { LABEL, TEXTBOX, CHECKBOX, RADIO } = CONTROLS_TYPES

        const show = []

        if ([LABEL, TEXTBOX, CHECKBOX, RADIO].includes(type)) {
            show.push(
                <div key={0}>
                    <TextField
                        value={stateText}
                        onChange={handleOnChange}
                        name="text"
                        // feature/#18466_Doubleclick_control_is_change_content --->>
                        // ADD props autoFocus with data `isShowCollapse`
                        autoFocus={isShowCollapse}
                        // feature/#18466_Doubleclick_control_is_change_content <<---
                    >
                        表示テキスト
                    </TextField>
                </div>
            )
        }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show TextField url
     * @param
     * @returns {Element} component TextField
     **/
    function showUrl() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { LABEL, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---

        const { type } = props

        const show = []
        // feature/#17434_Property_image --->>
        // ADD check there is IMAGE, show input URL設定
        if ([LABEL, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <div key={0}>
                    <TextField
                        value={stateUrl}
                        onChange={handleOnChange}
                        name="url"
                    >
                        URL設定
                    </TextField>
                </div>
            )
        }

        return show
    }

    // #17457 Set open calculation dialog
    const dispatchSetOpenCalculationDialogAction = () => {
        dispatch(setOpenCalculationDialogAction(true))
    }

    // #17457 Set close calculation dialog
    const dispatchSetCloseCalculationDialog = () => {
        dispatch(setOpenCalculationDialogAction(false))
    }
    const [stateControl, setStateControl] = useState(selectedControl)

    const selectedControlClone = structuredClone(stateControl)

    // #17457 If selectedControl is empty close CalculationDialog
    useEffect(() => {
        if (isObjectEmpty(selectedControl)) {
            dispatchSetCloseCalculationDialog()
        }
        if (stateControl !== selectedControlClone) {
            dispatchSetCloseCalculationDialog()
        }
    }, [selectedControl])

    /**
     * Button to open CalculationDialog
     * @Author NguyenNDK
     * @returns Show button
     */
    function showCalculator() {
        const { TEXTBOX } = CONTROLS_TYPES
        const { type } = props
        const show = []

        // If control type includes props show button
        if ([TEXTBOX].includes(type)) {
            show.push(
                <PrimaryButton
                    key={0}
                    onClick={dispatchSetOpenCalculationDialogAction}
                >
                    設定画面を開く
                </PrimaryButton>
            )
        }
        return show
    }

    function showCalculatorText() {
        const { TEXTBOX } = CONTROLS_TYPES
        const { type } = props
        const show = []

        // If control type includes props show Label
        if ([TEXTBOX].includes(type)) {
            show.push(<Label key={0}>選択肢設定</Label>)
        }
        return show
    }

    return (
        <DataPropertiesStyle>
            <div className="properties-data">
                <Collapse title="データ" propsIsShow={isShowCollapse}>
                    <div className="d-flex flex-col p-16 gap-16">
                        {showUrl()}
                        {showText()}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {showCalculatorText()}
                            {showCalculator()}
                        </div>
                    </div>
                </Collapse>
            </div>
        </DataPropertiesStyle>
    )
}

DataProperties.defaultProps = {
    onChange: () => {},
    url: '',
    text: '',
    type: '',
    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD id, doubleSelectedControl, clearDoubleSelectedControl, set value default
    id: undefined,
    doubleSelectedControl: {},
    clearDoubleSelectedControl: () => {},
    // feature/#18466_Doubleclick_control_is_change_content <<---
}

DataProperties.propTypes = {
    onChange: PropTypes.func,
    url: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD and declaration id, doubleSelectedControl, clearDoubleSelectedControl,
    id: PropTypes.string,
    doubleSelectedControl: PropTypes.object,
    clearDoubleSelectedControl: PropTypes.func,
    // feature/#18466_Doubleclick_control_is_change_content <<---
}
export default DataProperties
