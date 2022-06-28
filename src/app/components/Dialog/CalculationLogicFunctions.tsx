/**
 * Add +, -, *, / after click mathematical symbols button
 * @Author NguyenNDK
 * @param arrayFormula
 * @param setArrayFormula
 * @param selectedControl
 * @param calculation
 */
export function getMathematicalSymbols(
    arrayFormula,
    setArrayFormula,
    selectedControl,
    calculation
) {
    // If (arrayFormula || []).length !== 0
    // Add +, -, *, / to arrayFormula
    if ((arrayFormula || []).length !== 0) {
        setArrayFormula((oldItem) => [...oldItem, calculation])
    }

    // If (arrayFormula || []).length !== 0 and calculation === '('
    // add ( to arrayFormula
    if ((arrayFormula || []).length === 0 && calculation === '(') {
        setArrayFormula((oldItem) => [...oldItem, calculation])
    }

    // If ((selectedControl.formula.length || []).length !== 0)
    // Add +, -, *, / to selectedControl properties
    if ((selectedControl.formula.length || []).length !== 0) {
        selectedControl.formula.push(calculation)
        setArrayFormula([...selectedControl.formula])
    }
}

/**
 * Add input text into formula after clicked
 * @Author NguyenNDK
 * @param selectedControl
 * @param selectionDetails
 * @param dropdownCalculationItem
 * @param setArrayFormula
 * @param arrayFormula
 */
export function onClickAddFormulaTextField(
    selectedControl,
    selectionDetails, // list items selected
    dropdownCalculationItem, // get calculations: SUM or AVG
    setArrayFormula,
    arrayFormula,
    selection
) {
    const formulaArray = []
    // If length of selectedControl.formula === 0 push dropdownCalculationItem into arrayFormula
    if (selectedControl.formula.length === 0) {
        for (let index = 0; index < selectionDetails.length; index++) {
            // If list items selected length > 1
            // Then get item at index and push into formulaArray
            if (selectionDetails[index].length > 1) {
                const element = `${selectionDetails[index]}`
                formulaArray.push(element)
            }
            // If list items selected length > 1
            // Then get item at index and push into formulaArray
            else {
                const element = selectionDetails[index]
                formulaArray.push(element)
            }
        }

        // If dropdownCalculationItem !== undefined and formulaArray.length >1
        // Add dropdownCalculationItem to arrayFormula
        if (dropdownCalculationItem !== undefined && formulaArray.length > 1) {
            formulaArray.unshift(dropdownCalculationItem)
            formulaArray.push(']')
            setArrayFormula([...arrayFormula, ...formulaArray])
        }
    }
    // If length of selectedControl.formula === 0 push dropdownCalculationItem into selectedControl.formula
    else {
        for (let index = 0; index < selectionDetails.length; index++) {
            // If length of list items selected at index > 1
            // push `<${selectionDetails[index]}>` to formulaArray
            if (selectionDetails[index].length > 1) {
                const element = `${selectionDetails[index]}` // remove < > for better calculation
                formulaArray.push(element)
            } else {
                const element = selectionDetails[index]
                formulaArray.push(element)
            }
        }

        // If dropdownCalculationItem !== undefined and formulaArray.length >1
        // Add dropdownCalculationItem to selectedControl.formula
        // And set back to arrayFormula
        if (dropdownCalculationItem !== undefined && formulaArray.length > 1) {
            formulaArray.unshift(dropdownCalculationItem)
            formulaArray.push(']')
            selectedControl.formula = [
                ...selectedControl.formula,
                ...formulaArray,
            ]
        }
        setArrayFormula([...selectedControl.formula])
    }
    selection.setAllSelected(false)
}

/**
 * Find and list all text box
 * @Author NguyenNDK
 * @param listControl
 * @param CONTROLS_TYPES
 * @param selectedControlID
 */
export function searchTextbox(listControl, CONTROLS_TYPES, selectedControlID) {
    // Return param
    const results = []

    // Loop for process
    listControl.map((control: any) => {
        // Only get control if it is textbox & is not selected control
        if (
            control.type === CONTROLS_TYPES.TEXTBOX &&
            control.id !== selectedControlID
        ) {
            // Add to return param
            results.push({
                key: control.id,
                text: control.id,
            })
        }
    })
    return results
}

/**
 * Add or change rounding dropdown option
 * @Author NguyenNDK
 * @param event
 * @param option
 * @param setDropdownRoundingItem
 * @param dropdownRoundingItem
 * @param arrayFormula
 * @param changeOptionDropDown
 * @param setArrayFormula
 * @param selectedControl
 */
