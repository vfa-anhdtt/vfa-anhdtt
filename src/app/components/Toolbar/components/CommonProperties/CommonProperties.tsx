import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Collapse } from '../../../Collapse'

import { TextField } from '../../../TextField'
import { Label } from '../../../Label'
import {
    CommonPropertiesStyle,
    CommonInputStyle,
} from './CommonProperties.style'

function CommonProperties(props) {
    const { id, x, y, width, height, onChange } = props

    const [stateX, setStateX] = useState(x)
    const [stateY, setStateY] = useState(y)
    const [stateW, setStateW] = useState(width)
    const [stateH, setStateH] = useState(height)

    useEffect(() => {
        setStateX(Number(x))
        setStateY(Number(y))
        setStateW(Number(width))
        setStateH(Number(height))
    }, [x, y, width, height])

    function handleOnChange(e) {
        const {
            target: { value, name },
        } = e

        switch (name) {
            case 'x':
                setStateX(Number(value))
                break
            case 'y':
                setStateY(Number(value))
                break
            case 'width':
                setStateW(value)
                break
            case 'height':
                setStateH(value)
                break
            default:
                break
        }

        onChange(name, value)
    }

    return (
        <CommonPropertiesStyle>
            <div className="properties-common">
                <Collapse title="共通">
                    <div className="p-16">
                        <TextField value={id} disabled={true}>
                            コントロールID
                        </TextField>

                        <div>
                            <div className="py-8">
                                <Label fontColor="#5F6368">位置</Label>
                            </div>
                            <div className="inline-block w-per_50">
                                <TextField
                                    value={stateX}
                                    inputStyle={CommonInputStyle}
                                    onChange={handleOnChange}
                                    name="x"
                                    disabled
                                >
                                    x
                                </TextField>
                            </div>
                            <div className="inline-block w-per_50">
                                <TextField
                                    value={stateY}
                                    inputStyle={CommonInputStyle}
                                    onChange={handleOnChange}
                                    name="y"
                                    disabled
                                >
                                    y
                                </TextField>
                            </div>
                        </div>

                        <div>
                            <div className="py-8">
                                <Label fontColor="#5F6368">サイズ</Label>
                            </div>
                            <div className="inline-block w-per_50">
                                <TextField
                                    value={stateW}
                                    inputStyle={CommonInputStyle}
                                    onChange={handleOnChange}
                                    name="width"
                                    disabled
                                >
                                    w
                                </TextField>
                            </div>
                            <div className="inline-block w-per_50">
                                <TextField
                                    value={stateH}
                                    inputStyle={CommonInputStyle}
                                    onChange={handleOnChange}
                                    name="height"
                                    disabled
                                >
                                    h
                                </TextField>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </CommonPropertiesStyle>
    )
}

CommonProperties.defaultProps = {
    // feature/#18643_update_form_setting --->>
    // MOD set props `id`, default data is ''
    id: '',
    // feature/#18643_update_form_setting <<---
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    onChange: () => {},
}

CommonProperties.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
}
export default CommonProperties
