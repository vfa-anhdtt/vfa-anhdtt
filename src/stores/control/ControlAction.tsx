import {
    checkIDinIDs,
    isObjectEmpty,
    _isUndefined,
    structuredClone,
} from '../../utils'
// feature/#17694_Bug_Undo --->>
// ADD controlState from ControlReducer
import { controlState } from './ControlReducer'
// feature/#17694_Bug_Undo <<---

// feature/#17877_Research_Group_Control --->>
// ADD import CONTROLS_TYPE
import { CONTROLS_TYPES, UNDO_REDO_CONTROLS } from '../../constants'
// feature/#17877_Research_Group_Control<<---

// feature/#17877_Research_Group_Control
// Add import cloneDataOfItem

// feature/#18466_Doubleclick_control_is_change_content --->>
// MOD remove KonvaDemo, update EditorPage
import { cloneDataOfItem } from '../../app/components/EditorPage/LogicFunctions'
import { getListIDFromListControl } from '../../app/components/FormSetting/ControlSetting/ArrangeLogicFunctions'
// feature/#18466_Doubleclick_control_is_change_content <<---
// feature/#17877_Research_Group_Control < --
export const types = {
    ADD_CONTROL: 'ADD_CONTROL',
    SELECT_CONTROL: 'SELECT_CONTROL',
    DOUBLE_SELECT_CONTROL: 'DOUBLE_SELECT_CONTROL',
    ADD_PROPERTIES_CONTROL: 'ADD_PROPERTIES_CONTROL',
    CLEAR_SELECT_CONTROL: 'CLEAR_SELECT_CONTROL',
    DELETE_CONTROL: 'DELETE_CONTROL',
    SAVE_HISTORY_CONTROLS: 'SAVE_HISTORY_CONTROLS',
    SAVE_UNDO_HISTORY_CONTROLS: 'SAVE_UNDO_HISTORY_CONTROLS',
    SAVE_REDO_HISTORY_CONTROLS: 'SAVE_REDO_HISTORY_CONTROLS',
    SELECT_LIST_CONTROL: 'SELECT_LIST_CONTROL',
    SET_STATUS_COPY: 'SET_STATUS_COPY',
    SET_STATUS_CUT: 'SET_STATUS_CUT',
    PASTE_CONTROL: 'PASTE_CONTROL',
    HANDLE_LINE: 'HANDLE_LINE',
    SET_OPEN_SEARCH_DIALOG: 'OPEN_SEARCH_DIALOG',
    GOTO_CONTROL: 'GOTO_CONTROL',
    SET_OPEN_FORM_SETTING: 'SET_OPEN_FORM_SETTING',
    SET_OPEN_CALCULATION_DIALOG: 'SET_OPEN_CALCULATION_DIALOG',

    // feature/#17459_form_setting
    RE_SIZE: 'RE_SIZE',

    // feature/#17877_Research_Group_Control : add type
    GET_GROUP_POSITION: 'GET_GROUP_POSITION',
    CHANGE_POS_GROUP_CONTROL: 'CHANGE_POS_GROUP_CONTROL',
    UNGROUP_CONTROL: 'UNGROUP_CONTROL',
    LOAD_DATA: 'LOAD_DATA',
    CHANGE_PAGE: 'CHANGE_PAGE',
    ADD_PAGE: 'ADD_PAGE',
    DOUB_PAGE: 'DOUB_PAGE',
    DEL_PAGE: 'DEL_PAGE',
    CHANGE_PAGES_DATA: 'CHANGE_PAGES_DATA',
    SHOW_PAGES_CONTROL: 'SHOW_PAGES_CONTROL',
    UPDATE_PAGE_IMG: 'UPDATE_PAGE_IMG',
    UPDATE_PAGE_CHILDREN: 'UPDATE_PAGE_CHILDREN',
    ARRANGE_CONTROLS: 'ARRANGE_CONTROLS',
    CHANGE_PREVIEW_STATUS: 'CHANGE_PREVIEW_STATUS',
}

/**
 * add 1 control into listControl
 * @params : new control's info
 * @listControl : current listControl
 * @newControlNo : new value to update controlNo #18246 ControlID add
 * @returns
 */
