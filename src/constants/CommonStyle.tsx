import styled from 'styled-components'
import controlStyleProps from './interface'
import { VERTICAL_ALIGN_PV_VALUE } from '.'

export const CommonStyle = styled.div<controlStyleProps>`
    z-index: 10;
    padding: 0px;
    ${(props) =>
        props.isGridChild
            ? ''
            : `
            position: absolute;
            top: ${props.y}px;
            left: ${props.x}px;`}
    width: ${(props) => props.width + 'px'};
    height: ${(props) => props.height + 'px'};
    border: ${(props) =>
        (props.borderOrNot ? props.borderWidth : 0) +
        `px ${props.borderType} ${props.borderColor}`};
    background: ${(props) => props.backgroundColor};
    text-align: ${(props) => props.align};
    align-content: ${
        (props) =>
            VERTICAL_ALIGN_PV_VALUE[props.verticalAlign] /**verticalAlign */
    };
    display: ${(props) => (props.visible ? 'grid' : 'none')};
    color: ${(props) => props.color};
    font-size: ${(props) => `${props.fontSize}px`};
    font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
    font-style: ${(props) => (props.italics ? 'italic' : 'normal')};
    font-family: ${(props) => props.fontFamily};
    text-decoration: ${(props) => (props.underline ? 'underline' : 'normal')};
`
