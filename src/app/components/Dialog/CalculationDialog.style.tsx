import styled from 'styled-components'

// #18504 update CalculateDialog UI
const CalculationDialogStyle = styled.div`
    position: absolute;
    top: 110px;
    background: white;
    border: 1px solid black;
    padding: 8px 18px 14px 18px;
    right: 10px;
    border-radius: 5px;
    height: 590px;
    overflow-y: scroll;
    .calculate {
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
    }
    .container {
        margin: 10px auto 10px auto;
    }
    .button-input {
        text-align: end;
        margin: 10px 0px;
    }
    .delete-button {
        display: flex;
        justify-content: end;
        margin-top: 10px;
    }
`
const NumberProcessingStyle = styled.div`
    margin-top: 10px;
    width: 300px;
    .dot {
        display: flex;
        justify-content: space-evenly;
        padding-top: 10px;
        align-items: center;
    }
`
export { CalculationDialogStyle, NumberProcessingStyle }
