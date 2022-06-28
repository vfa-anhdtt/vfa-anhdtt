import { useEffect, useRef } from 'react'

import Header from '../../components/Header'
import PreviewFC from '../../components/Preview'
import PreviewToolbar from '../../components/PreviewToolbar'

import { PreviewStyle } from './Preview.style'
import { useStore } from '../../../hooks'
import PagesToolbar from '../../components/Toolbar/PagesToolbar'
import PageFooter from '../../components/PageControl/PageFooter'

// feature/#18466_Doubleclick_control_is_change_content --->>
// MOD remove KonvaDemo, update EditorPage
import EditorPage from '../../components/EditorPage'
// feature/#18466_Doubleclick_control_is_change_content <<---

import { changePreviewStatusAction } from '../../../stores/control/ControlAction'

const Preview: React.FC = () => {
    // Use Global Store
    const [state, dispatch] = useStore()

    // Header
    const headeRef = useRef(null)

    // Define param to use
    const { sizeKonva, isPreview } = state

    /**
     * Change status of isPreview
     * @param status : boolean status will be set
     */
    const dispatchChangePreviewStatus = (status) => {
        dispatch(changePreviewStatusAction(status))
    }

    // Change Preview status
    useEffect(() => {
        // Only change when status is not preview
        if (!isPreview) {
            dispatchChangePreviewStatus(true)
        }
    }, [])

    return (
        <PreviewStyle
            height-change={sizeKonva.height}
            width-change={sizeKonva.width}
        >
            <div ref={headeRef}>
                {/* feature/#18466_Doubleclick_control_is_change_content --->> */}
                {/* ADD props `isPageReview` true */}
                <Header isPageReview={true} />
                {/* feature/#18466_Doubleclick_control_is_change_content <<--- */}
            </div>
            <div className="preview-toolbar">
                <PreviewToolbar />
            </div>
            {/*
                #17420 Preview Line: change the way to show preview
                <div className="preview-page py-32 px-64">
                <div className="preview-konva_demo w-inherit h-inherit bg-white absolute"> */}
            <div className="preview-page ">
                {/* feature/#18466_Doubleclick_control_is_change_content --->> */}
                {/* MOD remove KonvaDemo, update EditorPage */}
                <EditorPage is-Preview={true} />
                {/* feature/#18466_Doubleclick_control_is_change_content <<--- */}

                <PreviewFC />
                {/* </div> */}
                <PagesToolbar isPreviewStatus={true} />
            </div>
            {/* #17460_Pages_Controls ADD to view page footer control */}
            <PageFooter />
        </PreviewStyle>
    )
}

export default Preview
