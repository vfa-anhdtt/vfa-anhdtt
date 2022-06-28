import styled from 'styled-components'

const EditorPageStyle = styled.main`
    &:focus-visible {
        outline: none;
    }
    margin: 16px 96px;
    background-color: #ffffff;
    .konvajs-content {
        border: 1px solid #000000b0;
        height: 1200px;
        background: #ffffff;
    }
`

export { EditorPageStyle }
