import React from 'react'

import { Label as LabelPreviewDefault } from '@fluentui/react/lib/Label'

import { LabelPreviewStyle } from './Label.style'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a label for preview
 * @param props : property of control
 * @returns label element
 */
function LabelPreview(props) {
    return (
        props.id && (
            <LabelPreviewStyle
                {...props}
                x={props.position.x}
                y={props.position.y}
            >
                <LabelPreviewDefault>{props.text}</LabelPreviewDefault>
            </LabelPreviewStyle>
        )
    )
}

export default LabelPreview