export const addControlAction = ({ params, listControl, newControlNo }) => {
    let data = []
    if (!_isUndefined(listControl)) {
        data = [...listControl, params]
    } else {
        data.push(params)
    }

    return {
        type: types.ADD_CONTROL,
        // #18246 ControlID : add newControlNo to update controlNo
        payload: { data, controlNo: newControlNo },
    }
}

export const selectControlAction = ({ id, listControl }) => {
    let selectedControl

    const filterControl = listControl.filter((value) => {
        if (value.id === id) {
            return value
        }
    })

    selectedControl = filterControl.length >= 1 ? filterControl[0] : {}

    return {
        type: types.SELECT_CONTROL,
        payload: selectedControl,
    }
}

/**
 * #18368 image bug
 * select control when double click
 * @param id
 * @returns
 */
export const doubleSelectControlAction = ({ id, listControl }) => {
    const filterControl = listControl.filter((value) => {
        if (value.id === id) {
            return value
        }
    })

    const doubleSelectedControl =
        filterControl.length >= 1 ? filterControl[0] : {}
    return {
        type: types.DOUBLE_SELECT_CONTROL,
        payload: doubleSelectedControl,
    }
}

/**
 * feature/#18247_Bug_copy
 * check selectedControl in listControl, remove selectedControl
 * @param {selectedControl} control item use select
 * @param {listControl} listControl list control showing
 * @returns {type, payload} update listControl
 **/
export const deleteControlAction = ({ listSelectedControl, listControl }) => {
    // feature/#18681_bug_copy/cut/paste_group --->>
    // fix bug delete fomula
    const listDeletedIDs = getListIDFromListControl(listSelectedControl)
    const returnList = []
    if (!isObjectEmpty(listSelectedControl)) {
        listSelectedControl.map((control) => {
            // check type control is group
            if (control.type === CONTROLS_TYPES.GROUP) {
                control.childId.split(',').map((childId) => {
                    listDeletedIDs.push(childId)
                })
            }
        })

        // delete formula
        listDeletedIDs.map((idDelete) => {
            listControl.forEach((control) => {
                // remove formula if include control is removed
                if (
                    (control.formula || []).length !== 0 &&
                    control.formula.join('').includes(idDelete)
                ) {
                    control.formula = []
                }
            })
        })

        // add control in new list
        listControl.map((control) => {
            // control is not included list delete
            if (!listDeletedIDs.includes(control.id)) {
                returnList.push(control)
            }
        })
    }

    return {
        type: types.DELETE_CONTROL,
        payload: returnList,
    }
    // feature/#18681_bug_copy/cut/paste_group <<---
}

export const addPropertiesControlAction = ({ ...params }) => {
    const { id, name, value, listControl } = params

    const position = ['x', 'y']

    let controlsProperties = structuredClone(listControl)
    controlsProperties.map((control) => {
        if (control.id === id && position.includes(name)) {
            control.position[name] = value
        }

        if (control.id === id && !position.includes(name)) {
            control[name] = value
        }
    })

    return {
        type: types.ADD_PROPERTIES_CONTROL,
        payload: controlsProperties,
    }
}

export const changeCheckedOfRadioButton = ({ ...params }) => {
    const { id, radioGroup, checked, listControl } = params

    let controlsProperties = structuredClone(listControl)
    //when control is checked, other control in Group will be unchecked
    if (checked) {
        let controls = controlsProperties.filter(
            (e) => e.radioGroup === radioGroup
        )
        if (controls) {
            controls.map((control) => {
                control.checked = control.id === id
            })
        }
    }

    return {
        type: types.ADD_PROPERTIES_CONTROL,
        payload: controlsProperties,
    }
}

/**
 * use for change group and others child in group position
 * @param param0
 * @returns
 */
export const changePosGroupControls = ({ ...params }) => {
    const { id, position, listControl } = params

    let controlsProperties = structuredClone(listControl)

    const group = controlsProperties.find((control) => control.id === id)

    const groupPos = { x: group.position.x, y: group.position.y }
    let control = controlsProperties.find((e) => e.id === id)
    const x2 = position.x - groupPos.x
    const y2 = position.y - groupPos.y

    // If has control then update control's position
    if (control) {
        control.position = position
    }

    //update the child control in group
    group.childId.split(',').map((id) => {
        let control = controlsProperties.find((control) => control.id === id)

        // If has child control then update child control's position
        if (control) {
            control.position.x = control.position.x + x2
            control.position.y = control.position.y + y2

            // If control is Line, update pointEnd
            if (control.type === CONTROLS_TYPES.LINE) {
                control.pointEnd.x += x2
                control.pointEnd.y += y2
            }
        }
    })

    return {
        type: types.ADD_PROPERTIES_CONTROL,
        payload: controlsProperties,
    }
}

