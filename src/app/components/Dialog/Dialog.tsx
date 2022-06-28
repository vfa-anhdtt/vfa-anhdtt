import React, { useState, useEffect } from 'react'
import {
    Dialog as DialogDefault,
    DialogType,
    DialogFooter,
} from '@fluentui/react/lib/Dialog'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { useBoolean } from '@fluentui/react-hooks'

import { DiaLogStyle } from './DiaLog.style'

/**
 * feature/#18466_Doubleclick_control_is_change_content
 * interface Dialog
 */
interface DialogProps {
    type?: number
    title?: string
    subText?: string
    children?: any
    textOk?: string
    textClose?: string
    modalPropsStyles?: object
    handleOnSave?: Function
    showDialog?: boolean
}

const COUNT_DIALOG_RENDER_DEFAULT = 0
const FIRST_DIALOG_RENDER = 1

/**
 * feature/#18466_Doubleclick_control_is_change_content
 * @component Dialog
 * @extends
 * @library fluentui
 **/
const Dialog: React.FunctionComponent<DialogProps> = (props) => {
    const {
        type,
        title,
        subText,
        children,
        textOk,
        textClose,
        modalPropsStyles,
        handleOnSave,
        showDialog,
    } = props

    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true)
    const modalProps = {
        isBlocking: true,
        styles: modalPropsStyles,
        dragOptions: undefined,
    }

    const [count, setCount] = useState(COUNT_DIALOG_RENDER_DEFAULT)

    useEffect(() => {
        setCount(FIRST_DIALOG_RENDER)

        if (count >= FIRST_DIALOG_RENDER) {
            toggleHideDialog()
        }
    }, [showDialog])

    const handleOnClickOk = () => {
        toggleHideDialog()
        handleOnSave()
    }

    return (
        <DiaLogStyle>
            <DialogDefault
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={{ type, title, subText }}
                modalProps={modalProps}
            >
                {children}

                <DialogFooter>
                    <PrimaryButton onClick={handleOnClickOk} text={textOk} />
                    <DefaultButton
                        onClick={toggleHideDialog}
                        text={textClose}
                    />
                </DialogFooter>
            </DialogDefault>
        </DiaLogStyle>
    )
}

Dialog.defaultProps = {
    children: <></>,
    type: DialogType.normal,
    title: 'Missing Subject',
    subText: 'Save data input',
    textOk: 'Save',
    textClose: 'Close',
    modalPropsStyles: { main: { maxWidth: 450 } },
    handleOnSave: () => {},
    showDialog: false,
}

export default Dialog
