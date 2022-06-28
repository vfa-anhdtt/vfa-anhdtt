import * as React from 'react'
import PropTypes from 'prop-types'
import { Toggle as ToggleDefault } from '@fluentui/react/lib/Toggle'

import { ToggleStyle } from './Toggle.style'

const Toggle = (props) => {
    const { label, onChange, name, checked } = props

    function _onChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
        onChange(name, checked)
    }
    return (
        <ToggleStyle>
            <ToggleDefault
                label={label}
                inlineLabel
                onChange={_onChange}
                checked={checked}
            />
        </ToggleStyle>
    )
}

Toggle.defaultProps = {
    label: 'Toggle',
    onChange: () => {},
    name: '',
    checked: false,
}

Toggle.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export default Toggle
