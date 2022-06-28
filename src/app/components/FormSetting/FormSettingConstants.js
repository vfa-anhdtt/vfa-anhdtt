const TAB_TITLE = {
    GENERAL_SETTING: 1,
    FONT_SETTING: 2,
    DISPLAY_SETTING: 3,
    CONTROL_SETTING: 4,
}

const DROPDOWN_DATA = {
    SIZE_PAGE: [
        {
            key: 'A3',
            text: 'A3 (297mm x 420mm)',
        },
        // {
        //     key: 'B4',
        //     text: 'A4 (257mm x 364mm)',
        // },
        {
            key: 'A4',
            text: 'A4 (210mm x 297mm)',
        },
        // {
        //     key: 'B5',
        //     text: 'B5 (182mm x 257mm)',
        // },
        // {
        //     key: 'A5',
        //     text: 'A5 (148mm x 210mm)',
        // },
    ],
    FONT_FAMILY: [
        { key: 'Fira Sans', text: 'Fira Sans' },
        { key: 'Segoe UI', text: 'Segoe UI' },
        { key: 'sans-serif', text: 'sans-serif' },
        { key: 'self-setup', text: 'self-setup' },
        { key: 'MS Gothic', text: 'MS Gothic' },
    ],
    // feature/#18350_Change_font_size_for_control --->>
    // change constant font size
    FONT_SIZE: [
        {
            key: 12,
            text: '12',
        },
        {
            key: 14,
            text: '14',
        },
        {
            key: 16,
            text: '16',
        },
        {
            key: 18,
            text: '18',
        },
        {
            key: 20,
            text: '20',
        },
        {
            key: 22,
            text: '22',
        },
        {
            key: 24,
            text: '24',
        },
        {
            key: 32,
            text: '32',
        },
    ],
    // feature/#18350_Change_font_size_for_control <<---
    HORIZON_POSITION: [
        {
            key: 'left',
            text: '左寄せ',
        },
        {
            key: 'center',
            text: '中央',
        },
        {
            key: 'right',
            text: '右寄せ',
        },
        {
            key: 'devided',
            text: '均等割り',
        },
    ],
    VERTICAL_POSITION: [
        {
            key: 'left',
            text: '上揃え',
        },
        {
            key: 'center',
            text: '中央揃え',
        },
        {
            key: 'right',
            text: '下揃え',
        },
    ],
    CALENDAR: [
        {
            key: 1,
            text: '会社設定',
        },
        {
            key: 2,
            text: '知暦',
        },
        {
            key: 3,
            text: '西暦',
        },
    ],
    GUIDE_INPUT: [
        {
            key: 1,
            text: '表示しない',
        },
        {
            key: 2,
            text: 'ガイドエリア表示',
        },
        {
            key: 3,
            text: 'ポップヒント表示',
        },
    ],
}

const FONT_STYLE = {
    BOLD: 'bold',
    ITALIC: 'italic',
}


const PAPER_ORIENTATION = [
    {
        key: 'Vertical',
        text: '縦',
    },
    {
        key: 'Horizon',
        text: '横',
        //   disabled: true
    },
]

// feature/#18448_Change_text_and_font_size_default --->>
// ADD constant text
const DEFAULT_VALUE = {
    SIZE_PAGE: 'A4',
    PAPER_ORIENTATION: 'Vertical',
    FONT_FAMILY: 'MS Gothic',
    FONT_SIZE: 12,

    // feature/#18643_update_form_setting -->>
    // ADD constant text
    COLOR_PLACEHODER: '#A6A6A6',
    // feature/#18643_update_form_setting <<--
}
// feature/#18448_Change_text_and_font_size_default <<---

export { TAB_TITLE, DROPDOWN_DATA, FONT_STYLE, PAPER_ORIENTATION, DEFAULT_VALUE }
