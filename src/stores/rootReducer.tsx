// feature/#17694_Bug_Undo --->>
//  MOD change name file ControlReudcer to ControlReducer
import { controlReducer, controlState } from './control/ControlReducer'
// feature/#17694_Bug_Undo <<---
import { displayReducer, displayState } from './display/DisplayReducer'

const combineReducers = (reducers) => {
    return (state, action) => {
        return Object.keys(reducers).reduce((acc, prop) => {
            return {
                ...acc,
                ...reducers[prop]({ [prop]: acc[prop] }, action),
            }
        }, state)
    }
}

const initialState = {
    ...controlState,
    ...displayState,
}

const RootReducer = combineReducers({
    controlReducer,
    displayReducer,
})

export { RootReducer, initialState }
