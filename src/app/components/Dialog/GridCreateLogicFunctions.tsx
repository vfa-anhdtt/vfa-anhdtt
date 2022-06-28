import {
    CONTROLS_TYPES,
    PropertiesControls as PROPERTY,
} from '../../../constants'
// feature/#18466_Doubleclick_control_is_change_content --->>
// MOD remove KonvaDemo, update EditorPage
import { cloneDataOfItem } from '../EditorPage/LogicFunctions'
// feature/#18466_Doubleclick_control_is_change_content <<---
import { useId } from '@fluentui/react-hooks'

// Temporary set color for header, In production will allow user change
export const HEADER_BG_COLOR = '#8c8c8c'

// Line width
export const BORDER_WIDTH = 1

// Grid has header, 1st content have 2 line from start point
export const NUMBER_BORDER_FROM_HEADER = 2

/**
 * generate Grid data depend on recieve param
 * @param gridData object
 * @returns GRID_PROPERTY
 */
function generateGridData(gridData, nowData) {
    let gridReturn = { ...nowData }
    gridReturn.numCols = Number(gridData.columnNum)
    gridReturn.numRows = Number(gridData.rowNum)
    gridReturn.headerText = gridData.header
    gridReturn.rowData = getRowArr(
        gridData.rows,
        gridData.columnsWidth,
        // Id of grid
        nowData.id
    )
    gridReturn.headerHeight = Number(gridData.headerHeight)
    gridReturn.rowHeight = Number(gridData.rowHeight)
    gridReturn.width = calcGridWidth(gridReturn)
    gridReturn.height = calcGridHeight(gridReturn)

    return gridReturn
}

/**
 * calculate Width of Grid
 * @returns number
 */
function calcGridWidth(gridReturn) {
    let widthReturn = 0
    //width is sum of column's width
    gridReturn.rowData.map((data) => {
        widthReturn += data.width + BORDER_WIDTH
    })

    return widthReturn + BORDER_WIDTH
}

/**
 * calculate Height of Grid
 * @returns number
 */
function calcGridHeight(gridReturn) {
    //height is sum of header and rows'height
    const gridHeight =
        gridReturn.headerHeight +
        (gridReturn.rowHeight + BORDER_WIDTH) * gridReturn.numRows +
        BORDER_WIDTH

    return gridHeight
}
/**
 * base on array contain type of control, create init data for Grid's dataRow's control
 * @param gridRowData [] string
 * @param columnsWidth [] number
 * @param gridId string id of grid
 * @returns [] object
 */
function getRowArr(gridRowData, columnsWidth, gridId) {
    const rowArr = []
    gridRowData.map((type, index) => {
        if (!type) {
            type = CONTROLS_TYPES.LABEL
        }
        if (type === CONTROLS_TYPES.NONE) {
            rowArr.push({
                type: type,
                width: columnsWidth[index],
            })
        } else {
            // feature/#17459_form_setting --->>
            // MOD update default props for text in controls. This case is not included so input is empty object
            const item = cloneDataOfItem(type, ``, { x: 0, y: 0 }, {})

            // Change id of control to avoid duplicate
            item.id = `${gridId}_row${type}${index}`
            // feature/#17459_form_setting <<---

            item.width = columnsWidth[index]
            //if label, align is center
            if (type === CONTROLS_TYPES.LABEL) {
                item.align = 'center'
            }
            rowArr.push(item)
        }
    })
    return rowArr
}

export { generateGridData }
