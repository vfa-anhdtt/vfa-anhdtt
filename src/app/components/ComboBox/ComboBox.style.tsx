import styled from 'styled-components'
import { ALIGN_PV_VALUE, VERTICAL_ALIGN_PV_VALUE } from '../../../constants'
import { CommonStyle } from '../../../constants/CommonStyle'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * defined ComboBox's style for preview page
 * @CommonStyle: style that had defined for div will be contain ComboBox
 */
const ComboBoxStyle = styled(CommonStyle)`
    justify-content: ${(props) => ALIGN_PV_VALUE[props.align]};
    .ms-ComboBox-container {
        .ms-ComboBox {
            font-family: ${(props) => props.fontFamily};
            height: ${(props) => props.height}px;
            width: ${(props) => props.width}px;
            background-color: ${(props) => props.backgroundColor};
            input {
                color: ${(props) => props.color};
                font-size: ${(props) => `${props.fontSize}px`};
                font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
                font-style: ${(props) => (props.italics ? 'italic' : 'normal')};
                text-align: ${(props) => props.align};
                align-content: ${(props) =>
                    VERTICAL_ALIGN_PV_VALUE[props.verticalAlign]};
                background-color: ${(props) => props.backgroundColor};
            }
        }
    }
`

export { ComboBoxStyle }
