import styled from 'styled-components'
/**
 * feature/#17330-Preview-Add-comment-for-function
 * defined header's style for grid dialog
 */
const LineGridStyle = styled.div`
    height: 120px;

    .propsLine {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        height: 40px;
    }
    .groupItem {
        display: flex;
        width: 200px;
        justify-content: space-between;
    }
`

const DetailStyle = styled.div`
    .ms-DetailsRow-cell,
    .ms-DetailsHeader-cell {
        min-width: 200px !important;
        mmax-width: 210px !important;
    }
`
export { LineGridStyle, DetailStyle }
