'use client'

import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { Modal } from '@/shared/ui/modal/Modal'
import { Button } from '@/shared/ui/button/Button'
import { useUploadProfileAvatarMutation } from '@/features/profile/model/profileApi'
import { addNotification } from '@/shared/model/notifications/notificationsSlice'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import { Loader } from '@/shared/ui/loader/Loader'
import style from './profileUpdatePhoto.module.scss'
import { Format } from '@/widgets/generalInformation/ui/errorBlock/ErrorBlock'
import { getCroppedImg } from '@/widgets/generalInformation/ui/profileUpdatePhoto/utils/imageCropperUtils'
import {
  readFileAsDataURL,
  validateImageFile,
} from '@/widgets/generalInformation/ui/profileUpdatePhoto/utils/fileValidationUtils'

type ProfileUpdatePhotoProps = {
  accept?: string
  children: React.ReactNode
  onClose: () => void
  setError: Dispatch<SetStateAction<boolean>>
  setErrorFormat: Dispatch<SetStateAction<Format>>
}

export const ProfileUpdatePhoto = ({
  accept = 'image/jpeg,image/png',
  children,
  onClose,
  setError,
  setErrorFormat,
}: ProfileUpdatePhotoProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [uploadAvatar, { isLoading }] = useUploadProfileAvatarMutation()
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validation = await validateImageFile(file)

    if (!validation?.isValid) {
      setError(true)
      if (validation?.errorType) setErrorFormat(validation?.errorType)
      return
    }

    try {
      const src = await readFileAsDataURL(file)
      setImageSrc(src)
      setError(false)
    } catch (error) {
      setError(true)
      console.error('File reading error:', error)
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    try {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels)
      const formData = new FormData()
      formData.append('avatar', croppedFile)
      await uploadAvatar(formData).unwrap()
      dispatch(
        addNotification({
          id: nanoid(),
          message: 'Successfully UploadAvatar ',
          variant: 'success',
          duration: 4000,
        })
      )
      setImageSrc(null)
    } catch (err) {
      console.error(err)
    } finally {
      onClose()
    }
  }
  const handleClose = () => {
    setImageSrc(null)
    setError(false)
  }

  return (
    <>
      <Modal open={!!imageSrc} onClose={handleClose} modalTitle="Add a Profile Photo" size="md">
        <div>
          {imageSrc && (
            <div className={style.cropper}>
              {isLoading ? (
                <Loader />
              ) : (
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              )}
            </div>
          )}
          <div className={style.btn}>
            <Button onClick={handleCropSave}>Save</Button>
          </div>
        </div>
      </Modal>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={false}
        hidden
        onChange={handleChange}
      />
      <div onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
        {children}
      </div>
    </>
  )
}
