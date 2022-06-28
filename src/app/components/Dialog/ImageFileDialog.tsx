import { useState, useEffect, useMemo } from 'react'
import {
    Dialog as DialogDefault,
    DialogType,
    DialogFooter,
} from '@fluentui/react/lib/Dialog'
import { DftButton, PriButton } from '../Button'
import { CONTROLS_TYPES } from '../../../constants'
import { Label } from '@fluentui/react/lib/Label'
import {
    imageAlwaysDown,
    editImageDataControlAction,
    clearSelectControlAction,
} from '../../../stores/control/ControlAction'
import { WrapImage } from './ImageFile.style'
import { TextField } from '@fluentui/react/lib/TextField'
import { useStore } from '../../../hooks'

const ImageFileDialog = () => {
    const [state, dispatch] = useStore()
    //#18368 image bug
    const { listControl, controlNo } = state
    const [showDialog, setShowDialog] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imgToBase64, setImgToBase64] = useState(null)
    const [imgWidth, setImgWidth] = useState('')
    const [imgHeight, setImgHeight] = useState('')
    const [imgName, setImageName] = useState('')

    const widthDefault = 200
    const heightDefault = 200

    const modalPropsStyles = { main: { maxWidth: 450 } }

    const dialogContentProps = {
        type: DialogType.normal,
        title: 'Choose picture',
    }

    const modalProps = useMemo(
        () => ({
            isBlocking: true,
            styles: modalPropsStyles,
        }),
        []
    )
    //update image properties after add new image
    const updateImagePropertiesControl = (params) => {
        dispatch(editImageDataControlAction({ params, listControl }))
    }
    const doubleSelectedControl = state.doubleSelectedControl

    const clearSelectControl = () => {
        dispatch(clearSelectControlAction())
    }

    //#18368 image bug
    //Number will set for new control
    const newControlNo = controlNo + 1

    //set image is always below another control
    const dispatchImageFirstControl = (doubleSelectedControl) => {
        dispatch(
            imageAlwaysDown({
                doubleSelectedControl,
                listControl,
                newControlNo,
            })
        )
    }

    const [stateControl, setStateControl] = useState(doubleSelectedControl)

    useEffect(() => {
        if (!doubleSelectedControl) {
            setStateControl({})
            return
        }

        if (doubleSelectedControl.type === CONTROLS_TYPES.IMAGE) {
            setShowDialog(true)
            setStateControl(doubleSelectedControl)
            //18368 image bug
            // set image is always below another control
            dispatchImageFirstControl(doubleSelectedControl)
        }
    }, [doubleSelectedControl])

    //get image from local and get width height
    const onChangeImage = async (e: any) => {
        setSelectedImage(e.target.files[0])
        setImageName(e.target.files[0].name)
        const file = e.target.files[0]
        const base64 = await convertBase64(file) //convert Base64
        const dimension = await localImageDimensions(file)
        const width = String(dimension['width'] / 2) // width
        const height = String(dimension['height'] / 2) // height
        setImgWidth(width)
        setImgHeight(height)
        setImgToBase64(base64)
    }

    //export image file from local to URI base64
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    // width and height of local image
    const localImageDimensions = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image()

            img.onload = () => {
                const { naturalWidth: width, naturalHeight: height } = img
                resolve({ width, height })
            }
            img.onerror = () => {
                reject('There was some problem with the image.')
            }
            img.src = URL.createObjectURL(file)
        })
    }

    //when click get new properties of image and update to selected control properties
    function onClickChooseFile() {
        if (!selectedImage) {
            const imgData = { widthDefault, heightDefault }
            const newImgData = generateImgData(imgData, stateControl)
            updateImagePropertiesControl(newImgData)
        } else {
            const imgData = {
                imgToBase64,
                imgWidth,
                imgHeight,
            }
            const newImgData = generateImgData(imgData, stateControl)
            updateImagePropertiesControl(newImgData)
        }
        setImageName(null)
        setSelectedImage(null)
        toggleHideDialog(null)
    }

    // after click onClickChooseFile new props update here
    function generateImgData(imgData, nowData) {
        let imgReturn = { ...nowData }
        if (selectedImage) {
            imgReturn.width = Number(imgData.imgWidth)
            imgReturn.height = Number(imgData.imgHeight)
            // 18504 delete image url in popup
            // change url to imageData
            imgReturn.imageData = String(imgData.imgToBase64)
        } else {
            imgReturn.width = Number(widthDefault)
            imgReturn.height = Number(heightDefault)
            // 18504 delete image url in popup
            // change url to imageData
            imgReturn.imageData = String(nowData.imageDataDefault)
        }
        return imgReturn
    }

    // close dialog
    function toggleHideDialog(event: any) {
        setShowDialog(false)
        clearSelectControl()
    }

    //remove image from local
    function removeImg() {
        setSelectedImage(null)
        setImageName(null)
    }

    //open local to choose image
    function openLocal() {
        return document.getElementById('imageUpload').click()
    }

    //style of image div
    const imageDivStyles = {
        border: '1px solid black',
        minHeight: '410px',
        width: '100%',
        marginTop: '16px',
        position: 'relative',
    }

    return (
        <>
            <DialogDefault
                hidden={!showDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modalProps}
                minWidth={820}
            >
                <WrapImage>
                    <div className="image">
                        <div className="choose">
                            <div style={{ flex: 1 }}>
                                <Label>イメージ設定</Label>
                            </div>
                            <div style={{ flex: 2 }}>
                                <Label>{imgName}</Label>
                            </div>
                            <PriButton onClick={openLocal} text="選択" />
                            {selectedImage && (
                                <DftButton text="削除" onClick={removeImg} />
                            )}
                        </div>

                        <div style={imageDivStyles}>
                            {selectedImage && (
                                <div className="img">
                                    <img
                                        className="imgBtn"
                                        alt=""
                                        width={230}
                                        src={URL.createObjectURL(selectedImage)}
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <input
                                id="imageUpload"
                                type="file"
                                name="myImage"
                                style={{ display: 'none' }}
                                onChange={(e) => onChangeImage(e)}
                                // 18504 delete image url in popup
                                // update input tag only accept png, jpeg, bmp files
                                accept="image/png,image/jpeg,image/bmp"
                            />
                        </div>
                    </div>
                </WrapImage>
                <DialogFooter>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                        }}
                    >
                        <DftButton
                            onClick={toggleHideDialog}
                            text="キャンセル"
                        />
                        <PriButton onClick={onClickChooseFile} text="確定" />
                    </div>
                </DialogFooter>
            </DialogDefault>
        </>
    )
}

export default ImageFileDialog
