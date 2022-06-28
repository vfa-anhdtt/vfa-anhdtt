// feature/#18466_Doubleclick_control_is_change_content --->>
// ADD useEffect
import React, { useEffect } from 'react'
// feature/#18466_Doubleclick_control_is_change_content <<---
import PropTypes from 'prop-types'

import { TextField as TextFieldDefault } from '@fluentui/react/lib/TextField'
import { Label as LabelDefault } from '@fluentui/react/lib/Label'
import { useId } from '@fluentui/react-hooks'
import { v4 as uuidv4 } from 'uuid'

import {
    TextFieldStyle,
    inputDefaultStyle,
    labelDefaultStyle,
} from './TextField.style'

const setID = uuidv4()

function TextField(props) {
    const {
        children,
        labelStyle,
        inputStyle,
        value,
        disabled,
        onChange,
        name,
        className,
        // feature/#18466_Doubleclick_control_is_change_content --->>
        // ADD autoFocus
        autoFocus,
        // feature/#18466_Doubleclick_control_is_change_content <<---
    } = props

    const textFieldId = useId(setID)

    const inputStyleMerge = { ...inputDefaultStyle, ...inputStyle }

    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD check `autoFocus`,
    useEffect(() => {
        // `autoFocus` is true, add focus textFied
        if (autoFocus) {
            setTimeout(function () {
                document.getElementById(textFieldId).focus()
            }, 0)
        }
    }, [autoFocus])
    // feature/#18466_Doubleclick_control_is_change_content <<---

    return (
        <TextFieldStyle className="d-flex items-center">
            <LabelDefault htmlFor={textFieldId} styles={labelStyle}>
                {children}
            </LabelDefault>
            <TextFieldDefault
                id={textFieldId}
                styles={inputStyleMerge}
                value={value}
                disabled={disabled}
                onChange={onChange}
                name={name}
                className={className}
            />
        </TextFieldStyle>
    )
}

TextField.defaultProps = {
    children: 'text_field',
    value: '',
    inputStyle: {},
    labelStyle: labelDefaultStyle,
    disabled: false,
    onChange: () => {},
    name: '',
    className: '',
    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD `autoFocus`, default false
    autoFocus: false,
    // feature/#18466_Doubleclick_control_is_change_content <<---
}

TextField.propTypes = {
    disabled: PropTypes.bool,
    children: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inputStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    onChange: PropTypes.func,
    name: PropTypes.string,
    className: PropTypes.string,
    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD `autoFocus`, is bool
    autoFocus: PropTypes.bool,
    // feature/#18466_Doubleclick_control_is_change_content <<---
}

export { TextField }