export const changePosAndSizePropsControlAction = ({ ...params }) => {
    const { id, position, width, height, listControl } = params
    let controlsProperties = structuredClone(listControl)
    let control = controlsProperties.find((e) => e.id === id)
    if (control) {
        control.position = position
        if (width) {
            control.width = width
            control.height = height
        }
    }

    return {
        type: types.ADD_PROPERTIES_CONTROL,
        payload: controlsProperties,
    }
}

export const clearSelectControlAction = () => {
    return {
        type: types.CLEAR_SELECT_CONTROL,
        payload: {},
    }
}

export const saveHistoryControlsAction = ({
    listControl,
    historyControls,
    // feature/#17694_Bug_Undo --->>
    // ADD parameter historyControlsStemp
    historyControlsStemp,
    // feature/#17694_Bug_Undo <<---
}) => {
    const { ONE_STEP, THREE_STEP, TWO_STEP } = UNDO_REDO_CONTROLS

    let historyControlsClone = { ...controlState.historyControls }

    // feature/#17694_Bug_Undo --->>
    // ADD check historyControlsStemp, update historyControlsClone
    if (isObjectEmpty(historyControlsStemp)) {
        historyControlsClone = structuredClone(historyControls)
        historyControlsClone.data.push(listControl)
        historyControlsClone.step = historyControls.step += ONE_STEP
    } else {
        historyControlsClone = structuredClone(historyControlsStemp)

        historyControlsClone.data.push(listControl)
        historyControlsClone.step = historyControlsStemp.data.length
    }
    // feature/#17694_Bug_Undo <<---

    if (historyControlsClone.data.length > THREE_STEP) {
        historyControlsClone.data.shift()
    }

    if (historyControls.step > TWO_STEP) {
        historyControlsClone.step = historyControls.step -= ONE_STEP
    }

    return {
        type: types.SAVE_HISTORY_CONTROLS,
        payload: historyControlsClone,
    }
}

export const undoHistoryControlsAction = ({
    historyControls,
    selectedControl,
}) => {
    const { ONE_STEP, ZERO_STEP } = UNDO_REDO_CONTROLS

    let historyControlsClone = structuredClone(historyControls)

    // feature/#17694_Bug_Undo --->>
    // ADD historyControlsStemp clone historyControls
    let historyControlsStemp = structuredClone(historyControls)
    // feature/#17694_Bug_Undo <<---

    historyControlsStemp.data = []

    if (historyControlsClone.step > ZERO_STEP) {
        historyControlsClone.step = historyControls.step -= ONE_STEP
    }

    // feature/#17694_Bug_Undo --->>
    // ADD loop update data historyControlsStemp
    for (let i = 0; i <= historyControlsClone.step; i++) {
        historyControlsStemp.data.push(historyControlsClone.data[i])
    }
    // feature/#17694_Bug_Undo <<---

    // feature/#17694_Bug_Undo --->>
    // variable declaration `selectedControlUpdate`
    let selectedControlUpdate = {}

    // ADD Checks if `historyControlsStemp` data, update `selectedControlUpdate`
    if (
        historyControlsStemp.data.length > 0 &&
        historyControlsStemp.data[historyControlsStemp.data.length - 1]
    ) {
        // loop data `historyControlsStemp`
        historyControlsStemp.data[historyControlsStemp.data.length - 1].map(
            (value) => {
                // filter `id` equal `selectedControl.id`, update value `selectedControlUpdate`
                if (value.id === selectedControl.id) {
                    selectedControlUpdate = { ...value }
                }
            }
        )
    }
    // feature/#17694_Bug_Undo <<---

    return {
        type: types.SAVE_UNDO_HISTORY_CONTROLS,
        payload: {
            historyControls: historyControlsClone,
            listControl: historyControlsClone.data[historyControlsClone.step],
            historyControlsStemp,
            // feature/#17694_Bug_Undo --->>
            // ADD save state `selectedControl`, data `selectedControlUpdate`
            selectedControl: selectedControlUpdate,
            // feature/#17694_Bug_Undo <<---
        },
    }
}

