import {
    UNDO_REDO_CONTROLS,
    COPY_CUT_PASTE_CONTROL,
    EMPTY_PAGE,
    EMPTY_HIST,
} from '../../constants'
import { types } from './ControlAction'
// feature/#18247_Bug_copy --->>
// ADD _isUndefined
import { _isUndefined } from '../../utils'
// feature/#18247_Bug_copy <<---

const controlState = {
    listControl: [],
    selectedControl: {},
    doubleSelectedControl: {},
    listSelectedControl: {},
    historyControls: {
        id: 'page1',
        step: UNDO_REDO_CONTROLS.NEGATIVE_ONE_STEP,
        data: [],
        number: UNDO_REDO_CONTROLS.THREE_STEP,
    },
    historyPagesData: [{ ...EMPTY_HIST }],
    copyPasteControls: {
        isCopy: COPY_CUT_PASTE_CONTROL.IS_COPY,
        isCut: COPY_CUT_PASTE_CONTROL.IS_CUT,
        pasteTimes: COPY_CUT_PASTE_CONTROL.PASTE_TIMES,
        listSaveControl: [],
        listIdsPasted: [],
    },
    searchControl: {
        isShowSearch: false,
    },
    calculationControl: {
        isShowCalculation: false,
    },
    formSetting: {
        isShowFormSetting: false,
    },
    pages: [{ ...EMPTY_PAGE }], // pages's data
    currentPageIndex: 0, // index of focus's page
    pageNo: 1, //use for page control
    controlNo: 0, //use for all control // #18246 ControlID set default, when using increase value
    isShowPageControl: false, // flag to control page control
    //  feature/#17694_Bug_Undo --->>
    //  ADD state historyControlsStemp, default value {}
    historyControlsStemp: {},
    // feature/#17694_Bug_Undo <<---
    isPreview: false,
}

