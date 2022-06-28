import styled from 'styled-components'

interface signatureStyle {
    readonly x?: number
    readonly y?: number
    readonly fontSize: number
    readonly width?: number
    readonly height?: number
    readonly borderType?: string
    readonly borderColor?: string
    readonly borderWidth?: number
    readonly borderOrNot?: boolean
    readonly backgroundColor?: string
    readonly visible?: boolean
    readonly borderRadius?: number
    readonly boxSizing?: string
    readonly color?: string
    readonly fontFamily?: string
    readonly bold?: boolean
    readonly italics?: boolean
    readonly align?: string
}

const SignatureStyle = styled.div<signatureStyle>`
    z-index: 10;
    position: absolute;
    top: ${(props) => props.y + 'px'};
    left: ${(props) => props.x + 'px'};
    width: ${(props) => props.width + 'px'};
    height: ${(props) => props.height + 'px'};
    color: ${(props) => props.color};
    border: ${(props) =>
        (props.borderOrNot ? props.borderWidth : 0) +
        `px ${props.borderType} ${props.borderColor}`};
    background: ${(props) => props.backgroundColor};
    display: ${(props) => (props.visible ? 'grid' : 'none')};
    color: ${(props) => props.color};
    font-size: ${(props) => `${props.fontSize}px`};
    font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
    font-style: ${(props) => (props.italics ? 'italic' : 'normal')};
    font-family: ${(props) => props.fontFamily};

    .circle {
        width: ${(props) => props.width + 'px' + '0.5px'};
        height: ${(props) => props.height + 'px' + '0.5px'};
        border-radius: ${(props) => props.borderRadius + '%'};
        border: 1px solid #ff3939;
        overflow: hidden;
        text-align: center;
        display: ${(props) => (props.visible ? 'grid' : 'none')};
        place-items: center;
        box-sizing: border-box;

        .top {
            align-self: end;
            margin-top: 2px;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 80%;
            white-space: nowrap;
        }
        .middle {
            align-self: center;
            line-height: ${(props) => (props.height * 1) / 3 + 'px'};
            border-top: 1px solid #ff3939;
            border-bottom: 1px solid #ff3939;
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
        }
        .bottom {
            align-self: start;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 80%;
            white-space: nowrap;
        }
    }
`

export { SignatureStyle }
