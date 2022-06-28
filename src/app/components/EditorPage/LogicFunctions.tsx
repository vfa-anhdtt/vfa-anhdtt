import { CONTROLS_TYPES } from '../../../constants'

import * as PROPERTY from '../../../constants/PropertiesControls'
import { checkIDinIDs } from '../../../utils'

/**
 * create control's property with default value was set at property type
 * @param type : type of control was draged
 * @param id : id was create when drag start
 * @param position : droped desination
 * @returns : default property of control
 */
export function cloneDataOfItem(type, id, position, propsControls) {
    // Define param
    let newItem: any
    switch (type) {
        // Control is Label
        case CONTROLS_TYPES.LABEL:
            newItem = {
                ...PROPERTY.LABEL_PROPERTY,
                ...propsControls,
                position,
                id,
                type,
            }
            break

        // Control is TextBox
        case CONTROLS_TYPES.TEXTBOX:
            newItem = {
                ...PROPERTY.TEXTBOX_PROPERTY,
                ...propsControls,
                position,
                id,
                type,
            }
            break

        // Control is CheckBox
        case CONTROLS_TYPES.CHECKBOX:
            newItem = {
                ...PROPERTY.CHECKBOX_PROPERTY,
                ...propsControls,
                position,
                id,
                type,
            }
            break

        // Control is RadioButton
        case CONTROLS_TYPES.RADIO:
            newItem = {
                ...PROPERTY.RADIO_PROPERTY,
                ...propsControls,
                position,
                id,
                type,
            }
            break

        // Control is Combobox
        case CONTROLS_TYPES.COMBOBOX:
            newItem = {
                ...PROPERTY.COMBOBOX_PROPERTY,
                ...propsControls,
                position,
                id,
                type,
            }
            break

        // Control is ListBox
        case CONTROLS_TYPES.LISTBOX:
            newItem = {
                ...PROPERTY.LISTBOX_PROPERTY,
                ...propsControls,
                position,
                id,
                type,
            }
            break
        // feature/#8468_edit_icon_Change_font_for_stamp --->>
        // Control is Signature
        case CONTROLS_TYPES.SIGNATURE:
            newItem = {
                ...PROPERTY.SIGNATURE_PROPERTY,
                ...propsControls,
                position,
                id,
                type,
            }
            break
        // feature/#8468_edit_icon_Change_font_for_stamp <<---

        // Control is Line
        case CONTROLS_TYPES.LINE:
            newItem = { ...PROPERTY.LINE_PROPERTY, position, id, type }

            // Update pointEnd
            newItem.pointEnd = { x: position.x + newItem.width, y: position.y }
            break

        // Control is Grid
        case CONTROLS_TYPES.GRID:
            newItem = {
                ...PROPERTY.GRID_PROPERTY,
                ...propsControls,
                position,
                id,
                type,
            }
            break

        // Control is Image
        case CONTROLS_TYPES.IMAGE:
            newItem = { ...PROPERTY.IMAGE_PROPERTY, position, id, type }
            break

        //feature/#17877_Research_Group_Control -->
        // MOD add group type
        // Control is Group
        case CONTROLS_TYPES.GROUP:
            newItem = { ...PROPERTY.GROUP_PROPERTY, position, id, type }
            //feature/#17877_Research_Group_Control <--
            break

        // Other
        default:
            newItem = { id, type, x: position.x, y: position.y }
    }

    // If control have property text
    if (newItem.text) {
        // Get number
        const numberText = id.replace(type, '')

        // Update text of control
        newItem.text = newItem.text + numberText
    }

    return newItem
}

/**
 * find out id of controls in range
 * @param stage : stage of canvas
 * @param posStart : position start of range
 * @param posEnd : position end of range
 * @returns : string all id of controls in range, connect by [,]
 */
export function findControlsIsSelect(stage, posStart, posEnd) {
    let pStart = posStart
    let pEnd = posEnd
    if (posStart.x > posEnd.x || posStart.y > posEnd.y) {
        pStart = {
            x: Math.min(posStart.x, posEnd.x),
            y: Math.min(posStart.y, posEnd.y),
        }
        pEnd = {
            x: pStart.x + Math.abs(posStart.x - posEnd.x),
            y: pStart.y + Math.abs(posStart.y - posEnd.y),
        }
    }
    const shapes = stage.find('Rect')
    let ids: string = ''
    shapes.map((shape) => {
        if (shape.parent !== 'Transformer' && shape.id()) {
            const rect = shape.getClientRect()
            const posRectStart = { x: rect.x, y: rect.y }
            const posRectEnd = {
                x: rect.x + rect.width,
                y: rect.y + rect.height,
            }
            if (
                checkPointIsInRect(posRectStart, pStart, pEnd) ||
                checkPointIsInRect(
                    { x: rect.x + rect.width, y: rect.y },
                    pStart,
                    pEnd
                ) ||
                checkPointIsInRect(
                    { x: rect.x, y: rect.y + rect.height },
                    pStart,
                    pEnd
                ) ||
                checkPointIsInRect(posRectEnd, pStart, pEnd) ||
                checkPointIsInRect(pStart, posRectStart, posRectEnd) ||
                checkPointIsInRect(
                    { x: pStart.x, y: pEnd.y },
                    posRectStart,
                    posRectEnd
                ) ||
                checkPointIsInRect(
                    { x: pEnd.x, y: pStart.y },
                    posRectStart,
                    posRectEnd
                ) ||
                checkPointIsInRect(pEnd, posRectStart, posRectEnd) ||
                checkLineIsIntersect(
                    { startPoint: posRectStart, endPoint: posRectEnd },
                    { startPoint: pStart, endPoint: pEnd }
                )
            ) {
                if (ids.indexOf(',' + shape.id() + ',') < 0) {
                    ids += ',' + shape.id() + ','
                }
            }
        }
    })
    ids += findLinesIsSelect(stage, posStart, posEnd)
    return ids
}

