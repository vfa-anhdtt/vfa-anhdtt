import { SIZE_A4, SIZE_A3 } from '../../constants'

export const types = {
    SET_SIZE_KONVA: 'SET_SIZE_KONVA',
    SET_PROPS_CONTROLS: 'SET_PROPS_CONTROLS',
}

/**
 * use for form setting dialog, set size page and paper orientation
 * @param size
 * @returns
 */
export const setSizePageAction = (size: string) => {
    let getSize = {
        height: 0,
        width: 0,
        type: ''
    }
    getSize.type = size
    
    switch (size) {
        case 'A3Horizon':
            getSize.height = SIZE_A3.WIDTH
            getSize.width = SIZE_A3.HEIGHT
            break;
        case 'A3Vertical':
            getSize.height = SIZE_A3.HEIGHT
            getSize.width = SIZE_A3.WIDTH
            break;
        case 'A4Horizon':
            getSize.height = SIZE_A4.WIDTH
            getSize.width = SIZE_A4.HEIGHT
            break;
        default:
            getSize.height = SIZE_A4.HEIGHT
            getSize.width = SIZE_A4.WIDTH
            break;
    }
    return {
        type: types.SET_SIZE_KONVA, payload: getSize
    }
}

/**
 * use for form setting dialog, set props for text in controls
 * @param params
 * @returns
 */
export const setPropsControlsAction = (params: any) => {
    return {
        type: types.SET_PROPS_CONTROLS, payload: params
    }
}