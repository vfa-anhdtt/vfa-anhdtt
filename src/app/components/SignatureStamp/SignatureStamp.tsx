import React from 'react'

import { SignatureStyle } from './SignatureStamp.style'

/**
 * draw signature
 * @param props
 * @returns
 */
function SignatureStamp(props) {
    return (
        <SignatureStyle
            {...props}
            id={props.id}
            x={props.position.x}
            y={props.position.y}
        >
            <div className="circle">
                <div className="top">社員</div>
                <div className="middle">令和04年05月06日</div>
                <div className="bottom">部門1</div>
            </div>
        </SignatureStyle>
    )
}

export default SignatureStamp
