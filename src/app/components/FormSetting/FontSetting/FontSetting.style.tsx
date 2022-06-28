import styled from "styled-components";

const FontSettingStyle = styled.div`
    margin-top: 40px;
    height: 750px;

    .color_picker {
        margin-left: -6px;
    }

    textarea {
        font-family: ${(props) => props['props-family']};
        margin-left: 15px;
        width: 100%;
        height: 45px;
        display: flex;
        padding-top: 20px;
        padding-left: 20px;
        font-size: ${(props) => props['props-size']}px;
        font-weight: ${(props) => props['props-bold'] ? 900 : 10};
        font-style: ${(props) => props['props-italic'] ? 'italic' : ''};
        color: ${(props) => props['props-color']};
    }
`
export { FontSettingStyle }