import React from 'react'

import { DftButton } from '../Button'
import { IconButton } from '../Button'
//  feature/#17377_The_displayed_text_is_wrong
//  MOD remove redux, use useStore
import { useStore } from '../../../hooks'
// feature/#17377_The_displayed_text_is_wrong <<---

import { styleButton } from './PreviewToolbar.style'
import { createExportDataInString } from '../PageControl/PagesLogicFunction'
import {
    updatePageChildrenAction,
    setOpenPageControlAction,
} from '../../../stores/control/ControlAction'

const PreviewToolbar = () => {
    // Icon to show page controls
    const iconPageList = { iconName: 'PageList' }

    //  feature/#17377_The_displayed_text_is_wrong
    //  MOD remove redux, use useStore
    const [state, dispatch] = useStore()
    const {
        pages,
        listControl,
        currentPageIndex,
        pageNo,
        controlNo,
        sizeKonva,
        isShowPageControl,
    } = state
    // feature/#17377_The_displayed_text_is_wrong <<---

    const iconRefresh = { iconName: 'Download' }

    /**
     * add control's infor into common state
     * #18230 [Bug] Export to JSON
     * @param control : control's information
     * @returns
     */
    const dispatchUpdatePageChildrenControl = () => {
        const dataAction = updatePageChildrenAction(
            pages,
            listControl,
            currentPageIndex
        )
        dispatch(dataAction)
        return createExportDataInString(
            dataAction.payload,
            pageNo,
            controlNo,
            sizeKonva
        )
    }

    /**
     * Open/Hide pages control
     */
    const dispatchSetOpenPageControlAction = () => {
        dispatch(setOpenPageControlAction(!isShowPageControl))
    }

    /**
     * feature/#17461_export_to_json
     * use for exporting page's data to json file
     * @download export json file
     */
    function handleExport() {
        //save data and export to string
        const dataExport = dispatchUpdatePageChildrenControl() //#18230 [Bug] Export to JSON

        const element = document.createElement('a') // create a tag <a></a>
        element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8, ' +
                // encodeURIComponent(JSON.stringify(listControl)) //#18230 [Bug] Export to JSON mod
                encodeURIComponent(dataExport) //#18230 [Bug] Export to JSON mod
        )
        element.setAttribute('download', 'export.json') // add event download + name file
        document.body.appendChild(element)
        element.click() // action download
    }

    return (
        <div className="toolbar-details">
            <DftButton
                text="エクスポート"
                iconProps={iconRefresh}
                style={styleButton}
                onClick={handleExport}
            />
            <IconButton
                iconProps={iconPageList}
                title="ページコントロール"
                onClick={dispatchSetOpenPageControlAction}
            />
        </div>
    )
}

export default PreviewToolbar
