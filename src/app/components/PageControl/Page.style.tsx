import styled from 'styled-components'

const PageStyle = styled.div`
    margin: 5px;
    border: ${(props) => (props['focus-page'] ? '3' : '1')}px solid;
    border-color: ${(props) => (props['focus-page'] ? 'blue' : 'black')};
    border-radius: 25px;
    cursor: pointer;

    .pageHead {
        padding: 5px;
        display: flex;
        justify-content: flex-end;
        margin: 2px;
    }
    .pageTitle {
        display: flex;
        justify-content: flex-start;
        margin: 6px;
    }
    .pageContent {
        display: flex;
        justify-content: center;
    }
`

export { PageStyle }
