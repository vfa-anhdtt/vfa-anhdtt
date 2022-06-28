import React from 'react'
import {
    ContextualMenu,
    IContextualMenuItem,
} from '@fluentui/react/lib/ContextualMenu'
import { PageStyle } from './Page.style'
import {
    changePageAction,
    doublePageControlAction,
    deletePageControlAction,
} from '../../../stores/control/ControlAction'
import { useStore } from '../../../hooks'
import * as logic from './PagesLogicFunction'
/**
 *
 * @param props #17460 Pages control
 * @returns
 */
function Page(props) {
    //use global store
    const [state, dispatch] = useStore()

    //define param will be use
    const {
        pages,
        currentPageIndex,
        listControl,
        pageNo,
        historyPagesData,
        historyControls,
        // Get size to calculate height for image
        sizeKonva,
    } = state

    // Fix width of Image
    const WIDTH_IMG = 135

    // Height of Image
    const HEIGHT_IMG = (WIDTH_IMG * sizeKonva.height) / sizeKonva.width

    //when only 1 page, can't delete
    const deleteDisable = props.totalPages === 1
    //when page is focus, set ID with special ID
    const pageID = props.isFocus ? 'pageFocus' : `page${props.index}`

    /**
     * process when user click on page, call event to make this page is focus
     * @param event
     */
    const handleChangePage = (event) => {
        const index = props.index
        //only call when this page is not focused
        if (!props.isFocus) {
            //pages data
            const tmpPages = logic.changePage(
                pages,
                currentPageIndex,
                index,
                listControl
            )
            //history data
            const tmpHists = logic.changePageHist(
                historyPagesData,
                pages[currentPageIndex].id,
                pages[index].id,
                historyControls
            )
            //change store
            dispatch(changePageAction({ ...tmpPages, ...tmpHists }))
        }
    }

    /**
     * process when user click on double page
     * @param event
     */
    const handleDoublePage = (event) => {
        const newPageNo = pageNo + 1
        const tmpPages = logic.doublePage(
            pages,
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
        dispatch(doublePageControlAction({ ...tmpPages, ...tmpHists }))
    }

    /**
     * process when user click on delete page
     * @param event
     */
    const handleDeletePage = (event) => {
        const index = props.index
        const tmpPages = logic.deletePage(pages, index)
        const tmpHists = logic.deletePageHist(
            historyPagesData,
            pages[currentPageIndex].id,
            tmpPages.pages[tmpPages.currentPageIndex].id
        )
        dispatch(deletePageControlAction({ ...tmpPages, ...tmpHists }))
    }

    //sub menu
    const linkRef = React.useRef(null)
    const [showContextualMenu, setShowContextualMenu] = React.useState(false)

    //show sub menu
    const onShowContextualMenu = React.useCallback(
        (ev: React.MouseEvent<HTMLElement>) => {
            ev.preventDefault() // don't navigate
            setShowContextualMenu(true)
        },
        []
    )

    //hide sub menu
    const onHideContextualMenu = React.useCallback(
        () => setShowContextualMenu(false),
        []
    )

    //menus's contents
    const menuItems: IContextualMenuItem[] = [
        {
            key: 'doubleItem',
            text: '複製',
            onClick: (event) => {
                handleDoublePage(event)
            },
        },
        {
            key: 'deleteItem',
            text: '削除',
            disabled: deleteDisable,
            onClick: (event) => {
                handleDeletePage(event)
            },
        },
    ]

    //show option control
    function showOption() {
        //only show on design page
        if (!props.isPreviewStatus) {
            return (
                <b>
                    <a ref={linkRef} onClick={onShowContextualMenu} href="#">
                        ...
                    </a>
                </b>
            )
        }
    }
    return (
        <PageStyle
            draggable
            onDragOver={(e) => props.onDragOver(e, props.index)}
            onDragStart={(e) => props.onDragStart(e, props.index)}
            onDrop={(e) => props.onDrop(e)}
            onClick={handleChangePage}
            focus-page={props.isFocus}
            id={pageID}
        >
            <p className="pageHead">{showOption()}</p>
            <ContextualMenu
                items={menuItems}
                hidden={!showContextualMenu}
                target={linkRef}
                onItemClick={onHideContextualMenu}
                onDismiss={onHideContextualMenu}
            />
            <div className="pageContent">
                {/* #18469-Edit-page-control-scroll MOD : set width, height for image */}
                <img src={props.imgSrc} width={WIDTH_IMG} height={HEIGHT_IMG} />
            </div>
            <div style={{ background: 'black' }}>
                <hr />
            </div>
            <div className="pageTitle">{props.index + 1}</div>
        </PageStyle>
    )
}

export default Page
