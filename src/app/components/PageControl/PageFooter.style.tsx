import styled from 'styled-components'
/**
 * Define CSS for page-footer-control
 */
const PageFooterStyle = styled.div`
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    z-index: 11;
    a {
        text-decoration: none;
    }
    .pageFootContent {
        padding: 5px;
        background-color: #e6e6e6;
        // border: 2px solid #4caf50;
        text-align: center;
        border-radius: 4px;
        width: 500px;
        display: flex;
        justify-content: space-between;
    }
`
export { PageFooterStyle }
