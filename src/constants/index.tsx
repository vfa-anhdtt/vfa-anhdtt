import * as PropertiesControls from './PropertiesControls'

const CONTROLS_TYPES = {
    LABEL: 'LABEL',
    TEXTBOX: 'textbox',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    COMBOBOX: 'combobox',
    LISTBOX: 'listbox',
    GROUP: 'GROUP', // #17877 : change type group
    LINE: 'line',
    SIGNATURE: 'signature',
    GRID: 'grid',
    NONE: 'none',
    IMAGE: 'image',
    CALCULATE: 'checkbox',
}

const CONTROLS_DEFAULTS = {
    RECT: {
        STROKE: '#000000',
        FILL: '#ffffff',
        WIDTH: 150,
        HEIGHT: 100,
        ROTATION: 0,
    },
    CIRCLE: {
        STROKE: '#000000',
        FILL: '#ffffff',
        RADIUS: 50,
    },
    LABEL: {
        SIZE: '1.2rem',
        color: '#ffffff',
    },
}

const LIMITS = {
    RECT: {
        MAX: 1000,
        MIN: 10,
    },
    CIRCLE: {
        MAX: 500,
        MIN: 5,
    },
}

const DRAG_DATA_KEY = '__drag_data_payload__'

const LABEL_PROPERTIES_GLOBAL = {
    FONT_SIZE: [
        { key: 1, text: 'Normal', value: '1' },
        { key: 2, text: 'Heading 1', value: '2' },
        { key: 3, text: 'Heading 2', value: '1.5' },
        { key: 4, text: 'Heading 3', value: '1.17' },
        { key: 5, text: 'Heading 4', value: '1' },
        { key: 6, text: 'Heading 5', value: '0.83' },
        { key: 7, text: 'Heading 6', value: '0.67' },
        { key: 8, text: 'self-setup', value: '1.2' },
    ],
    FONT_WEIGHT: [
        { key: 1, text: '200', value: '200' },
        { key: 2, text: '500', value: '500' },
        { key: 3, text: '700', value: '700' },
        { key: 4, text: '900', value: '900' },
        { key: 5, text: 'Bold', value: 'bold' },
        { key: 6, text: 'Normal', value: 'Normal' },
        { key: 7, text: 'self-setup', value: '600' },
    ],
    FONT_STYLE: [
        { key: 1, text: 'italic', value: 'italic' },
        { key: 2, text: 'normal', value: 'normal' },
        { key: 3, text: 'oblique', value: 'oblique' },
    ],
    FONT_FAMILY: [
        { key: 1, text: 'Fira Sans', value: 'Fira Sans' },
        { key: 2, text: 'Segoe UI', value: 'Segoe UI' },
        { key: 3, text: 'sans-serif', value: 'sans-serif' },
        { key: 4, text: 'self-setup', value: 'Fira Sans Roboto' },
    ],
}

const FONT_FAMILY_LIST = [
    { key: 'Fira Sans', text: 'Fira Sans', value: 'Fira Sans' },
    { key: 'Segoe UI', text: 'Segoe UI', value: 'Segoe UI' },
    { key: 'sans-serif', text: 'sans-serif', value: 'sans-serif' },
    { key: 'self-setup', text: 'self-setup', value: 'Fira Sans Roboto' },
    { key: 'MS Gothic', text: 'MS Gothic', value: 'MS Gothic' },
]

// feature/#18350_Change_font_size_for_control --->>
// change constant font size
const FONT_SIZE_LIST = [
    { key: 12, text: '12', value: 12 },
    { key: 14, text: '14', value: 14 },
    { key: 16, text: '16', value: 16 },
    { key: 18, text: '18', value: 18 },
    { key: 20, text: '20', value: 20 },
    { key: 22, text: '22', value: 22 },
    { key: 24, text: '24', value: 24 },
    { key: 32, text: '32', value: 32 },
]
// feature/#18350_Change_font_size_for_control <<---

const FONT_STYLE_LIST = [
    { key: 'italic', text: 'italic', value: 'italic' },
    { key: 'normal', text: 'normal', value: 'normal' },
    { key: 'bold', text: 'bold', value: 'bold' },
]

const BORDER_WIDTH_LIST = [
    { key: 1, text: 1, value: 1 },
    { key: 2, text: 2, value: 2 },
    { key: 3, text: 3, value: 3 },
    { key: 4, text: 4, value: 4 },
]

const PROPERTIES_TOOLBAR_HEIGHT_DEFAULT = 600

const VERTICAL_ALIGN_LIST = [
    { key: 'top', text: 'top', value: 'top' },
    { key: 'middle', text: 'middle', value: 'middle' },
    { key: 'bottom', text: 'bottom', value: 'bottom' },
]

const ALIGN_LIST = [
    { key: 'left', text: 'left', value: 'left' },
    { key: 'center', text: 'center', value: 'center' },
    { key: 'right', text: 'right', value: 'right' },
]

const UNDO_REDO_CONTROLS = {
    ONE_STEP: 1,
    TWO_STEP: 4,
    THREE_STEP: 5,
    ZERO_STEP: 0,
    NEGATIVE_ONE_STEP: -1,
    TIME_DELAY_SAVE_HISTORY_CONTROLS: 300,
}

const COPY_CUT_PASTE_CONTROL = {
    IS_COPY: false,
    IS_CUT: false,
    PASTE_TIMES: 0,
}

const VERTICAL_ALIGN_PV_VALUE = {
    top: 'start',
    middle: 'center',
    bottom: 'end',
}

const SIZE_A3 = {
    WIDTH: 1123,
    HEIGHT: 1587,
}

const SIZE_A4 = {
    WIDTH: 794,
    HEIGHT: 1122,
}

const ALIGN_PV_VALUE = {
    left: 'start',
    center: 'center',
    right: 'end',
}

const KEY_NAME = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
}
const BORDER_TYPE_LIST = [
    { key: 'solid', text: 'solid', value: 'solid' },
    { key: 'dashed', text: 'dashed', value: 'dashed' },
]
const EMPTY_PAGE = { id: 'page1', imgSrc: '', children: [] }
const EMPTY_HIST = {
    id: 'page1',
    step: UNDO_REDO_CONTROLS.ZERO_STEP,
    data: [[]],
    number: UNDO_REDO_CONTROLS.THREE_STEP,
}

const JUMP_LENGTH = { NORMAL: 1, SHIFT: 10 }
export {
    PropertiesControls,
    CONTROLS_TYPES,
    CONTROLS_DEFAULTS,
    LIMITS,
    DRAG_DATA_KEY,
    LABEL_PROPERTIES_GLOBAL,
    FONT_FAMILY_LIST,
    FONT_STYLE_LIST,
    FONT_SIZE_LIST,
    BORDER_WIDTH_LIST,
    PROPERTIES_TOOLBAR_HEIGHT_DEFAULT,
    VERTICAL_ALIGN_LIST,
    ALIGN_LIST,
    UNDO_REDO_CONTROLS,
    VERTICAL_ALIGN_PV_VALUE,
    COPY_CUT_PASTE_CONTROL,
    SIZE_A4,
    SIZE_A3,
    ALIGN_PV_VALUE,
    KEY_NAME,
    BORDER_TYPE_LIST,
    EMPTY_PAGE,
    EMPTY_HIST,
    JUMP_LENGTH,
}
