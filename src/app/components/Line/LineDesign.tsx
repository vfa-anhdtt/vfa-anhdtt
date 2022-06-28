import React from 'react'
import { Line, Rect } from 'react-konva'

import * as utils from '../../../utils'

/**
 * draw lines
 * @param props
 * @returns
 */
function LineDesign(props) {
    const { id } = props
    const { dotSpace } = utils.changeDisplayProperty(props)
    return (
        <>
            <Rect
                draggable
                className="line"
                name="line"
                id={props.id}
                strokeScaleEnabled={false}
                x={props.position.x}
                y={props.position.y}
                width={props.width}
                height={props.borderWidth}
                stroke={props.backgroundColor}
                fill={
                    props.borderType === 'solid'
                        ? props.backgroundColor
                        : 'transparent'
                }
                dash={[1, dotSpace]}
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
        </>
    )
}

export default React.memo(LineDesign, (prevProp, nextProp) => {
    return JSON.stringify(prevProp) === JSON.stringify(nextProp)
})
