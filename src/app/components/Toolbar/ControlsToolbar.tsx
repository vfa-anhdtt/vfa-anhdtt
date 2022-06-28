// import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid'

import { IconButton } from '../Button'

import { LineUI } from '../LineNew'

import { DRAG_DATA_KEY, CONTROLS_TYPES } from '../../../constants'

import { ControlsToolbarStyle, styleButtonControls } from './Toolbar.style'

const iconLabel = { iconName: 'Label' }
const iconTextBox = { iconName: 'TextBox' }
const iconCheckBox = { iconName: 'CheckboxComposite' }
const iconRadio = { iconName: 'RadioBtnOn' }
const iconComboBox = { iconName: 'ComboBox' }
const iconListBox = { iconName: 'CheckBox' }
const iconLine = { iconName: 'Line' }
const iconQRCode = { iconName: 'QRCode' }
const iconGrid = { iconName: 'GridViewMedium' }
const iconImage = { iconName: 'Picture' }

function ControlsToolbar() {
    const handleDragStart = (event) => {
        const {
            target: {
                clientWidth,
                clientHeight,
                dataset: { info },
            },
            nativeEvent: { offsetX, offsetY },
        } = event

        const dragPayload = JSON.stringify({
            id: uuidv4(),
            type: info,
            offsetX,
            offsetY,
            clientWidth,
            clientHeight,
        })

        event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload)
    }

    return (
        <ControlsToolbarStyle>
            <div className="list-control">
                <div className="size-controls p-4">
                    <IconButton
                        iconProps={iconLabel}
                        draggable={true}
                        data-info={CONTROLS_TYPES.LABEL}
                        onDragStart={handleDragStart}
                        styles={styleButtonControls}
                        title="ラベル"
                    />
                </div>

                <div className="size-controls p-4">
                    <IconButton
                        iconProps={iconTextBox}
                        draggable={true}
                        data-info={CONTROLS_TYPES.TEXTBOX}
                        onDragStart={handleDragStart}
                        styles={styleButtonControls}
                        title="テキストボックス"
                    />
                </div>
                <div className="size-controls p-4">
                    <IconButton
                        iconProps={iconCheckBox}
                        draggable={true}
                        data-info={CONTROLS_TYPES.CHECKBOX}
                        onDragStart={handleDragStart}
                        styles={styleButtonControls}
                        title="チェックボックス"
                    />
                </div>
                <div className="size-controls p-4">
                    <IconButton
                        iconProps={iconRadio}
                        draggable={true}
                        data-info={CONTROLS_TYPES.RADIO}
                        onDragStart={handleDragStart}
                        styles={styleButtonControls}
                        title="ラジオ"
                    />
                </div>
                <div className="size-controls p-4">
                    <IconButton
                        iconProps={iconComboBox}
                        draggable={true}
                        data-info={CONTROLS_TYPES.COMBOBOX}
                        onDragStart={handleDragStart}
                        styles={styleButtonControls}
                        title="選択する"
                    />
                </div>
                <div className="size-controls p-4">
                    <IconButton
                        iconProps={iconListBox}
                        draggable={true}
                        data-info={CONTROLS_TYPES.LISTBOX}
                        onDragStart={handleDragStart}
                        styles={styleButtonControls}
                        title="リストボックス"
                    />
                </div>

                <LineUI width="80%" backgroundColor="#a7a2a2" />

                <div className="size-controls p-4">
                    <IconButton
                        iconProps={iconQRCode}
                        draggable={true}
                        data-info={CONTROLS_TYPES.SIGNATURE}
                        onDragStart={handleDragStart}
                        styles={styleButtonControls}
                        title="署名スタンプ"
                    />
                </div>

                <div className="size-controls p-4">
                    <IconButton
                        iconProps={iconLine}
                        draggable={true}
                        data-info={CONTROLS_TYPES.LINE}
                        onDragStart={handleDragStart}
                        styles={styleButtonControls}
                        title="ライン"
                    />
                </div>

                <LineUI width="80%" backgroundColor="#a7a2a2" />

                <div className="size-controls p-4">
                    <IconButton
                        iconProps={iconGrid}
                        draggable={true}
                        data-info={CONTROLS_TYPES.GRID}
                        onDragStart={handleDragStart}
                        styles={styleButtonControls}

                        // feature/#18448_change_text_and_font_size_default --->>
                        // ADD title for button on control toolbar
                        title='グリッド'
                        // feature/#18448_change_text_and_font_size_default <<---
                    />
                </div>

                <div className="size-controls p-4">
                    <IconButton
                        iconProps={iconImage}
                        draggable={true}
                        data-info={CONTROLS_TYPES.IMAGE}
                        onDragStart={handleDragStart}
                        styles={styleButtonControls}

                        // feature/#18448_change_text_and_font_size_default --->>
                        // ADD title for button on control toolbar
                        title='イメージ'
                        // feature/#18448_change_text_and_font_size_default <<---
                    />
                </div>
            </div>
        </ControlsToolbarStyle>
    )
}

// set default value props
// Sapmle.defaultProps = {
//
// };

// typechecking on the props for a component
// Sapmle.propTypes = {
//
// }

export default ControlsToolbar
