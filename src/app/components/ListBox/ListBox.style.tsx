import styled from 'styled-components'
import { CommonStyle } from '../../../constants/CommonStyle'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * defined ListBox's style for preview page
 * @CommonStyle: style that had defined for div will be contain ListBox
 */
const ListBoxStyle = styled(CommonStyle)`
    display: block;
    height: ${(props) => props.height + 7}px;
    .ms-Viewport {
        .ms-DetailsList-contentWrapper {
            overflow-x: hidden;
            height: ${(props) => props.height}px !important;
            .ms-SelectionZone {
                height: ${(props) => props.height - 2}px;
                .ms-FocusZone {
                    color: ${(props) => props.color};
                    font-size: ${(props) => props.fontSize}px;
                    font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
                    font-style: ${(props) =>
                        props.italics ? 'italic' : 'normal'};
                    .ms-List {
                        .ms-List-surface {
                            .ms-List-page {
                                .ms-List-cell .ms-DetailsRow {
                                    background: ${(props) =>
                                        props.backgroundColor};
                                    .ms-FocusZone {
                                        border: none;
                                        .ms-DetailsRow-cell {
                                            text-align: ${(props) =>
                                                props.align};

                                            margin: -3px 0px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .ms-DetailsList-headerWrapper {
            display: none;
        }
        .ms-DetailsRow-check {
            height: 100%;
            width: 100%;
        }
    }
    .ms-DetailsRow-cell {
        text-align: ${(props) => props.align};
    }
    div {
        min-height: 10px !important;
        color: ${(props) => props.color};
        font-family: ${(props) => props.fontFamily};
    }
    .cell-226 {
        padding-top: 5px !important;
        padding-bottom: 5px !important;
        padding-left: 5px !important;
    }
    .cell-234 {
        padding-top: 5px !important;
        padding-bottom: 5px !important;
        padding-left: 5px !important;
    }
`

export { ListBoxStyle }
