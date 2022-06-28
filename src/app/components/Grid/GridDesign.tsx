import React from 'react'
import { Line, Rect, Text } from 'react-konva'

import * as utils from '../../../utils'
import { CONTROLS_TYPES } from '../../../constants'
import {
    HEADER_BG_COLOR,
    BORDER_WIDTH,
    NUMBER_BORDER_FROM_HEADER,
} from '../Dialog/GridCreateLogicFunctions'
/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a Grid for canvas
 * @param props : property of control
 * @returns Rect & Text & line
 */
function GridDesign(props) {
    // Define param to use
    const { id, fontStyle, dotSpace, draggable } =
        utils.changeDisplayProperty(props)

    // Width of Grid
    const gridWidth = props.width

    // Height of Grid
    const gridHeight = props.height

    // Array Lines will be draw
    let linesPoints = []

    /**
     * get Point for VerticalLine
     * @returns array[[x1,y1,x2,y2],]
     */
    function getVerticalLinePoint() {
        // Return param
        const lineReturn = []

        //vertical line
        for (let i = 0; i < props.numCols - 1; i++) {
            // First Line have possition is width of that column + line's width
            if (i === 0) {
                lineReturn.push([
                    props.rowData[i].width + i + BORDER_WIDTH,
                    0,
                    props.rowData[i].width + i + BORDER_WIDTH,
                    gridHeight,
                ])
            }
            // Except 1st Line, position is previous line's position + width of that column
            else {
                lineReturn.push([
                    lineReturn[i - 1][0] +
                        props.rowData[i].width +
                        BORDER_WIDTH,
                    0,
                    lineReturn[i - 1][0] +
                        props.rowData[i].width +
                        BORDER_WIDTH,
                    gridHeight,
                ])
            }
        }

        return lineReturn
    }

    /**
     * get Point for HorizonLine
     * @returns array[[x1,y1,x2,y2],]
     */
    function getHorizonLine() {
        // Return param
        const lineReturn = []

        //header line
        lineReturn.push([
            0,
            props.headerHeight + NUMBER_BORDER_FROM_HEADER,
            gridWidth,
            props.headerHeight + NUMBER_BORDER_FROM_HEADER,
        ])

        //horizon line
        for (let i = 0; i < props.numRows - 1; i++) {
            lineReturn.push([
                0,
                props.headerHeight +
                    props.rowHeight * (i + BORDER_WIDTH) +
                    (i + NUMBER_BORDER_FROM_HEADER + 1) * BORDER_WIDTH,
                gridWidth,
                props.headerHeight +
                    props.rowHeight * (i + BORDER_WIDTH) +
                    (i + NUMBER_BORDER_FROM_HEADER + 1) * BORDER_WIDTH,
            ])
        }

        return lineReturn
    }

    // All Lines contain horizon line & vertical line
    linesPoints = [...getVerticalLinePoint(), ...getHorizonLine()]

    /**
     * draw lines
     * @param lines list of points array[[x1,y1,x2,y2],]
     * @returns Line
     */
    function showLines(lines) {
        // Return param
        const show = []

        // Each 1 line's data, draw line
        lines.map((line) =>
            show.push(
                <Line
                    key={show.length}
                    x={props.position.x}
                    y={props.position.y}
                    points={line}
                    stroke={props.borderColor}
                    strokeWidth={1}
                />
            )
        )

        return show
    }

    /**
     * draw header of grid
     * @returns Rect & Text
     */
    function showHeader() {
        // Return param
        const show = []

        // position by x
        let x = props.position.x

        // Draw background for header by Rect
        show.push(
            <Rect
                key="headerBg"
                x={props.position.x + BORDER_WIDTH}
                y={props.position.y + BORDER_WIDTH}
                width={gridWidth - NUMBER_BORDER_FROM_HEADER * BORDER_WIDTH}
                height={props.headerHeight}
                fill={HEADER_BG_COLOR}
            />
        )

        // Header & rowData is the same length
        for (let i = 0; i < props.rowData.length; i++) {
            // Draw header's text
            show.push(
                <Text
                    key={'header' + i}
                    // Position is plus width line's width
                    x={x + (i + 1) * BORDER_WIDTH}
                    y={props.position.y}
                    fontFamily={props.fontFamily}
                    fontSize={props.fontSize}
                    fill="#ffffff"
                    id={'txt' + props.id}
                    text={props.headerText[i]}
                    fontStyle={'' + fontStyle}
                    width={props.rowData[i].width}
                    height={props.headerHeight}
                    verticalAlign={props.verticalAlign}
                    align="center" //header is alsway center {props.align}
                />
            )

            // Change position to next column
            x += props.rowData[i].width
        }

        return show
    }

    /**
     * draw row of grid
     * @param rowIndex
     * @returns Rect & Text
     */
    function showContentOfRow(rowIndex) {
        // Return param
        const show = []

        // Position by x
        let x = props.position.x

        // Position by y
        const y =
            props.position.y +
            props.headerHeight +
            rowIndex * props.rowHeight +
            NUMBER_BORDER_FROM_HEADER * BORDER_WIDTH

        // Loop by rowData
        for (let i = 0; i < props.rowData.length; i++) {
            // In Grid, label has background
            // Only draw 1 time
            if (
                rowIndex === 0 &&
                props.rowData[i].type === CONTROLS_TYPES.LABEL
            ) {
                show.push(
                    <Rect
                        key={`labelBg_${rowIndex}_${i}`}
                        x={x + BORDER_WIDTH}
                        y={y}
                        width={props.rowData[i].width}
                        height={props.rowHeight * props.numRows + props.numRows}
                        fill={HEADER_BG_COLOR}
                    />
                )
            }

            // If control is not NONE, draw text to know what control was set
            // Production, this is draw exact control's shape
            if (props.rowData[i].type !== CONTROLS_TYPES.NONE) {
                // Preview mode
                if (!draggable) {
                    // Only draw Label, width text of control
                    if (props.rowData[i].type === CONTROLS_TYPES.LABEL) {
                        show.push(
                            <Text
                                key={'row_' + rowIndex + '_' + i}
                                x={x + BORDER_WIDTH}
                                y={y}
                                fontFamily={props.fontFamily}
                                fontSize={props.fontSize}
                                // characterSpacing={props.fontFamily}
                                fill={props.color}
                                id={'txt' + props.id}
                                text={props.rowData[i].text}
                                fontStyle={'' + fontStyle}
                                width={props.rowData[i].width}
                                height={props.rowHeight}
                                verticalAlign={props.verticalAlign}
                                align={props.rowData[i].align}
                            />
                        )
                    }
                }
                // Design mode, draw control type
                else {
                    show.push(
                        <Text
                            key={'row_' + rowIndex + '_' + i}
                            x={x + BORDER_WIDTH}
                            y={y}
                            fontFamily={props.fontFamily}
                            fontSize={props.fontSize}
                            // characterSpacing={props.fontFamily}
                            fill={props.color}
                            id={'txt' + props.id}
                            text={props.rowData[i].type}
                            fontStyle={'' + fontStyle}
                            width={props.rowData[i].width}
                            height={props.rowHeight}
                            verticalAlign={props.verticalAlign}
                            align={props.rowData[i].align}
                        />
                    )
                }
            }

            // Change x to next control
            x += props.rowData[i].width + BORDER_WIDTH
        }

        return show
    }

    /**
     * draw table
     * @returns
     */
    function showContentOfTable() {
        // Return param
        let show = []

        // Loop by number of Rows
        for (let i = 0; i < props.numRows; i++) {
            show = [...show, ...showContentOfRow(i)]
        }

        return show
    }

    return (
        <>
            {showHeader()}
            {showContentOfTable()}
            {showLines(linesPoints)}
            <Rect
                key={'rect' + props.id}
                draggable={draggable}
                className="Grid"
                strokeScaleEnabled={false}
                x={props.position.x}
                y={props.position.y}
                width={gridWidth}
                height={gridHeight}
                fill={'transparent'}
                id={props.id}
                stroke={props.backgroundColor}
                strokeWidth={1}
                dash={[2, dotSpace]}
                onClick={(e) =>
                    utils.handleClickControl(e, id, props.propsClickControl)
                }
                onDragMove={(e) =>
                    utils.handleDragMoveControl(
                        e,
                        id,
                        // feature/#18466_Doubleclick_control_is_change_content --->>
                        // ADD parameter props listControl
                        props.listControl,
                        // feature/#18466_Doubleclick_control_is_change_content <<---
                        props.propsDragMoveControl
                    )
                }
                onTransform={(e) =>
                    utils.handleTransformControl(
                        e,
                        id,
                        props.propsTransformControl
                    )
                }
                // When user double click: call parent function to set doubleSelectedControl
                onDblClick={(e) =>
                    utils.handleDoubleClickControl(
                        e,
                        id,
                        props.propsClickDoubleControl
                    )
                }
            />
        </>
    )
}

export default React.memo(GridDesign, (prevProp, nextProp) => {
    return JSON.stringify(prevProp) === JSON.stringify(nextProp)
})
