import { SIZE_A4 } from '../../constants'
// feature/#18247_Bug_copy --->>
// ADD _isUndefined
import { _isUndefined } from '../../utils'
// feature/#18247_Bug_copy <<---

import { types } from './DisplayAction'

const displayState = {
    sizeKonva: {
        type: 'A4Vertical',
        width: SIZE_A4.WIDTH,
        height: SIZE_A4.HEIGHT,
    },
    propsControls: {
        color: '#000000',
        fontFamily: 'MS Gothic',

        // feature/#18448_change_text_and_font_size_default --->>
        // MOD default value
        fontSize: 12,
        // feature/#18448_change_text_and_font_size_default <<---

        // feature/#18643_update_form_setting -->>
        colorTooltip: '#000000',
        fontFamilyTooltip: 'MS Gothic',
        colorPlacehoder: '#A6A6A6',
        // feature/#18643_update_form_setting <<--
        bold: false,
        italics: false,
    },
}

/**
 * return value of page setting and value default of text in controls
 * @param state
 * @param action
 * @returns
 */
const displayReducer = (state, action) => {
    // feature/#18247_Bug_copy --->>
    // ADD check action is not undefined => then switch, case
    switch (!_isUndefined(action) && action.type) {
        // feature/#18247_Bug_copy <<---

        // feature/#17459_form_setting --->>
        case types.SET_SIZE_KONVA:
            return {
                ...state,
                sizeKonva: action.payload,
            }
        case types.SET_PROPS_CONTROLS:
            return {
                ...state,
                propsControls: action.payload,
            }
        // feature/#17459_form_setting <<---
        default:
            return state
    }
}

export { displayReducer, displayState }
