import styled from 'styled-components'

// 18504 delete image url in popup
// update style for dialog
const WrapImage = styled.div`
    margin: 0px auto;
    max-width: 740px;
    .image {
        padding: 4px 16px;
        flex: 3;
        display: flex;
        flex-direction: column;
        .choose {
            padding: 8px;
            display: flex;
            justify-content: space-between;
        }
        .url {
            padding: 8px;
            display: flex;
            justify-content: space-between;
            .url_label {
                flex: 1;
            }
            .url_text_field {
                flex: 3;
            }
        }
        .remove {
            padding: 9px 72px;
            right: 0;
        }
        .img {
            text-align: center;
            .imgBtn {
                min-width: 700;
                min-height: 410;
                margin: 0;
                position: absolute;
                top: 50%;
                left: 32%;
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
            }
        }
    }
`
export { WrapImage }
