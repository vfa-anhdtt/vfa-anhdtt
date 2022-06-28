/**
 * The event when the control is clicked, the callback to the parent control event,
 *  the processing is defined by the parent
 * @param e : event
 * @param id : id of control was clicked
 * @param propsClickControl : property of control that given from parent
 * @param isPreview boolean: flag to know preview mode, default is design mode
 * @param url string : at preview status, click will open URL at new tab
 */
export const handleClickControl = (
    e,
    id,
    propsClickControl,
    // Flag to know preview mode, default is design mode
    isPreview = false,
    // At preview status, click will open URL at new tab
    url = ''
) => {
    // Preview mode
    if (isPreview) {
        // Only process if url is defined
        if (url) {
            window.open(url, '_blank')
        }
    }
    // Design mode
    else {
        propsClickControl(e, id)
    }
}

/**
 * The event when the control is double clicked, the callback to the parent control event,
 *  the processing is defined by the parent
 * @param e : event
 * @param id : id of control was double clicked
 * @param propsClickControl : property of control that given from parent
 */
export const handleDoubleClickControl = (e, id, propsClickDoubleControl) => {
    propsClickDoubleControl(e, id)
}

/**
 * The event when the control is transforming, the callback to the parent control event,
 *  the processing is defined by the parent
 * @param e : event
 * @param id : id of control was transform
 * @param propsClickControl : property of control that given from parent
 */
export const handleTransformControl = (e, id, propsTransformControl) => {
    propsTransformControl(e, id)
}

/**
 * The event when the control is DragMove, the callback to the parent control event,
 *  the processing is defined by the parent
 * @param e : event
 * @param id : id of control was DragMove
 * @param propsClickControl : property of control that given from parent
 */
export const handleDragMoveControl = (
    e,
    id,
    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD parameter  listControl
    listControl,
    // feature/#18466_Doubleclick_control_is_change_content <<---
    propsDragMoveControl
) => {
    propsDragMoveControl(e, id, listControl)
}
/**
 * feature/#17877_Research_Group_Control
 * the processing is defined by the parent
 * @param e
 * @param id
 * @param propsDragMoveGroupControl : property of control that given from parent
 */
export const handleDragMoveGroupControl = (
    e,
    id,
    propsDragMoveGroupControl
) => {
    propsDragMoveGroupControl(e, id)
}

/**
 * from value of property (true/false),display's value is different (bold)
 * @param props
 * @returns
 */
export const changeDisplayProperty = (props) => {
    function getFontStyle() {
        let fontStyle: String = ''

        if (props.bold) {
            fontStyle = 'bold'
        }
        if (props.italics) {
            fontStyle += ' italic'
        }
        if (!fontStyle) fontStyle = 'normal'
        return fontStyle
    }

    function getTextDecoration() {
        let textDecoration: String = ''

        if (props.underline) {
            textDecoration = 'underline'
        }

        return textDecoration
    }

    const fontStyle = getFontStyle()
    const textDecoration = getTextDecoration()
    const id = props.id
    let strokeWidth = props.borderWidth
    let dotSpace = 3
    // if don't show border, border size = 0
    if (!props.borderOrNot) strokeWidth = 0

    //if borderType is solid, space of line = 0
    if (props.borderType === 'solid') dotSpace = 0
    return {
        id,
        fontStyle,
        textDecoration,
        strokeWidth,
        dotSpace,
        // If preview mode -> can't draggable
        draggable: !props.isPreview,
    }
}

/**
 *
 * @param ID ID of control that you want check
 * @param IDs string of controls's ID, that concate by ,
 * @returns true / false
 */
export const checkIDinIDs = (ID: string, IDs: string) => {
    if (!ID || !IDs) return false
    if (IDs === ID) return true
    return `,${IDs},`.indexOf(`,${ID},`) >= 0
}

/**
 * Checks if `value` is object `empty`.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `empty`, else `false`.
 */
export const isObjectEmpty = (value) => {
    if (value === null) {
        return true
    }
    return Object.keys(value).length === 0
}

/**
 * Checks if `value` is `undefined`.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 **/
export const _isUndefined = (value) => {
    return value === undefined
}

/**
 * feature/#17669_FB_Confirm_about_Library
 * Creates a debounced function that delays invoking `func` until after `wait`
 * @param {Function} func The function to debounce.
 * @param {number} [wait=300]
 * @returns {Function} Returns the new debounced function.
 **/

export const _debounce = (Function, wait = 300) => {
    let timer

    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            Function()
        }, wait)
    }
}

/**
 * feature/#18247_Bug_copy
 * Creates a function clone deep data
 * @param {data} data want deep clone
 * @returns new a data clone from data old
 **/
export const structuredClone = (data) => {
    return JSON.parse(JSON.stringify(data))
}
