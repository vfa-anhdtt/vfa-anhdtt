import * as React from 'react'
import PropTypes from 'prop-types'
import { FontIcon as FontIconDefault } from '@fluentui/react/lib/Icon'
import { mergeStyles } from '@fluentui/react/lib/Styling'

import { FontIconStyle } from './FontIcon.style'

const FontIcon = (props) => {
    const { propsStyle, ariaLabel, iconName } = props

    const iconClass = mergeStyles(propsStyle)

    return (
        <FontIconStyle>
            <FontIconDefault
                aria-label={ariaLabel}
                iconName={iconName}
                className={iconClass}
            />
        </FontIconStyle>
    )
}

FontIcon.defaultProps = {
    propsStyle: {},
    ariaLabel: '',
    iconName: '',
}

FontIcon.propTypes = {
    propsStyle: PropTypes.object,
    ariaLabel: PropTypes.string,
    iconName: PropTypes.string,
}

export { FontIcon }
