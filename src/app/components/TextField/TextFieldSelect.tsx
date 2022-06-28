import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    Dropdown as DropdownDefault,
    IDropdownOption,
} from '@fluentui/react/lib/Dropdown'
import { Label as LabelDefault } from '@fluentui/react/lib/Label'
import { useId } from '@fluentui/react-hooks'
import { v4 as uuidv4 } from 'uuid'
import { _isUndefined } from '../../../utils'

import {
    TextFieldSelectStyle,
    DropdownDefaultStyle,
    labelDefaultStyle,
} from './TextField.style'

const setID = uuidv4()

function TextFieldSelect(props) {
    const {
        children,
        labelStyle,
        dropDownStyle,
        disabled,
        onChange,
        name,
        defaultSelectedKey,
        options,
    } = props

    const textFieldSelectdId = useId(setID)

    const [stateSelectedKeys, setStateSelectedKeys] =
        useState<IDropdownOption>()

    const dropdownStyleMerge = { ...DropdownDefaultStyle, ...dropDownStyle }

    const setDefaultSelectedKey = () => {
        const getSelected = options.filter((value) => {
            return value.key === defaultSelectedKey
        })
        if (_isUndefined(getSelected)) {
            return setStateSelectedKeys(undefined)
        }

        if (getSelected.length >= 1) {
            return setStateSelectedKeys(getSelected[0])
        } else {
            return setStateSelectedKeys(undefined)
        }
    }

    useEffect(() => {
        setDefaultSelectedKey()
    }, [defaultSelectedKey])

    const handleOnChange = (
        _event: React.FormEvent<HTMLDivElement>,
        item: IDropdownOption
    ): void => {
        setStateSelectedKeys(item)
        onChange(name, item)
    }

    return (
        <TextFieldSelectStyle>
            <LabelDefault htmlFor={textFieldSelectdId} styles={labelStyle}>
                {children}
            </LabelDefault>

            <DropdownDefault
                selectedKey={
                    stateSelectedKeys ? stateSelectedKeys.key : undefined
                }
                id={textFieldSelectdId}
                styles={dropdownStyleMerge}
                disabled={disabled}
                onChange={handleOnChange}
                options={options}
            />
        </TextFieldSelectStyle>
    )
}

TextFieldSelect.defaultProps = {
    children: 'text_field',
    value: '',
    dropDownStyle: {},
    labelStyle: labelDefaultStyle,
    disabled: false,
    onChange: () => {},
    name: '',
    defaultSelectedKey: 0,
    propsHandleOnChange: () => {},
    options: [],
}

TextFieldSelect.propTypes = {
    disabled: PropTypes.bool,
    children: PropTypes.string,
    value: PropTypes.string,
    dropDownStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    onChange: PropTypes.func,
    name: PropTypes.string,
    defaultSelectedKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    propsHandleOnChange: PropTypes.func,
    options: PropTypes.array,
}

export { TextFieldSelect }
