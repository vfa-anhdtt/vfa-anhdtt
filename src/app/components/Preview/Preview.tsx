import React, { FC } from 'react'

import ListControlPreview from '../ListControl/ListControlPreview'
import { _isUndefined } from '../../../utils'
import {
    ALIGN_PV_VALUE,
    CONTROLS_TYPES,
    VERTICAL_ALIGN_PV_VALUE,
} from '../../../constants'
import { Radio } from '../Radio'
import { useStore } from '../../../hooks'

import { PreviewStyle } from './Preview.style'
import * as formulaLogic from './FormulaLogicFunction'

/**
 * Create HTML to view on browser
 * @param props param from parent
 * @returns HTML content
 */
const Preview: FC = (props) => {
    // Use Global state
    const [state] = useStore()

    // Current listControl in Global Store
    const { listControl } = state

    /**
     * Create style for radio group
     * @param obj control's data
     * @returns object that have style's struct
     */
    function radioStyle(obj) {
        const returnStyle = {
            root: {
                border:
                    (obj.borderOrNot ? obj.borderWidth : 0) +
                    'px ' +
                    obj.borderType +
                    ' ' +
                    obj.borderColor,
                background: obj.backgroundColor,
                position: 'absolute',
                top: obj.position.y,
                left: obj.position.x,
                width: obj.width,
                height: obj.height,
                fontFamily: obj.fontFamily,
                fontSize: obj.fontSize,
                color: obj.color,
                fontWeight: obj.bold ? 'bold' : 'normal',
                fontStyle: obj.italics ? 'italic' : 'normal',
                display: obj.visible ? 'none' : 'grid',
                alignItems: VERTICAL_ALIGN_PV_VALUE[obj.verticalAlign],
                justifyContent: ALIGN_PV_VALUE[obj.align],
                marginTop: '0px!important',
            },
        }
        return returnStyle
    }

    /**
     * Create control in HTML to view on browser
     * @returns HTML content
     */
    const showListControlPreview = () => {
        const show = []

        if (!_isUndefined(listControl) && listControl instanceof Array) {
            listControl.map((value) => {
                // Except radio, create list control
                if (value.type !== CONTROLS_TYPES.RADIO) {
                    show.push(
                        <ListControlPreview
                            key={value.id}
                            {...value}
                            // #18337-Preview-Formula-for-textbox: Add event to calculate formula value
                            handleOnBlurOfNumber={handleOnBlurOfNumber}
                        />
                    )
                }
            })
        }

        return show
    }

    /**
     * Create Radio HTML to view on browser
     * @returns HTML content
     */
    function showRadioControl() {
        const radio = []

        // Radio button is not the same with oher control, create data for group
        const radioLs = listControl.filter(
            (value) => value.type === CONTROLS_TYPES.RADIO
        )

        // If has radio data
        if (radioLs.length) {
            // Data to set for radio group (Fluent control need)
            let options = {}

            // Checked value
            let checkeds = {}

            //
            for (let i = 0; i < radioLs.length; i++) {
                // If not existed, declare
                if (!options[radioLs[i]['radioGroup']]) {
                    options[radioLs[i]['radioGroup']] = []
                    checkeds[radioLs[i]['radioGroup']] = ''
                }

                // Set checked value
                if (radioLs[i].checked) {
                    checkeds[radioLs[i]['radioGroup']] = radioLs[i]['text']
                }

                // Add data
                options[radioLs[i]['radioGroup']].push({
                    key: radioLs[i]['text'],
                    text: radioLs[i]['text'],
                    styles: radioStyle(radioLs[i]),
                })
            }

            // Create radio for preview
            if (options) {
                radio.push(
                    Object.keys(options).map((key) => (
                        <Radio
                            key={key}
                            data={options[key]}
                            backgroundColor="yellow"
                            defaultSelectedKey={checkeds[key]}
                        />
                    ))
                )
            }
        }
        return radio
    }

    // #18337-Preview-Formula-for-textbox ADD start
    // List control that set formula
    const listFormularControls = listControl.filter(
        (control) => !control.formula === false
    )

    // List control that set in formula
    const listControlInFormular =
        formulaLogic.getIDOfControlInFormula(listFormularControls)

    /**
     * Calculate value of formula that contain ID in formula
     * @param element html element
     * @param id ID of control that event occur
     */
    const handleOnBlurOfNumber = (element, id, type) => {
        // Only process if control type is valid
        if (type !== formulaLogic.CALL_CALC_TYPE) {
            return
        }

        // Only process if that control's formula include ID
        if (listControlInFormular.includes(id)) {
            // List control that will be calculate
            const controlNeedCalc = formulaLogic.getFormularContainControl(
                listFormularControls,
                id
            )

            // Index param use to browse list
            let index = 0

            // Loop to process
            while (index < controlNeedCalc.length) {
                // each control
                const control = controlNeedCalc[index]

                // Get Formula object
                const formularObj = formulaLogic.getStringValueOfFormula(
                    control.formula
                )

                // When valid data (all control in formula have value), calculare
                if (formularObj.isValid) {
                    // formula result
                    const formulaResult = formulaLogic.calculateFormularResult(
                        formularObj.formulaString
                    )

                    // Set value for control
                    document
                        .getElementById(control.id)
                        .getElementsByTagName('input')[0].value = formulaResult

                    // If value is number, calculate control that has control.id in formula
                    if (formulaResult !== formulaLogic.INVALID_VALUE) {
                        // Get controls that calculate from control.id
                        const controlNeedCalcNext =
                            formulaLogic.getFormularContainControl(
                                listFormularControls,
                                control.id
                            )

                        // Loop to process
                        controlNeedCalcNext.map((nxtControl) => {
                            // If control is not exist, add to list
                            if (!controlNeedCalc.includes(nxtControl)) {
                                controlNeedCalc.push(nxtControl)
                            }
                        })
                    }
                }
                // When invalid, clear value
                else {
                    document
                        .getElementById(control.id)
                        .getElementsByTagName('input')[0].value = ''
                }
                index += 1
            }
        }
    }
    // #18337-Preview-Formula-for-textbox ADD end

    return (
        <PreviewStyle id="pvcontainer">
            {showListControlPreview()}
            {showRadioControl()}
        </PreviewStyle>
    )
}

export default Preview
