import { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Label } from '../Label'
import { IconButton } from '../Button'
import {
    addPropertiesControlAction,
    clearSelectControlAction,
    saveHistoryControlsAction,
    changeCheckedOfRadioButton,
    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD clearDoubleSelectedControlAction
    clearDoubleSelectedControlAction,
    // feature/#18466_Doubleclick_control_is_change_content <<---
} from '../../../stores/control/ControlAction'
import CommonProperties from './components/CommonProperties'
import DisplayProperties from './components/DisplayProperties'
import DataProperties from './components/DataProperties'
import ControlProperties from './components/ControlProperties'
import FormatProperties from './components/FormatProperties'

import {
    CONTROLS_TYPES,
    PROPERTIES_TOOLBAR_HEIGHT_DEFAULT,
} from '../../../constants'
import { isObjectEmpty, structuredClone } from '../../../utils'

import { useStore } from '../../../hooks'

import {
    PropertiesToolbarStyle,
    styleButtonClosePropertiesToolBar,
} from './Toolbar.style'

const iconChromeClose = { iconName: 'ChromeClose' }

// feature/#17694_Bug_Undo --->>
// ADD constant IS_CHANGE_PROPERTIES_EMPTY, value ''
const IS_CHANGE_PROPERTIES_EMPTY = ''
// feature/#17694_Bug_Undo <<---

// feature/#18466_Doubleclick_control_is_change_content --->>
// ADD IS_SHOW_PROPERTIES_TOOLBAR
const IS_SHOW_PROPERTIES_TOOLBAR = true
// feature/#18466_Doubleclick_control_is_change_content <<---

