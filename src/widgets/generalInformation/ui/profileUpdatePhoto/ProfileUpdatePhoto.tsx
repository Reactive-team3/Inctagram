'use client'

import React, { useRef, useState, useCallback } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { Modal } from '@/shared/ui/modal/Modal'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'
import { useUploadProfileAvatarMutation } from '@/features/profile/model/profileApi'
import { addNotification } from '@/shared/model/notifications/notificationsSlice'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import { Loader } from '@/shared/ui/loader/Loader'
import style from './profileUpdatePhoto.module.scss'

// утилита для получения обрезанного изображения
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<File> {
  const image = new Image()
  image.src = imageSrc
  await new Promise(resolve => (image.onload = resolve))

  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context not found')

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(new File([blob], 'cropped.jpg', { type: 'image/jpeg' }))
      }
    }, 'image/jpeg')
  })
}

type ProfileUpdateFotoProps = {
  accept?: string
  maxFiles?: number
  children: React.ReactNode
  onClose: () => void
}

export const ProfileUpdatePhoto = ({
  accept = 'image/jpeg,image/png',
  children,
  onClose,
}: ProfileUpdateFotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isErrorOpen, setIsErrorOpen] = useState(false)

  // cropper state
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [uploadAvatar, { isLoading }] = useUploadProfileAvatarMutation()
  const dispatch = useDispatch()
  const handleClick = () => fileInputRef.current?.click()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => {
      return accept.includes(file.type) && file.size <= 10 * 1024 * 1024
    })

    if (validFiles.length > 0) {
      // показываем cropper только для первого файла
      const reader = new FileReader()
      reader.onload = () => setImageSrc(reader.result as string)
      reader.readAsDataURL(validFiles[0])
    } else {
      setIsErrorOpen(true)
    }

    if (fileInputRef.current) fileInputRef.current.value = ''
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
      setImageSrc(null) // закрыть cropper
    } catch (err) {
      console.error(err)
    } finally {
      onClose()
    }
  }

  return (
    <>
      {/* Модалка с ошибкой */}
      <Modal open={isErrorOpen} onClose={() => setIsErrorOpen(false)} modalTitle="Error" size="sm">
        <Typography variant="body2">
          The photo must be less than 10 MB and in JPEG or PNG format
        </Typography>
        <Button onClick={() => setIsErrorOpen(false)}>Close</Button>
      </Modal>

      {/* Модалка с cropper */}
      <Modal
        open={!!imageSrc}
        onClose={() => setImageSrc(null)}
        modalTitle="Add a Profile Photo"
        size="md"
      >
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
      </Modal>

      {/* file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={false}
        hidden
        onChange={handleChange}
      />
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        {children}
      </div>
    </>
  )
}