const controlReducer = (state, action) => {
    // feature/#18247_Bug_copy --->>
    // ADD check action is not undefined => then switch, case
    switch (!_isUndefined(action) && action.type) {
        // feature/#18247_Bug_copy <<---
        case types.ADD_CONTROL:
            return {
                ...state,
                listControl: action.payload.data,
                // #18246 ControlID: update controlNo after add control
                controlNo: action.payload.controlNo,
            }

        case types.SELECT_CONTROL:
            return {
                ...state,
                selectedControl: action.payload,
                // #17460 pages control: when select control , hide control page area
                isShowPageControl: false,
            }

        case types.DOUBLE_SELECT_CONTROL:
            return {
                doubleSelectedControl: action.payload,
            }

        case types.ADD_PROPERTIES_CONTROL:
            return {
                ...state,
                listControl: action.payload,
            }

        case types.CLEAR_SELECT_CONTROL:
            return {
                ...state,
                selectedControl: action.payload,
                doubleSelectedControl: action.payload,
            }

        case types.DELETE_CONTROL:
            return {
                ...state,
                listControl: action.payload,
                selectedControl: {},
                listSelectedControl: {},
            }
        case types.SAVE_HISTORY_CONTROLS:
            return {
                ...state,
                historyControls: action.payload,
                // feature/#17694_Bug_Undo --->>
                // ADD save state historyControlsStemp
                historyControlsStemp: {},
                // feature/#17694_Bug_Undo <<---
            }
        case types.SAVE_UNDO_HISTORY_CONTROLS:
            return {
                ...state,
                historyControls: action.payload.historyControls,
                listControl: action.payload.listControl,
                // feature/#17694_Bug_Undo --->>
                // ADD save state historyControlsStemp
                historyControlsStemp: action.payload.historyControlsStemp,
                // feature/#17694_Bug_Undo <<---
                // feature/#17694_Bug_Undo --->>
                // ADD save state selectedControl
                selectedControl: action.payload.selectedControl,
                // feature/#17694_Bug_Undo <<---
            }

        case types.SAVE_REDO_HISTORY_CONTROLS:
            return {
                ...state,
                historyControls: action.payload.historyControls,
                listControl: action.payload.listControl,
                // feature/#17694_Bug_Undo --->>
                // ADD save state historyControlsStemp
                historyControlsStemp: {},
                // feature/#17694_Bug_Undo <<---,
            }
        case types.SELECT_LIST_CONTROL:
            return {
                ...state,
                listSelectedControl: action.payload,
            }
        case types.SET_STATUS_COPY:
            return {
                ...state,
                copyPasteControls: action.payload,
            }
        case types.SET_STATUS_CUT:
            return {
                ...state,
                copyPasteControls: action.payload.copyPasteControls,
                listControl: action.payload.listControl,
            }

        case types.PASTE_CONTROL:
            return {
                ...state,
                listControl: action.payload.listControl,
                copyPasteControls: action.payload.copyPasteControls,
                // #18246 ControlID: update controlNo after add control
                controlNo: action.payload.controlNo,
            }
        case types.SET_OPEN_SEARCH_DIALOG:
            return {
                searchControl: {
                    isShowSearch: action.payload.status,
                },
                // Reset selected control
                selectedControl: {},
            }
        case types.GOTO_CONTROL:
            return {
                searchControl: {
                    isShowSearch: false,
                },
                // set selected control
                selectedControl: action.payload,
            }
        case types.SET_OPEN_CALCULATION_DIALOG:
            return {
                ...state,
                calculationControl: {
                    isShowCalculation: action.payload,
                },
            }
        case types.SET_OPEN_FORM_SETTING:
            return {
                ...state,
                formSetting: {
                    isShowFormSetting: action.payload,
                },
            }
        //#17460 pages control add start
        //when load data byt button on toolbar
        case types.LOAD_DATA:
            return {
                ...action.payload,
            }
        //when user change to another page
        case types.CHANGE_PAGE:
            return {
                ...action.payload,
            }
        //when user add new page
        case types.ADD_PAGE:
            return {
                ...action.payload,
            }
        //when user copy page
        case types.DOUB_PAGE:
            return {
                ...action.payload,
            }
        //when user delete page
        case types.DEL_PAGE:
            return {
                ...action.payload,
            }
        //when user change position of page
        case types.CHANGE_PAGES_DATA: //sort page
            return {
                ...action.payload,
            }
        //when user click to button to show page controls
        case types.SHOW_PAGES_CONTROL:
            return {
                isShowPageControl: action.payload, //change flag
                selectedControl: {}, //reset selected control
            }
        //update imgage of page
        case types.UPDATE_PAGE_IMG:
            return {
                pages: action.payload,
            }
        //update children of page
        case types.UPDATE_PAGE_CHILDREN:
            return {
                pages: action.payload,
            }
        //#17460 pages control add end
        case types.HANDLE_LINE:
            return {
                ...state,
                listControl: action.payload,
            }
        //#17877 get group position
        case types.GET_GROUP_POSITION:
            return {
                //feature/#17877_Research_Group_Control -->
                // MOD update controlID
                listControl: action.payload.listControlClone,
                // update state
                controlNo: action.payload.controlNo,
                selectedControl: action.payload.selectedControl,
                listSelectedControl: [],
                //feature/#17877_Research_Group_Control <--
            }
        //#17877 ungroup
        case types.UNGROUP_CONTROL:
            return {
                listControl: action.payload,
                // reset selected control
                selectedControl: {},
            }

        // Change Preview status
        case types.CHANGE_PREVIEW_STATUS:
            return {
                isPreview: action.payload,
                // Reset selected control
                selectedControl: {},
            }

        // #17459 form setting
        // Case resize all controls out of page's limit
        case types.RE_SIZE:
            return {
                ...state,
                pages: action.payload.pages,
                listControl: action.payload.listControl,
            }

        // #18402-arrange-controls ADD
        // When arrange controls
        case types.ARRANGE_CONTROLS:
            return {
                listControl: action.payload,
            }
        default:
            return state
    }
}

export { controlReducer, controlState }
