const LABEL = {
    ID: 0,
    TYPE: 'LABEL',
    COMMON: {
        POSITION: {
            X: 0,
            Y: 0,
        },
        SIZE: {
            WIDTH: 0,
            HEIGHT: 0,
        },
    },
}

// feature/#18448_change_text_and_font_size_default --->>
// change text default
const LABEL_PROPERTY = {
    id: 'Label1',
    text: 'ラベル',
    type: 'LABEL',
    position: { x: 0, y: 0 },
    // size: { width: 90, height: 15 },
    width: 90,
    height: 16,
    bold: false,
    italics: false,
    underline: false,
    // characterSpacing: 1,
    // margin: 1,
    //Even allocation
    // Next to the character position
    // Character position vertical
    backgroundColor: '#8c8c8c',
    borderOrNot: false,
    borderType: 'solid', //solid, dash
    borderColor: '#000000',
    borderWidth: 1,
    url: '',
    align: 'left', //left, center, or right
    verticalAlign: 'middle', //top, middle or bottom
    // displayText:
    visible: true,
    enable: true,
    parent: '',
}

const TEXTBOX_PROPERTY = {
    id: 'TextBox1',
    text: 'テキストボックス',
    // type: CONTROLS_TYPES.TEXTBOX,
    position: { x: 0, y: 0 },
    // size: { width: 90, height: 15 },
    width: 110,
    height: 16,
    bold: false,
    italics: false,
    // characterSpacing: 1,
    // margin: 1,
    //Even allocation
    // Next to the character position
    // Character position vertical
    formula: [],
    backgroundColor: '#FFFFFF',
    borderOrNot: false,
    borderType: 'solid', //solid, dash
    borderColor: '#000000',
    borderWidth: 1,
    password: false,
    placeHolder: '',
    tooltip: '',
    align: 'left', //left, center, or right
    verticalAlign: 'middle', //top, middle or bottom
    // displayText:
    visible: true,
    enable: true,
    maxLength: 100,
    parent: '',
}

const CHECKBOX_PROPERTY = {
    id: 'CheckBox1',
    text: 'チェックボックス',
    // type: CONTROLS_TYPES.CHECKBOX,
    position: { x: 0, y: 0 },
    // size: { width: 90, height: 15 },
    width: 130,
    height: 22,
    bold: false,
    italics: false,
    // characterSpacing: 1,
    // margin: 1,
    //Even allocation
    // Next to the character position
    // Character position vertical
    backgroundColor: '#FFFFFF',
    borderOrNot: false,
    borderType: 'solid', //solid, dash
    borderColor: '#000000',
    borderWidth: 1,
    tooltip: '',
    align: 'left', //left, center, or right
    verticalAlign: 'middle', //top, middle or bottom

    checked: true,
    // displayText:
    visible: true,
    enable: true,
    parent: '',
}

const RADIO_PROPERTY = {
    id: 'Radio1',
    text: 'ラジオ',
    // type: CONTROLS_TYPES.RADIO,
    position: { x: 0, y: 0 },
    // size: { width: 90, height: 15 },
    width: 90,
    height: 16,
    // characterSpacing: 1,
    // margin: 1,
    //Even allocation
    // Next to the character position
    // Character position vertical
    backgroundColor: '#FFFFFF',
    borderOrNot: false,
    borderType: 'solid', //solid, dash
    borderColor: '#000000',
    borderWidth: 1,
    tooltip: '',
    align: 'left', //left, center, or right
    verticalAlign: 'middle', //top, middle or bottom

    checked: false,
    radioGroup: 'female',
    // displayText:
    visible: false,
    enable: true,
    parent: '',
}

const LISTBOX_PROPERTY = {
    id: 'ListBox1',
    text: 'リストボックス',
    // type: CONTROLS_TYPES.LISTBOX,
    position: { x: 0, y: 0 },
    // size: { width: 90, height: 15 },
    width: 90,
    height: 60,
    //Even allocation
    // Next to the character position
    // Character position vertical
    backgroundColor: '#FFFFFF',
    borderOrNot: true,
    borderType: 'solid', //solid, dash
    borderColor: '#000000',
    borderWidth: 1,
    tooltip: '',
    align: 'center', //left, center, or right
    verticalAlign: 'middle', //top, middle or bottom
    // displayText:
    visible: true,
    enable: true,
    parent: '',
}
const COMBOBOX_PROPERTY = {
    id: 'combobox1',
    text: '- 選択する -',
    position: { x: 0, y: 0 },
    width: 110,
    height: 20,

    backgroundColor: '#FFFFFF',
    borderOrNot: true,
    borderType: 'solid',
    borderColor: '#000000',
    borderWidth: 1,
    tooltip: '',
    align: 'center', //left, center, or right
    verticalAlign: 'middle', //top, middle or bottom
    visible: true,
    enable: true,
    parent: '',
}

