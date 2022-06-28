import React, { useEffect } from 'react'
import { Checkbox } from '@fluentui/react'
import { CheckBoxStyle } from './CheckBox.style'
/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a checkbox for preview
 * @param props : property of control
 * @returns checkbox element
 */
function CheckBox(props) {
    //checked's status of Checkbox
    const [isChecked, setIsChecked] = React.useState(props.checked)

    //when checkbox is changed, checked's status will be updated
    const onChange = React.useCallback(
        (
            ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
            checked?: boolean
        ): void => {
            setIsChecked(!!checked)
        },
        []
    )

    useEffect(() => {
        setIsChecked(props.checked)
    }, [props.checked])

    return (
        <CheckBoxStyle {...props} x={props.position.x} y={props.position.y}>
            <Checkbox
                disabled={!props.enable}
                label={props.text}
                checked={isChecked}
                onChange={onChange}
            ></Checkbox>
        </CheckBoxStyle>
    )
}

export default CheckBox
