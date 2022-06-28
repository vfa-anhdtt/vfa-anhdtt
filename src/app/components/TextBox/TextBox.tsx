import React, { useEffect } from 'react'

import { TooltipHost } from '@fluentui/react/lib/Tooltip'
import { TextBoxStyle } from './TextBox.style'

// #18337-Preview-Formula-for-textbox : apply MJS control
import { MjsUiInputNumber } from 'mjs-reactcomponents'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a TextBox for preview
 * @param props : property of control
 * @returns TextBox element
 */
function TextBox(props) {
    // Display text
    const [text, setText] = React.useState(props.text)

    // When text of control is changed, reset state
    // feature/#18643_update_form_setting -->>
    // ADD plahoder text
    useEffect(() => {
        if (props.text) {
            setText(props.text)
        } else if (props.placeHolder) {
            setText(props.placeHolder)
        }
    // feature/#18643_update_form_setting <<--
    }, [props.text])

    /**
     * #18337-Preview-Formula-for-textbox
     * When blur event, callback function of parent
     * @param element
     */
    const handleOnBlurOfNumber = (element) => {
        // Only process when handleOnBlurOfNumber is defined
        if (props.handleOnBlurOfNumber) {
            props.handleOnBlurOfNumber(element, props.id, props.type)
        }
    }

    /**
     * #18643_update_form_setting
     * hidden placehoder when click textbox
     */
    const hiddenPlacehoder = () => {
        if (!props.text) {
            setText('')
        }
    }

    return (
        <TextBoxStyle {...props} x={props.position.x} y={props.position.y}>
            <TooltipHost
                content={props.tooltip}
                // Give the user more time to interact with the tooltip before it closes
                closeDelay={500}
                id={props.id}
                styles={{ root: { width: props.width, height: props.height } }}
                // Add style css tooltip
                tooltipProps={{
                    styles: {
                      content: { color: props.colorTooltip, fontFamily: props.fontFamilyTooltip },
                    },
                  }}
            >
                <MjsUiInputNumber
                    id={props.id}
                    border="none"
                    // if text is empty, show placehoder
                    defaultValue={text}
                    retNumber={(element) => handleOnBlurOfNumber(element)}
                    width={props.width + 'px'}
                    height={props.height + 'px'}
                    // if text is empty, show color of placehoder
                    color={props.text ? props.color : props.colorPlacehoder}
                    onFocus={hiddenPlacehoder}
                />
            </TooltipHost>
        </TextBoxStyle>
    )
}

export default TextBox
