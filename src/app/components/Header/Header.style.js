import styled from 'styled-components'

const HeaderStyle = styled.div`
    .header {
        background: #e4e8f2 0% 0% no-repeat padding-box;
    }

    .toolbar {
        padding: 0 32px;
    }
`

const styleButtonRefresh = {
    root: {
        background: 'rgb(0, 120, 212)',
        color: '#ffffff',
        border: '1px solid rgb(0, 120, 212)',
        borderRadius: '5px',
    },
    rootHovered: {
        backgroundColor: 'rgb(16, 110, 190)',
        border: '1px solid rgb(16, 110, 190)',
        color: 'rgb(255, 255, 255)',
    },
    rootPressed: {
        backgroundColor: 'rgb(16, 110, 190)',
        border: '1px solid rgb(16, 110, 190)',
        color: 'rgb(255, 255, 255)',
    },
}

export { HeaderStyle, styleButtonRefresh }
