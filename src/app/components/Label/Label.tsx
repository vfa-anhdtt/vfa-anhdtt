import React from 'react'
import { Label as LabelDefault } from '@fluentui/react/lib/Label'

import { LabelStyle } from './Label.style'

//  feature/#17377_The_displayed_text_is_wrong
//  ADD interface LabelProps
interface LabelProps {
    children: any
    fontSize: any
    fontWeight: string
    fontStyle: string
    fontFamily: string
    fontColor: string
}
// feature/#17377_The_displayed_text_is_wrong <<---

/**
 * feature/#17377_The_displayed_text_is_wrong
 * @component Label
 * @extends
 * @library
 **/

//  feature/#17377_The_displayed_text_is_wrong
//  ADD use interface LabelProps

function Label(props: LabelProps) {
    // feature/#17377_The_displayed_text_is_wrong <<---

    const { children, fontSize, fontWeight, fontStyle, fontFamily, fontColor } =
        props

    return (
        <LabelStyle
            {...props}
            fontSize={fontSize}
            fontWeight={fontWeight}
            fontStyle={fontStyle}
            fontFamily={fontFamily}
            fontColor={fontColor}
        >
            <LabelDefault>{children}</LabelDefault>
        </LabelStyle>
    )
}

Label.defaultProps = {
    children: 'label',
    fontSize: 1,
    fontWeight: 'Normal',
    fontStyle: 'Normal',
    fontFamily: 'Fira Sans Roboto',
    fontColor: '#000000',
}

export default Label
