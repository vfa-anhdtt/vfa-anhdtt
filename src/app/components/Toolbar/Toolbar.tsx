import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { IconButton } from '../Button'
import {
    undoHistoryControlsAction,
    redoHistoryControlsAction,
    setCopyStatusAction,
    setCutStatusAction,
    pasteControlAction,
    setOpenSearchDialogAction,
    setOpenPageControlAction,
    loadDataControlAction,
    deleteControlAction,
    setOpenFormSettingAction,
    getPostionGroupControls,
    UngroupControls,
    arrangeControlsAction,
    // feature/#17694_Bug_Undo --->>
    // ADD action saveHistoryControlsAction
    saveHistoryControlsAction,
    // feature/#17694_Bug_Undo <<---
} from '../../../stores/control/ControlAction'
// Feature/ #18402_arrange_controls --->>
// ADD constant
import { CONSTANTS_TOOLBAR } from '../../../constants/optionsConstant'
// Feature/ #18402_arrange_controls <<---

import { stage } from '../Preview/stage' //data for test
import { isObjectEmpty } from '../../../utils'
//feature/#17877_Research_Group_Control --->>
//MOD add import CONTROLS_TYPES
import { CONTROLS_TYPES, UNDO_REDO_CONTROLS } from '../../../constants'
//feature/#17877_Research_Group_Control <<---
import { useStore } from '../../../hooks'

import { ToolbarStyle } from './Toolbar.style'
import { addHistoryForLoad } from '../PageControl/PagesLogicFunction'
import * as arrangeLContrologic from '../FormSetting/ControlSetting/ArrangeLogicFunctions'

// feature/#8468_edit_icon_Change_font_for_stamp --->>
// ADD icon Settings
const iconSettings = { iconName: 'Settings' }
// feature/#8468_edit_icon_Change_font_for_stamp <<---

const iconPrevious = { iconName: 'Previous' }
const iconNext = { iconName: 'Next' }
// icon slot primary
const iconSearch = { iconName: 'Search' }
const iconSave = { iconName: 'Save' }
const iconPreview = { iconName: 'RedEye' }
const iconRefresh = { iconName: 'Refresh' }
const iconCopy = { iconName: 'Copy' }
const iconCut = { iconName: 'Cut' }
const iconPaste = { iconName: 'Paste' }
const iconGroup = { iconName: 'Group' }
const inconUnGroup = { iconName: 'UngroupObject' }
const iconPageList = { iconName: 'PageList' }
const iconAlignCenter = { iconName: 'AlignCenter' }
const iconAlignLeft = { iconName: 'AlignHorizontalLeft' }
const iconAlignRight = { iconName: 'AlignHorizontalRight' }
const iconAlignTop = { iconName: 'AlignVerticalTop' }
const iconAlignBot = { iconName: 'AlignVerticalBottom' }
const iconAlignSize = { iconName: 'SizeLegacy' }
const iconExpand = { iconName: 'MaximumValue' }

const iconDelete = { iconName: 'Delete' }

// feature/#17694_Bug_Undo --->>
// ADD constant IS_HANDLE_DELETE_CONTROL, value ''
const IS_HANDLE_DELETE_CONTROL = ''
// feature/#17694_Bug_Undo <<---