/**
 * find out id of Line in range
 * @param stage : stage of canvas
 * @param posStart : position start of range
 * @param posEnd : position end of range
 * @returns : string all id of controls in range, connect by [,]
 */
export function findLinesIsSelect(stage, posStart, posEnd) {
    let pStart = posStart
    let pEnd = posEnd
    if (posStart.x > posEnd.x || posStart.y > posEnd.y) {
        pStart = {
            x: Math.min(posStart.x, posEnd.x),
            y: Math.min(posStart.y, posEnd.y),
        }
        pEnd = {
            x: pStart.x + Math.abs(posStart.x - posEnd.x),
            y: pStart.y + Math.abs(posStart.y - posEnd.y),
        }
    }
    const lines = stage.find('Line')
    let ids: string = ''
    lines.map((line) => {
        if (line.id()) {
            const { x, y, points } = line.attrs
            const posLineStart = { x: x, y: y }
            const posLineEnd = {
                x: x + points[2],
                y: y + points[3],
            }

            if (
                checkPointIsInRect(posLineStart, pStart, pEnd) ||
                checkPointIsInRect(posLineEnd, pStart, pEnd) ||
                // Line is Intercept width rectangle's diagonal line
                lineSegmentsIntercept(posLineStart, posLineEnd, pStart, pEnd) ||
                lineSegmentsIntercept(
                    posLineStart,
                    posLineEnd,
                    { x: pStart.x + pEnd.x - pStart.x, y: pStart.y },
                    { x: pStart.x, y: pEnd.y }
                )
            ) {
                if (ids.indexOf(',' + line.id() + ',') < 0) {
                    ids += ',' + line.id() + ','
                }
            }
        }
    })

    return ids
}

/**
 * get control was selected by click
 * @param e : event
 * @param selectedIDs : selected control's id
 * @returns : string is list of control selected
 */
export function getIDOfControlClicked(e, selectedIDs) {
    // debugger
    let returnIds = selectedIDs
    // find clicked rect by its id
    let id = e.target.id()
    // if clicked is text, get id of rect
    if ('txtlbl'.indexOf(id.substring(0, 3)) >= 0) {
        id = id.substring(3)
    }
    //if Shift key is press, add id of control into selected list
    if (e.evt.shiftKey) {
        // if control was added, remove out
        if (checkIDinIDs(id, selectedIDs)) {
            returnIds = selectedIDs.replace(',' + id + ',', '')
        } else {
            returnIds = selectedIDs + ',' + id + ','
        }
    } else {
        returnIds = id
    }

    return returnIds
}

/**
 * check the point is in Range
 * @param point : position of point
 * @param posStart : position start of range
 * @param posEnd : position end of range
 * @returns : true / false
 */
function checkPointIsInRect(point, posStart, posEnd) {
    return (
        point.x >= posStart.x &&
        point.x <= posEnd.x &&
        point.y >= posStart.y &&
        point.y <= posEnd.y
    )
}

/**
 * check 2 line is cross
 * @param line1
 * @param line2
 * @returns true/false
 */
function checkLineIsIntersect(line1, line2) {
    return (
        (line1.startPoint.x < line2.startPoint.x &&
            line2.endPoint.x < line1.endPoint.x &&
            line2.startPoint.y < line1.startPoint.y &&
            line1.endPoint.y < line2.endPoint.y) ||
        (line1.startPoint.y < line2.startPoint.y &&
            line2.endPoint.y < line1.endPoint.y &&
            line2.startPoint.x < line1.startPoint.x &&
            line1.endPoint.x < line2.endPoint.x)
    )
}

// point object: {x:, y:}
// p0 & p1 form one segment, p2 & p3 form the second segment
// Returns true if lines segments are intercepting
var lineSegmentsIntercept = (function () {
    // function as singleton so that closure can be used

    var v1, v2, v3, cross, u1, u2 // working variable are closed over so they do not need creation
    // each time the function is called. This gives a significant performance boost.
    v1 = { x: null, y: null } // line p0, p1 as vector
    v2 = { x: null, y: null } // line p2, p3 as vector
    v3 = { x: null, y: null } // the line from p0 to p2 as vector

    function lineSegmentsIntercept(p0, p1, p2, p3) {
        v1.x = p1.x - p0.x // line p0, p1 as vector
        v1.y = p1.y - p0.y
        v2.x = p3.x - p2.x // line p2, p3 as vector
        v2.y = p3.y - p2.y
        if ((cross = v1.x * v2.y - v1.y * v2.x) === 0) {
            // cross prod 0 if lines parallel
            return false // no intercept
        }
        v3 = { x: p0.x - p2.x, y: p0.y - p2.y } // the line from p0 to p2 as vector
        u2 = (v1.x * v3.y - v1.y * v3.x) / cross // get unit distance along line p2 p3
        // code point B
        if (u2 >= 0 && u2 <= 1) {
            // is intercept on line p2, p3
            u1 = (v2.x * v3.y - v2.y * v3.x) / cross // get unit distance on line p0, p1;
            // code point A
            return u1 >= 0 && u1 <= 1 // return true if on line else false.
            // code point A end
        }
        return false // no intercept;
        // code point B end
    }
    return lineSegmentsIntercept // return function with closure for optimisation.
})()
