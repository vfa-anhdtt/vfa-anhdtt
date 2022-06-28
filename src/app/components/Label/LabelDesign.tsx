import React from 'react'
import { Rect, Text } from 'react-konva'
import * as utils from '../../../utils'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a label for canvas
 * @param props : property of control
 * @returns Rect & Text: Rect for display border, Text for display text
 */
function LabelDesign(props) {
    const {
        id,
        fontStyle,
        textDecoration,
        strokeWidth,
        // Add param to control draggable
        draggable,
    } = utils.changeDisplayProperty(props)

    return (
        <>
            <Rect
                // Only draggable in design mode
                draggable={draggable}
                strokeScaleEnabled={false}
                x={props.position.x}
                y={props.position.y}
                width={props.width}
                height={props.height}
                fill={props.backgroundColor}
                id={props.id}
                stroke={props.borderColor}
                strokeWidth={strokeWidth}
                onClick={(e) =>
                    utils.handleClickControl(
                        e,
                        id,
                        props.propsClickControl,
                        // feature/#18337-Preview-Formula-for-textbox ADD: add isPreview, url param
                        props.isPreview,
                        props.url
                    )
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
            />
            <Text
                // Only draggable in design mode
                draggable={draggable}
                onClick={(e) =>
                    utils.handleClickControl(
                        e,
                        id,
                        props.propsClickControl,
                        // feature/#18337-Preview-Formula-for-textbox ADD: add isPreview, url param
                        props.isPreview,
                        props.url
                    )
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
                x={props.position.x}
                y={props.position.y}
                fontFamily={props.fontFamily}
                fontSize={props.fontSize}
                fill={props.color}
                id={'txt' + props.id}
                text={props.text}
                fontStyle={'' + fontStyle}
                textDecoration={'' + textDecoration}
                width={props.width}
                height={props.height}
                verticalAlign={props.verticalAlign}
                align={props.align}
                // feature/#18466_Doubleclick_control_is_change_content --->>
                // ADD event double click label
                onDblClick={(e) =>
                    utils.handleDoubleClickControl(
                        e,
                        id,
                        props.propsClickDoubleControl
                    )
                }
                // feature/#18466_Doubleclick_control_is_change_content <<---
            />
        </>
    )
}

export default React.memo(LabelDesign, (prevProp, nextProp) => {
    return JSON.stringify(prevProp) === JSON.stringify(nextProp)
})
