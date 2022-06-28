import React from 'react'
import { CONTROLS_TYPES } from '../../../constants'
import ListControlPreview from '../ListControl/ListControlPreview'
import { GridStyle } from './Grid.style'
import {
    BORDER_WIDTH,
    NUMBER_BORDER_FROM_HEADER,
} from '../Dialog/GridCreateLogicFunctions'
/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a grid for preview
 * @param props : property of control
 * @returns table element
 */
function Grid(props) {
    const { id } = props
    /**
     * show content of row
     * @param rowIndex :number index of table
     * @returns string <td></td><td></td>
     */
    function showContentOfRow(rowIndex) {
        // Return param
        const show = []

        // Position of Grid
        let position = { ...props.position }

        // Start position has 1 line -> plus
        position.x = position.x + BORDER_WIDTH

        // Start of content is after header
        position.y =
            position.y +
            props.headerHeight +
            (Number(props.rowHeight) + BORDER_WIDTH) * rowIndex +
            NUMBER_BORDER_FROM_HEADER * BORDER_WIDTH

        // Loop for rowData's child
        for (let i = 0; i < props.rowData.length; i++) {
            // From column 2, position is sum(width) of previous columns
            if (i > 0) {
                position.x = position.x + Number(props.rowData[i - 1].width) + 1
            }

            // When space cell or Label control, don't show any thing
            if (
                props.rowData[i].type !== CONTROLS_TYPES.NONE &&
                props.rowData[i].type !== CONTROLS_TYPES.LABEL
            ) {
                show.push(
                    <ListControlPreview
                        key={`${props.id}_${rowIndex}_${i}`}
                        {...props.rowData[i]}
                        // isGridChild={true}
                        height={props.rowHeight}
                        position={{ x: position.x, y: position.y }}
                        id={`${props.id}_${props.rowData[i].type}_${rowIndex}_${i}`}
                    />
                )
            }
        }

        return show
    }

    /**
     * create string of control in HTML
     * @returns HTML struct
     */
    function showContentOfTable() {
        // Return param
        const tbody = []

        // Loop by number of rows to show control on each row
        for (let i = 0; i < props.numRows; i++) {
            tbody.push(showContentOfRow(i))
        }

        return tbody
    }

    return <>{showContentOfTable()}</>
}

export default Grid
