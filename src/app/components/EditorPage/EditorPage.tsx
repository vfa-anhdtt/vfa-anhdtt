import { useState, useRef, FC, useEffect, useCallback } from 'react'
import { Stage, Layer, Rect, Line } from 'react-konva'

import {
    doubleSelectControlAction,
    changePosAndSizePropsControlAction,
    saveHistoryControlsAction,
    addControlAction,
    selectControlAction,
    deleteControlAction,
    selectListControls,
    setCopyStatusAction,
    setCutStatusAction,
    changePosGroupControls,
    pasteControlAction,
    changePosMultiControlAction,
    changeImgOfPageAction,
    getValueAgainAction,
    updateLimitPositionAction,
    changeLinePropertyAction,
    // feature/#17694_Bug_Undo --->>
    // ADD undoHistoryControlsAction, redoHistoryControlsAction
    undoHistoryControlsAction,
    redoHistoryControlsAction, // feature/#17694_Bug_Undo <<---
} from '../../../stores/control/ControlAction'
import { ListControl } from '../ListControl'

import {
    DRAG_DATA_KEY,
    UNDO_REDO_CONTROLS,
    KEY_NAME,
    JUMP_LENGTH,
    CONTROLS_TYPES,
} from '../../../constants'
import { CONSTANTS_KEYBOARD } from '../../../constants/optionsConstant'
// feature/#18466_Doubleclick_control_is_change_content --->>
// ADD structuredClone
import { _isUndefined, _debounce, structuredClone } from '../../../utils'
// feature/#18466_Doubleclick_control_is_change_content <<---
import { useStore } from '../../../hooks'
import TransformerDesign from '../Transformer'
import * as logic from './LogicFunctions'

import { EditorPageStyle } from './EditorPage.style'

// feature/#17694_Bug_Undo --->>
// ADD constant IS_HANDLE_DROP_EMPTY, value ''
const IS_HANDLE_DROP_EMPTY = ''
// feature/#17694_Bug_Undo <<---

