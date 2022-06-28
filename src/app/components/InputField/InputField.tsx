import * as React from 'react'
import PropTypes from 'prop-types'

import { TextField as TextFieldDefault } from '@fluentui/react/lib/TextField'
import { useId } from '@fluentui/react-hooks'
import { v4 as uuidv4 } from 'uuid'

import { inputDefaultStyle } from './InputField.style'

const setID = uuidv4()

function InputField(props) {
    const {
        inputStyle,
        value,
        disabled,
        onChange,
        name,
        className,
    } = props

    const textFieldId = useId(setID)

    const inputStyleMerge = { ...inputDefaultStyle, ...inputStyle }

    return (
        <TextFieldDefault
            id={textFieldId}
            styles={inputStyleMerge}
            value={value}
            disabled={disabled}
            onChange={onChange}
            name={name}
            className={className}
        />
    )
}

InputField.defaultProps = {
    children: 'text_field',
    value: '',
    inputStyle: {},
    disabled: false,
    onChange: () => { },
    name: '',
    className: '',
}

InputField.propTypes = {
    disabled: PropTypes.bool,
    children: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inputStyle: PropTypes.object,
    onChange: PropTypes.func,
    name: PropTypes.string,
    className: PropTypes.string,
}

export { InputField }