export const redoHistoryControlsAction = ({ historyControls }) => {
    const { ONE_STEP, THREE_STEP } = UNDO_REDO_CONTROLS

    let historyControlsClone = structuredClone(historyControls)

    if (historyControlsClone.step < THREE_STEP) {
        historyControlsClone.step = historyControls.step += ONE_STEP
    }

    return {
        type: types.SAVE_REDO_HISTORY_CONTROLS,
        payload: {
            historyControls: historyControlsClone,
            listControl: historyControlsClone.data[historyControlsClone.step],
        },
    }
}

export const selectListControls = ({ listIds, listControl }) => {
    let controlListClone = structuredClone(listControl)
    let listOldObj = []
    if (listIds.length !== 0) {
        let listID = listIds.split(',')
        //save group components
        for (let IdVal of listID) {
            if (IdVal) {
                listOldObj.push(
                    controlListClone.find((item) => item.id === IdVal)
                )
            }
        }
    }

    return {
        type: types.SELECT_LIST_CONTROL,
        payload: listOldObj,
    }
}

export const setCopyStatusAction = ({
    status,
    listSelectedControl,
    copyPasteControls,
    //feature/#17877_Research_Group_Control -->
    // MOD add param : listControl
    listControl,
    //feature/#17877_Research_Group_Control <--
}) => {
    const copyPasteControlsClone = { ...copyPasteControls }

    if (status) {
        //save selected list objects
        copyPasteControlsClone.isCopy = true
        copyPasteControlsClone.isCut = false
        copyPasteControlsClone.pasteTimes = 0
        copyPasteControlsClone.listSaveControl = []

        // check empty listSelected
        if (!isObjectEmpty(listSelectedControl)) {
            listSelectedControl.forEach((elementSelected) => {
                // push control isn't group or group's child into list copy
                if (
                    elementSelected.type !== CONTROLS_TYPES.GROUP &&
                    !elementSelected.parent
                ) {
                    copyPasteControlsClone.listSaveControl.push(elementSelected)
                }
                // push control is group into list copy
                else if (elementSelected.type === CONTROLS_TYPES.GROUP) {
                    copyPasteControlsClone.listSaveControl.push(elementSelected)
                    listControl.forEach((element) => {
                        // push control is group's child into list copy
                        if (
                            elementSelected.childId &&
                            elementSelected.childId.includes(element.id)
                        ) {
                            copyPasteControlsClone.listSaveControl.push(element)
                        }
                    })
                }
            })
        }
    }

    return {
        type: types.SET_STATUS_COPY,
        payload: copyPasteControlsClone,
    }
}

export const setCutStatusAction = ({
    status,
    listSelectedControl,
    listControl,
    copyPasteControls,
}) => {
    //feature/#17877_Research_Group_Control --->>
    // MOD change const to let
    let listControlClone = structuredClone(listControl)
    //feature/#17877_Research_Group_Control <<---
    const copyPasteControlsClone = { ...copyPasteControls }

    if (status) {
        //save selected list objects
        copyPasteControlsClone.isCopy = false
        copyPasteControlsClone.isCut = true
        copyPasteControlsClone.pasteTimes = 0
        copyPasteControlsClone.listSaveControl = []
        copyPasteControlsClone.listIdsPasted = []

        if (!isObjectEmpty(listSelectedControl)) {
            listSelectedControl.forEach((elementSelected) => {
                // push control isn't group or group's child into list copy
                if (
                    elementSelected.type !== CONTROLS_TYPES.GROUP &&
                    !elementSelected.parent
                ) {
                    copyPasteControlsClone.listSaveControl.push(elementSelected)
                }
                // push control is group into list copy
                else if (elementSelected.type === CONTROLS_TYPES.GROUP) {
                    copyPasteControlsClone.listSaveControl.push(elementSelected)
                    listControl.forEach((element) => {
                        // push control is group's child into list copy
                        if (
                            elementSelected.childId &&
                            elementSelected.childId.includes(element.id)
                        ) {
                            copyPasteControlsClone.listSaveControl.push(element)
                        }
                    })
                }
            })
        }

        //remove selected list objects
        copyPasteControlsClone.listSaveControl.forEach((item) => {
            let indexRemove = listControlClone.findIndex(
                (value) => value.id === item.id
            )
            if (indexRemove !== -1) {
                listControlClone.splice(indexRemove, 1)
            }
        })

        return {
            type: types.SET_STATUS_CUT,
            payload: {
                copyPasteControls: copyPasteControlsClone,
                listControl: listControlClone,
            },
        }
    }
}

