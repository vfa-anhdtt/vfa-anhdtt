import React from 'react'
import PropTypes from 'prop-types'
import { Rect, Text } from 'react-konva'

import * as utils from '../../../utils'

function TextBoxDesign(props) {
    const { id, fontStyle, strokeWidth, dotSpace } =
        utils.changeDisplayProperty(props)
    let text = props.text
    // feature/#18643_update_form_setting -->>
    // check condition to show color text
    let textColor = props.color
    if (!text && props.placeHolder) {
        text = props.placeHolder
        textColor = props.colorPlacehoder
    }
    // feature/#18643_update_form_setting <<--
    return (
        <>
            <Rect
                draggable
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
                // characterSpacing={props.fontFamily}
                fill={textColor}
                id={'txt' + props.id}
                text={text}
                fontStyle={'' + fontStyle}
                width={props.width}
                height={props.height}
                verticalAlign={props.verticalAlign}
                align={props.align}
                // feature/#18466_Doubleclick_control_is_change_content --->>
                // ADD event double click TextBox
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

TextBoxDesign.defaultProps = {
    children: 'text demo',
}

TextBoxDesign.propTypes = {
    children: PropTypes.string,
}

export default React.memo(TextBoxDesign, (prevProp, nextProp) => {
    return JSON.stringify(prevProp) === JSON.stringify(nextProp)
})
