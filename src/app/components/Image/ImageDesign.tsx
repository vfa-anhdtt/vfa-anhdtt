import React from 'react'
import { Rect, Image } from 'react-konva'
import * as utils from '../../../utils'

function ImageDesign(props) {
    const { id, strokeWidth, dotSpace, draggable } =
        utils.changeDisplayProperty(props)

    // Feature/#17877_Research_Group_Controls -->
    // MOD remove useImage, use window.Image()
    const image = new window.Image()
    // 18504 delete image url in popup
    // change url to imageData
    image.src = props.imageData
    // Feature/#17877_Research_Group_Controls <--
    return (
        <>
            <Image
                image={image}
                strokeScaleEnabled={false}
                x={props.position.x}
                y={props.position.y}
                width={props.width}
                height={props.height}
                id={props.id}
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
            <Rect
                draggable={draggable}
                strokeScaleEnabled={false}
                x={props.position.x}
                y={props.position.y}
                width={props.width}
                height={props.height}
                fill={'transparent'}
                id={props.id}
                // Feature/#17462_Test_Fixbug -->
                // MOD update data stroke, strokeWidth
                stroke={props.backgroundColor}
                strokeWidth={1}
                // Feature/#17462_Test_Fixbug <--
                dash={[2, dotSpace]}
                onDblClick={(e) =>
                    utils.handleDoubleClickControl(
                        e,
                        id,
                        props.propsClickDoubleControl
                    )
                }
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
        </>
    )
}

export default React.memo(ImageDesign, (prevProp, nextProp) => {
    return JSON.stringify(prevProp) === JSON.stringify(nextProp)
})
