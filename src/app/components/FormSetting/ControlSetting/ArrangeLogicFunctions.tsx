import { structuredClone } from '../../../../utils'

/**
 * #18402-arrange-controls ADD
 * Logic of arrange controls
 * @author AnhDTT
 */

const MIN_WIDTH_HEIGHT = 2000
const MAX_WIDTH_HEIGHT = -1000

/**
 * Get array ID of control
 * @param listSelectedControl [] array control
 * @returns [] string: array ID of control
 */
export const getListIDFromListControl = (listSelectedControl) => {
    // Define param to use
    const controlIDArr = []

    // Loop to process
    listSelectedControl.map((control) => {
        // Add ID to array
        controlIDArr.push(control.id)
    })

    return controlIDArr
}

/**
 * Get Max & Min X,Y of controls
 * @param listControl [] array controls : current listControl
 * @param controlIDArr [] array string : ID of controls
 * @returns object with { minX, minY, maxX, maxY }
 */
const getMaxMinPositionOfControls = (listControl, controlIDArr) => {
    // Define param to use
    let minX = MIN_WIDTH_HEIGHT,
        minY = MIN_WIDTH_HEIGHT,
        maxX = MAX_WIDTH_HEIGHT,
        maxY = MAX_WIDTH_HEIGHT

    // Loop to process
    listControl.map((control) => {
        // Only process with control in controlIDArr
        if (controlIDArr.includes(control.id)) {
            minX = Math.min(minX, control.position.x)
            minY = Math.min(minY, control.position.y)
            maxX = Math.max(maxX, control.position.x + control.width)
            maxY = Math.max(maxY, control.position.y + control.height)
        }
    })

    return { minX, minY, maxX, maxY }
}

/**
 * Get Max & Min Width, Height of controls
 * @param listControl [] array controls : current listControl
 * @param controlIDArr [] array string : ID of controls
 * @returns object with { minW, minH, maxW, maxH }
 */
const getMaxMinSizeOfControls = (listControl, controlIDArr) => {
    // Define param to use
    let minW = MIN_WIDTH_HEIGHT,
        minH = MIN_WIDTH_HEIGHT,
        maxW = MAX_WIDTH_HEIGHT,
        maxH = MAX_WIDTH_HEIGHT

    // Loop to process
    listControl.map((control) => {
        // Only process with control in controlIDArr
        if (controlIDArr.includes(control.id)) {
            minW = Math.min(minW, control.width)
            minH = Math.min(minH, control.height)
            maxW = Math.max(maxW, control.width)
            maxH = Math.max(maxH, control.height)
        }
    })

    return { minW, minH, maxW, maxH }
}

/**
 * Set position.x value of controls by MinX
 * @param listControl [] array controls : current listControl
 * @param listSelectedControl [] array controls : listControl that will be change position.x value
 * @returns [] array controls that was changed position.x
 */
export const setPositionByMinX = (listControl, listSelectedControl) => {
    const listControlClone = structuredClone(listControl)
    const controlIDArr = getListIDFromListControl(listSelectedControl)

    const { minX } = getMaxMinPositionOfControls(listControl, controlIDArr)

    // Loop to process
    listControlClone.map((control) => {
        // Only process with control in controlIDArr
        if (controlIDArr.includes(control.id)) {
            // Update X to minX
            control.position.x = minX
        }
    })

    return listControlClone
}

/**
 * Set position.y value of controls by MinY
 * @param listControl [] array controls : current listControl
 * @param listSelectedControl [] array controls : listControl that will be change position.y value
 * @returns [] array controls that was changed position.y
 */
export const setPositionByMinY = (listControl, listSelectedControl) => {
    const listControlClone = structuredClone(listControl)
    const controlIDArr = getListIDFromListControl(listSelectedControl)

    const { minY } = getMaxMinPositionOfControls(listControl, controlIDArr)

    // Loop to process
    listControlClone.map((control) => {
        // Only process with control in controlIDArr
        if (controlIDArr.includes(control.id)) {
            // Update Y to minY
            control.position.y = minY
        }
    })

    return listControlClone
}

/**
 * Set position.x value of controls by MaxX
 * @param listControl [] array controls : current listControl
 * @param listSelectedControl [] array controls : listControl that will be change position.x value
 * @returns [] array controls that was changed position.x
 */
export const setPositionByMaxX = (listControl, listSelectedControl) => {
    const listControlClone = structuredClone(listControl)
    const controlIDArr = getListIDFromListControl(listSelectedControl)

    const { maxX } = getMaxMinPositionOfControls(listControl, controlIDArr)

    // Loop to process
    listControlClone.map((control) => {
        // Only process with control in controlIDArr
        if (controlIDArr.includes(control.id)) {
            // Update Y to maxX
            control.position.x = maxX - control.width
        }
    })

    return listControlClone
}

/**
 * Set position.y value of controls by MaxY
 * @param listControl [] array controls : current listControl
 * @param listSelectedControl [] array controls : listControl that will be change position.y value
 * @returns [] array controls that was changed position.y
 */
export const setPositionByMaxY = (listControl, listSelectedControl) => {
    const listControlClone = structuredClone(listControl)
    const controlIDArr = getListIDFromListControl(listSelectedControl)

    const { maxY } = getMaxMinPositionOfControls(listControl, controlIDArr)

    // Loop to process
    listControlClone.map((control) => {
        // Only process with control in controlIDArr
        if (controlIDArr.includes(control.id)) {
            // Update Y to maxY
            control.position.y = maxY - control.height
        }
    })

    return listControlClone
}

/**
 * Set width of controls by Max Width or Min Width
 * @param listControl [] array controls : current listControl
 * @param listSelectedControl [] array controls : listControl that will be change position.y value
 * @param isMax boolean : true control's width will be changed by Max of Width/ false - by Min of Width
 * @returns [] array controls that was changed width
 */
export const setWidthForControls = (
    listControl,
    listSelectedControl,
    isMax
) => {
    // Clone data to use
    const listControlClone = structuredClone(listControl)

    // ID of controls
    const controlIDArr = getListIDFromListControl(listSelectedControl)

    // Get Max & Min of Width
    const { maxW, minW } = getMaxMinSizeOfControls(listControl, controlIDArr)

    // Param to set new value, default = MIN of width
    let newWidth = minW

    // If Max flag is set, value is changed
    if (isMax) {
        newWidth = maxW
    }

    // Loop to process
    listControlClone.map((control) => {
        // Only process with control in controlIDArr
        if (controlIDArr.includes(control.id)) {
            // Update Y to maxY
            control.width = newWidth
        }
    })

    return listControlClone
}

/**
 * Set height of controls by Max Height or Min Height
 * @param listControl [] array controls : current listControl
 * @param listSelectedControl [] array controls : listControl that will be change position.y value
 * @param isMax boolean : true control's Height will be changed by Max of Height/ false - by Min of Height
 * @returns [] array controls that was changed height
 */
export const setHeightForControls = (
    listControl,
    listSelectedControl,
    isMax
) => {
    const listControlClone = structuredClone(listControl)
    const controlIDArr = getListIDFromListControl(listSelectedControl)

    const { maxH, minH } = getMaxMinSizeOfControls(listControl, controlIDArr)
    let newHeight = minH

    // If Max flag is set, value is changed
    if (isMax) {
        newHeight = maxH
    }

    // Loop to process
    listControlClone.map((control) => {
        // Only process with control in controlIDArr
        if (controlIDArr.includes(control.id)) {
            // Update Y to maxY
            control.height = newHeight
        }
    })

    return listControlClone
}
