import { useContext } from 'react'
import Context from '../stores/Context'

const useStore = () => {
    const [state, dispatch]: any = useContext(Context)
    return [state, dispatch]
}

export { useStore }
