import React, { useReducer } from 'react'
import { RootReducer, initialState } from './rootReducer'
import Context from './Context'

const RootStore = ({ children }) => {
    const value = useReducer(RootReducer, initialState)

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default RootStore
