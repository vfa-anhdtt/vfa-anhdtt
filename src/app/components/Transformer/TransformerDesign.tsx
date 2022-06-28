import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Transformer } from 'react-konva'

// feature/#17694_Bug_Undo --->>
// MOD remove selectedIDs, add selectedControl
function TransformerDesign({ selectedControl }) {
    // feature/#17694_Bug_Undo <<---
    const trRef = useRef(null)
    const [numberPoint, setNumberPoint] = useState([])

    // Flag keep ratio when we are moving edges
    const [keepRatioFlg, setKeepRatioFlg] = useState(false)

    const typeCircle = 'circle'
    const typeGrid = 'Grid'
    //feature/#17877_Research_Group_Control -->
    // Add typeGroup
    const typeGroup = 'GROUP'
    //feature/#17877_Research_Group_Control -->

    const typeLine = 'line'
    const zeroPoint = []
    const fourPoint = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    const eightPoint = [
        'top-left',
        'top-center',
        'top-right',
        'middle-right',
        'middle-left',
        'bottom-left',
        'bottom-center',
        'bottom-right',
    ]

    useEffect(() => {
        // here we need to manually attach or detach Transformer node
        const stage = trRef.current.getStage()

        // feature/#17694_Bug_Undo --->>
        // MOD remove selectedIDs, add selectedControl
        const selectedControlId = selectedControl.id
        let selectedNode: any = null
        selectedNode = stage.findOne('#' + selectedControlId)
        // feature/#17694_Bug_Undo <<---

        // do nothing if selected node is already attached
        if (selectedNode === trRef.current.node()) {
            return
        }
        if (
            selectedNode &&
            selectedNode.attrs &&
            selectedNode.attrs.className !== typeLine
        ) {
            // Change size with not ratio at width & height
            setKeepRatioFlg(false)
            // attach to another node
            switch (selectedNode.attrs.className) {
                case typeCircle:
                    setNumberPoint(fourPoint)
                    // Change size with the same ratio at width & height
                    setKeepRatioFlg(true)
                    break
                case typeGrid:
                    setNumberPoint(zeroPoint)
                    break
                //feature/#17877_Research_Group_Control -->
                // Add type group , setNumberPoint(zeroPoint)
                case typeGroup:
                    setNumberPoint(zeroPoint)
                    break
                //feature/#17877_Research_Group_Control <--
                default:
                    setNumberPoint(eightPoint)
            }
            trRef.current.nodes([selectedNode])
        } else {
            // remove transformer
            trRef.current.detach()
        }
        trRef.current.getLayer().batchDraw()
        // feature/#17694_Bug_Undo --->>
        // MOD remove selectedIDs, add selectedControl
    }, [selectedControl])
    // feature/#17694_Bug_Undo <<---

    return (
        <Transformer
            rotateEnabled={false}
            ClassName="Transformer"
            // Change
            keepRatio={keepRatioFlg}
            ref={trRef}
            enabledAnchors={numberPoint}
            // when user edit minimum size is set
            boundBoxFunc={(oldBox, newBox) => {
                newBox.width = Math.max(5, newBox.width)
                newBox.height = Math.max(5, newBox.height)
                return newBox
            }}
        />
    )
}
TransformerDesign.defaultProps = {
    // feature/#17694_Bug_Undo --->>
    // MOD remove selectedIDs, add selectedControl
    selectedControl: {},
    // feature/#17694_Bug_Undo <<---
    props: {},
}

TransformerDesign.propTypes = {
    children: PropTypes.string,
    // feature/#17694_Bug_Undo --->>
    // MOD remove selectedIDs, add selectedControl
    selectedControl: PropTypes.object,
    // feature/#17694_Bug_Undo <<---
}

export default TransformerDesign