/**
 * paste the control that copied or cut
 * @param listControl current listControl
 * @param copyPasteControls copied info
 * @returns
 */
export const pasteControlAction = ({
    listControl,
    copyPasteControls,
    controlNo,
}) => {
    const distance = 20
    let listControlClone = structuredClone(listControl)
    let data = [...listControlClone]
    copyPasteControls.listIdsPasted = []

    // feature/#18681_bug_copy/cut/paste_group --->>
    // ADD variables
    let newGroupId = ''
    let oldGroup: any
    let lengthGroup = -1
    // feature/#18681_bug_copy/cut/paste_group <<---

    if (copyPasteControls.isCopy || copyPasteControls.isCut) {
        copyPasteControls.pasteTimes += 1 // times of pasting
        copyPasteControls.listSaveControl.forEach((itemControl) => {
            let itemData = structuredClone(itemControl)

            // #18246 ControlID MOD start
            // Increase value before using
            controlNo = controlNo + 1
            // ID of control is (type + number)

            // If control have property text
            if (itemData.text) {
                // Get old number
                const oldNumber = itemData.id.replace(itemData.type, '')

                //   Only update text when text still default value : text+number
                if (itemData.text.indexOf(oldNumber) >= 0) {
                    // Update text of control
                    itemData.text =
                        itemData.text.replace(oldNumber, '') + controlNo
                }
            }

            itemData.id = itemData.type + controlNo
            // #18246 ControlID MOD end

            itemData.position.x += distance * copyPasteControls.pasteTimes
            itemData.position.y += distance * copyPasteControls.pasteTimes

            // If control is Line, update pointEnd
            if (itemData.type === CONTROLS_TYPES.LINE) {
                itemData.pointEnd.x += distance * copyPasteControls.pasteTimes
                itemData.pointEnd.y += distance * copyPasteControls.pasteTimes
            }

            // feature/#18681_bug_copy/cut/paste_group --->>
            // ADD conditions

            // If control is Group, save this Group to add after Group's child
            if (itemData.type === CONTROLS_TYPES.GROUP) {
                lengthGroup = itemData.childId.split(',').length
                newGroupId = itemData.id
                itemData.childId = ''
                oldGroup = itemData
            }

            // If control is Group's child, update parent and Group's child
            if (itemData.parent) {
                itemData.parent = newGroupId
                lengthGroup -= 1

                // add id child into group and device by ','
                if (lengthGroup !== 0) {
                    oldGroup.childId += itemData.id + ','
                }
                // add last child into group
                else {
                    oldGroup.childId += itemData.id
                }
            }

            // If control isn't Group, push the control into list control
            if (itemData.type !== CONTROLS_TYPES.GROUP) {
                copyPasteControls.listIdsPasted.push(itemData.id)
                data.push(itemData)
            }

            // Push the group control into list control, after pushing all group's childs first
            if (itemData.parent && lengthGroup === 0) {
                copyPasteControls.listIdsPasted.push(oldGroup.id)
                data.push(oldGroup)
            }
            // feature/#18681_bug_copy/cut/paste_group <<---
        })
    }

    return {
        type: types.PASTE_CONTROL,
        payload: { listControl: data, copyPasteControls, controlNo }, // #18246 ControlID : controlNo to update value into store
    }
}

export const changePosMultiControlAction = ({
    changeX,
    changeY,
    Ids,
    listControl,
}) => {
    // Copy listcontrol
    const controlsProperties = structuredClone(listControl)

    // Group control are selected
    const groupControl = controlsProperties.filter(
        (e) => checkIDinIDs(e.id, Ids) && e.type === CONTROLS_TYPES.GROUP
    )

    // If Group is selected
    if (groupControl) {
        // Loop to get childID
        groupControl.map((group) => {
            // Add childID into IDs to change position together
            Ids += `,${group.childId},`
        })
    }

    let controls = controlsProperties.filter((e) => checkIDinIDs(e.id, Ids))
    if (controls) {
        controls.map((control) => {
            control.position = {
                x: control.position.x + changeX,
                y: control.position.y + changeY,
            }

            // If control is Line, change pointEnd
            if (control.type === CONTROLS_TYPES.LINE) {
                control.pointEnd = {
                    x: control.pointEnd.x + changeX,
                    y: control.pointEnd.y + changeY,
                }
            }
        })
    }

    return {
        type: types.ADD_PROPERTIES_CONTROL,
        payload: controlsProperties,
    }
}