const SIGNATURE_PROPERTY = {
    id: 'signature1',
    text: '署名スタンプ',
    position: { x: 0, y: 0 },
    borderRadius: 50,
    borderWidth: 1,
    color: '#FF0000',
    borderOrNot: false,
    borderColor: '#FF0000',
    borderType: 'solid',
    backgroundColor: '#FFFFFF',
    visible: true,
    boxSizing: 'border-box',
    width: 76,
    height: 76,
    fill: '#ddd',
    horizontalAlign: 'center',
    parent: '',
}

const LINE_PROPERTY = {
    id: 'Line',
    position: { x: 0, y: 0 },
    backgroundColor: '#000000',
    width: 200,
    height: 0,
    pointEnd: { x: -100, y: -100 },
    borderType: 'solid', //dashed, solid
    fill: 'black',
    stroke: 'black',
    strokeWidth: 1,
    parent: '',
}

const GRID_PROPERTY = {
    id: 'Grid1',
    text: 'Grid1',
    type: 'grid',
    position: { x: 50, y: 400 },
    // size: { width: 90, height: 15 },
    width: 203, //#17877 default width of grid
    height: 99, //#17877 default height of grid
    // characterSpacing: 1,
    // margin: 1,
    //Even allocation
    // Next to the character position
    // Character position vertical
    backgroundColor: '#000000',
    borderOrNot: false,
    borderType: 'solid', //solid, dash
    borderColor: 'black',
    borderWidth: 1,
    numRows: 2,
    numCols: 2,
    headerText: ['ヘッダー 1', 'ヘッダー 2'],
    headerHeight: 25,
    rowHeight: 35,
    align: 'left',
    verticalAlign: 'middle',
    rowData: [
        {
            id: 'label11',
            text: 'ラベル',
            type: 'LABEL',
            position: { x: 50, y: 120 },
            width: 80,
            height: 22,
            underline: false,
            backgroundColor: '#8c8c8c',
            borderOrNot: true,
            borderType: 'solid',
            borderColor: '#c7c6c6',
            borderWidth: 1,
            url: '',
            align: 'center',
            verticalAlign: 'middle',
            visible: true,
            enable: true,
        },
        {
            id: 'textbox11',
            text: 'テキストボックス',
            position: { x: 129, y: 139 },
            width: 120,
            height: 22,
            backgroundColor: '#FFFFFF',
            borderOrNot: false,
            borderType: 'solid',
            borderColor: '#000000',
            borderWidth: 1,
            password: false,
            placeHolder: '申請日を入れて',
            tooltip: '',
            align: 'left',
            verticalAlign: 'middle',
            visible: true,
            enable: true,
            maxLength: 100,
            type: 'textbox',
        },
    ],
    // displayText:
    visible: true,
    enable: true,
}
// feature/#18448_change_text_and_font_size_default <<---

const IMAGE_PROPERTY = {
    id: 'image1',
    text: 'image',
    // type: CONTROLS_TYPES.IMAGE ,
    position: { x: 0, y: 0 },
    width: 200,
    height: 200,
    url: '',
    // 18504 delete image url in popup
    // change url to imageData
    imageData:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=',
    imageDataDefault:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=',
    // Feature/#17462_Test_Fixbug -->
    // MOD change `backgroundColor` #FFFFFF to `#000000`
    backgroundColor: '#000000',
    // Feature/#17462_Test_Fixbug <--
    borderOrNot: true,
    borderType: 'solid',
    borderColor: '#000000',
    borderWidth: 1,
    tooltip: '',
    visible: true,
}

// feature#17877_Research_Group_item
// Add group properties
const GROUP_PROPERTY = {
    id: 'group1',
    type: 'GROUP',
    childId: '',
    position: { x: 0, y: 0 },
    width: 100,
    height: 80,
    // feature/#18466_Doubleclick_control_is_change_content --->>
    // MOD remove #FFFFFF, update transparent
    backgroundColor: 'transparent',
    // feature/#18466_Doubleclick_control_is_change_content <<---
    borderOrNot: false,
    borderType: 'solid',
    borderColor: '#00ccff',
    borderWidth: 1,
}

export {
    LABEL,
    TEXTBOX_PROPERTY,
    LABEL_PROPERTY,
    CHECKBOX_PROPERTY,
    RADIO_PROPERTY,
    COMBOBOX_PROPERTY,
    LISTBOX_PROPERTY,
    LINE_PROPERTY,
    SIGNATURE_PROPERTY,
    GRID_PROPERTY,
    IMAGE_PROPERTY,
    GROUP_PROPERTY,
}
