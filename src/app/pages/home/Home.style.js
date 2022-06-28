import styled from 'styled-components'

const HomeStyle = styled.div`
    strong {
        font-size: 20px;
        line-height: 26px;
    }

    p {
        font-size: 16px;
        line-height: 22px;
        color: #8c8c8c;
        margin: 0;
    }

    a {
        text-decoration: none;
    }

    .control-toolbar {
        position: fixed;
        width: 48px;
        padding: 4px;
        background-color: #e5e5e5;
        border-radius: 5px;
        top: 144px;
        left: 16px;
        
        .palette {
            max-height: 420px;
            overflow-y: scroll;
            .size-controls {
                width: 32px;
                height: 32px;
            }
        }
    }

    .properties-controls {
        &.hide {
            margin-right: -27%;
        }
        transition: margin 300ms;
    }
`

export { HomeStyle }
