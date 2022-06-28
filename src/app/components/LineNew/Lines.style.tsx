import styled from 'styled-components'
interface lineProps {
    readonly x?: number
    readonly y?: number
    readonly width?: number
    readonly height?: number
    readonly borderType?: string
    readonly borderColor?: string
    readonly borderWidth?: number
    readonly backgroundColor?: string
    readonly visible?: boolean
    readonly rotation?: number
}
interface LineUIProps {
    readonly width?: string
    readonly backgroundColor?: string
    readonly height?: string
}
const LineStyle = styled.p<lineProps>`
    z-index: 10;
    position: absolute;
    top: ${(props) => props.y + 'px'};
    left: ${(props) => props.x + 'px'};
    width: ${(props) => props.width + 'px'};
    height: ${(props) => props.borderWidth + 'px'};
    border-top: ${(props) =>
        props.borderWidth + `px ${props.borderType} ${props.backgroundColor}`};
    display: ${(props) => (props.visible ? 'grid' : 'none')};
    -webkit-transform: rotate(${(props) => props.rotation}deg);
`
const LineUIStyle = styled.div<LineUIProps>`
    width: ${(props) => props.width};
    background-color: ${(props) => props.backgroundColor};
    height: ${(props) => props.height};
`
export { LineStyle, LineUIStyle }
