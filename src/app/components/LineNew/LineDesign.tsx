import React, { useState, useEffect } from 'react'
import { Arrow, Line, Circle } from 'react-konva'
import * as utils from '../../../utils'

/**
 * Create Line design on canvas
 * @param props
 * @returns
 */
function LineNewDesign(props) {
    // Default for circle
    const BLUE_DEFAULTS = {
        x: 0,
        y: 0,
        fill: 'blue',
        width: 20,
        height: 20,
        opacity: 0.2,
    }

    // Define param
    // Feature/#17462_Test_Fixbug -->
    // MOD remove width
    const { id, type } = props
    // Feature/#17462_Test_Fixbug <--

    // Position of Point's param
    let xStart = props.position.x,
        yStart = props.position.y,
        xEnd = props.pointEnd.x,
        yEnd = props.pointEnd.y

    // Line style & draggable
    const { dotSpace, draggable } = utils.changeDisplayProperty(props)

    // Left node's info
    const [nodeLeft, updatenodeLeft] = useState({
        ...BLUE_DEFAULTS,
        x: xStart,
        y: yStart,
    })

    // Right node's info
    const [nodeRight, updatenodeRight] = useState({
        ...BLUE_DEFAULTS,
        x: xEnd,
        y: yEnd,
    })

    // When user use keyboard to change position
    useEffect(() => {
        // If Line just added, ignore
        if (props.pointEnd.x === -1 && props.pointEnd.y === -1) {
            return
        }

        // Only process if position is changed
        if (
            nodeLeft.x !== props.position.x ||
            nodeLeft.y !== props.position.y
        ) {
            updatenodeLeft({ ...nodeLeft, ...props.position })
            updatenodeRight({ ...nodeRight, ...props.pointEnd })
        }
    }, [props.position])

    /**
     * Process Drag circle or line end
     */
    const handleDragEnd = () => {
        // Update store
        utils.handleTransformControl(
            {
                position: { x: nodeLeft.x, y: nodeLeft.y },
                pointEnd: { x: nodeRight.x, y: nodeRight.y },
                type,
            },
            id,
            props.propsTransformControl
        )
    }

    /**
     * Process Drag Line move     */
    const handleDragMove = (e) => {
        // New position
        const position = e.target.position()

        // Space that changed
        const xChange = position.x - nodeLeft.x
        const yChange = position.y - nodeLeft.y

        // Update position of Left, Right node
        updatenodeLeft({ ...nodeLeft, ...e.target.position() })
        updatenodeRight({
            ...nodeRight,
            x: nodeRight.x + xChange,
            y: nodeRight.y + yChange,
        })
    }

    return (
        <>
            <Arrow
                className="line"
                name="line"
                id={props.id}
                points={[
                    0,
                    0,
                    nodeRight.x - nodeLeft.x,
                    nodeRight.y - nodeLeft.y,
                ]}
                fill={props.backgroundColor}
                strokeScaleEnabled={false}
                x={nodeLeft.x}
                y={nodeLeft.y}
                strokeWidth={props.strokeWidth}
                stroke={props.backgroundColor}
                dash={[10, dotSpace]}
                pointerAtBeginning={false}
                pointerAtEnding={false}
            />

            {/* Line to select easily */}
            <Line
                // Only draggable at design mode
                draggable={draggable}
                className="line"
                name="line"
                id={props.id}
                points={[
                    0,
                    0,
                    nodeRight.x - nodeLeft.x,
                    nodeRight.y - nodeLeft.y,
                ]}
                stroke="transparent"
                x={nodeLeft.x}
                y={nodeLeft.y}
                // Width + 2 to easily select
                strokeWidth={props.strokeWidth + 2}
                onClick={(e) => {
                    utils.handleClickControl(e, id, props.propsClickControl)
                }}
                onDragMove={(e) => {
                    handleDragMove(e)
                }}
                onDragEnd={(e) => {
                    handleDragEnd()
                }}
            />

            <Circle
                id={'lbl' + props.id}
                {...nodeLeft}
                className="line"
                draggable
                onDragMove={(e) => {
                    updatenodeLeft({ ...nodeLeft, ...e.target.position() })
                }}
                onDragEnd={(e) => {
                    handleDragEnd()
                }}
                visible={props.selected}
            />
            <Circle
                {...nodeRight}
                id={'txt' + props.id}
                draggable
                className="line"
                onDragMove={(e) => {
                    updatenodeRight({ ...nodeRight, ...e.target.position() })
                }}
                onDragEnd={(e) => {
                    handleDragEnd()
                }}
                visible={props.selected}
            />
        </>
    )
}

export default React.memo(LineNewDesign, (prevProp, nextProp) => {
    return JSON.stringify(prevProp) === JSON.stringify(nextProp)
})
