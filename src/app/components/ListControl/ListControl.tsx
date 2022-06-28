import PropTypes from 'prop-types'
import React from 'react'
import { TextBoxDesign } from '../TextBox'
import { CheckBoxDesign } from '../CheckBox'
import { RadioDesign } from '../Radio'
import { SignatureDesign } from '../SignatureStamp'
import { ImageDesign } from '../Image'
import GroupDesign from '../GroupControls'
import ComboBoxDesign from '../ComboBox/ComboBoxDesign'

import { LabelDesign } from '../Label'

import { CONTROLS_TYPES } from '../../../constants'

import { ListBoxDesign } from '../ListBox/index'
import { GridDesign } from '../Grid'
import { checkIDinIDs } from '../../../utils'
import { LineDesign } from '../LineNew'

/**
 * create control to view on canvas
 * @param props property of control
 * @returns <control/>
 */
function ListControl(props) {
    // Color of selected control
    const SELECTED_CONTROL_BG_COLOR = 'lightblue'

    // At preview status, only process with below controls
    if (
        props.isPreview &&
        ![
            CONTROLS_TYPES.LABEL,
            CONTROLS_TYPES.IMAGE,
            CONTROLS_TYPES.LINE,
            CONTROLS_TYPES.GRID,
        ].includes(props.type)
    ) {
        return
    }

    // Define param to use
    const { ids = '', id } = props

    // Param to set background color for control
    let bgColor = props.backgroundColor

    // If Control is selected, change background color
    if (checkIDinIDs(id, ids)) {
        bgColor = SELECTED_CONTROL_BG_COLOR
    }

    switch (props.type) {
        // Control is Label
        case CONTROLS_TYPES.LABEL:
            return <LabelDesign {...props} backgroundColor={bgColor} ids="" />

        // Control is TextBox
        case CONTROLS_TYPES.TEXTBOX:
            return <TextBoxDesign {...props} backgroundColor={bgColor} ids="" />

        // Control is CheckBox
        case CONTROLS_TYPES.CHECKBOX:
            return (
                <CheckBoxDesign {...props} backgroundColor={bgColor} ids="" />
            )

        // Control is Radio
        case CONTROLS_TYPES.RADIO:
            return <RadioDesign {...props} backgroundColor={bgColor} ids="" />

        // Control is Combobox
        case CONTROLS_TYPES.COMBOBOX:
            return (
                <ComboBoxDesign {...props} backgroundColor={bgColor} ids="" />
            )

        // Control is ListBox
        case CONTROLS_TYPES.LISTBOX:
            return <ListBoxDesign {...props} backgroundColor={bgColor} ids="" />

        // Control is Signature
        case CONTROLS_TYPES.SIGNATURE:
            return (
                <SignatureDesign {...props} backgroundColor={bgColor} ids="" />
            )

        // Control is Line
        case CONTROLS_TYPES.LINE:
            return (
                <LineDesign
                    {...props}
                    backgroundColor={bgColor}
                    // When selected, flag will true
                    selected={props.ids === props.id}
                    ids=""
                />
            )

        // Control is Grid
        case CONTROLS_TYPES.GRID:
            return <GridDesign {...props} backgroundColor={bgColor} ids="" />

        // Control is Image
        case CONTROLS_TYPES.IMAGE:
            return <ImageDesign {...props} backgroundColor={bgColor} ids="" />

        // Control is Group
        case CONTROLS_TYPES.GROUP:
            return <GroupDesign {...props} backgroundColor={bgColor} ids="" />

        //Other
        default:
            return <></>
    }
}

ListControl.defaultProps = {
    propsClickControl: () => {},
    propsClickDoubleControl: () => {},
    value: {},
}

ListControl.propTypes = {
    propsClickControl: PropTypes.func,
    propsClickDoubleControl: PropTypes.func,
    value: PropTypes.object,
    // bgColor:String
}

export default ListControl
