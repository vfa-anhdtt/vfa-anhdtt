import { EMPTY_PAGE, EMPTY_HIST } from '../../../constants'

/**
 * create  history data for loaded
 * @param pages :array loaded data of pages
 * @returns object
 */
export const addHistoryForLoad = (pages) => {
    const historyPagesData = []
    pages.map((page) => {
        //prepare data for new history
        const newHistPage = {
            ...EMPTY_HIST,
            id: page.id,
            data: [[...page.children]], //current data
        }
        historyPagesData.push(newHistPage)
    })
    return { historyPagesData, historyControls: { ...historyPagesData[0] } }
}

/**
 * add empty page into current list Pages
 * @param pages : array current list page
 * @param currentPageIndex : number current focus page's index
 * @param listControl : array current list control in page
 * @param pageNo : number use for manage page's ID
 * @returns object
 */
export const addNewPage = (pages, currentPageIndex, listControl, pageNo) => {
    //prepare empty page with new ID
    const newPage = {
        ...EMPTY_PAGE,
        id: `page${pageNo}`,
    }

    const index = currentPageIndex + 1

    const returnPages = [
        ...pages.slice(0, index), //data from start to position that want to add page
        newPage, //new page's data
        ...pages.slice(index), //remaining data
    ]
    //set data of current page
    returnPages[currentPageIndex].children = [...listControl]
    return {
        pages: returnPages,
        listControl: returnPages[index].children,
        pageNo,
        currentPageIndex: index,
        listSelectedControl: [], //#18229 clear data to hide tranformer
    }
}

/**
 * add empty histData for new page
 * @param histPages : array data of history's pages
 * @param currentPageID : string ID of current focus page
 * @param newPageID :string ID of new added page
 * @param hisData : object current history data of current page
 * @param isDouble : boolean true when you want to copy from existed page
 * @returns object
 */
export const addNewPageHist = (
    histPages,
    currentPageID,
    newPageID,
    hisData,
    isDouble = false
) => {
    const tmpHisPage = [...histPages]

    //prepare data for new history
    const newHistPage = {
        ...EMPTY_HIST,
        id: newPageID,
    }
    //if copy data, beginning history data is current data of source's page
    if (isDouble) {
        newHistPage.data[0] = [...hisData.data[hisData.data.length - 1]]
    }
    // store data into history of pages
    tmpHisPage.map((hisPage, index) => {
        if (hisPage.id === currentPageID) {
            tmpHisPage[index] = { ...hisData }
        }
    })
    // add history for new page
    tmpHisPage.push(newHistPage)

    return { historyPagesData: tmpHisPage, historyControls: newHistPage }
}

/**
 * add page with data is copy from exist page
 * @param pages : array current list page
 * @param currentPageIndex : number current focus page's index
 * @param listControl : array current list control in page
 * @param pageNo : number use for manage page's ID
 * @returns object
 */
export const doublePage = (pages, currentPageIndex, listControl, pageNo) => {
    //set data of current page
    pages[currentPageIndex].children = [...listControl]
    const copyPage = { ...pages[currentPageIndex], id: `page${pageNo}` }
    const index = currentPageIndex + 1
    const returnPages = [
        ...pages.slice(0, index),
        copyPage,
        ...pages.slice(index),
    ]
    return {
        pages: returnPages,
        listControl: returnPages[index].children,
        pageNo,
        currentPageIndex: index,
    }
}

/**
 * remove data of page you want to delete
 * @param pages : array current list page
 * @param index :number index of page that will remove
 * @returns object
 */
export const deletePage = (pages, index) => {
    const newPageIndex = Math.max(index - 1, 0)
    const returnPages = [...pages.slice(0, index), ...pages.slice(index + 1)]

    return {
        pages: returnPages,
        listControl: returnPages[newPageIndex].children,
        currentPageIndex: newPageIndex,
    }
}

/**
 * remove data of histpage you want to delete
 * @param histPages : array data of history's pages
 * @param deletePageID : string ID of page that will remove
 * @param newPageFocusID : string ID of page that will focus after delete current page
 * @returns
 */
export const deletePageHist = (histPages, deletePageID, newPageFocusID) => {
    const tmpHisPage = histPages.filter((page) => page.id !== deletePageID)
    const newPageFocus = tmpHisPage.find((page) => page.id === newPageFocusID)
    return { historyPagesData: tmpHisPage, historyControls: newPageFocus }
}

/**
 * adjust pages data when change to another page
 * @param pages : array current list page
 * @param currentPageIndex : number current focus page's index
 * @param newPageIndex : number index of page that will be focus
 * @param listControl : array current list control in page
 * @returns
 */
export const changePage = (
    pages,
    currentPageIndex,
    newPageIndex,
    listControl
) => {
    let tmpPages = [...pages]

    //set data of current page
    tmpPages[currentPageIndex].children = [...listControl]
    //prepare data for new focus page
    const newFocusPage = [...tmpPages[newPageIndex].children]
    return {
        pages: tmpPages,
        listControl: newFocusPage,
        currentPageIndex: newPageIndex,
        listSelectedControl: [], //#18229 clear data to hide tranformer
    }
}

/**
 * adjust data of history page when change to another page
 * @param histPages : array data of history's pages
 * @param currentPageID : string ID of current focus page
 * @param newPageID : string ID of page that will be focus
 * @param hisData : object current history data of current page
 * @returns object
 */
export const changePageHist = (
    histPages,
    currentPageID,
    newPageID,
    hisData
) => {
    const tmpHisPage = [...histPages]
    //prepare data for new history
    let newHistPage = {}
    // store data into history of pages
    tmpHisPage.map((hisPage, index) => {
        //update history of current page
        if (hisPage.id === currentPageID) {
            tmpHisPage[index] = { ...hisData }
            //get data of new move page
        } else if (hisPage.id === newPageID) {
            newHistPage = { ...hisPage }
        }
    })
    return { historyPagesData: tmpHisPage, historyControls: newHistPage }
}

/**
 * #18230 [Bug] Export to JSON
 * create string of JSON data to export or save
 * @param pages : array data of pages
 * @param pageNo : number use for control number of page (ID of page)
 * @param controlNo : number use for control number of controls(ID of control)
 * @param sizeKonva : size of form
 * @returns string
 */
export const createExportDataInString = (
    pages,
    pageNo,
    controlNo,
    sizeKonva
) => {
    return JSON.stringify({ pages, pageNo, controlNo, sizeKonva })
}
