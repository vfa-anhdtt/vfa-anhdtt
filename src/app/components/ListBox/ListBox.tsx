import React from 'react'

import { DetailsList } from '@fluentui/react/lib/DetailsList'
import { ListBoxStyle } from './ListBox.style'

/**
 * feature/#17330-Preview-Add-comment-for-function
 * Creates a ListBox for preview
 * @param props : property of control
 * @returns ListBox element
 */
function ListBox(props) {
    const items = [
        { key: 'A', text: 'Option A' },
        { key: 'B', text: 'Option B' },
        { key: 'C', text: 'Option C' },
        { key: 'D', text: 'Option D' },
        { key: 'E', text: 'Option E' },
        { key: 'F', text: 'Option F' },
        { key: 'G', text: 'Option G' },
        { key: 'H', text: 'Option H' },
        { key: 'I', text: 'Option I' },
        { key: 'J', text: 'Option J' },
    ]
    const columns = [
        {
            key: 'column1',
            name: 'Select all',
            fieldName: 'text',
            minWidth: 30,
            maxWidth: props.width,
        },
    ]
    return (
        <ListBoxStyle {...props} x={props.position.x} y={props.position.y}>
            <DetailsList
                items={items}
                columns={columns}
                setKey="set"
                // layoutMode={DetailsListLayoutMode.justified}
                // selection={this._selection}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="select row"
            />
        </ListBoxStyle>
    )
}

export default ListBox