const EditorPage: FC = () => {
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [positionStart, setPositionStart] = useState({ x: 0, y: 0 })
    const [positionEnd, setPositionEnd] = useState({ x: 0, y: 0 })
    const [selectedIDs, setSelectedIDs] = useState(null)

    // Flag to show/hide Hint line
    const [isShowHintLine, setIsShowHintLine] = useState(false)

    // feature/#17694_Bug_Undo --->>
    // ADD useState, isHandleDrop, default value ''
    const [isHandleDrop, setHandleDrop] = useState<any>(IS_HANDLE_DROP_EMPTY)
    // feature/#17694_Bug_Undo <<---

    const allowPressCopy = useRef(false)

    const stageRef = useRef<any>()

    const [state, dispatch] = useStore()

    const {
        sizeKonva,
        listSelectedControl,
        selectedControl,
        copyPasteControls,
        listControl,
        historyControls,
        pages,
        currentPageIndex,

        // feature/#17459_Form_setting --->>
        // ADD get state properties default
        propsControls,
        // feature/#17459_Form_setting <<---

        // feature/#17694_Bug_Undo --->>
        // ADD get state historyControlsStemp
        historyControlsStemp,
        // feature/#17694_Bug_Undo <<---

        // #18246 ControlID: get current value to set ID for new control
        controlNo,
        isPreview,
    } = state

    /**
     * add control's infor into common state
     * @param control : control's information
     * @returns
     */
    // feature/#17694_Bug_Undo --->>
    //  MOD update  name dispatchaddControl -> dispatchAddControl
    const dispatchAddControl = (params, newControlNo) => {
        // feature/#17694_Bug_Undo <<---
        // #18246 ControlID: newControlNo - use for update value after add control
        dispatch(addControlAction({ params, listControl, newControlNo }))
    }

    /**
     * set control is selected
     * @param id : id of control was clicked
     */
    const dispatchSelectedControl = (id) => {
        dispatch(selectControlAction({ id, listControl }))
    }

    /**
     * set control is selected
     * @param id : id of control was double clicked
     */
    const dispatchDoubleSelectedControl = (id) => {
        dispatch(doubleSelectControlAction({ id, listControl }))
    }

    const dispatchListSelectedControl = (listIds) => {
        dispatch(selectListControls({ listIds, listControl }))
    }

    /**
     * delete control
     * @param id : id of control want to delete
     */
    const dispatchDeleteControl = () => {
        dispatch(
            deleteControlAction({
                listSelectedControl,
                listControl,
            })
        )
        // feature/#17694_Bug_Undo --->>
        //  ADD check and update state setHandleDrop
        if (isHandleDrop === IS_HANDLE_DROP_EMPTY) {
            setHandleDrop(true)
        } else {
            setHandleDrop(!isHandleDrop)
        } // feature/#17694_Bug_Undo <<---
    }

    const dispatchCopyControl = (status) => {
        dispatch(
            setCopyStatusAction({
                status,
                listSelectedControl,
                selectedControl,
                copyPasteControls,
                // feature/#17694_Bug_Undo --->>
                // ADD parameter listControl
                listControl,
                // feature/#17694_Bug_Undo <<---
            })
        )
    }
    const dispatchCutControl = (status) => {
        dispatch(
            setCutStatusAction({
                status,
                listSelectedControl,
                selectedControl,
                listControl,
                copyPasteControls,
            })
        )
    }
    const dispatchPasteControl = () => {
        dispatch(
            // #18246 ControlID: controlNo - use for set ID for control that will be pasted
            pasteControlAction({ listControl, copyPasteControls, controlNo })
        )
        // feature/#17694_Bug_Undo --->>
        //  ADD check and update state setHandleDrop
        if (isHandleDrop === IS_HANDLE_DROP_EMPTY) {
            setHandleDrop(true)
        } else {
            setHandleDrop(!isHandleDrop)
        } // feature/#17694_Bug_Undo <<---
    }

    function dispatchSaveHistoryControls() {
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

    /**
     * update image of focus page to effect thumbnail
     */
    const dispatchChangeImgOfPageControls = () => {
        // Config image size down 10%
        const imgConfig = { quality: 0, pixelRatio: 0.1 }

        pages[currentPageIndex].imgSrc = stageRef.current.toDataURL(imgConfig)

        dispatch(changeImgOfPageAction(pages))
    }

    const debounceSaveHistoryControls = useCallback(
        _debounce(() => {
            dispatchSaveHistoryControls()
        }, UNDO_REDO_CONTROLS.TIME_DELAY_SAVE_HISTORY_CONTROLS),
        [listControl]
    )

    // feature/#17694_Bug_Undo --->>
    // ADD undoHistoryControls call action undoHistoryControlsAction
    const undoHistoryControls = () => {
        dispatch(
            undoHistoryControlsAction({ historyControls, selectedControl })
        )
    }

    // ADD redoHistoryControls call action redoHistoryControlsAction
    const redoHistoryControls = () => {
        dispatch(redoHistoryControlsAction({ historyControls }))
    }
    // feature/#17694_Bug_Undo <<---

    useEffect(() => {
        dispatchSaveHistoryControls()
    }, [])

    useEffect(() => {
        if (copyPasteControls.listIdsPasted.length < 2) {
            setSelectedIDs(copyPasteControls.listIdsPasted[0])
            dispatchSelectedControl(copyPasteControls.listIdsPasted[0])
        } else {
            //chose list of controls pasted
            setSelectedIDs(copyPasteControls.listIdsPasted.toString())
            dispatchListSelectedControl(
                copyPasteControls.listIdsPasted.toString()
            )
        }
    }, [copyPasteControls.listIdsPasted])

    // When controls is changed, update image for focus page
    useEffect(() => {
        // Only update at design mode
        if (!isPreview) {
            dispatchChangeImgOfPageControls()
        }
    }, [listControl])

    useEffect(() => {
        if (
            _isUndefined(selectedControl.id) &&
            _isUndefined(listSelectedControl[0])
        ) {
            setSelectedIDs('')
        }
    }, [selectedControl, listSelectedControl])

    // feature/#17459_form_setting --->>
    // ADD update all controls's position when it is out of limit Konva page
    useEffect(() => {
        dispatch(
            updateLimitPositionAction(
                listControl,
                sizeKonva.width,
                sizeKonva.height,
                pages
            )
        )
    }, [sizeKonva])
    // feature/#17459_form_setting <<---

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    // feature/#17694_Bug_Undo --->>
    // ADD check state isHandleDrop, then call action SaveHistoryControls
    useEffect(() => {
        if (isHandleDrop !== IS_HANDLE_DROP_EMPTY) {
            dispatchSaveHistoryControls()
        }
    }, [isHandleDrop])
    // feature/#17694_Bug_Undo <<---

    /**
     * process when data was dropped
     * @param event
     */
    const handleDrop = async (event) => {
        // data was set when drag start
        const draggedData =
            event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY)

        //#17460 pages control add start
        // if dragged data is null, do nothing
        if (!draggedData) {
            return
        }
        //#17460 pages control add end

        // #18246 ControlID MOD start
        const { type } = JSON.parse(draggedData)

        // Number will set for new control
        const newControlNo = controlNo + 1

        // ID of control is contain: (type + number)
        const id = `${type}${newControlNo}`
        // #18246 ControlID MOD end

        stageRef.current.setPointersPositions(event)
        //get pointer position
        const coords = stageRef.current.getPointerPosition()
        //create data to add
        const itemData = logic.cloneDataOfItem(
            type,
            id,
            {
                x: coords.x,
                y: coords.y,
            },
            propsControls
        )
        //add to list
        // feature/#17694_Bug_Undo --->>
        //  MOD update  name dispatchaddControl -> dispatchAddControl
        // #18246 ControlID : newControlNo update store's value ↓
        dispatchAddControl(itemData, newControlNo)
        // feature/#17694_Bug_Undo <<---

        // feature/#17694_Bug_Undo --->>
        //  MOD remove action dispatchSaveHistoryControls, check and use useState setHandleDrop
        if (isHandleDrop === IS_HANDLE_DROP_EMPTY) {
            setHandleDrop(true)
        } else {
            setHandleDrop(!isHandleDrop)
        } // feature/#17694_Bug_Undo <<---
    }

    /**
     * when click -> select control
     * @param e
     * @param id
     */
    function handleClickControl(e, id) {
        // When Shift key -> select multi control
        if (e.evt.shiftKey) {
            // If selectedControl is defined, clear
            if (selectedControl.id) {
                dispatchSelectedControl('')
            }
        }
        // Only call if select another control
        else if (selectedControl.id !== id) {
            dispatchSelectedControl(id)
        }
    }

    /**
     * when double click -> select control
     * @param e
     * @param id
     */
    function handleDoubleClickControl(e, id) {
        dispatchDoubleSelectedControl(id)
    }

    /**
     * when use hotkey (copy/cut/paste) -> keyPress
     * @param event
     */
    const keyPressDown = (event) => {
        // At preview mode, ignore
        if (isPreview) {
            return
        }

        event.preventDefault()

        //move control
        changePosByKey(event.keyCode, event.shiftKey)
        switch (event.key) {
            case CONSTANTS_KEYBOARD.KEY_META: //command
            case CONSTANTS_KEYBOARD.KEY_CTRL: //Ctrl
                allowPressCopy.current = true
                break
            case CONSTANTS_KEYBOARD.KEY_DELETE: //delete
                dispatchDeleteControl()
                break
            case CONSTANTS_KEYBOARD.KEY_V: //paste
                if (allowPressCopy.current) {
                    dispatchPasteControl()
                }
                break
            default:
        }

        // selectedIDs is a String have a ',' in there
        // feature/#18466_Doubleclick_control_is_change_content --->>
        // MOD fix bug selectedIDs undefined
        if (selectedIDs && selectedIDs.length > 2 && allowPressCopy.current) {
            // feature/#18466_Doubleclick_control_is_change_content <<---
            if (event.key === CONSTANTS_KEYBOARD.KEY_C) {
                dispatchCopyControl(true)
            } else if (event.key === CONSTANTS_KEYBOARD.KEY_X) {
                dispatchCutControl(true)
            }
        }

        // feature/#17694_Bug_Undo --->>
        // ADD use historyControls
        const {
            step,
            data: { length },
        } = historyControls

        // check hotkey `metaKey`, key `z`, and not shift
        // historyControls step > 0, call undoHistoryControls
        if (
            event.metaKey &&
            !event.shiftKey &&
            event.key === CONSTANTS_KEYBOARD.KEY_Z &&
            step > UNDO_REDO_CONTROLS.ZERO_STEP
        ) {
            undoHistoryControls()
        }

        // check hotkey windows `ctrl`, key `z`
        // historyControls step > 0, call undoHistoryControls
        if (
            event.ctrlKey &&
            event.key === CONSTANTS_KEYBOARD.KEY_Z &&
            step > UNDO_REDO_CONTROLS.ZERO_STEP
        ) {
            undoHistoryControls()
        }

        // check hotkey `metaKey`, key `shift`,  key `z`,
        // historyControls step <  historyControls data, call redoHistoryControls
        if (
            event.metaKey &&
            event.shiftKey &&
            event.key === CONSTANTS_KEYBOARD.KEY_Z &&
            step < length - UNDO_REDO_CONTROLS.ONE_STEP
        ) {
            redoHistoryControls()
        }

        // check hotkey windows `ctrlKey`, key `y`,
        // historyControls step <  historyControls data, call redoHistoryControls
        if (
            event.ctrlKey &&
            event.key === CONSTANTS_KEYBOARD.KEY_Y &&
            step < length - UNDO_REDO_CONTROLS.ONE_STEP
        ) {
            redoHistoryControls()
        }
        // feature/#17694_Bug_Undo <<---
    }

    // check hotkey `metaKey`, key `ctrl`, set allowPressCopy current false
    const keyPressUp = (event) => {
        if (
            event.key === CONSTANTS_KEYBOARD.KEY_META ||
            event.key === CONSTANTS_KEYBOARD.KEY_CTRL
        ) {
            allowPressCopy.current = false
        }
    }

    /**
     * change position value and size of control at the same time
     * @param control  object type{id,position,width,height}
     */
    const changeMultiPropertiesControl = (control) => {
        dispatch(
            changePosAndSizePropsControlAction({
                ...control,
                ...{ listControl },
            })
        )
    }

    /**
     * when  dragMove group control , update position of control
     * @param control
     */
    const changePropertiesGroupControl = (control) => {
        dispatch(changePosGroupControls({ ...control, ...{ listControl } }))
    }

    /**
     * when control DragMove,update position of control
     * @param e : event
     * @param id :id of control
     */
    // feature/#18466_Doubleclick_control_is_change_content --->>
    // MOD add parameter listControl
    function handleDragMoveControl(e, id, listControl) {
        // feature/#18466_Doubleclick_control_is_change_content <<---
        // Show Hint line
        setIsShowHintLine(true)
        setPositionEnd({ x: e.target.attrs.x, y: e.target.attrs.y })

        changeMultiPropertiesControl({
            id: id,
            position: {
                x: Math.round(e.target.attrs.x),
                y: Math.round(e.target.attrs.y),
            },
        })
        debounceSaveHistoryControls()
    }

    /**
     * when control change size by transformer,update position and size of control
     * @param e : event
     * @param id :id of control
     */
    function handleTransformControl(e, id) {
        // If control is line
        if (e.type === CONTROLS_TYPES.LINE) {
            dispatch(
                changeLinePropertyAction({ id, ...e, listControl: listControl })
            )
        }

        // If target is defined
        else if (!_isUndefined(e.target)) {
            changeMultiPropertiesControl({
                id: id,
                position: {
                    x: Math.round(e.target.attrs.x),
                    y: Math.round(e.target.attrs.y),
                },
                width: e.target.attrs.width * e.target.attrs.scaleX,
                height: e.target.attrs.height * e.target.attrs.scaleY,
            })
        }
        debounceSaveHistoryControls()
    }

    /**
     * update position of control
     * @param e : event
     * @param id : id of control
     */
    function handleChangePropertiesGroupControl(e, id) {
        // Show Hint line
        setIsShowHintLine(true)
        setPositionEnd({ x: e.target.attrs.x, y: e.target.attrs.y })

        changePropertiesGroupControl({
            id: id,
            position: { x: e.target.attrs.x, y: e.target.attrs.y },
            width: e.target.attrs.width * e.target.attrs.scaleX,
            height: e.target.attrs.height * e.target.attrs.scaleY,
        })
    }

    /**
     * from controllist data, show controls
     * @returns
     */
    const showControlList = () => {
        const show = []
        if (!_isUndefined(listControl) && listControl instanceof Array) {
            // Because use for Design & Preview
            // Set event's default is empty
            let eventHandle = {}

            // If the status is design: set event to process
            if (!isPreview) {
                eventHandle = {
                    propsClickDoubleControl: handleDoubleClickControl,
                    propsClickControl: handleClickControl,
                    propsTransformControl: handleTransformControl,
                    propsDragMoveControl: handleDragMoveControl,
                    propsDragMoveGroupControl:
                        handleChangePropertiesGroupControl,
                }
            }

            // Add to show
            show.push(
                listControl.map((value) => (
                    <ListControl
                        key={value.id}
                        {...eventHandle}
                        // propsOnMouseDownControl={handleMouseDown}
                        ids={selectedIDs}
                        {...value}
                        // Flag to child component understand status
                        isPreview={isPreview}
                        // feature/#18466_Doubleclick_control_is_change_content --->>
                        // MOD add props listControl,
                        listControl={structuredClone(listControl)}
                        // feature/#18466_Doubleclick_control_is_change_content <<---
                    />
                ))
            )
        }
        return show
    }

    /**
     * when mouse down and press shift : select multi controls
     * when mouse click and move : set start position
     * when transform is displayed, click out:
     * @param e : event
     * @returns
     */
    const handleStageMouseDown = (e) => {
        // If preview status, ignore
        if (isPreview) {
            return
        }

        // clicked on stage - clear selection
        if (e.target === e.target.getStage()) {
            setIsMouseDown(true)
            var pos = stageRef.current.getPointerPosition()
            setPositionStart({ x: pos.x, y: pos.y })
            setPositionEnd({ x: pos.x, y: pos.y })
            setSelectedIDs(',')
            dispatchSelectedControl({})
            dispatchListSelectedControl([])
            return
        }
        // clicked on transformer - do nothing
        const clickedOnTransformer =
            e.target.getParent().className === 'Transformer'
        if (clickedOnTransformer) {
            return
        }
        //set selected id of controls
        //feature/#17877_Research_Group_Control -->
        // MOD dispatchListSelectedControl
        const listSelectedIds = logic.getIDOfControlClicked(e, selectedIDs)
        setSelectedIDs(listSelectedIds)
        dispatchListSelectedControl(listSelectedIds)
        //feature/#17877_Research_Group_Control <--
    }

    /**
     * set control in mouse move range is select
     * @param e
     * @returns
     */
    const handleStageMouseMove = (e) => {
        if (!isMouseDown) {
            return
        }
        var pos = stageRef.current.getPointerPosition()
        setPositionEnd({ x: pos.x, y: pos.y })

        //get id of controls in mouse select
        const selectedIds = logic.findControlsIsSelect(
            stageRef.current,
            positionStart,
            positionEnd
        )
        setSelectedIDs(selectedIds)
        dispatchListSelectedControl(selectedIds)
        e.evt.preventDefault()
    }

    /**
     * when mouse up, clear range
     * @param e
     */
    const handleStageMouseUp = (e) => {
        // Hide Hint line
        setIsShowHintLine(false)

        setIsMouseDown(false)
        setPositionStart({ x: 0, y: 0 })
        setPositionEnd({ x: 0, y: 0 })
    }

    /**
     * change position of control by key
     * @param changeX length of jump by X
     * @param changeY length of jump by Y
     * @param Ids ID of controls that you want to change position(concate by ,)
     * @returns
     */
    const dispatchChangePositionOfMultiControl = (changeX, changeY, Ids) => {
        dispatch(
            changePosMultiControlAction({ changeX, changeY, Ids, listControl })
        )
    }

    function changePosByKey(keyCode, shiftKeyIsPress) {
        // If preview status, ignore
        if (isPreview) {
            return
        }

        // When control is not selected, ignore
        if (!selectedIDs) {
            return
        }

        // Param to set length of jump
        let jumpLength = JUMP_LENGTH.NORMAL

        // When shift is press, length is change to longer
        if (shiftKeyIsPress) {
            jumpLength = JUMP_LENGTH.SHIFT
        }

        // Code of pressed key
        switch (keyCode) {
            // Left key
            case KEY_NAME.LEFT:
                dispatchChangePositionOfMultiControl(
                    -jumpLength,
                    0,
                    selectedIDs
                )
                break

            // Up key
            case KEY_NAME.UP:
                dispatchChangePositionOfMultiControl(
                    0,
                    -jumpLength,
                    selectedIDs
                )
                break

            // Right key
            case KEY_NAME.RIGHT:
                dispatchChangePositionOfMultiControl(jumpLength, 0, selectedIDs)
                break

            // Down key
            case KEY_NAME.DOWN:
                dispatchChangePositionOfMultiControl(0, jumpLength, selectedIDs)
                break
            default:
        }
    }

    return (
        <EditorPageStyle
            id="container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            tabIndex={-1}
            onKeyDown={(e) => keyPressDown(e)}
            onKeyUp={(e) => keyPressUp(e)}
        >
            <Stage
                width={sizeKonva.width}
                height={sizeKonva.height}
                ref={stageRef}
                onMouseDown={handleStageMouseDown}
                onMouseUp={handleStageMouseUp}
                onMouseMove={handleStageMouseMove}
                className="konva-demo"
            >
                <Layer>
                    {showControlList()}
                    {/* feature/#17694_Bug_Undo --->> */}
                    {/* MOD remove selectedIDs, add selectedControl */}
                    <TransformerDesign selectedControl={selectedControl} />
                    {/* feature/#17694_Bug_Undo <<--- */}
                    {isMouseDown && (
                        <Rect
                            x={positionStart.x}
                            y={positionStart.y}
                            width={positionEnd.x - positionStart.x}
                            height={positionEnd.y - positionStart.y}
                            stroke="blue"
                            strokeWidth={1}
                            dash={[1, 1]}
                        />
                    )}
                    {/* Show Hint line */}
                    {isShowHintLine && (
                        <>
                            <Line
                                stroke="blue"
                                x={positionEnd.x}
                                y={positionEnd.y}
                                points={[-positionEnd.x, 0, sizeKonva.width, 0]}
                                strokeWidth={1}
                                dash={[1, 1]}
                            />
                            <Line
                                stroke="blue"
                                x={positionEnd.x}
                                y={positionEnd.y}
                                points={[
                                    0,
                                    -positionEnd.y,
                                    0,
                                    sizeKonva.height,
                                ]}
                                strokeWidth={1}
                                dash={[1, 1]}
                            />
                        </>
                    )}
                </Layer>
            </Stage>
        </EditorPageStyle>
    )
}

export default EditorPage
