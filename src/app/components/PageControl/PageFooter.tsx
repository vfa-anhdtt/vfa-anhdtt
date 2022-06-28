import React from 'react'
import { PageFooterStyle } from './PageFooter.style'
import { useStore } from '../../../hooks'

import { changePageAction } from '../../../stores/control/ControlAction'
import * as logic from './PagesLogicFunction'

/**
 * Create HTML element to control page at footer
 * @author AnhDTT
 * @returns HTML struct
 */
function PageFooter() {
    //use global store
    const [state, dispatch] = useStore()

    //define param will be use
    const {
        pages,
        currentPageIndex,
        listControl,
        historyPagesData,
        historyControls,
        // Flag to know design mode or preview mode
        isPreview,
    } = state

    // Total page number
    const totalPagesNumber = pages.length

    /**
     * Focus to new page
     * @param newIndex : number Index of page that will focus
     */
    const handleChangePage = (newIndex) => {
        //Only process if pageIndex is different
        if (newIndex !== currentPageIndex) {
            //pages data
            const tmpPages = logic.changePage(
                pages,
                currentPageIndex,
                newIndex,
                listControl
            )

            //history data
            const tmpHists = logic.changePageHist(
                historyPagesData,
                pages[currentPageIndex].id,
                pages[newIndex].id,
                historyControls
            )

            //change store
            dispatch(changePageAction({ ...tmpPages, ...tmpHists }))
        }
    }

    /**
     * Go to previous page
     * @param e : event
     */
    const handlePrePage = (e) => {
        // New index of page that will be focus
        const newIndex = currentPageIndex - 1

        // Only process if page is valid ( > 0)
        if (newIndex >= 0) {
            handleChangePage(newIndex)
        }
    }

    /**
     * Go to Next page
     * @param e : event
     */
    const handleNextPage = (e) => {
        // New index of page that will be focus
        const newIndex = currentPageIndex + 1

        // Only process if page is valid ( < Total pages>)
        if (newIndex < totalPagesNumber) {
            handleChangePage(newIndex)
        }
    }

    // Create <a> element to goto Previous page
    const showPreviousPageControl = () => {
        // When current page isn't first page, show link
        if (currentPageIndex !== 0) {
            return (
                <a href="#" onClick={handlePrePage}>
                    ←
                </a>
            )
        }

        // Show space
        return <span>&nbsp;&nbsp;</span>
    }

    // Create <a> element to goto Next page
    const showNextPageControl = () => {
        // When current page isn't last page, show link
        if (currentPageIndex !== totalPagesNumber - 1) {
            return (
                <a href="#" onClick={handleNextPage}>
                    →
                </a>
            )
        }

        // Show space
        return <span>&nbsp;&nbsp;</span>
    }

    // Create HTML element for checkbox
    const showCheckBoxControl = () => {
        // Only show at design mode
        if (!isPreview) {
            return (
                <>
                    <div>☑︎必須ページ</div>
                    <div>□台紙ページ</div>
                </>
            )
        }
    }

    return (
        <PageFooterStyle>
            <div className="pageFootContent">
                <div>{showPreviousPageControl()}</div>
                <div>
                    {currentPageIndex + 1}/{totalPagesNumber}
                    &nbsp;ページ
                </div>
                {
                    // Show checkbox control
                    showCheckBoxControl()
                }
                <div>{showNextPageControl()}</div>
            </div>
        </PageFooterStyle>
    )
}

export default PageFooter
