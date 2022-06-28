import styled from 'styled-components'
import { ALIGN_PV_VALUE } from '../../../constants'
import { CommonStyle } from '../../../constants/CommonStyle'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * defined checkbox's style for preview page
 * @CommonStyle: style that had defined for div will be contain checkbox
 */
const CheckBoxStyle = styled(CommonStyle)`
    justify-content: ${
        (props) => ALIGN_PV_VALUE[props.align] /**verticalAlign */
    };
    span {
        font-size: ${(props) => `${props.fontSize}px`};
        font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
        font-style: ${(props) => (props.italics ? 'italic' : 'normal')};
        font-family: ${(props) => props.fontFamily};
        color: ${(props) => props.color};
        background: ${(props) => props.backgroundColor};
    }
    .ms-Checkbox-checkbox {
        height: ${(props) => `${props.fontSize < 17 ? 15 : 20}px`};
        width: ${(props) => `${props.fontSize < 17 ? 15 : 20}px`};
    }
`

export { CheckBoxStyle }
