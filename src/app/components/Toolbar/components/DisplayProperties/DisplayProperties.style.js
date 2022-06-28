import styled from 'styled-components'

const DisplayPropertiesStyle = styled.div`
    ion-accordion-group {
        ion-accordion {
            ion-item {
                ion-icon {
                    color: #1f31a5;
                }
            }
            ion-list {
                ion-col {
                    padding: 4px 8px;
                }
            }
        }
    }
`

const DisplayInputStyle = { root: { width: 100 } }

export { DisplayPropertiesStyle, DisplayInputStyle }
