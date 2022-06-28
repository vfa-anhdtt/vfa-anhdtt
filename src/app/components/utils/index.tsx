/**
 * The event when the control is clicked, the callback to the parent control event,
 *  the processing is defined by the parent
 * @param e : event
 * @param id : id of control was clicked
 * @param propsClickControl : property of control that given from parent
 */
export const handleClickControl = (e, id, propsClickControl) => {
    propsClickControl(e, id)
}

/**
 * The event when the control is transforming, the callback to the parent control event,
 *  the processing is defined by the parent
 * @param e : event
 * @param id : id of control was transform
 * @param propsClickControl : property of control that given from parent
 */
export const handleTransformControl = (e, id, propsTransformControl) => {
    propsTransformControl(e, id)
}

/**
 * The event when the control is DragMove, the callback to the parent control event,
 *  the processing is defined by the parent
 * @param e : event
 * @param id : id of control was DragMove
 * @param propsClickControl : property of control that given from parent
 */
export const handleDragMoveControl = (e, id, propsDragMoveControl) => {
    propsDragMoveControl(e, id)
}

/**
 * from value of property (true/false),display's value is different (bold) 
 * @param props 
 * @returns 
 */
export const changeDisplayProperty = (props) => {

    function getFontStyle() {
        let fontStyle: String = '';

        if (props.bold) {
            fontStyle = 'bold';
        }
        if (props.italics) {
            fontStyle += ' italic';
        }
        if (!fontStyle) {
            fontStyle = 'normal';
        }
        return fontStyle;
    }

    function getTextDecoration() {
        let textDecoration: String = '';

        if (props.underline) {
            textDecoration = 'underline';
        }

        return textDecoration;
    }

    const fontStyle = getFontStyle();
    const textDecoration = getTextDecoration();
    const id = props.id
    let strokeWidth = props.strokeWidth;
    let dotSpace = 2;
    // if don't show border, border size = 0
    if (!props.borderOrNot) {
        strokeWidth = 0;
    }

    //if borderType is solid, space of line = 0 
    if (props.borderType === 'solid') {
        dotSpace = 0;
    }
    return { id, fontStyle, textDecoration, strokeWidth, dotSpace }
}