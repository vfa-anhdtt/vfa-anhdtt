import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Group, Rect, Text, Circle, Line } from 'react-konva'

import * as utils from '../../../utils'

function SignatureDesign(props) {
    const { id, fontStyle, strokeWidth, dotSpace } =
        utils.changeDisplayProperty(props)
    let text = props.text

    var pi = Math.PI
    var widthTransform = (((54 * pi) / 180) * props.width) / 2

    if (!text && props.placeHolder) text = props.placeHolder
    return (
        <>
            <Rect
                draggable
                // #18351 transform signature stamp
                className="circle"
                strokeScaleEnabled={false}
                x={props.position.x}
                y={props.position.y}
                width={props.width}
                height={props.height}
                fill={props.backgroundColor}
                id={props.id}
                stroke={props.borderColor}
                strokeWidth={strokeWidth}
                // #18351 transform signature stamp
                onTransform={(e) =>
                    utils.handleTransformControl(
                        e,
                        id,
                        props.propsTransformControl
                    )
                }
            />
            <Circle
                strokeScaleEnabled={false}
                x={props.position.x + props.width / 2}
                y={props.position.y + props.width / 2}
                id={'circle2' + props.id}
                radius={props.width / 2}
                stroke={'red'}
                strokeWidth={1}
                dash={[2, dotSpace]}
                fill={props.backgroundColor}
            />

            <Line
                x={props.position.x + props.width / 2}
                y={props.position.y + (props.width * 2) / 3}
                points={[-widthTransform, 0, widthTransform, 0]}
                stroke={'red'}
                strokeWidth={1}
                dash={[2, dotSpace]}
            />
            <Line
                x={props.position.x + props.width / 2}
                y={props.position.y + (props.width * 1) / 3}
                points={[-widthTransform, 0, widthTransform, 0]}
                stroke="red"
                strokeWidth={1}
                dash={[2, dotSpace]}
            />
            <Text
                x={props.position.x - widthTransform + props.width / 2}
                y={props.position.y + props.width / 2}
                width={widthTransform + widthTransform}
                height={(widthTransform * 1) / 10}
                fontFamily={props.fontFamily}
                fontSize={props.fontSize}
                characterSpacing={props.fontFamily}
                fill={props.color}
                id={'circle3' + props.id}
                text={'令和04年05月06日'}
                fontStyle={'' + fontStyle}
                align={props.horizontalAlign}
                verticalAlign={'middle'}
            />
            <Text
                x={props.position.x - widthTransform + props.width / 2}
                y={props.position.y - props.width / 2 / 1.5 + props.width / 2}
                width={widthTransform + widthTransform}
                height={(widthTransform * 1.5) % 7}
                fontFamily={props.fontFamily}
                fontSize={props.fontSize}
                characterSpacing={props.fontFamily}
                fill={props.color}
                id={'circle4' + props.id}
                text={'社員'}
                fontStyle={'' + fontStyle}
                align={props.horizontalAlign}
                verticalAlign={'middle'}
            />
            <Text
                x={props.position.x - widthTransform + props.width / 2}
                y={props.position.y + props.width / 2 / 1.5 + props.width / 2}
                width={widthTransform + widthTransform}
                height={(widthTransform * 2) % 2}
                fontFamily={props.fontFamily}
                fontSize={props.fontSize}
                characterSpacing={props.fontFamily}
                fill={props.color}
                id={'circle5' + props.id}
                text={'部門1'}
                fontStyle={'' + fontStyle}
                align={props.horizontalAlign}
                verticalAlign={'middle'}
            />
            <Rect
                draggable
                className="circle"
                strokeScaleEnabled={false}
                x={props.position.x}
                y={props.position.y}
                width={props.width}
                height={props.height}
                fill={'transparent'}
                id={props.id}
                stroke={props.borderColor}
                strokeWidth={strokeWidth}
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

SignatureDesign.defaultProps = {
    children: 'text demo',
}

SignatureDesign.propTypes = {
    children: PropTypes.string,
}

export default React.memo(SignatureDesign, (prevProp, nextProp) => {
    return JSON.stringify(prevProp) === JSON.stringify(nextProp)
})
