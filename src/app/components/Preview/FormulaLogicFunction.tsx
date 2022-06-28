import { values } from '@fluentui/react'
import { CONTROLS_TYPES } from '../../../constants'

// #18337-Preview-Formula-for-textbox ADD
// Type of control need to call calculate function to effect another control
// At this time, use TEXTBOX, in Production will change to NUMBER
export const CALL_CALC_TYPE = CONTROLS_TYPES.TEXTBOX

// Define value will return when invalid formula
export const INVALID_VALUE = 'N/A'

/**
 * Get ID of control that was set in formula
 * @param listFormularControls [] array list control that have formula
 * @returns [] array string ID of control
 */
export function getIDOfControlInFormula(listFormularControls) {
    // Param to set ID of control in formula
    const listControlIDInFormular = []

    // Only process when listFormularControls have data
    if (listFormularControls) {
        listFormularControls.map((control) => {
            // Formula is array of string
            control.formula
                .filter(
                    // If value contain textbox -> that is control ID
                    (value) => value.indexOf(CALL_CALC_TYPE) >= 0
                )
                .map((idValue) => {
                    // Only add when that control is not exist
                    if (!listControlIDInFormular.includes(idValue)) {
                        listControlIDInFormular.push(idValue)
                    }
                })
        })
    }
    return listControlIDInFormular
}

/**
 * In formula, replace control's ID to Control's value
 * @param formula [] string formular of control
 * @returns [] string that replaced by control's value
 */
export function getStringValueOfFormula(formula) {
    let isValid: boolean = true
    let newFormula = [...formula]

    for (let i = 0; i < newFormula.length && isValid; i++) {
        // Each formula value
        let formulaChild: string = newFormula[i]

        // Use to get value of HTML control
        let tmpValue: string = null

        // ID of control is (type+number), Only process with control's ID
        if (formulaChild.indexOf(CALL_CALC_TYPE) >= 0) {
            tmpValue = document
                .getElementById(formulaChild)
                .getElementsByTagName('input')[0].value

            // When value is not set, can't calculate
            if (!tmpValue) {
                isValid = false
            } else {
                newFormula[i] = tmpValue
            }
        }
    }
    return { isValid, formulaString: newFormula.join('') }
}

/**
 * Get all controls that set formula and formula include controlID
 * @param listFormularControls [] array listControl that have formula
 * @param controlID string ID of control
 * @returns [] array control
 */
export const getFormularContainControl = (
    listFormularControls,
    controlID: string
) => {
    return listFormularControls.filter((control) =>
        control.formula.includes(controlID)
    )
}

/**
 * Calculate result of formula
 */
export const calculateFormularResult = (strFormula) => {
    // Return result
    let formulaResult = null

    // Valid formula
    try {
        // for SUM, AVG : change '[' to '(['
        strFormula = strFormula.replaceAll('[', '([')

        // for SUM, AVG : change ']' to '])'
        strFormula = strFormula.replaceAll(']', '])')

        formulaResult = eval(strFormula)
    } catch (err) {
        // When Invalid formula
        formulaResult = INVALID_VALUE
    }

    return formulaResult
}

/**
 * Calculate total of array
 * @param arrParam [] param that you want to get total
 * @returns number
 */
export const SUM = (arrParam) => {
    // return param
    let result = 0

    // Loop for get total
    arrParam.map((value) => {
        result += Number(value)
    })

    return result
}

/**
 * Calculate average of array
 * @param arrParam [] param that you want to get average
 * @returns number
 */
export const AVG = (arrParam) => {
    // return param
    let result = 0

    // Loop for get total
    arrParam.map((value) => {
        result += Number(value)
    })

    // When array param has value
    if (arrParam.length) {
        return result / arrParam.length
    }

    return result
}