function PropertiesToolbar(props) {
    const [state, dispatch] = useStore()
    const {
        calculationControl: { isShowCalculation },
        listControl,
        selectedControl,
        historyControls,

        // feature/#17694_Bug_Undo --->>
        // ADD get state historyControlsStemp
        historyControlsStemp,
        // feature/#17694_Bug_Undo <<---

        // feature/#18466_Doubleclick_control_is_change_content --->>
        // ADD doubleSelectedControl
        doubleSelectedControl,
        // feature/#18466_Doubleclick_control_is_change_content <<---

        // feature/#18643_update_form_setting --->>
        // ADD listSelectedControl
        listSelectedControl,
        // feature/#18643_update_form_setting <<---
    } = state

    const [isChangeProperties, setChangeProperties] = useState<any>(
        IS_CHANGE_PROPERTIES_EMPTY
    )

    const addPropertiesControl = (control) => {
        dispatch(addPropertiesControlAction({ ...control, ...{ listControl } }))
    }

    const changeCheckedPropertiesControl = (control) => {
        dispatch(changeCheckedOfRadioButton({ ...control, ...{ listControl } }))
    }

    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD dispatch action clearDoubleSelectedControlAction
    const clearDoubleSelectedControl = () => {
        dispatch(clearDoubleSelectedControlAction())
    }
    // feature/#18466_Doubleclick_control_is_change_content <<---

    const clearSelectControl = () => {
        dispatch(clearSelectControlAction())
    }

    const saveHistoryControls = () => {
        dispatch(
            saveHistoryControlsAction({
                listControl,
                historyControls,
                // feature/#17694_Bug_Undo --->>
                // ADD parameter historyControlsStemp
                historyControlsStemp,
                // feature/#17694_Bug_Undo <<---
            })
        )
    }

    const [stateControl, setStateControl] = useState(selectedControl)

    // feature/#18466_Doubleclick_control_is_change_content --->>
    // ADD state `isShowPropertiesToolbar`, default value `IS_SHOW_PROPERTIES_TOOLBAR`
    const [isShowPropertiesToolbar, setShowPropertiesToolbar] = useState(
        IS_SHOW_PROPERTIES_TOOLBAR
    ) // feature/#18466_Doubleclick_control_is_change_content <<---

    useEffect(() => {
        if (isObjectEmpty(selectedControl)) {
            setStateControl({})
            return
        }

        const filterControl = listControl.filter((value) => {
            return value.id === selectedControl.id
        })

        const control = filterControl.length >= 1 ? filterControl[0] : {}

        setStateControl(control)
    }, [listControl, selectedControl])

    // feature/#17694_Bug_Undo --->>
    // ADD check state isHandleDrop, then call action SaveHistoryControls
    useEffect(() => {
        if (isChangeProperties !== IS_CHANGE_PROPERTIES_EMPTY) {
            saveHistoryControls()
        }
    }, [isChangeProperties])
    // feature/#17694_Bug_Undo <<---

    function handleOnChange(name, value) {
        const selectedControlClone = structuredClone(stateControl)

        if (isObjectEmpty(selectedControlClone)) {
            return
        }

        const { id, radioGroup } = selectedControlClone

        if (name === 'checked' && radioGroup && value) {
            //only change other value when set checked
            changeCheckedPropertiesControl({
                id,
                radioGroup,
                checked: value,
            })
        } else {
            addPropertiesControl({ id, name, value })
        }

        // feature/#17694_Bug_Undo --->>
        //  MOD remove action dispatchSaveHistoryControls, check and use useState isChangeProperties
        if (isChangeProperties === IS_CHANGE_PROPERTIES_EMPTY) {
            setChangeProperties(true)
        } else {
            setChangeProperties(!isChangeProperties)
        }
        // feature/#17694_Bug_Undo <<---
    }

    function closePropertiesToolbar() {
        clearSelectControl()
    }

    /**
     * feature/#18466_Doubleclick_control_is_change_content
     * function callback component DataProperties, event clearDoubleSelectedControl
     * @param
     * @returns {action} dispatch action clearDoubleSelectedControlAction
     **/
    const propsClearDoubleSelectedControl = () => {
        dispatch(clearDoubleSelectedControl())
    }

    function showPropertiesCommon() {
        const selectedControlClone = structuredClone(stateControl)

        // feature/#18643_update_form_setting --->>
        // ADD listSelectedControl
        const listSelectedControlClone = structuredClone(listSelectedControl)
        // feature/#18643_update_form_setting <<---

        const show = []

        // feature/#18643_update_form_setting --->>
        // ADD check listSelectedControl array there are data, selectedControlClone is empty
        // show component CommonProperties, data default
        if (
            Array.isArray(listSelectedControlClone) &&
            listSelectedControlClone.length > 1 &&
            isObjectEmpty(selectedControlClone)
        ) {
            show.push(<CommonProperties key={0} />)
        }
        // feature/#18643_update_form_setting <<---

        // feature/#18643_update_form_setting --->>
        // MOD check selectedControlClone not empty, show component CommonProperties
        if (!isObjectEmpty(selectedControlClone)) {
            // feature/#18643_update_form_setting <<---
            const {
                id,
                position: { x, y },
                width,
                height,
            } = selectedControlClone

            show.push(
                <CommonProperties
                    key={id}
                    id={id}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    onChange={handleOnChange}
                />
            )
        }

        return show
    }

    function showPropertiesDisplay() {
        const selectedControlClone = structuredClone(stateControl)

        if (isObjectEmpty(selectedControlClone)) {
            return
        }

        const {
            id,
            type,
            fontFamily,
            fontSize,
            color,
            bold,
            italics,
            underline,
            backgroundColor,
            borderOrNot,
            borderColor,
            borderWidth,
            align,
            verticalAlign,
            borderType,
        } = selectedControlClone

        const show = []

        // if (type === CONTROLS_TYPES.LABEL) {
        show.push(
            <DisplayProperties
                key={id}
                onChange={handleOnChange}
                fontFamily={fontFamily}
                fontSize={fontSize}
                color={color}
                bold={bold}
                italics={italics}
                underline={underline}
                backgroundColor={backgroundColor}
                borderOrNot={borderOrNot}
                borderColor={borderColor}
                borderWidth={borderWidth}
                verticalAlign={verticalAlign}
                align={align}
                type={type}
                borderType={borderType}
            />
        )
        // }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show properties Data controls
     * @param
     * @returns {Element} component DataProperties
     **/
    function showPropertiesData() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { LABEL, TEXTBOX, CHECKBOX, RADIO, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---

        const selectedControlClone = structuredClone(stateControl)

        // if not have control selected return;
        if (isObjectEmpty(selectedControlClone)) {
            return
        }

        const { id, type, url, text } = selectedControlClone

        const show = []

        // feature/#17434_Property_image --->>
        // ADD check there is IMAGE, show component DataProperties
        if ([LABEL, TEXTBOX, CHECKBOX, RADIO, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <DataProperties
                    key={id}
                    onChange={handleOnChange}
                    url={url}
                    text={text}
                    type={type}
                    // feature/#18466_Doubleclick_control_is_change_content --->>
                    // ADD callback function doubleSelectedControl
                    doubleSelectedControl={doubleSelectedControl}
                    // ADD props id
                    id={id}
                    // ADD callback function propsClearDoubleSelectedControl
                    clearDoubleSelectedControl={propsClearDoubleSelectedControl}
                    // feature/#18466_Doubleclick_control_is_change_content <<---
                />
            )
        }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show properties controls
     * @param
     * @returns {Element} component ControlProperties
     **/
    function showPropertiesControl() {
        const selectedControlClone = structuredClone(stateControl)

        // if not have control selected return;
        if (isObjectEmpty(selectedControlClone)) {
            return
        }

        const { id, type, visible, radioGroup } = selectedControlClone

        const show = []

        // if (type === CONTROLS_TYPES.LABEL) {
        show.push(
            <ControlProperties
                key={id}
                onChange={handleOnChange}
                visible={visible}
                type={type}
                radioGroup={radioGroup}
            />
        )
        // }

        return show
    }

    /**
     * feature/#17434_Property_image
     * Creates show properties Format controls
     * @param
     * @returns {Element} component FormatProperties
     **/
    function showPropertiesFormat() {
        // feature/#17434_Property_image --->>
        // ADD IMAGE in CONTROLS_TYPES
        const { TEXTBOX, CHECKBOX, RADIO, IMAGE } = CONTROLS_TYPES
        // feature/#17434_Property_image <<---
        const selectedControlClone = structuredClone(stateControl)

        // if not have control selected return;
        if (isObjectEmpty(selectedControlClone)) {
            return
        }

        const { id, type, tooltip, placeHolder, checked } = selectedControlClone

        const show = []
        // feature/#17434_Property_image --->>
        // ADD check there is IMAGE, show component FormatProperties
        if ([TEXTBOX, CHECKBOX, RADIO, IMAGE].includes(type)) {
            // feature/#17434_Property_image <<---
            show.push(
                <FormatProperties
                    key={id}
                    onChange={handleOnChange}
                    tooltip={tooltip}
                    placeHolder={placeHolder}
                    type={type}
                    checked={checked}
                />
            )
        }

        return show
    }

    /**
     * feature/#18466_Doubleclick_control_is_change_content
     * Creates a function get DOM id `properties-controls`
     * @param
     * @returns check add or remove class `hide`
     **/
    const pushPropertiesToolbar = () => {
        const propertiesControls = document.getElementById(
            'properties-controls'
        )

        // check `propertiesControls` don't have class `hide`, add class `hide`
        if (
            propertiesControls &&
            !propertiesControls.classList.contains('hide')
        ) {
            setShowPropertiesToolbar(false)
            return propertiesControls.classList.add('hide')
        }

        // check `propertiesControls` have class `hide`, remove class `hide`
        if (
            propertiesControls &&
            propertiesControls.classList.contains('hide')
        ) {
            setShowPropertiesToolbar(true)
            return propertiesControls.classList.remove('hide')
        }
    }

    /**
     * feature/#18466_Doubleclick_control_is_change_content
     * Creates a function update icon by state isShowPropertiesToolbar
     * @param
     * @returns check add or remove class `hide`
     **/
    const checkShowIconPushPropertiesToolbar = () => {
        // check state isShowPropertiesToolbar, update icon Chevron right
        if (isShowPropertiesToolbar) {
            return { iconName: 'ChevronRightSmall' }

            // check state isShowPropertiesToolbar, update icon Chevron left
        } else {
            return { iconName: 'ChevronLeftSmall' }
        }
    }

    function showPropertiesToolbar() {
        const { GRID } = CONTROLS_TYPES

        const selectedControlClone = structuredClone(stateControl)

        const { type } = selectedControlClone

        const show = []

        // feature/#18643_update_form_setting --->>
        // MOD add check or listSelectedControl array there are data
        if (
            (!isObjectEmpty(stateControl) && ![GRID].includes(type)) ||
            (Array.isArray(listSelectedControl) &&
                listSelectedControl.length > 1)
        ) {
            // feature/#18643_update_form_setting <<---

            show.push(
                <Fragment key={0}>
                    <div className="header">
                        <Label fontSize={1.2} fontColor="#333333">
                            {/* feature/#17377_The_displayed_text_is_wrong  */}
                            {/* MOD remove プロパテ, add プロパティ */}
                            プロパティ
                            {/* feature/#17377_The_displayed_text_is_wrong <<---  */}
                        </Label>
                        <IconButton
                            iconProps={iconChromeClose}
                            styles={styleButtonClosePropertiesToolBar}
                            onClick={() => closePropertiesToolbar()}
                        />
                    </div>

                    <div className="properties d-flex items-stretch">
                        <div className="d-flex items-start justify-center bg-transparent">
                            <div className="d-flex items-center justify-center size-40">
                                <IconButton
                                    iconProps={checkShowIconPushPropertiesToolbar()}
                                    onClick={() => {
                                        pushPropertiesToolbar()
                                    }}
                                    title={'Properties control'}
                                />
                            </div>
                        </div>
                        <div className="w-per_100">
                            {showPropertiesCommon()}

                            {showPropertiesDisplay()}

                            {showPropertiesFormat()}

                            {showPropertiesData()}

                            {showPropertiesControl()}
                        </div>
                    </div>
                </Fragment>
            )
        }

        return show
    }

    const getHeightDefault = () => {
        const { headeRef } = props
        // When control isn't selected
        if (!stateControl.id) {
            return 0
        }
        // When calculation dialog is open
        else if (isShowCalculation) {
            return 0
        }
        if (!isObjectEmpty(headeRef) && !isObjectEmpty(headeRef.current)) {
            return window.innerHeight - headeRef.current.clientHeight
        } else {
            return PROPERTIES_TOOLBAR_HEIGHT_DEFAULT
        }
    }

    return (
        // feature/#18466_Doubleclick_control_is_change_content --->>
        //  MOD remove heightDefault component PropertiesToolbar
        // Feature/#17462_Test_Fixbug -->
        // MOD ADD props heightDefault
        <PropertiesToolbarStyle heightDefault={getHeightDefault()}>
            {/* Feature/#17462_Test_Fixbug <-- */}
            {/* feature/#18466_Doubleclick_control_is_change_content <<--- */}
            {showPropertiesToolbar()}
        </PropertiesToolbarStyle>
    )
}

// set default value props
PropertiesToolbar.defaultProps = {}

// typechecking on the props for a component
PropertiesToolbar.propTypes = {
    headeRef: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
}

export default PropertiesToolbar