export function onChangeDropdownRoundingOptions(
    event: any,
    option: any,
    setDropdownRoundingItem, // Set rounding result item
    dropdownRoundingItem, // Get rounding result item
    arrayFormula,
    changeOptionDropDown,
    setArrayFormula,
    selectedControl
) {
    setDropdownRoundingItem(option.value)

    // If set rounding result item !== option.value && length of arrayFormula !== 0
    if (
        dropdownRoundingItem !== option.value &&
        (arrayFormula || []).length !== 0
    ) {
        // If arrayFormula[0] has 'Math' change rounding result item
        if (arrayFormula[0].includes('Math')) {
            changeOptionDropDown(option)
        }
        // If arrayFormula[0] has 'parseFloat' change rounding result item
        else if (arrayFormula[0].includes('parseFloat')) {
            changeOptionDropDown(option)
        }
        // Add to arrayFormula rounding result item
        else {
            arrayFormula.unshift(`${option.value}(`)
            arrayFormula.push(')')
            setArrayFormula([...arrayFormula])
        }
    }

    // If length of selectedControl.formula !== 0
    if ((selectedControl.formula.length || []).length !== 0) {
        // If arrayFormula[0] has 'Math'
        // Change rounding result item in selected control properties
        // And set back to arrayFormula
        if (arrayFormula[0].includes('Math')) {
            selectedControl.formula.splice(0, 1, `${option.value}(`)
            selectedControl.formula.splice(-1, 1, ')')
            setArrayFormula([...selectedControl.formula])
        }
        // If arrayFormula[0] has 'parseFloat'
        // Change rounding result item in selected control properties
        // And set back to arrayFormula
        else if (arrayFormula[0].includes('parseFloat')) {
            selectedControl.formula.splice(0, 1, `${option.value}(`)
            selectedControl.formula.splice(-1, 1, ')')
            setArrayFormula([...selectedControl.formula])
        }
        // Add to selectedControl.formula rounding result item
        // And set back to arrayFormula
        else {
            selectedControl.formula.unshift(`${option.value}(`)
            selectedControl.formula.push(')')
            setArrayFormula([...selectedControl.formula])
        }
    }
}

/**
 * Take the number after dots
 * @Author NguyenNDK
 * @param ev.currentTarget.value // Value of number after dots dropdown
 * @param arrayFormula
 * @param setArrayFormula
 * @param selectedControl
 */
export function onChangeNumberAfterDots(
    ev,
    arrayFormula,
    setArrayFormula,
    selectedControl
) {
    // If has value of number after dots dropdown && length of arrayFormula !== 0
    if (ev.currentTarget.value && (arrayFormula || []).length !== 0) {
        // If last item of arrayFormula has '.toFixed'
        // Replace first and last item of arrayFormula and change it to another value
        if (arrayFormula[arrayFormula.length - 1].includes('.toFixed')) {
            arrayFormula.splice(0, 1, '(')
            arrayFormula.splice(-1, 1, `).toFixed(${ev.currentTarget.value})`)
            setArrayFormula([...arrayFormula])
        }
        // Add new value of dropdown to first and last item of arrayFormula
        else {
            arrayFormula.unshift('(')
            arrayFormula[
                arrayFormula.length
            ] = `).toFixed(${ev.currentTarget.value})`
            setArrayFormula([...arrayFormula])
        }
    }

    // If length of selectedControl.formula !== 0
    if ((selectedControl.formula.length || []).length !== 0) {
        // If last item of selectedControl.formula has '.toFixed'
        // Replace first and last item of selectedControl.formula and change it to another value
        // And set back to arrayFormula
        if (selectedControl.formula.slice(-1)[0].includes('.toFixed')) {
            selectedControl.formula.splice(0, 1, '(')
            selectedControl.formula.splice(
                -1,
                1,
                `).toFixed(${ev.currentTarget.value})`
            )
            setArrayFormula([...selectedControl.formula])
        }
        // Add new value of dropdown to first and last item of selectedControl.formula
        else {
            selectedControl.formula.unshift('(')
            selectedControl.formula.push(`).toFixed(${ev.currentTarget.value})`)

            setArrayFormula([...selectedControl.formula])
        }
    }
}

/**
 * On backspace down delete element in formula text field
 * @Author NguyenNDK
 * @param ev
 * @param selectedControl
 * @param arrayFormula
 * @param setArrayFormula
 */
export function onPressBackSpaceDown(
    ev,
    selectedControl,
    arrayFormula,
    setArrayFormula
) {
    // If length of selectedControl.formula === 0
    // And on press down key is 'Delete'
    // Delelte last item of arrayFormula
    if ((selectedControl.formula || []).length === 0) {
        // If ev.key === 'Backspace' delete last item of arrayFormula
        if (ev.key === 'Backspace') {
            arrayFormula.pop()
            setArrayFormula([...arrayFormula])
            ev.preventDefault()
        }
    }
    // On press down key is 'Delete'
    // Delelte last item of selectedControl.formula
    else {
        // If ev.key === 'Backspace' delete last item of selectedControl.formula
        // and set back to arrayFormula
        if (ev.key === 'Backspace') {
            selectedControl.formula.pop()
            //  selectedControl.formula([...selectedControl.formula])
            setArrayFormula([...selectedControl.formula])
            ev.preventDefault()
        }
    }
}

/**
 *  Get value when user enter value in formula text field
 * @Author NguyenNDK
 * @param e
 * @param arrayFormula
 * @param setArrayFormula
 * @param selectedControl
 */
export function getInputFormulaTextField(
    e,
    arrayFormula,
    setArrayFormula,
    selectedControl
) {
    // NewValue is last item when user entered to formula text field
    const newValue = e.currentTarget.value.split(arrayFormula.join(''))[1]
    // If length of arrayFormula !== 0 and newValue !== undefined
    // Add newValue to arrayFormula
    if ((arrayFormula || []).length !== 0 && newValue !== undefined) {
        setArrayFormula([...selectedControl.formula])
        setArrayFormula([...arrayFormula, newValue])
    }
    // If length of arrayFormula === 0
    // Add e.currentTarget.value to arrayFormula
    else {
        setArrayFormula([...selectedControl.formula])
        setArrayFormula([...arrayFormula, e.currentTarget.value])
    }

    // If length of selectedControl.formula !== 0 and newValue !== undefined
    // Add newValues to selectedControl.formula
    // And set back to arrayFormula
    if (
        (selectedControl.formula || []).length !== 0 &&
        newValue !== undefined
    ) {
        const newValues = e.currentTarget.value.split(arrayFormula.join(''))[1]

        selectedControl.formula.push(newValues)
        setArrayFormula([...selectedControl.formula])
    }
}
