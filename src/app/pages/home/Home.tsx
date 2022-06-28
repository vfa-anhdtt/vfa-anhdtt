import { useRef, useEffect } from 'react'

import Header from '../../components/Header'

// feature/#18466_Doubleclick_control_is_change_content --->>
// MOD remove KonvaDemo, update EditorPage
import EditorPage from '../../components/EditorPage'
// feature/#18466_Doubleclick_control_is_change_content <<---

import {
    Toolbar,
    ControlsToolbar,
    PropertiesToolbar,
    PagesToolbar,
} from '../../components/Toolbar'
import {
    CalculationDialog,
    SearchControlDialog,
    GridCreateDialog,
    ImageFileDialog,
} from '../../components/Dialog'

import { HomeStyle } from './Home.style'
import FormSetting from '../../components/FormSetting'
import PageFooter from '../../components/PageControl/PageFooter'
import { useStore } from '../../../hooks'
import { changePreviewStatusAction } from '../../../stores/control/ControlAction'

const Home: React.FC = () => {
    // Use Global Store
    const [state, dispatch] = useStore()

    //Header
    const headeRef = useRef(null)

    // Preview status
    const { isPreview } = state

    /**
     * Change status of isPreview
     * @param status : boolean status will be set
     */
    const dispatchChangePreviewStatus = (status) => {
        dispatch(changePreviewStatusAction(status))
    }

    // Change Preview status
    useEffect(() => {
        // Only change when status is preview
        if (isPreview) {
            dispatchChangePreviewStatus(false)
        }
    }, [])

    return (
        <HomeStyle>
            {/* feature/#8468_edit_icon_Change_font_for_stamp --->>
            ADD class to handle css toolbar */}
            <div className="w-per_100 fixed z-1 bg-white" ref={headeRef}>
                {/* feature/#8468_edit_icon_Change_font_for_stamp <<--- */}
                <Header />
                <Toolbar />
            </div>

            <div className="content d-flex">
                <div className="control-toolbar">
                    <aside className="palette">
                        <ControlsToolbar />
                    </aside>
                </div>
                {/* feature/#8468_edit_icon_Change_font_for_stamp --->>  
                ADD class to handle css konva page*/}
                <div className="konva-demo mt-100">
                    {/* feature/#8468_edit_icon_Change_font_for_stamp <<---  */}
                    <EditorPage />
                </div>
                <FormSetting />
                {/* feature/#18350_Change_font_size_for_control --->>
                 change css display properties */}
                <div
                    id="properties-controls"
                    className="properties-controls w-per_30 fixed r-0"
                >
                    {/* feature/#18350_Change_font_size_for_control <<--- */}
                    <aside className="palette">
                        <PropertiesToolbar headeRef={headeRef} />
                        <GridCreateDialog />
                        <SearchControlDialog />
                        <CalculationDialog />
                        <PagesToolbar />
                        <ImageFileDialog />
                    </aside>
                </div>
            </div>
            {/* #17460_Pages_Controls ADD to view page footer control */}
            <PageFooter />
        </HomeStyle>
    )
}

export default Home
