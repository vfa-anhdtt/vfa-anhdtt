import React from 'react'
import { LineStyle } from './Lines.style'
function Line(props) {
    return (
        props.id && (
            <LineStyle
                {...props}
                id={props.id}
                x={props.position.x}
                y={props.position.y}
            ></LineStyle>
        )
    )
}
export default Line
