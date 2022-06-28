import React from 'react'
import PropTypes from 'prop-types'

import { LineUIStyle } from './Lines.style'

function LineUI(props) {
    const { width, backgroundColor, height } = props
    return (
        <LineUIStyle
            width={width}
            backgroundColor={backgroundColor}
            height={height}
        />
    )
}

LineUI.defaultProps = {
    width: '100%',
    backgroundColor: '#000000',
    height: '1px',
}

LineUI.propTypes = {
    width: PropTypes.string,
    backgroundColor: PropTypes.string,
    height: PropTypes.string,
}

export default LineUI
