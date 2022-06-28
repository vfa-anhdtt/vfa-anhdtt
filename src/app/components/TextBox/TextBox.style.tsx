import styled from 'styled-components'
import { VERTICAL_ALIGN_PV_VALUE } from '../../../constants'
import { CommonStyle } from '../../../constants/CommonStyle'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * defined textbox's style for preview page
 * @CommonStyle: style that had defined for div will be contain textbox
 */
const TextBoxStyle = styled(CommonStyle)`
    input {
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
        padding: 0px;
    }
`

export { TextBoxStyle }
