import React from 'react'
import { ComboBox as ComboBoxDefault, IComboBoxOption } from '@fluentui/react'
import { ComboBoxStyle } from './ComboBox.style'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a ComboBox for preview
 * @param props : property of control
 * @returns ComboBox element
 */

function ComboBox(props) {
    //default data to set for combobox
    const options: IComboBoxOption[] = [
        { key: 'A', text: 'Option A' },
        { key: 'B', text: 'Option B' },
        { key: 'C', text: 'Option C' },
        { key: 'D', text: 'Option D' },
        { key: 'E', text: 'Option E' },
        { key: 'F', text: 'Option F' },
        { key: 'G', text: 'Option G' },
        { key: 'H', text: 'Option H' },
        { key: 'I', text: 'Option I' },
        { key: 'J', text: 'Option J' },
    ]
    return (
        <ComboBoxStyle {...props} x={props.position.x} y={props.position.y}>
            <ComboBoxDefault
                // label={props.text}
                options={options}
            ></ComboBoxDefault>
        </ComboBoxStyle>
    )
}

export default ComboBox
