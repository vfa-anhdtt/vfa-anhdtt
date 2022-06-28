import PropTypes from 'prop-types'
import React from 'react'
import { CheckBox } from '../CheckBox'
import ComboBox from '../ComboBox/ComboBox'

import { CONTROLS_TYPES } from '../../../constants'

import { ListBox } from '../ListBox'
import { Grid } from '../Grid'
import TextBox from '../TextBox/TextBox'
import Signature from '../SignatureStamp/SignatureStamp'
/**
 * create control to view on preview page
 * @param props property of control
 * @returns <control/>
 */
function ListControlPreview(props) {
    switch (props.type) {
        // Control is Label will not show on browser (show on canvas)
        case CONTROLS_TYPES.LABEL:
            return <></>
        // return <LabelPreview {...props} />

        // Control is TextBox
        case CONTROLS_TYPES.TEXTBOX:
            return <TextBox {...props} />

        // Control is CheckBox
        case CONTROLS_TYPES.CHECKBOX:
            return <CheckBox {...props} />

        // Control is ComboBox
        case CONTROLS_TYPES.COMBOBOX:
            return <ComboBox {...props} />

        // Control is ListBox
        case CONTROLS_TYPES.LISTBOX:
            return <ListBox {...props} />

        // Control is Grid
        case CONTROLS_TYPES.GRID:
            return <Grid {...props} />

        // Control is Line (show by canvas)will not show on browser (show on canvas)
        case CONTROLS_TYPES.LINE:
            return <></>
        // return <Line {...props} />

        // Control is SIGNATURE
        case CONTROLS_TYPES.SIGNATURE:
            return <Signature {...props} />

        // Radio will be display by choose group, it need prepare data for group,
        // So it will be call from preview page with group data
        case CONTROLS_TYPES.RADIO:
            return <></>

        // Group will not show on browser
        case CONTROLS_TYPES.GROUP:
            return <></>

        // Image will not show on browser (show on canvas)
        case CONTROLS_TYPES.IMAGE:
            return <></>

        // When control type is new, and not define, show message to understand easily
        default:
            return (
                <div>
                    CONTROLS_TYPES :{props.type} is not defined on function
                    ListControlPreview of file:
                    <br />
                    src/app/components/ListControl/ListControlPreview.tsx
                </div>
            )
    }
}

ListControlPreview.defaultProps = {
    propsClickControl: () => {},
    propsClickDoubleControl: () => {},
    value: {},
}

ListControlPreview.propTypes = {
    propsClickControl: PropTypes.func,
    propsClickDoubleControl: PropTypes.func,
    value: PropTypes.object,
    // bgColor:String
}

export default ListControlPreview