export const editGridDataControlAction = ({ params, listControl }) => {
    let controlsProperties = structuredClone(listControl)
    controlsProperties.map((control) => {
        if (control.id === params.id) {
            // control = { ...params }
            control.headerText = params.headerText
            control.rowData = params.rowData
            control.numRows = params.numRows
            control.numCols = params.numCols
            control.headerHeight = params.headerHeight
            control.rowHeight = params.rowHeight
            //feature/#17877_Research_Group_Control : Update Width , height
            control.height = params.height
            control.width = params.width
        }
    })

    return {
        type: types.ADD_PROPERTIES_CONTROL,
        payload: controlsProperties,
    }
}

export const getValueAgainAction = ({ params, listControl }) => {
    let listControlClone = structuredClone(listControl)
    listControlClone.map((controlItem) => {
        if (controlItem.id === params.id) {
            controlItem.height = params.height
            controlItem.width = params.width
            controlItem.position = params.position
        }
    })
    return {
        type: types.HANDLE_LINE,
        payload: listControlClone,
    }
}
/**
 * Use for search dialog, save selected controlID
 * @param id string : id of control that will be focus
 * @param listControl
 * @returns
 */
export const gotoControlAction = (id, listControl) => {
    // Find control in list
    let focusControl = listControl.find((control) => control.id === id)

    // If control is not found, set empty
    if (!focusControl) {
        focusControl = {}
    }

    return {
        type: types.GOTO_CONTROL,
        payload: focusControl,
    }
}
/**
 * use for search dialog, show & hide search dialog
 * @param status
 * @returns
 */
export const setOpenSearchDialogAction = (status: boolean, id = '') => {
    return {
        type: types.SET_OPEN_SEARCH_DIALOG,
        payload: { status },
    }
}

//#17460 pages control add start
/**
 * load data by click icon on toolbar
 * @param stage
 * @returns
 */
export const loadDataControlAction = (stage) => {
    return { type: types.LOAD_DATA, payload: stage }
}

/**
 * change page process
 * @param data
 * @returns
 */
export const changePageAction = (data) => {
    return { type: types.CHANGE_PAGE, payload: data }
}

/**
 * add page process
 * @param data
 * @returns
 */
export const addPageControlAction = (data) => {
    return { type: types.ADD_PAGE, payload: data }
}

/**
 * add page by copy process
 * @param data
 * @returns
 */
export const doublePageControlAction = (data) => {
    return { type: types.DOUB_PAGE, payload: data }
}

/**
 * delete page process
 * @param data
 * @returns
 */
export const deletePageControlAction = (data) => {
    return { type: types.DEL_PAGE, payload: data }
}

/**
 * change to another page process
 * @param data
 * @returns
 */
export const changePagesDataAction = (data) => {
    return { type: types.CHANGE_PAGES_DATA, payload: data }
}

/**
 * use for page control ,show & hide page control
 * @param status
 * @returns
 */
export const setOpenPageControlAction = (status: boolean) => {
    return { type: types.SHOW_PAGES_CONTROL, payload: status }
}

/**
 * update thumbnail image of page
 * @param pages
 * @returns
 */
export const changeImgOfPageAction = (pages) => {
    return {
        type: types.UPDATE_PAGE_IMG,
        payload: pages,
    }
}
//#17460 pages control add end

/**
 * change properties of image after choose image in local and url image
 * @param params
 * @returns
 */
export const editImageDataControlAction = ({ params, listControl }) => {
    let controlsProperties = structuredClone(listControl)

    controlsProperties.map((control) => {
        if (control.id === params.id) {
            // 18504 delete image url in popup
            // change url to imageData
            control.imageData = params.imageData
            control.width = params.width
            control.height = params.height
        }
    })
    return {
        type: types.ADD_PROPERTIES_CONTROL,
        payload: controlsProperties,
    }
}

/**
 * use for form setting dialog, show & hide form setting dialog
 * @param status
 * @returns
 */
export const setOpenFormSettingAction = (status: boolean) => {
    return {
        type: types.SET_OPEN_FORM_SETTING,
        payload: status,
    }
}

