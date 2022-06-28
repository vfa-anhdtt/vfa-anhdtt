import * as React from 'react'
import PropTypes from 'prop-types'
import { IconButton as IconButtonDefault } from '@fluentui/react/lib/Button'

import { IconButtonStyle } from './Button.style'

const IconButton = (props) => {

    return (
        <IconButtonStyle>
            <IconButtonDefault {...props} />
        </IconButtonStyle>
    )
}

IconButton.defaultProps = {
    title: 'Settings',
    ariaLabel: 'Settings',
    checked: false,
    disabled: false,
    iconProps: { iconName: 'Settings' },
    draggable: false,
    onDragStart: () => {},
    onClick: () => {},
    styles: {},
}

IconButton.propTypes = {
    title: PropTypes.string,
    ariaLabel: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    iconProps: PropTypes.object,
    draggable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onDragStart: PropTypes.func,
    onClick: PropTypes.func,
    styles: PropTypes.object,
}

export { IconButton }
