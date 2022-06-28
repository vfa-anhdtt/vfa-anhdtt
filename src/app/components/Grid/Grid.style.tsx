import styled from 'styled-components'
import { VERTICAL_ALIGN_PV_VALUE } from '../../../constants'
import { CommonStyle } from '../../../constants/CommonStyle'

import { HEADER_BG_COLOR } from '../Dialog/GridCreateLogicFunctions'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * defined Grid's style for preview page
 * @CommonStyle: style that had defined for div will be contain Grid
 */
const GridStyle = styled(CommonStyle)`
    table,
    td,
    th {
        border: 1px solid black;
    }
    table {
        border-collapse: collapse;
    th {
        height: ${(props) => `${props.headerHeight}px`};
        background: ${HEADER_BG_COLOR};
        text-align: center;
        color: #ffffff;
        font-weight: normal;
    }
    td {
        font-size: ${(props) => `${props.fontSize}px`};
        font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
        font-style: ${(props) => (props.italics ? 'italic' : 'normal')};
        font-family: ${(props) => props.fontFamily};
        color: ${(props) => props.color};
        align-content: ${
            (props) =>
                VERTICAL_ALIGN_PV_VALUE[props.verticalAlign] /**verticalAlign */
        };
        text-align: ${(props) => props.align};
    }
    table {
        position: absolute;
        top: ${(props) => props.y};
        left: ${(props) => props.x};
    }
`

export { GridStyle }
