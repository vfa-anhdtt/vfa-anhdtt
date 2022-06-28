import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Collapse } from '../../../Collapse'
import { Toggle } from '../../../Toggle'
import { TextField } from '../../../TextField'
import { CONTROLS_TYPES } from '../../../../../constants'

import { ControlPropertiesStyle } from './ControlProperties.style'

function ControlProperties(props) {
    const { visible, onChange, radioGroup } = props

    const [stateRadioGroup, setStateRadioGroup] = useState(radioGroup)

    function handleOnChangeToggle(name, checked) {
        onChange(name, checked)
    }

    function handleOnChange(e) {
        const {
            target: { value, name },
        } = e

        switch (name) {
            case 'radioGroup':
                setStateRadioGroup(value)
                break
            default:
                break
        }

        onChange(name, value)
    }

    function showVisible() {
        const show = []

        show.push(
            <div key={0}>
                <Toggle
                    checked={visible}
                    label="表示・非表示"
                    name="visible"
                    onChange={handleOnChangeToggle}
                />
            </div>
        )

        return show
    }

    function showRadioGroup() {
        const { type } = props

        const { RADIO } = CONTROLS_TYPES

        const show = []

        if ([RADIO].includes(type)) {
            show.push(
                <div key={0}>
                    <TextField
                        value={stateRadioGroup}
                        onChange={handleOnChange}
                        name="radioGroup"
                    >
                        ラジオグループ
                    </TextField>
                </div>
            )
        }

        return show
    }

    return (
        <ControlPropertiesStyle>
            <div className="properties-control">
                <Collapse title="制御">
                    <div className="d-flex flex-col p-16 gap-16">
                        {showVisible()}
                        {showRadioGroup()}
                    </div>
                </Collapse>
            </div>
        </ControlPropertiesStyle>
    )
}

ControlProperties.defaultProps = {
    onChange: () => {},
    visible: true,
    type: '',
    radioGroup: '',
}

ControlProperties.propTypes = {
    onChange: PropTypes.func,
    visible: PropTypes.bool,
    type: PropTypes.string,
    radioGroup: PropTypes.string,
}
export default ControlProperties