/**
 * feature/#17877_Research_Group_Control
 * use to get groups position , add group into listcontrol
 * @param listSelectedControl
 * @param listControl
 */

// feature/#17877_Research_Group_Control --->>
// MOD add paramester controlNo
export const getPostionGroupControls = (
    // feature/#17877_Research_Group_Control <<---
    listSelectedControl,
    listControl,
    controlNo
) => {
    const listControlClone = [...listControl]

    let listChildControl = []
    for (let control of listSelectedControl) {
        listChildControl.push(control.id)
    }
    const listChildControlIDs = listChildControl.join(',')

    let minX = listSelectedControl[0].position.x,
        minY = listSelectedControl[0].position.y,
        width,
        height,
        maxX = listSelectedControl[0].position.x,
        maxY = listSelectedControl[0].position.y

    // Get minX , maxX , minY , maxY
    for (let i = 0; i < listSelectedControl.length; i++) {
        // Get minX of control
        if (minX > listSelectedControl[i].position.x) {
            minX = listSelectedControl[i].position.x
        }

        // Get minX of control
        if (minY > listSelectedControl[i].position.y) {
            minY = listSelectedControl[i].position.y
        }

        // Get maxX of control
        if (
            maxX <
            listSelectedControl[i].position.x + listSelectedControl[i].width
        ) {
            maxX =
                listSelectedControl[i].position.x + listSelectedControl[i].width
        }

        // Get maxY of control
        if (
            maxY <
            listSelectedControl[i].position.y + listSelectedControl[i].height
        ) {
            maxY =
                listSelectedControl[i].position.y +
                listSelectedControl[i].height
        }
    }

    // Define Width , height of control
    width = maxX - minX
    height = maxY - minY

    // feature/#17877_Research_Group_Control -->
    // MOD define variable
    const nextIdStep = 1
    controlNo = controlNo + nextIdStep

    // feature/#17877_Research_Group_Control -->
    // MOD pass parameters
    const id = CONTROLS_TYPES.GROUP + controlNo

    // feature/#18681_bug_copy/cut/paste_group -->
    // ADD parent parameter for controls
    for (let control of listSelectedControl) {
        listControlClone.forEach((element) => {
            if (control.id === element.id) {
                element.parent = id
            }
        })
    }
    // feature/#18681_bug_copy/cut/paste_group -->

    let position = { x: minX, y: minY }
    const groupControls = {
        ...cloneDataOfItem(CONTROLS_TYPES.GROUP, id, position, null),
        childId: listChildControlIDs,
        // feature/#17877_Research_Group_Control -->
        width: width,
        height: height,
    }

    listControlClone.push(groupControls)

    return {
        type: types.GET_GROUP_POSITION,
        // MOD add payload controlNo
        payload: {
            listControlClone,
            controlNo,
            selectedControl: groupControls,
        },
    }
    // feature/#17877_Research_Group_Control <--
}

/**
 * Use to  ungroup control
 * @param listControl
 * @param selectedControl
 * @constructor
 */
export const UngroupControls = (listControl, selectedControl) => {
    const newListControl = structuredClone(listControl).filter((control) => {

        // #18681: bug_copy_cut_paste_Group --->>
        // remove parent out of control when ungroup
        if (selectedControl.childId.includes(control.id)) {
            control.parent = ''
        }
        // #18681: bug_copy_cut_paste_Group <<---

        return control.id !== selectedControl.id
    })

    return {
        type: types.UNGROUP_CONTROL,
        payload: newListControl,
    }
}

/**
 * #18368 image bug
 * image always is the first item in list control
 * @param doubleSelectedControl
 * @param listControl
 * @param newControlNo
 * @returns
 */
export const imageAlwaysDown = ({
    doubleSelectedControl,
    listControl,
    newControlNo,
}) => {
    let listControlClone = structuredClone(listControl)

    let data = []
    const filterControl = listControlClone.filter((value) => {
        if (value.id === doubleSelectedControl.id) {
            return value
        }
    })

    const selectedControl = filterControl.length >= 1 ? filterControl[0] : {}

    data.push(
        selectedControl,
        ...listControlClone.filter((c) => c.id !== selectedControl.id)
    )
    return {
        type: types.ADD_CONTROL,
        //#18368 image bug
        //add newControlNo to update controlNo
        payload: { data, controlNo: newControlNo },
    }
}

