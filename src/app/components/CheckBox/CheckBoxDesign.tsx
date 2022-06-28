import React from 'react'
import { Rect, Text } from 'react-konva'
import * as utils from '../../../utils'
/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a checkbox for canvas
 * @param props : property of control
 * @returns Rect & Text: Rect for display border, Text for display text
 */
function CheckBoxDesign(props) {
    const { id, fontStyle, strokeWidth, dotSpace } =
        utils.changeDisplayProperty(props)
    let txtCheckStatus = '□'
    //when checked is true, show another text
    if (props.checked) {
        txtCheckStatus = '☑︎'
    }

    return (
        <>
            <Rect
                strokeScaleEnabled={false}
                x={props.position.x}
                y={props.position.y}
                width={props.width}
                height={props.height}
                fill={props.backgroundColor}
                id={props.id}
                stroke={props.borderColor}
                strokeWidth={strokeWidth}
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
            />

            <Text
                draggable
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
                x={props.position.x}
                y={props.position.y}
                fontFamily={props.fontFamily}
                fontSize={props.fontSize}
                fill={props.color}
                id={'lbl' + props.id}
                text={`${txtCheckStatus} ${props.text}`}
                fontStyle={'' + fontStyle}
                width={props.width}
                height={props.height}
                verticalAlign={props.verticalAlign}
                align={props.align}
            />
        </>
    )
}

export default React.memo(CheckBoxDesign, (prevProp, nextProp) => {
    return JSON.stringify(prevProp) === JSON.stringify(nextProp)
})
