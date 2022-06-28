import * as React from 'react'
import PropTypes from 'prop-types'
// import { IIconProps } from '@fluentui/react'
import { ActionButton as ActionButtonDefault } from '@fluentui/react/lib/Button'

import { ActionButtonStyle } from './Button.style'

const ActionButton = (props) => {
    const { children, checked, disabled, iconProps, onClick } = props

    return (
        <ActionButtonStyle>
            <ActionButtonDefault
                iconProps={iconProps}
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
                onClick={onClick}
            >
                {children}
            </ActionButtonDefault>
        </ActionButtonStyle>
    )
}

ActionButton.defaultProps = {
    children: 'button',
    checked: false,
    disabled: false,
    iconProps: { iconName: 'ChevronLeft' },
    onClick: () => {},
}

ActionButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    iconProps: PropTypes.object,
    onClick: PropTypes.func,
}

export { ActionButton }
