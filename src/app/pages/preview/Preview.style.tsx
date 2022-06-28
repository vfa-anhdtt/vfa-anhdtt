import styled from 'styled-components'

const PreviewStyle = styled.div`
    background: #c8c2c2;
    .preview-toolbar {
        width: 100%;
        height: 60px;
        margin-bottom: 20px;
        background-color: ffffff;
        display: flex;
        justify-content: right;
        align-items: center;

        .toolbar-details {
            margin-right: 20%;
            display: flex;
        }
    }

    .preview-page {
        width: ${(props) => props['width-change']}px;
        height: ${(props) => props['height-change']}px;
        .preview-konva_demo {
            border: 1px solid #655f5f;
        }
    }
`

export { PreviewStyle }
