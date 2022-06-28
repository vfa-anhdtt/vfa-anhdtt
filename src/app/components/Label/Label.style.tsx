import styled from 'styled-components'
import { VERTICAL_ALIGN_PV_VALUE } from '../../../constants'
import { CommonStyle } from '../../../constants/CommonStyle'

interface labelProps {
    readonly fontSize: string
    readonly fontWeight: string
    readonly fontStyle: string
    readonly fontFamily: string
    readonly fontColor: string
}

const LabelStyle = styled.div<labelProps>`
    label {
        font-size: ${(props) => `${props.fontSize}rem`};
        font-weight: ${(props) => props.fontWeight};
        font-style: ${(props) => props.fontStyle};
        font-family: ${(props) => props.fontFamily};
        color: ${(props) => props.fontColor};
    }
`

/**
 * feature/#17330-Preview-Add-comment-for-function
 * defined Label's style for preview page
 * @CommonStyle: style that had defined for div will be contain Label
 */
const LabelPreviewStyle = styled(CommonStyle)`
    label {
        font-size: ${(props) => `${props.fontSize}px`};
        font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
        font-style: ${(props) => (props.italics ? 'italic' : 'normal')};
        font-family: ${(props) => props.fontFamily};
        color: ${(props) => props.color};
        align-content: ${
            (props) =>
                VERTICAL_ALIGN_PV_VALUE[props.verticalAlign] /**verticalAlign */
        };
        background: ${(props) => props.backgroundColor};
        text-align: ${(props) => props.align};
    }
`
export { LabelStyle, LabelPreviewStyle }
