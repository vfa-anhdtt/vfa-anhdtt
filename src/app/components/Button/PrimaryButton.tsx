import * as React from 'react'
import PropTypes from 'prop-types'
// import { IIconProps } from '@fluentui/react'
import { PrimaryButton, IButtonStyles } from '@fluentui/react/lib/Button'
import { ButtonStyle } from './Button.style'

// const volume0Icon: IIconProps = { iconName: 'Volume0' }

const PriButton = (props) => {
    const { checked, disabled, iconProps, text, style } = props

    const styleButton: IButtonStyles = style

    return (
        <ButtonStyle>
            <PrimaryButton
                {...props}
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
                iconProps={iconProps}
                text={text}
                style={styleButton}
            />
        </ButtonStyle>
    )
}

PriButton.defaultProps = {
    onClick: () => {},
    checked: false,
    disabled: false,
    iconProps: {},
    text: 'button',
    style: {},
}

PriButton.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    iconProps: PropTypes.object,
    style: PropTypes.object,
}

export { PriButton }
