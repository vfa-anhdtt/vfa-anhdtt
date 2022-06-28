import styled from 'styled-components'

const DialogStyle = styled.div`
.formSettingDialog {
    background-color: blue;
    font-size: 100px;
}
`

const HeaderFormSettingStyle = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    margin-bottom: 30px;
    margin-top: -30px;

    h2 {
        width: 23%;
        margin-top: 10px;
    }

    p {
        margin-top: 15px;
        margin-right: 30px;
        font-size: 15px;
    }
`

const FormSettingDetails = styled.div`
    display: flex;

    .formLeft {
        height: 230px;
        width: 32%;
        margin-right: 2%;
        cursor: pointer;
        background: white;

        .titlePage {
            margin: 20px 10px 0 20px;
            font-size: 13px;
        }

        .titleActive {
            margin: 20px 10px 0 20px;
            color: #0091ff;
            font-weight: 900;
            font-size: 15px;
        }
    }

    .formRight {
        height: 320px;
        width: 100%;
        background: white;
        padding: 10px;
        overflow-y: scroll;
    }
`

const RowStyle = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 14px;

    .leftRow {
        width: 27%;
        margin-left: 20px;
    }

    .rightRow {
        display: flex;

        .ms-ChoiceFieldGroup :first-child {
            display: flex;

            .ms-ChoiceField {
                width: 180px;
            }

        }

        .ms-Dropdown-container {
            width: 180px;
        }

        .custom-Dropdown {
            width: 80px;
        }

        .ms-Toggle {
            display: flex;
            flex-direction: row;
            margin-right: 60px;
            margin-top: 15px;

            label {
                margin-left: 20px;
                font-size: 17px;
                padding: 0;
            }
        }
    }
`

const RowBlueStyle = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    background: #D4E1F5;
    font-size: 14px;

    .leftRow {
        width: 27%;
        margin-left: 20px;
    }
    
    .rightRow {
        display: flex;

        .ms-ChoiceFieldGroup :first-child {
            display: flex;

            .ms-ChoiceField {
                width: 180px;
            }

        }

        .ms-Dropdown-container {
            width: 180px;
        }

        .ms-Toggle {
            display: flex;
            flex-direction: row;
            margin-right: 60px;
            margin-top: 15px;

            label {
                margin-left: 20px;
                font-size: 17px;
                padding: 0;
            }
        }
    }
`

export { HeaderFormSettingStyle, DialogStyle, FormSettingDetails, RowStyle, RowBlueStyle }