/**
 * #18230 [Bug] Export to JSON
 * when save data or export form, the first: need to save data of focus page into pages
 * @param pages : array data of pages
 * @param listControl : array data of control
 * @param currentPageIndex : int current index of page focus
 * @returns
 */
export const updatePageChildrenAction = (
    pages,
    listControl,
    currentPageIndex
) => {
    let tmpPages = structuredClone(pages)
    //update data of current page into pages
    tmpPages[currentPageIndex].children = [...listControl]

    return { type: types.UPDATE_PAGE_CHILDREN, payload: tmpPages }
}

/**
 * Change status : design/preview
 * @param status boolean : new value to set
 * @returns
 */
export const changePreviewStatusAction = (status) => {
    return { type: types.CHANGE_PREVIEW_STATUS, payload: status }
}

/**
 * #17459 [FEATURE] Form setting
 * when change page size from big to small, set the all control's position out of limit size into limit position
 * @param limitWidth : limit width of page
 * @param limitHeight : limit heigth of page
 * @param listControl : array data of control
 * @returns
 */
export const updateLimitPositionAction = (
    listControl,
    limitWidth,
    limitHeight,
    pages
) => {
    const listControlClone = structuredClone(listControl)
    const pagesClone = structuredClone(pages)

    pagesClone.forEach((pageElement) => {
        pageElement.children.forEach((element) => {
            // for case control out of heigth limit + width limit
            if (
                element.position.x > limitWidth &&
                element.position.y > limitHeight
            ) {
                element.position.x = limitWidth - element.width
                element.position.y = limitHeight - element.height
            }
            // for case control out of heigth limit only
            else if (element.position.y > limitHeight) {
                element.position.y = limitHeight - element.height
            }
            // for case control out of width limit only
            else if (element.position.x > limitWidth) {
                element.position.x = limitWidth - element.width
            }
        })
    })

    listControlClone.forEach((element) => {
        // for case control out of heigth limit + width limit
        if (
            element.position.x > limitWidth &&
            element.position.y > limitHeight
        ) {
            element.position.x = limitWidth - element.width
            element.position.y = limitHeight - element.height
        }
        // for case control out of heigth limit only
        else if (element.position.y > limitHeight) {
            element.position.y = limitHeight - element.height
        }
        // for case control out of width limit only
        else if (element.position.x > limitWidth) {
            element.position.x = limitWidth - element.width
        }
    })

    return {
        type: types.RE_SIZE,
        payload: { pages: pagesClone, listControl: listControlClone },
    }
}

/**use for calculation dialog, show & hide calculation dialog
 * @param status
 * @returns
 */
export const setOpenCalculationDialogAction = (status: boolean) => {
    return {
        type: types.SET_OPEN_CALCULATION_DIALOG,
        payload: status,
    }
}
/**
 * #18402-arrange-controls ADD
 * When arrange controls, create object to update store
 * @param listControl : listControl that will be update store's listControl
 * @returns object { type, payload }
 */
export const arrangeControlsAction = (listControl) => {
    return { type: types.ARRANGE_CONTROLS, payload: listControl }
}

/**
 * feature/#18466_Doubleclick_control_is_change_content
 * clear `doubleSelectedControl`
 * @param
 * @returns save `doubleSelectedControl` value `{}`
 */
export const clearDoubleSelectedControlAction = () => {
    return {
        type: types.DOUBLE_SELECT_CONTROL,
        payload: {},
    }
}

/**
 * Change property of line
 * @param param0 id : string id of control
 * @param param1 position: new position
 * @param param2 pointEnd : new pointEnd
 * @param param3 listControl : current contronlList
 * @returns
 */
export const changeLinePropertyAction = ({
    id,
    position,
    pointEnd,
    listControl,
}) => {
    // Copy data
    let controlsProperties = structuredClone(listControl)

    // Loop to proces
    controlsProperties.map((control) => {
        // If control is found
        if (control.id === id) {
            // Update position
            control.position = {
                ...position,
            }

            // Update pointEnd
            control.pointEnd = {
                ...pointEnd,
            }

            // Set width, height for Group use
            control.width = Math.abs(position.x - pointEnd.x)
            control.height = Math.abs(position.y - pointEnd.y)
        }
    })

    return {
        type: types.ADD_PROPERTIES_CONTROL,
        payload: controlsProperties,
    }
}
