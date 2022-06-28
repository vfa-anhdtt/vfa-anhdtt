import { useState, useMemo, useEffect } from 'react'

import {
    Dialog as DialogDefault,
    DialogType,
    DialogFooter,
} from '@fluentui/react/lib/Dialog'
import { LineGridStyle, DetailStyle } from './GridCreate.style'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { Label } from '@fluentui/react/lib/Label'
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField'
import { TooltipHost } from '@fluentui/react/lib/Tooltip'
import { DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList'
import { Dropdown } from '@fluentui/react/lib/Dropdown'
import { useId } from '@fluentui/react-hooks'
import { CONTROLS_TYPES } from '../../../constants'
import { generateGridData } from './GridCreateLogicFunctions'
import {
    editGridDataControlAction,
    clearSelectControlAction,
} from '../../../stores/control/ControlAction'
import { isObjectEmpty } from '../../../utils'

import { useStore } from '../../../hooks'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * show dialog to edit property of Grid
 */
function GridCreateDialog() {
    // User Global store
    const [state, dispatch] = useStore()

    // current listControl param
    const {
        listControl,
        // Double Clicked control
        doubleSelectedControl,
    } = state

    const DEFAULT_VALUE = {
        SHOW_DIALOG_FLG: false,
        ROW_NUMS: 1,
        ROW_HEIGHT: 20,
        HEADER_HEIGHT: 15,
        TEXT: '',
        WIDTH: 50,
        COLUMN_NUMS: 0,
    }
    // style of popup
    const modalPropsStyles = { main: { maxWidth: 450 } }
    const modalProps = useMemo(
        () => ({
            isBlocking: true,
            styles: modalPropsStyles,
        }),
        []
    )
    const rowId = useId('rowId')
    const columnId = useId('columnId')

    // Option controller
    const options = [
        { key: CONTROLS_TYPES.LABEL, text: 'ラベル' },
        { key: CONTROLS_TYPES.TEXTBOX, text: '文字テキスト' },
        { key: CONTROLS_TYPES.CHECKBOX, text: 'チェックボックス' },
        { key: CONTROLS_TYPES.LISTBOX, text: 'リストボックス' },
        { key: CONTROLS_TYPES.NONE, text: '空' },
    ]
    //style of textbox
    const narrowTextFieldStyles: Partial<ITextFieldStyles> = {
        fieldGroup: { width: 100 },
    }
    //dialog's content setting
    const dialogContentProps = {
        type: DialogType.normal,
        title: 'グリッド（表）設定',
    }

    const [showDialog, setShowDialog] = useState(DEFAULT_VALUE.SHOW_DIALOG_FLG)
    const [rowNum, setRowNum] = useState(DEFAULT_VALUE.ROW_NUMS)
    const [columnNum, setColumnNum] = useState(DEFAULT_VALUE.COLUMN_NUMS)
    const [rowHeight, setRowHeight] = useState(DEFAULT_VALUE.ROW_HEIGHT)
    const [headerHeight, setHeaderHeight] = useState(
        DEFAULT_VALUE.HEADER_HEIGHT
    )
    const [headersText, setHeadersText] = useState([DEFAULT_VALUE.TEXT])
    const [columnsWidth, setColumnsWidth] = useState([DEFAULT_VALUE.WIDTH])
    const [columnsType, setColumnsType] = useState([DEFAULT_VALUE.TEXT])

    const updateGridPropertiesControl = (params) => {
        dispatch(editGridDataControlAction({ params, listControl }))
    }

    const clearSelectControl = () => {
        dispatch(clearSelectControlAction())
    }

    //when control is selected, if control is GRID, the popup will display
    useEffect(() => {
        // If double clicked control is null, ignore
        if (isObjectEmpty(doubleSelectedControl)) {
            return
        }

        const filterControl = listControl.filter((value) => {
            return value.id === doubleSelectedControl.id
        })

        // Get control on current listControl
        const control = filterControl.length >= 1 ? filterControl[0] : {}

        //only process when selected control is GRID, prepare data for display
        if (control.type === CONTROLS_TYPES.GRID) {
            setShowDialog(true)
            setRowNum(control.numRows)
            setColumnNum(control.numCols)
            setRowHeight(control.rowHeight)
            setHeaderHeight(control.headerHeight)
            const stateData = generateStateArr(
                control.headerText,
                control.rowData,
                control.rowData,
                control.numCols
            )
            setHeadersText(stateData.headers)
            setColumnsWidth(stateData.widths)
            setColumnsType(stateData.types)
        }
    }, [doubleSelectedControl])

    /**
     * genarate headers text, column's width, column's type follow numColumns
     * @param headerArr : string[] current header's text
     * @param widthArr : number[] current column's width
     * @param typeArr : string[] current column's type
     * @param numColumns : number of column will be generate
     * @returns object {headers,widths,types}
     */
    function generateStateArr(headerArr, widthArr, typeArr, numColumns) {
        let returnHeader = [],
            returnWidth = [],
            returnType = []
        //init get from data of control
        if (numColumns === headerArr.length) {
            for (let i = 0; i < numColumns; i++) {
                returnHeader.push(headerArr[i])
                returnWidth.push(widthArr[i].width)
                returnType.push(typeArr[i].type)
            }
            //when add more columns
        } else if (headerArr.length < numColumns) {
            returnHeader = headerArr.slice()
            returnWidth = widthArr.slice()
            returnType = typeArr.slice()
            for (let i = headerArr.length; i < numColumns; i++) {
                returnHeader.push(DEFAULT_VALUE.TEXT)
                returnWidth.push(DEFAULT_VALUE.WIDTH)
                returnType.push(CONTROLS_TYPES.NONE)
            }
        } else {
            returnHeader = headerArr.slice(0, numColumns)
            returnWidth = widthArr.slice(0, numColumns)
            returnType = typeArr.slice(0, numColumns)
        }
        return {
            headers: returnHeader,
            widths: returnWidth,
            types: returnType,
        }
    }

    // DetailsList
    const columns: any = Array.from({ length: columnNum }, (v, i) => i + 1).map(
        (item) => {
            const index = item - 1
            return {
                key: `column${item}`,
                name: (
                    <>
                        <div style={{ display: 'flex' }}>
                            <TooltipHost
                                content={'ヘッダー文字を入力'}
                                // Give the user more time to interact with the tooltip before it closes
                                closeDelay={500}
                                id={`column${item}`}
                            >
                                <TextField
                                    placeholder="ヘッダーを入力"
                                    id={`column${item}`}
                                    onChange={(event) =>
                                        onChangeHeader(event, index)
                                    }
                                    defaultValue={headersText[index]}
                                />
                            </TooltipHost>
                            <TooltipHost
                                content={'列の長さを入力'}
                                // Give the user more time to interact with the tooltip before it closes
                                closeDelay={500}
                                id={`columnWidth${item}`}
                            >
                                <TextField
                                    placeholder="列長い"
                                    id={`columnWidth${item}`}
                                    type={'number'}
                                    onChange={(event) =>
                                        onChangeWidthHeader(event, index)
                                    }
                                    defaultValue={columnsWidth[
                                        index
                                    ].toString()}
                                />
                            </TooltipHost>
                        </div>
                    </>
                ),
                fieldName: `fieldName${item}`,
                minWidth: 50,
                maxWidth: 150,
            }
        }
    )

    let row = {}
    columns.map((c, index) => {
        row[c.fieldName] = (
            <Dropdown
                id={`${c.fieldName}`}
                placeholder="選択Control"
                options={options}
                defaultSelectedKey={columnsType[index]}
                onChange={(event, option) =>
                    onChangeDropdown(event, option, index)
                }
                styles={{
                    root: {
                        minWidth: 170,
                        maxWidth: 200,
                    },
                }}
            />
        )
    })
    const items: any[] = [row]

    /**
     * genarate data for GRID, close dialog
     */
    function onClickCreateGrid() {
        const gridData = {
            rowNum,
            columnNum,
            headerHeight,
            rowHeight,
            header: headersText,
            rows: columnsType,
            columnsWidth: columnsWidth,
        }
        const newGridData = generateGridData(gridData, doubleSelectedControl)
        updateGridPropertiesControl(newGridData)
        toggleHideDialog(null)
    }

    /**
     * when change value of row number, edit rowNum state
     * @param event
     */
    function onChangeRowNum(event: any) {
        setRowNum(event.currentTarget.value)
    }

    /**
     * when change value of column number, edit column state
     * generate header text,columns width & column type follow new column number
     * @param event
     */
    function onChangeColumnNum(event: any) {
        const newColNum: number = Number(event.currentTarget.value)
        setColumnNum(newColNum)
        const stateData = generateStateArr(
            headersText,
            columnsWidth,
            columnsType,
            newColNum
        )
        setHeadersText(stateData.headers)
        setColumnsWidth(stateData.widths)
        setColumnsType(stateData.types)
    }

    /**
     * when change value of row height, edit RowHeigh state
     * @param event
     */
    function onChangeRowHeigh(event: any) {
        setRowHeight(event.currentTarget.value)
    }

    /**
     * when change value of HeaderHeight, edit HeaderHeight state
     * @param event
     */
    function onChangeHeaderHeight(event: any) {
        setHeaderHeight(event.currentTarget.value)
    }

    /**
     * when change value of Header text, edit headersText state
     * @param event
     * @param index
     */
    function onChangeHeader(event: any, index: number) {
        let tmpHeaderTxtArr = [...headersText]
        tmpHeaderTxtArr[index] = event.currentTarget.value
        setHeadersText(tmpHeaderTxtArr)
    }

    /**
     * when change value of WidthHeader text, edit WidthHeader state
     * @param event
     * @param index
     */
    function onChangeWidthHeader(event: any, index: number) {
        let tmpWidthArr = [...columnsWidth]
        tmpWidthArr[index] = Number(event.currentTarget.value)
        setColumnsWidth(tmpWidthArr)
    }

    /**
     * when change value of type of control, edit columnsType state
     * @param event
     * @param option
     * @param index
     */
    function onChangeDropdown(event: any, option: any, index: number) {
        let tmpTypeArr = [...columnsType]
        tmpTypeArr[index] = option.key
        setColumnsType(tmpTypeArr)
    }

    /**
     * close dialog and clear selection control
     * @param event
     */
    function toggleHideDialog(event: any) {
        setShowDialog(false)
        clearSelectControl()
    }

    return (
        <DialogDefault
            hidden={!showDialog}
            onDismiss={toggleHideDialog}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
            minWidth={800}
        >
            <LineGridStyle>
                <div className="propsLine">
                    <div className="groupItem">
                        <Label>行数</Label>
                        <TextField
                            id={rowId}
                            type={'number'}
                            min={0}
                            max={30}
                            defaultValue={rowNum.toString()}
                            styles={narrowTextFieldStyles}
                            onChange={(e) => onChangeRowNum(e)}
                        />
                    </div>
                </div>

                <div className="propsLine">
                    <div className="groupItem">
                        <Label>列数</Label>
                        <TextField
                            id={columnId}
                            type={'number'}
                            min={1}
                            max={10}
                            defaultValue={columnNum.toString()}
                            styles={narrowTextFieldStyles}
                            onChange={(e) => onChangeColumnNum(e)}
                        />
                    </div>
                    <div className="groupItem">
                        <Label>列高さ</Label>
                        <TextField
                            id={columnId + '1'}
                            type={'number'}
                            min={1}
                            max={900}
                            defaultValue={rowHeight.toString()}
                            styles={narrowTextFieldStyles}
                            onChange={(e) => onChangeRowHeigh(e)}
                        />
                    </div>
                    <div className="groupItem">
                        <Label>ヘッダー高さ</Label>
                        <TextField
                            id={columnId + '2'}
                            type={'number'}
                            min={1}
                            max={900}
                            defaultValue={headerHeight.toString()}
                            styles={narrowTextFieldStyles}
                            onChange={(e) => onChangeHeaderHeight(e)}
                        />
                    </div>
                </div>
            </LineGridStyle>
            <Label>表デザイン</Label>
            <DetailStyle>
                <DetailsList
                    items={items}
                    columns={columns}
                    //layoutMode={DetailsListLayoutMode.fixedColumns}
                    selectionMode={SelectionMode.none}
                />
            </DetailStyle>
            <DialogFooter>
                <PrimaryButton onClick={onClickCreateGrid} text="設定" />
                <DefaultButton onClick={toggleHideDialog} text="キャンセル" />
            </DialogFooter>
        </DialogDefault>
    )
}

export default GridCreateDialog
