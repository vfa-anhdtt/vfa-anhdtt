import styled from 'styled-components'

const CollapseStyle = styled.div`
    .collapse-header {
        height: 40px;
        outline: none;
        background: #f0f0f0 0% 0% no-repeat padding-box;
        label {
            color: #1f31a5;
        }

        .collapse-header_icon {
            font-size: 0.8rem;
            color: #1f31a5;
        }
    }

    .collapse-content {
        background: #f7f7f7 0% 0% no-repeat padding-box;
        overflow: hidden;

        &.close {
            max-height: 0px;
        }
        &.open {
            max-height: 800px;
        }
        transition: max-height 300ms ease-out;
    }
`

export { CollapseStyle }
