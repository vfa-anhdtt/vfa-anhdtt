import { useState, useEffect, Fragment, useRef } from 'react'
import PropTypes from 'prop-types'

import { Label } from '../Label'
import { IconButton } from '../Button'
import { PrimaryButton } from '@fluentui/react/lib/Button'
// #18469-Edit-page-control-scroll ADD import
import { Checkbox } from '@fluentui/react/lib/Checkbox'
import {
    addPageControlAction,
    changePagesDataAction,
    setOpenPageControlAction,
} from '../../../stores/control/ControlAction'
import { Page } from '../PageControl'

import {
    PagesToolbarStyle,
    styleButtonClosePropertiesToolBar,
} from './Toolbar.style'
import { useStore } from '../../../hooks'
import * as logic from '../PageControl/PagesLogicFunction'

/**
 * #17460 pages control add
 * create content for pages control
 * @param props isPreviewStatus: boolean
 * @returns html
 */
function PagesToolbar(props) {
    // Default height of div contain pages
    const HEIGHT_OF_ALLPAGE = 570

    // Fix space of div
    const HEIGHT_SPACE = 100

    // Param use to calculate top of focus page
    let focus_page_top = 0

    //use context
    const [state, dispatch] = useStore()
    const iconChromeClose = { iconName: 'ChromeClose' }
    const pageControlRef = useRef(null)

    //only allow sort page on design page
    const draggable = !props.isPreviewStatus

    //define param
    const {
        pages,
        currentPageIndex,
        isShowPageControl,
        listControl,
        pageNo,
        historyPagesData,
        historyControls,
    } = state

    //total pages of form
    let totalPages: number = pages.length
    //local state
    const [pagesLocal, setPages] = useState(pages)
    //dragged page, if didn't drag data is null
    const [draggedPage, setDraggedPage] = useState(null)
    //use when dragged page is move
    const [newIndex, setNewIndex] = useState(0)

    // Use to calculate height of div contain all page
    const [heightAllPage, setHeightAllPage] = useState(HEIGHT_OF_ALLPAGE)

    //close pages control
    const dispatchSetClosePageControlAction = () => {
        dispatch(setOpenPageControlAction(false))
    }

    //process when sort page
    const changePagesDataActionControl = () => {
        // only process when index is changed
        if (currentPageIndex !== newIndex) {
            // clone data of pagesLocal
            const tmpPages = [...pagesLocal]

            // ID of new focus page
            const newPageID = tmpPages[newIndex].id

            // historyControls data of new focus page
            const historyControls = historyPagesData.find(
                (hist) => hist.id === newPageID
            )

            // tmpPages[currentPageIndex].children = [...listControl]
            const data = {
                currentPageIndex: newIndex,
                pages: tmpPages,
                selectedControl: {},
                historyControls,
            }
            dispatch(changePagesDataAction(data))
        }
    }

    // process when add page
    const dispatchAddPageAction = () => {
        const newPageNo = pageNo + 1
        const tmpPages = logic.addNewPage(
            pagesLocal,
            currentPageIndex,
            listControl,
            newPageNo
        )
        const tmpHists = logic.addNewPageHist(
            historyPagesData,
            pages[currentPageIndex].id,
            `page${newPageNo}`,
            historyControls
        )

        dispatch(addPageControlAction({ ...tmpPages, ...tmpHists }))
    }

    //when pages's data is change, reset for local state
    useEffect(() => {
        if (pages.length == 0) {
            return
        }
        setPages([...pages])
        totalPages = pages.length
    }, [pages])

    //allway scroll to focus page
    useEffect(() => {
        // Page focus div
        const pageFocus = document.getElementById('pageFocus')

        // Only calcuate height when page is not null
        if (pageControlRef.current) {
            setHeightAllPage(
                window.innerHeight -
                    pageControlRef.current.offsetTop -
                    HEIGHT_SPACE
            )
        }

        // When page focus is not null
        if (pageFocus) {
            focus_page_top = pageFocus.offsetTop - HEIGHT_SPACE
            goToPageFocus('pageFocus')
        }
    })

    //when drag is start, set parameter
    const onDragStart = (e, index) => {
        // At preview mode, ignore
        if (!draggable) {
            return
        }

        setDraggedPage(pagesLocal[index])
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', e.target)
        e.dataTransfer.setDragImage(e.target, 20, 20)
    }

    //when dragOver, change local state data
    const onDragOver = (event, index) => {
        event.preventDefault()
        //only process when dragable
        if (!draggable) {
            return
        }

        //if dragged data is not page (when drag control), ignore
        if (!draggedPage) {
            return
        }

        const draggedOverPage = pagesLocal[index]

        // if the page is dragged over itself, ignore
        if (draggedPage.id === draggedOverPage.id) {
            return
        }

        // filter out the currently dragged page
        let tmpPages = pagesLocal.filter((page) => page.id !== draggedPage.id)

        // add the dragged page after the dragged over page
        tmpPages.splice(index, 0, draggedPage)

        setPages([...tmpPages])
        setNewIndex(index)
    }

    //when dragEnd, change data of store
    const onDragEnd = (e) => {
        // Only process at Design mode
        if (draggable) {
            // change data in store
            changePagesDataActionControl()
            //reset drag data
            setDraggedPage(null)
        }
    }

    //scroll to focus page
    const goToPageFocus = (id) => {
        // When page is show
        if (pageControlRef.current) {
            pageControlRef.current.scrollTo({
                top: focus_page_top,
                behavior: 'smooth',
            })
        }
    }

    //show content of pages
    function showPagesToolbar() {
        const show = []
        pagesLocal.map((page, index) => {
            show.push(
                <Page
                    key={page.id}
                    draggable={draggable}
                    onDragOver={onDragOver}
                    onDragStart={onDragStart}
                    onDrop={onDragEnd}
                    {...page}
                    index={index}
                    isFocus={index === currentPageIndex}
                    totalPages={totalPages}
                    isPreviewStatus={props.isPreviewStatus}
                />
            )
        })
        return show
    }

    //show button Add
    function showAddBtn() {
        //only show button on design mode
        if (!props.isPreviewStatus) {
            return (
                <div className="addButton">
                    <PrimaryButton
                        text="＋ページ追加"
                        onClick={dispatchAddPageAction}
                    />
                </div>
            )
        }
    }

    //show Checkbox
    function showCheckBox() {
        //only show button on preview mode
        if (props.isPreviewStatus) {
            return (
                <div className="addButton">
                    <Checkbox label="必須ﾍﾟｰｼﾞ" onChange={() => {}} />
                    <Checkbox label="台紙ﾍﾟｰｼﾞ" onChange={() => {}} />
                </div>
            )
        }
    }

    return (
        isShowPageControl && (
            <PagesToolbarStyle
                is-preview={props.isPreviewStatus}
                height-default={heightAllPage}
            >
                <Fragment key={0}>
                    <div className="header">
                        <Label>ページコントロール</Label>
                        <IconButton
                            iconProps={iconChromeClose}
                            styles={styleButtonClosePropertiesToolBar}
                            onClick={() => dispatchSetClosePageControlAction()}
                        />
                    </div>
                    {showAddBtn()}
                    {showCheckBox()}
                    <div
                        className="allPages"
                        id="allPages"
                        ref={pageControlRef}
                    >
                        {showPagesToolbar()}
                    </div>
                </Fragment>
            </PagesToolbarStyle>
        )
    )
}

// set default value props
PagesToolbar.defaultProps = {
    isPreviewStatus: false,
}

// typechecking on the props for a component
PagesToolbar.propTypes = {
    headeRef: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
    isPreviewStatus: PropTypes.bool,
}

export default PagesToolbar
