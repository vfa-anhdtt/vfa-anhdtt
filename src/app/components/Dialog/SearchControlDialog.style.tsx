import styled from 'styled-components'

/**
 * Features / # 17330-Preview-Add-Comments-Functions
 * Define the style of search control dialog
 */

/**
 * #17458 update SearchDialog UI
 */
const SearchDialogStyle = styled.div`
    position: fixed;
    width: 300px;
    background: white;
    border-radius: 5px;
    top: 110px;
    left: 10px;
    z-index: 1;
    height: 590px;
    border: 1px solid black;
    padding: 8px 18px 14px 18px;
    .dropdown-list {
        padding-top: 14px;
    }
    .container {
        margin: 14px auto 14px auto;
    }
    .btn-search {
        display: grid;
        justify-content: space-around;
    }
    .search-list {
        margin-top: 14px;
        .ms-DetailsHeader {
            padding-top: 0px !important;
        }
    }
`

export { SearchDialogStyle }
