import { useState, useEffect } from 'react'
import { DialogFooter } from '@fluentui/react/lib/Dialog'
import { SearchDialogStyle } from './SearchControlDialog.style'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { Label } from '@fluentui/react/lib/Label'
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField'
import {
    DetailsList,
    SelectionMode,
    Selection,
} from '@fluentui/react/lib/DetailsList'
import { Dropdown } from '@fluentui/react/lib/Dropdown'
import { useId } from '@fluentui/react-hooks'
import { CONTROLS_TYPES } from '../../../constants'
import {
    gotoControlAction,
    setOpenSearchDialogAction,
} from '../../../stores/control/ControlAction'

import { useStore } from '../../../hooks'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a dialog for search control
 */
function SearchControlDialog() {
    const [state, dispatch] = useStore()
    const {
        listControl,
        searchControl: { isShowSearch },
    } = state

    //style for text field
    const narrowTextFieldStyles: Partial<ITextFieldStyles> = {
        fieldGroup: { width: 300 },
    }

    const [showDialog, setShowDialog] = useState(false)

    const dispatchGotoControl = (id) => {
        // #18469-Edit-page-control-scroll MOD : add listControl
        dispatch(gotoControlAction(id, listControl))
    }

    const dispatchCloseSearchDialog = () => {
        dispatch(setOpenSearchDialogAction(false, selectedID))
    }

    const [searchID, setSearchID] = useState('')
    const [searchType, setSearchType] = useState('')
    const [items, setItems] = useState([])
    const [selectedID, setSelectedID] = useState('')

    const rowId = useId('rowId')
    const columnId = useId('columnId')

    // Option controller
    const options = [
        { key: CONTROLS_TYPES.LABEL, text: 'ラベル' },
        { key: CONTROLS_TYPES.TEXTBOX, text: '文字テキスト' },
        { key: CONTROLS_TYPES.CHECKBOX, text: 'チェックボックス' },
        { key: CONTROLS_TYPES.RADIO, text: 'ラジオボタン' },
        { key: CONTROLS_TYPES.COMBOBOX, text: 'コンボボックス' },
        { key: CONTROLS_TYPES.LISTBOX, text: 'リストボックス' },
        { key: CONTROLS_TYPES.LINE, text: 'ライン（線）' },
        { key: CONTROLS_TYPES.SIGNATURE, text: '査印' },
        { key: CONTROLS_TYPES.GRID, text: 'グリッド（表）' },
        { key: CONTROLS_TYPES.NONE, text: '全て' },
    ]

    //selection of Datalist
    const selection = new Selection({
        onSelectionChanged: () => {
            const selectionCount = selection.getSelectedCount()
            //when data in list is selected, set value for state
            if (selectionCount) {
                setSelectedID(selection.getSelection()[0]['key'].toString())
            }
        },
    })

    //use for detailList
    const _getKey = (item: any, index?: number): string => {
        return item.key
    }

    // DetailsList
    // #17458 update SearchDialog UI --->
    const columns = [
        {
            key: 'column1',
            name: 'ID',
            fieldName: 'key',
            minWidth: 65,
            maxWidth: 65,
        },
        {
            key: 'column2',
            name: 'コントロール種類',
            fieldName: 'text',
            minWidth: 100,
            maxWidth: 100,
        },
    ]
    // <--- #17458 update SearchDialog UI

    //when isShowSearch is true, show dialog
    useEffect(() => {
        if (isShowSearch) {
            setShowDialog(true)
            setSearchID('')
            setSearchType('')
            setItems([])
            setSelectedID('')
        }
    }, [isShowSearch])

    /**
     * when change value of SearchID, reset selected ID and set SearchID state
     * @param event
     */
    function onChangeIDValue(event: any) {
        setSelectedID('')
        setSearchID(event.target.value.toLowerCase())
    }

    /**
     * when change value of SearchType, reset selected ID and set SearchType state
     * @param event
     * @param option
     */
    function onChangeDropdown(event: any, option: any) {
        setSelectedID('')
        setSearchType(option.key)
    }

    /**
     * search control and set Items state
     */
    function onClickSearchControl() {
        setSelectedID('')
        const controls = listControl.filter(
            (control) =>
                (!searchType ||
                    searchType === CONTROLS_TYPES.NONE ||
                    control.type === searchType) &&
                (!searchID || control.id.toLowerCase().indexOf(searchID) >= 0)
        )
        const results = []
        controls.map((control) => {
            results.push({
                key: control.id,
                text: `${control.text}`, //:${control.text}
            })
        })
        setItems(results)
    }

    /**
     * goto control selected
     */
    function onClickGoToControl() {
        // Set ccontrol to focus
        dispatchGotoControl(selectedID)

        // Hide popup
        setShowDialog(false)
    }

    /**
     *
     * @param event close dialog
     */
    function toggleHideDialog(event: any) {
        setShowDialog(false)
        dispatchCloseSearchDialog()
    }

    // #17458 update SearchDialog UI --->
    const detailListStyle = {
        root: {
            height: 250,
            width: 300,
            border: '1px solid black',
        },
    }

    const cancelButtonStyle = {
        root: {
            minWidth: '32px',
            height: '32px',
            borderRadius: '5px',
            padding: '0px',
            border: 'none',
        },
    }

    function closeDialog() {
        setShowDialog(false)
        dispatchCloseSearchDialog()
    }
    // <--- #17458 update SearchDialog UI

    // #17458 update SearchDialog UI --->
    return (
        <>
            {showDialog ? (
                <SearchDialogStyle>
                    <div style={{ textAlign: 'end' }}>
                        <DefaultButton
                            text="x"
                            styles={cancelButtonStyle}
                            onClick={closeDialog}
                        />
                    </div>
                    <Label
                        styles={{
                            root: {
                                fontSize: '20px',
                                padding: '0px',
                            },
                        }}
                    >
                        コントロール検索
                    </Label>
                    <div className="dropdown-list">
                        <Dropdown
                            id={`dropdown${columnId}`}
                            placeholder="コントロール種類選択"
                            options={options}
                            onChange={(event, option) =>
                                onChangeDropdown(event, option)
                            }
                        />
                    </div>
                    <div className="container">
                        <TextField
                            id={rowId}
                            styles={narrowTextFieldStyles}
                            onChange={onChangeIDValue}
                        />
                    </div>
                    <div className="btn-search">
                        <PrimaryButton
                            onClick={onClickSearchControl}
                            text="検索"
                        />
                    </div>
                    <Label
                        styles={{
                            root: {
                                fontSize: '16px',
                                padding: '10px 0px 0px 0px',
                            },
                        }}
                    >
                        検索結果
                    </Label>
                    <div className="search-list">
                        <DetailsList
                            items={items}
                            styles={detailListStyle}
                            columns={columns}
                            selectionMode={SelectionMode.single}
                            selection={selection}
                            getKey={_getKey}
                            setKey="set"
                        />
                    </div>
                    <DialogFooter>
                        <PrimaryButton
                            onClick={onClickGoToControl}
                            text="選択"
                            disabled={selectedID ? false : true}
                        />
                        <DefaultButton
                            onClick={toggleHideDialog}
                            text="キャンセル"
                        />
                    </DialogFooter>
                </SearchDialogStyle>
            ) : null}
        </>
    )
}
// <--- #17458 update SearchDialog UI

export default SearchControlDialog
