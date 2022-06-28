import styled from 'styled-components'

const TextFieldStyle = styled.div``

const TextFieldSelectStyle = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr;
`

const inputDefaultStyle = {
    root: { width: 160 },
    fieldGroup: {
        borderRadius: 5,
        outline: 'transparent',
        border: '1px solid #C4C4C4',
        ':hover': {
            border: '1px solid rgb(0, 120, 212)',
        },
        ':after': {
            border: 'none',
        },
    },
}

const labelDefaultStyle = {
    root: { paddingRight: 8 },
}

const DropdownDefaultStyle = {
    dropdown: { width: 160 },
}

export {
    TextFieldStyle,
    inputDefaultStyle,
    labelDefaultStyle,
    DropdownDefaultStyle,
    TextFieldSelectStyle,
}
