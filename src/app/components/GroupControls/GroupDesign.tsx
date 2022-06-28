import React from 'react'
import { Rect } from 'react-konva'
import * as utils from '../../../utils'

/**
 * create group for canvas
 * @param props : properties of control
 * @constructor
 */
const GroupDesign = (props) => {
    const { id } = utils.changeDisplayProperty(props)

    return (
        <>
            <Rect
                draggable
                strokeScaleEnabled={false}
                // update UI gourp for seeing clearlys
                x={props.position.x - 5}
                y={props.position.y - 5}
                width={props.width + 10}
                height={props.height + 10}
                fill={'transparent'}
                //feature/#17877_Research_Group_Control -->
                // MOD change stroke color
                stroke={props.backgroundColor}
                // MOD add className
                className={'GROUP'}
                //feature/#17877_Research_Group_Control <--
                id={props.id}
                onClick={(e) =>
                    utils.handleClickControl(e, id, props.propsClickControl)
                }
                onDragMove={(e) =>
                    utils.handleDragMoveGroupControl(
                        e,
                        id,
                        props.propsDragMoveGroupControl
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

export default GroupDesign
