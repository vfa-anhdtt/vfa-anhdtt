import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ColorPickerStyle } from './ColorPicker.style'

function ColorPicker(props) {
    const { id, onChange, name, label, color } = props

    function handleOnChange(e) {
        const {
            target: { value },
        } = e
        onChange(name, value)
    }

    return (
        <ColorPickerStyle>
            <div className="label-color_picker">
                <label>{label}</label>
            </div>
            <div className="color_picker">
                <input
                    className="input-color_picker"
                    type="color"
                    id={id}
                    value={color}
                    onChange={handleOnChange}
                />
            </div>
        </ColorPickerStyle>
    )
}

ColorPicker.defaultProps = {
    onChange: () => {},
    name: 'colorpikcer',
    id: 'colorpikcer',
    label: 'color pikcer',
    color: '#ffffff',
}

ColorPicker.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default ColorPicker
