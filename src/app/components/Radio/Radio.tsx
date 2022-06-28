import React from 'react'

import {
    ChoiceGroup,
    IChoiceGroupOption,
} from '@fluentui/react/lib/ChoiceGroup'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a radio for preview
 * @param props : property of control
 * @returns radio group element
 */
function Radio(props) {
    const options: IChoiceGroupOption[] = props.data
    const [selectedKey, setSelectedKey] = React.useState(
        props.defaultSelectedKey
    )
    //when checkbox is changed, checked's status will be updated
    function onChange(
        ev: React.FormEvent<HTMLInputElement>,
        option: IChoiceGroupOption
    ): void {
        setSelectedKey(option.key)
    }
    React.useEffect(() => {
        setSelectedKey(props.defaultSelectedKey)
    }, [props.defaultSelectedKey])

    return (
        <ChoiceGroup
            options={options}
            selectedKey={selectedKey}
            onChange={(event, options) => onChange(event, options)}
        />
    )
}

export default Radio