function Toolbar() {
    const history = useHistory()
    const [state, dispatch] = useStore()

    // feature/#17694_Bug_Undo --->>
    // ADD useState, isHandleSaveHistoryControl, default value ''
    const [isHandleSaveHistoryControl, setHandleSaveHistoryControl] =
        useState<any>(IS_HANDLE_DELETE_CONTROL)
    // feature/#17694_Bug_Undo <<---

    const {
        historyControls,
        selectedControl,
        listSelectedControl,
        copyPasteControls,
        listControl,
        // #18246 ControlID: get current value to set ID for new control
        controlNo,
        // Get to change status
        isShowPageControl,
        // feature/#17694_Bug_Undo --->>
        // ADD state historyControlsStemp
        historyControlsStemp,
        // feature/#17694_Bug_Undo <<---
    } = state

    // Feature/ #18402_arrange_controls --->>
    // State check show drop align item
    const [isShowDrop, setIsShowDrop] = useState(false)

    // State check show drop align size
    const [isShowSize, setIsShowSize] = useState(false)
    // Feature/ #18402_arrange_controls <<---

    /**
     * feature/#17694_Bug_Undo
     * dispatch saveHistoryControlsAction
     * @param
     * @returns {dispatch} save historyControls
     **/
    function dispatchSaveHistoryControls() {
        dispatch(
            saveHistoryControlsAction({
                listControl,
                historyControls,
                historyControlsStemp,
            })
        )
    }

    // feature/#17694_Bug_Undo --->>
    // ADD check state isHandleSaveHistoryControl, then call action SaveHistoryControls
    useEffect(() => {
        if (isHandleSaveHistoryControl !== IS_HANDLE_DELETE_CONTROL) {
            dispatchSaveHistoryControls()
        }
    }, [isHandleSaveHistoryControl])
    // feature/#17694_Bug_Undo <<---

    const undoHistoryControls = () => {
        dispatch(
            undoHistoryControlsAction({ historyControls, selectedControl })
        )
    }

    const redoHistoryControls = () => {
        dispatch(redoHistoryControlsAction({ historyControls }))
    }

    const setCopyStatus = (status) => {
        dispatch(
            setCopyStatusAction({
                status,
                listSelectedControl,
                copyPasteControls,
                //feature/#17877_Research_Group_Control -->
                // MOD add params listControl
                listControl,
                //feature/#17877_Research_Group_Control <--
            })
        )
    }

    const setCutStatus = (status) => {
        dispatch(
            setCutStatusAction({
                status,
                listSelectedControl,
                selectedControl,
                listControl,
                copyPasteControls,
            })
        )

        // feature/#17694_Bug_Undo --->>
        // ADD check is not event handleClickCopy
        if (status) {
            // ADD check and use useState isHandleSaveHistoryControl
            if (isHandleSaveHistoryControl === IS_HANDLE_DELETE_CONTROL) {
                setHandleSaveHistoryControl(true)
            } else {
                setHandleSaveHistoryControl(!isHandleSaveHistoryControl)
            }
        }
        // feature/#17694_Bug_Undo <<---
    }

    const deleteControl = () => {
        dispatch(
            deleteControlAction({
                listSelectedControl,
                listControl,
            })
        )

        // feature/#17694_Bug_Undo --->>
        // ADD check and use useState isHandleSaveHistoryControl
        if (isHandleSaveHistoryControl === IS_HANDLE_DELETE_CONTROL) {
            setHandleSaveHistoryControl(true)
        } else {
            setHandleSaveHistoryControl(!isHandleSaveHistoryControl)
        } // feature/#17694_Bug_Undo <<---
    }

    const pasteControl = () => {
        dispatch(
            // #18246 ControlID: controlNo - use for set ID for control that will be pasted
            pasteControlAction({ listControl, copyPasteControls, controlNo })
        )

        // feature/#17694_Bug_Undo --->>
        // ADD check and use useState isHandleSaveHistoryControl
        if (isHandleSaveHistoryControl === IS_HANDLE_DELETE_CONTROL) {
            setHandleSaveHistoryControl(true)
        } else {
            setHandleSaveHistoryControl(!isHandleSaveHistoryControl)
        } // feature/#17694_Bug_Undo <<---
    }

    const handleOnClickUndo = () => {
        undoHistoryControls()
    }

    const dispatchSetOpenSearchDialogAction = () => {
        dispatch(setOpenSearchDialogAction(true))
    }

    const dispatchSetOpenFormSettingAction = () => {
        dispatch(setOpenFormSettingAction(true))
    }

    const handleOnRedoClickRedo = () => {
        redoHistoryControls()
    }

    const isDisableUndoButton = () => {
        const { step } = historyControls

        return step <= UNDO_REDO_CONTROLS.ZERO_STEP
    }

    const isDisableRedoButton = () => {
        const {
            step,
            data: { length },
        } = historyControls

        return step >= length - UNDO_REDO_CONTROLS.ONE_STEP
    }

    const isDisableCopyCutButton = () => {
        return (
            isObjectEmpty(listSelectedControl)
        )
    }

    /**
     * feature/#17877_Research_Group_Item
     * Unable group button when listSelectedControl has 2 or more controls
     */
    const isDisableGroupButton = () => {
        return (
            listSelectedControl.length >= CONSTANTS_TOOLBAR.LIST_CONTROLS_LENGTH
        )
    }

    /**
     * feature/#17877_Research_Group_Item
     * Unable group button when selectedControl has type of GROUP
     */
    const isDisableUnGroupButton = () => {
        //MOD replace type by group type
        return selectedControl.type === CONTROLS_TYPES.GROUP
    }

    const handleClickCopy = () => {
        setCopyStatus(true)
        setCutStatus(false)
    }

    const handleClickCut = () => {
        setCopyStatus(false)
        setCutStatus(true)
    }

    /**
     * load control's infor into common state
     * @param control : control's information
     * @returns
     */
    const dispatchLoadControl = (stage) => {
        const currentPageIndex = 0
        dispatch(
            loadDataControlAction({
                ...stage,
                listControl: stage.pages[currentPageIndex].children,
                currentPageIndex,
                ...addHistoryForLoad(stage.pages),
            })
        )
    }

    const handleLoadData = (_) => {
        dispatchLoadControl(stage)
    }

    /**
     * feature/#17877_Research_Group_Item
     * Load group control's properties into state
     */
    const handleGroupControls = () => {
        // feature/#17877_Research_Group_Control -->
        // MOD add param: controlNo
        dispatch(
            getPostionGroupControls(listSelectedControl, listControl, controlNo)
        )
        // feature/#17877_Research_Group_Control <--
    }

    /**
     * feature/#17877_Research_Group_Item
     * Load new state without group control
     */
    const handleUnGroupControls = () => {
        dispatch(UngroupControls(listControl, selectedControl))
    }

    /**
     * Show/Hide Pages control
     */
    const dispatchSetOpenPageControlAction = () => {
        dispatch(setOpenPageControlAction(!isShowPageControl))
    }

    // Arrange Control By Min X
    const dispatchArrangeControlByMinXAction = () => {
        const tmpListControl = arrangeLContrologic.setPositionByMinX(
            listControl,
            listSelectedControl
        )

        dispatch(arrangeControlsAction(tmpListControl))
    }

    // Arrange Control By Min Y
    const dispatchArrangeControlByMinYAction = () => {
        const tmpListControl = arrangeLContrologic.setPositionByMinY(
            listControl,
            listSelectedControl
        )

        dispatch(arrangeControlsAction(tmpListControl))
    }

    // Arrange Control By Max X
    const dispatchArrangeControlByMaxXAction = () => {
        const tmpListControl = arrangeLContrologic.setPositionByMaxX(
            listControl,
            listSelectedControl
        )

        dispatch(arrangeControlsAction(tmpListControl))
    }

    // Arrange Control By Max Y
    const dispatchArrangeControlByMaxYAction = () => {
        const tmpListControl = arrangeLContrologic.setPositionByMaxY(
            listControl,
            listSelectedControl
        )

        dispatch(arrangeControlsAction(tmpListControl))
    }

    // Arrange Control By Max Width
    const dispatchArrangeControlMaxWidthAction = (isMax) => {
        const tmpListControl = arrangeLContrologic.setWidthForControls(
            listControl,
            listSelectedControl,
            isMax
        )

        dispatch(arrangeControlsAction(tmpListControl))
    }

    // Arrange Control By Max Height
    const dispatchArrangeControlMaxHeightAction = (isMax) => {
        const tmpListControl = arrangeLContrologic.setHeightForControls(
            listControl,
            listSelectedControl,
            isMax
        )

        dispatch(arrangeControlsAction(tmpListControl))
    }

    /**
     * #18402: arrange-controls
     * Show pop up align item on layout
     * @returns UI of array icon buttons
     */
    const showOptionAlign = () => {
        //condition show pop up align
        if (isShowDrop) {
            return (
                <div className="drop-custom">
                    <div className="line-drop">
                        <IconButton
                            iconProps={iconAlignLeft}
                            title="右揃え"
                            onClick={() =>
                                alignControls(CONSTANTS_TOOLBAR.ALIGN_LEFT)
                            }
                        />
                        <IconButton
                            iconProps={iconAlignRight}
                            title="左揃え"
                            onClick={() =>
                                alignControls(CONSTANTS_TOOLBAR.ALIGN_RIGHT)
                            }
                        />
                    </div>
                    <div className="line-drop">
                        <IconButton
                            iconProps={iconAlignTop}
                            title="上揃え"
                            onClick={() =>
                                alignControls(CONSTANTS_TOOLBAR.ALIGN_TOP)
                            }
                        />
                        <IconButton
                            iconProps={iconAlignBot}
                            title="下揃え"
                            onClick={() =>
                                alignControls(CONSTANTS_TOOLBAR.ALIGN_BOTTOM)
                            }
                        />
                    </div>
                </div>
            )
        }
    }

    /**
     * #18402: arrange-controls
     * Show pop up align size on layout
     * @returns UI of array icon buttons
     */
    const showAlignSize = () => {
        //condition show pop up align size
        if (isShowSize) {
            return (
                <div className="drop-size">
                    <IconButton
                        iconProps={iconExpand}
                        title="高さ揃え"
                        onClick={() =>
                            alignControls(CONSTANTS_TOOLBAR.ALIGN_WIDTH)
                        }
                    />
                    <div className="rorate-icon">
                        <IconButton
                            iconProps={iconExpand}
                            title="幅揃え"
                            onClick={() =>
                                alignControls(CONSTANTS_TOOLBAR.ALIGN_HEIGHT)
                            }
                        />
                    </div>
                </div>
            )
        }
    }

    /**
     * #18402: arrange-controls
     * categorize the action and run the action accordingly
     */
    const alignControls = (caseValue) => {
        switch (caseValue) {
            //align left all selected items
            case CONSTANTS_TOOLBAR.ALIGN_LEFT:
                dispatchArrangeControlByMinXAction()
                break

            //align right all selected items
            case CONSTANTS_TOOLBAR.ALIGN_RIGHT:
                dispatchArrangeControlByMaxXAction()
                break

            //align top all selected items
            case CONSTANTS_TOOLBAR.ALIGN_TOP:
                dispatchArrangeControlByMinYAction()
                break

            //align bottom all selected items
            case CONSTANTS_TOOLBAR.ALIGN_BOTTOM:
                dispatchArrangeControlByMaxYAction()
                break

            //resize width follow the biggest item
            case CONSTANTS_TOOLBAR.ALIGN_WIDTH:
                dispatchArrangeControlMaxWidthAction(true)
                break

            //resize height follow the biggest item
            case CONSTANTS_TOOLBAR.ALIGN_HEIGHT:
                dispatchArrangeControlMaxHeightAction(true)
                break
            default:
                break
        }
        setIsShowDrop(false)
        setIsShowSize(false)
    }

    /**
     * #18402: arrange-controls
     * hidden other pop-up when pop up align is show
     */
    const handleDropAlign = () => {
        setIsShowDrop(!isShowDrop)
        setIsShowSize(false)
    }

    /**
     * #18402: arrange-controls
     * hidden other pop-up when pop up align size is show
     */
    const handleDropSize = () => {
        setIsShowSize(!isShowSize)
        setIsShowDrop(false)
    }

    /**
     * #18402: arrange-controls
     * hidden all pop-up when the pop-up's button is disable
     */
    useEffect(() => {
        //check condition open button show align and align size
        if (!isDisableGroupButton()) {
            setIsShowDrop(false)
            setIsShowSize(false)
        }
    }, [isDisableGroupButton()])

    // document.addEventListener('contextmenu', event => event.preventDefault());

    return (
        <ToolbarStyle>
            <div className="toolbar d-flex justify-between py-16">
                <div className="toolbar-start d-flex items-center gap-y-2">
                    <IconButton
                        // feature/#8468_edit_icon_Change_font_for_stamp --->>
                        // MOD icon Label --> icon Setting
                        iconProps={iconSettings}
                        // feature/#8468_edit_icon_Change_font_for_stamp <<---
                        onClick={dispatchSetOpenFormSettingAction}
                        title="フォーム設定"
                    />
                    <span>|</span>
                    <IconButton
                        iconProps={iconPrevious}
                        onClick={handleOnClickUndo}
                        disabled={isDisableUndoButton()}
                        title="元に戻す"
                    />
                    <IconButton
                        iconProps={iconNext}
                        onClick={handleOnRedoClickRedo}
                        disabled={isDisableRedoButton()}
                        title="やり直し"
                    />
                    <span>|</span>
                    <IconButton
                        iconProps={iconCopy}
                        disabled={isDisableCopyCutButton()}
                        onClick={handleClickCopy}
                        title="コピー"
                    />
                    <IconButton
                        iconProps={iconCut}
                        disabled={isDisableCopyCutButton()}
                        onClick={handleClickCut}
                        title="切り"
                    />
                    <IconButton
                        iconProps={iconPaste}
                        disabled={
                            !(
                                copyPasteControls.isCopy ||
                                copyPasteControls.isCut
                            )
                        }
                        onClick={pasteControl}
                        title="貼り"
                    />
                    <IconButton
                        iconProps={iconDelete}
                        disabled={isDisableCopyCutButton()}
                        onClick={deleteControl}
                        title="削除"
                    />
                    <IconButton
                        iconProps={iconGroup}
                        disabled={!isDisableGroupButton()}
                        onClick={handleGroupControls}
                        //feature/#17877_Research_Group_Control --->>
                        // MOD add title
                        title={'グループ'}
                        ////feature/#17877_Research_Group_Control <<---
                    />
                    <IconButton
                        iconProps={inconUnGroup}
                        disabled={!isDisableUnGroupButton()}
                        onClick={handleUnGroupControls}
                        //feature/#17877_Research_Group_Control --->>
                        // MOD add title
                        title={'ウングループ'}
                        ////feature/#17877_Research_Group_Control <<---
                    />
                    <IconButton
                        iconProps={iconAlignCenter}
                        //feature/#18402_Arrange_controls --->>
                        // MOD function click button
                        onClick={handleDropAlign}
                        //feature/#18402_Arrange_controls <<---

                        disabled={!isDisableGroupButton()}
                        title="位置揃え"
                    />
                    {showOptionAlign()}
                    <IconButton
                        iconProps={iconAlignSize}
                        //feature/#18402_Arrange_controls --->>
                        // MOD function click button
                        onClick={handleDropSize}
                        //feature/#18402_Arrange_controls <<---

                        disabled={!isDisableGroupButton()}
                        title="サイズ揃え"
                    />
                    {showAlignSize()}
                </div>

                <div className="toolbar-primary d-flex items-center gap-y-2">
                    <IconButton
                        iconProps={iconPreview}
                        onClick={() => {
                            history.push('/preview')
                        }}
                        title="レビュー"
                    />
                    <IconButton
                        iconProps={iconRefresh}
                        onClick={handleLoadData}
                        title="リロード"
                    />
                    <IconButton
                        iconProps={iconSave}
                        onClick={() => {}}
                        title="保存"
                    />
                    <IconButton
                        iconProps={iconSearch}
                        title="検索"
                        onClick={dispatchSetOpenSearchDialogAction}
                    />
                    <IconButton
                        iconProps={iconPageList}
                        title="ページコントロール"
                        onClick={dispatchSetOpenPageControlAction}
                    />
                </div>
            </div>
        </ToolbarStyle>
    )
}

export default Toolbar
