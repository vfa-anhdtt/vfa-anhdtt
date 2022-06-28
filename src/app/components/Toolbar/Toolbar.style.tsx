import styled from 'styled-components'

interface controlsToolbarProps {
    heightDefault: number
}

const ToolbarStyle = styled.div`
    border: 1px solid #d9d3d385;
    .in-toolbar {
        padding: 0px 32px;
    }

    .drop-custom {
        position: absolute;
        left: 380px;
        top: 70px;
        border: 1px solid;
        z-index: 1;
        background: #ffffff;

        .line-drop {
            display: flex;
        }
    }

    .drop-size {
        position: absolute;
        left: 410px;
        top: 70px;
        border: 1px solid;
        background: #ffffff;
        display: flex;

        .rorate-icon {
            transform: rotate(90deg);
        }
    }
`

const ControlsToolbarStyle = styled.div`
    .list-control {
        display: flex;
        align-content: center;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: column;
        padding: 0px;
    }
`

const styleButtonControls = {
    icon: { color: 'black', fontSize: 16 },
}

const PropertiesToolbarStyle = styled.div<controlsToolbarProps>`
    max-height: ${(props) => `${props.heightDefault}px`};
    overflow-y: scroll;

    .header {
        display: flex;
        justify-content: space-between;
        padding: 2px 8px;
        background: #f7f7f7 0% 0% no-repeat padding-box;
        color: #333333;
    }

    .properties {
        margin-top: 100px;
        .size-40 {
            width: 40px;
            height: 40px;
        }
    }
`

const PagesToolbarStyle = styled.div`
    background: #f0f0f0;
    width: 200px;
    ${(props) => (props['is-preview'] ? 'top:72px;' : '')}
    right: 30px;
    position: absolute;
    top: 100px;

    .header {
        display: flex;
        justify-content: space-between;
        padding: 2px 8px;
        background: #f7f7f7 0% 0% no-repeat padding-box;
        color: #333333;
    }

    .addButton {
        padding-top: 10px;
        display: flex;
        justify-content: space-around;
    }
    .allPages {
        max-height: ${(props) => `${props['height-default']}px`};
        overflow-y: scroll;
    }
`

const styleButtonClosePropertiesToolBar = {
    icon: { color: 'black', fontSize: 10 },
}

export {
    ToolbarStyle,
    ControlsToolbarStyle,
    styleButtonControls,
    PropertiesToolbarStyle,
    styleButtonClosePropertiesToolBar,
    PagesToolbarStyle,
}
