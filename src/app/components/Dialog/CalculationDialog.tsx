import { useState, useEffect } from 'react'
import { DialogFooter } from '@fluentui/react/lib/Dialog'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { Label } from '@fluentui/react/lib/Label'
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField'
import {
    DetailsList,
    SelectionMode,
    Selection,
} from '@fluentui/react/lib/DetailsList'
import { useId } from '@fluentui/react-hooks'
import { CONTROLS_TYPES } from '../../../constants'
import { setOpenCalculationDialogAction } from '../../../stores/control/ControlAction'
import { isObjectEmpty } from '../../../utils'
import { Dropdown, IDropdownStyles } from '@fluentui/react/lib/Dropdown'
import {
    CalculationDialogStyle,
    NumberProcessingStyle,
} from './CalculationDialog.style'
import { useStore } from '../../../hooks'
import React from 'react'
import {
    getMathematicalSymbols,
    getInputFormulaTextField,
    onChangeDropdownRoundingOptions,
    onChangeNumberAfterDots,
    onClickAddFormulaTextField,
    onPressBackSpaceDown,
    searchTextbox,
} from './CalculationLogicFunctions'

/**
 * #17457: Show calculation dialog and save formula
 * @Author NguyenNDK
 * @returns CalculationDialog
 */
function CalculationDialog() {
    const [state, dispatch] = useStore()
    const {
        listControl,
        selectedControl,
        calculationControl: { isShowCalculation },
    } = state
    // Use for open dialog
    const [showDialog, setShowDialog] = useState(false)

    const rowId = useId('rowId')

    // Close CalculationDialog
    const dispatchCloseCalculationDialog = () => {
        dispatch(setOpenCalculationDialogAction(false))
    }

    // Use for list numeric text
    const [itemsTextBox, setItemsTextBox] = useState([])

    // Get value of rounding dropdown
    const [dropdownRoundingItem, setDropdownRoundingItem] = useState()

    // Save formula as an array
    const [arrayFormula, setArrayFormula] = useState([])

    // Get a lot values of list numeric list
    const [selectionDetails, setSelectionDetails] = useState([])

    // Get calculations: SUM or AVG
    const [dropdownCalculationItem, setDropdownCalculationItem] = useState()

    // Params from details list
    const columns = [
        {
            key: 'column1',
            name: 'Select all',
            fieldName: 'text',
            minWidth: 200,
            maxWidth: 300,
        },
    ]

    // List mathematical symbols
    const calculations = [
        { key: 1, text: '+' },
        { key: 2, text: '-' },
        { key: 3, text: '*' },
        { key: 4, text: '/' },
        { key: 5, text: '(' },
        { key: 6, text: ')' },
    ]

    // List rounding dropdown
    const dropdownRoundingOptions = [
        { key: 'A', text: '計算結果通りの値', value: 'parseFloat' },
        { key: 'B', text: '切り捨て', value: 'Math.floor' },
        { key: 'C', text: '切り上げ', value: 'Math.ceil' },
        { key: 'D', text: '四捨五入', value: 'Math.round' },
    ]

    // List calculus dropdown
    const dropdownCalculationOptions = [
        { key: 'A', text: '合計', value: 'SUM[' },
        { key: 'B', text: '平均', value: 'AVE[' },
    ]

    const roundingTextFieldStyles: Partial<ITextFieldStyles> = {
        fieldGroup: { width: 70 },
    }

    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 302 },
    }

    const textFieldStyle = {
        width: 300,
        height: 130,
        border: '1px solid black',
    }

    const detailListStyle = {
        root: {
            height: 130,
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

    // Mathematical symbols
    const calculateButton = calculations.map((option, key) => (
        <PrimaryButton
            key={key}
            onClick={() => getCalculation(option.text)}
            styles={{
                root: {
                    backgroundColor: '#017FFF',
                    color: '#fff',
                    minWidth: '40px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '5px',
                },
            }}
        >
            {option.text}
        </PrimaryButton>
    ))

    // If isShowCalculation is true, render the calculation dialog
    useEffect(() => {
        // If empty selectedControl close dialog
        if (isObjectEmpty(selectedControl)) {
            dispatchCloseCalculationDialog()
            setShowDialog(false)
        }
        // Open dialog
        else {
            // Show all textbox controls
            // And get selectedControl.formula
            if (isShowCalculation) {
                setArrayFormula(selectedControl.formula)
                setItemsTextBox([])
                setShowDialog(true)
                searchTextboxControl()
            }
            // Close dialog
            else {
                setShowDialog(false)
            }
        }
        // Bug after open dialog and double click on Image Control
        // if selectedControl.type === IMAGE close dialog
        if (selectedControl.type !== CONTROLS_TYPES.TEXTBOX) {
            dispatchCloseCalculationDialog()
            setShowDialog(false)
        }
    }, [isShowCalculation, selectedControl])

    // Find and list all text box
    function searchTextboxControl() {
        // Get list control to set formula
        const listControlText = searchTextbox(
            listControl,
            CONTROLS_TYPES,
            selectedControl.id
        )

        // Set list data to show
        setItemsTextBox(listControlText)
    }

    // Add ( + , - , * , / ) after clicked mathematical symbols button
    function getCalculation(calculation) {
        getMathematicalSymbols(
            arrayFormula,
            setArrayFormula,
            selectedControl,
            calculation
        )
    }

    // Get list item selected
    const getSelectionDetails = () => {
        const selectionCount = selection.getSelection().length
        const newArr = selection
            .getSelection()
            .map((i: any) => i.key)
            .join(' , ') // replace . to , for better calculation
            .split(' ')

        return selectionCount ? newArr : []
    }

    // Get list item selected
    const createSelection = () => {
        return new Selection({
            onSelectionChanged: () =>
                setSelectionDetails(getSelectionDetails()),
            getKey: (item: any) => item.key,
        })
    }

    // Use for createSelection()
    const [selection] = useState(createSelection())

    // Get calculations: SUM or AVG
    const onChangeDropdownCalculations = (event: any, option: any) => {
        setDropdownCalculationItem(option.value)
    }

    // Add calculus into formula text field
    function onClickAddFormulaField() {
        onClickAddFormulaTextField(
            selectedControl,
            selectionDetails,
            dropdownCalculationItem,
            setArrayFormula,
            arrayFormula,
            selection
        )
    }

    /**
     * Get numeric textbox when double click
     * @param item
     */
    const onDoubleClickItem = (item: any): void => {
        // If length of selectedControl.formula === 0
        // push textbox item after double click to arrayFormula
        if (selectedControl.formula.length === 0) {
            setArrayFormula([...arrayFormula, item.key])
        }
        // If length of selectedControl.formula !== 0
        // push textbox item to selectedControl.formula after double click
        // and set back to arrayFormula
        else {
            selectedControl.formula = [...selectedControl.formula, item.key]
            setArrayFormula([...selectedControl.formula])
        }
    }

    // Delete all elements of formula text field
    function deleteAllElement() {
        // If length of array formula !== 0 set array formula []
        if ((arrayFormula || []).length !== 0) {
            setArrayFormula([])
        }

        // If selectedControl.formula !== 0 set selectedControl.formula []
        // And set back to arrayFormula
        if ((selectedControl.formula.length || []).length !== 0) {
            selectedControl.formula = []
            setArrayFormula([...selectedControl.formula])
        }
    }

    /**
     * Get option rounding dropdown
     * @param option
     */
    const changeOptionDropDown = (option) => {
        arrayFormula[0] = option.value + '('
        arrayFormula.splice(-1, 1, `)`)
        setArrayFormula([...arrayFormula])
    }

    /**
     * Add or change rounding dropdown option
     * @Author NguyenNDK
     * @param event
     * @param option
     */
    const onChangeDropdownRounding = (event: any, option: any) => {
        onChangeDropdownRoundingOptions(
            event,
            option,
            setDropdownRoundingItem,
            dropdownRoundingItem,
            arrayFormula,
            changeOptionDropDown,
            setArrayFormula,
            selectedControl
        )
    }

    /**
     * Take the number after dots
     * @Author NguyenNDK
     * @param ev
     */
    function onChangeAfterDots(ev) {
        onChangeNumberAfterDots(
            ev,
            arrayFormula,
            setArrayFormula,
            selectedControl
        )
    }

    // On click add formula to selectedControl properties
    function onClickAddFormula() {
        selectedControl.formula = arrayFormula
        setArrayFormula([])
        toggleHideDialog(false)
        setSelectionDetails([])
        selection.setAllSelected(false)
    }

    // Close Calculation Dialog
    function toggleHideDialog(event: any) {
        setSelectionDetails([])
        setArrayFormula([])
        setShowDialog(false)
        dispatchCloseCalculationDialog()
        selection.setAllSelected(false)
    }

    // Close Calculation Dialog when X button is clicked
    function closeDialog() {
        setArrayFormula([])
        setShowDialog(false)
        dispatchCloseCalculationDialog()
        selection.setAllSelected(false)
    }

    // Get value when user enter value in formula text field
    function getInputFormula(e) {
        getInputFormulaTextField(
            e,
            arrayFormula,
            setArrayFormula,
            selectedControl
        )
    }

    // On backspace down delete element in formula text field
    function onBackSpaceDown(ev) {
        onPressBackSpaceDown(ev, selectedControl, arrayFormula, setArrayFormula)
    }

    return (
        <>
            {showDialog ? (
                <CalculationDialogStyle>
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
                        計算式設定
                    </Label>
                    <div className="calculate">{calculateButton}</div>
                    <div className="container">
                        <DetailsList
                            items={itemsTextBox}
                            columns={columns}
                            selectionMode={SelectionMode.multiple}
                            setKey="set"
                            getKey={(item: any) => item.key}
                            selection={selection}
                            isHeaderVisible={false}
                            // onActiveItemChanged={selectedTextBoxItem}
                            styles={detailListStyle}
                            selectionPreservedOnEmptyClick={true}
                            enterModalSelectionOnTouch={true}
                            onItemInvoked={onDoubleClickItem}
                        />
                        <div style={{ marginTop: '10px' }}>
                            <Dropdown
                                onChange={(event, option) =>
                                    onChangeDropdownCalculations(event, option)
                                }
                                placeholder="データ関数"
                                options={dropdownCalculationOptions}
                                styles={dropdownStyles}
                            />
                        </div>
                        <div className="button-input">
                            <PrimaryButton
                                onClick={onClickAddFormulaField}
                                text="データ関数を計算式に追加"
                            />
                        </div>
                        <TextField
                            id="formulaField"
                            style={textFieldStyle}
                            placeholder="計算 式"
                            multiline
                            value={
                                (selectedControl.formula || []).length === 0
                                    ? arrayFormula.join('')
                                    : selectedControl.formula.join('')
                            }
                            resizable={false}
                            onChange={(e) => getInputFormula(e)}
                            onKeyDown={(ev) => onBackSpaceDown(ev)}
                        />
                        <div className="delete-button">
                            <PrimaryButton
                                styles={{
                                    root: {
                                        minWidth: '112px',
                                    },
                                }}
                                text="全削除"
                                onClick={deleteAllElement}
                            />
                        </div>
                        <NumberProcessingStyle>
                            <Dropdown
                                onChange={(event, option) =>
                                    onChangeDropdownRounding(event, option)
                                }
                                placeholder="計算結果の小数点扱い"
                                options={dropdownRoundingOptions}
                                styles={dropdownStyles}
                            />
                            <div className="dot">
                                <Label>小数点第</Label>
                                <TextField
                                    id={rowId}
                                    styles={roundingTextFieldStyles}
                                    type={'number'}
                                    onChange={(ev) => onChangeAfterDots(ev)}
                                />
                                <Label>位で実施</Label>
                            </div>
                        </NumberProcessingStyle>
                    </div>
                    <DialogFooter>
                        <PrimaryButton
                            onClick={onClickAddFormula}
                            text="選択"
                        />
                        <DefaultButton
                            onClick={toggleHideDialog}
                            text="キャンセル"
                        />
                    </DialogFooter>
                </CalculationDialogStyle>
            ) : null}
        </>
    )
}

export default CalculationDialog
