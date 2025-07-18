'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'
import styles from './createPostModalPage.module.scss'
import {
  ModalCreatePost,
  ModalSize,
} from '@/features/ui/createPost/modalCreatePost/ModalCreatePost'
import { TextArea } from '@/shared/ui/textArea/TextArea'
import { useCreatePostMutation } from '@/features/postApi/model/postApi'
import { addNotification } from '@/shared/model/notifications/notificationsSlice'
import { nanoid } from 'nanoid'
import { privateRoutes } from '@/shared/config/routes/routes'
import { useDispatch } from 'react-redux'
import { ZoomSlider } from '@/features/ui/createPost/zoomSlider/ZoomSlider'
import { ImageGalleryPreview } from '@/features/ui/createPost/imageGalleryPreview/ImageGalleryPreview'
import { ImageCarousel } from '@/features/ui/createPost/imageCarousel/ImageCarousel'
import { Loader } from '@/shared/ui/loader/Loader'
import { ImageUploader } from '@/shared/ui/imageUploader/ImageUploader'

export const CreatePostModalPage = () => {
  const [step, setStep] = useState<'select' | 'crop' | 'preview'>('select')
  const [selectedFile, setSelectedFile] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [showSlider, setShowSlider] = useState(false)
  const [showImagePopup, setShowImagePopup] = useState(false)
  const [zoom, setZoom] = useState(1)

  const [createPost, { isLoading }] = useCreatePostMutation()
  const dispatch = useDispatch()
  const router = useRouter()
  const handleClose = () => router.back()

  const handleFileChange = (files: File[]) => {
    setSelectedFile(prev => [...prev, ...files])
    setPreviewUrl(URL.createObjectURL(files[0]))
    setStep('crop')
  }

  const handleBack = () => {
    if (step === 'preview') setStep('crop')
    else if (step === 'crop') setStep('select')
  }

  const handleNext = () => {
    setStep('preview')
  }

  const handlePublish = async () => {
    if (!selectedFile) {
      //todo
      alert('Please select an image.')
      return
    }

    const formData = new FormData()
    formData.append('description', description)
    selectedFile.forEach(file => {
      formData.append('images', file)
    })

    try {
      await createPost(formData).unwrap()

      dispatch(
        addNotification({
          id: nanoid(),
          message: 'Successfully Post Created',
          variant: 'success',
          duration: 4000,
        })
      )

      router.push(privateRoutes.MY_PROFILE)
    } catch (e) {
      //todo
      console.error('Failed to create post:', e)
      alert('Something went wrong')
    }
  }

  const getModalSize = (step: string): { size: ModalSize } => {
    switch (step) {
      case 'select':
        return {
          size: 'md',
        }
      case 'crop':
        return {
          size: 'md',
        }
      case 'preview':
        return {
          size: 'lg',
        }
      default:
        return {
          size: 'md',
        }
    }
  }
  const getModalTitle = (step: string) => {
    switch (step) {
      case 'select':
        return (
          <div className={styles.titleContainer}>
            <span>Add photo</span>
            <Button onClick={handleClose} variant="secondary">
              <Icon name="close" className={styles.closeIcon} />
            </Button>
          </div>
        )
      case 'crop':
        return (
          <div className={styles.titleContainer}>
            <Button variant="text" onClick={handleBack}>
              Back
            </Button>
            <span>Cropping</span>
            <Button variant="text" onClick={handleNext}>
              Next
            </Button>
          </div>
        )
      case 'preview':
        return (
          <div className={styles.titleContainer}>
            <Button variant="text" onClick={handleBack}>
              Back
            </Button>
            {isLoading ? <Loader /> : 'Publication'}
            <Button variant="text" onClick={handlePublish} disabled={isLoading}>
              Publish
            </Button>
          </div>
        )
      default:
        return 'Add photo'
    }
  }
  const modalConfig = getModalSize(step)

  const handleShowSlider = () => {
    setShowSlider(prev => {
      if (!prev) setShowImagePopup(false)
      return !prev
    })
  }
  const handleShowImagePopup = () => {
    setShowImagePopup(prev => {
      if (!prev) setShowSlider(false)
      return !prev
    })
  }

  const onRemoveAction = (index: number) => {
    setSelectedFile(prev => {
      const updated = prev.filter((_, i) => i !== index)

      if (updated.length > 0) {
        // If the removed image was the current preview, update it to the first one
        setPreviewUrl(URL.createObjectURL(updated[0]))
      } else {
        setPreviewUrl(null)
      }
      return updated
    })
  }

  return (
    <ModalCreatePost
      open={true}
      onClose={handleClose}
      modalTitle={getModalTitle(step)}
      size={modalConfig.size}
    >
      <div className={styles.container}>
        {step === 'select' && (
          <div className={styles.placeholder}>
            <div className={styles.imageFrame}>
              <Icon name="image-outline" width={48} height={48} />
            </div>
            <ImageUploader onAddImageAction={handleFileChange}>
              <Button>Select from computer</Button>
            </ImageUploader>
          </div>
        )}

        {step === 'crop' && (
          <div className={styles.imagePreview}>
            <ImageCarousel images={selectedFile} zoom={zoom} />
            <div className={styles.buttonsOverlay}>
              <Button variant="secondary" onClick={handleNext}>
                <Icon name="expand" />
              </Button>

              <div className={styles.sliderWrapper}>
                {showSlider && <ZoomSlider zoom={zoom} onChangeAction={setZoom} />}
                <Button variant="secondary" onClick={handleShowSlider}>
                  <Icon name="maximize" color={showSlider ? 'var(--color-accent-500)' : ''} />
                </Button>
              </div>
              <div>
                <div className={styles.imageGalleryWrapper}>
                  {showImagePopup && (
                    <ImageGalleryPreview
                      images={selectedFile}
                      onAddImageAction={newFiles => setSelectedFile(prev => [...prev, ...newFiles])}
                      onRemoveAction={onRemoveAction}
                    />
                  )}
                </div>
                <Button variant="secondary" onClick={handleShowImagePopup}>
                  <Icon name="image" color={showImagePopup ? 'var(--color-accent-500)' : ''} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className={styles.previewLayout}>
            <div className={styles.leftImage}>
              {previewUrl && (
                <Image src={previewUrl} alt="Selected" fill className={styles.image} />
              )}
            </div>
            <div className={styles.rightText}>
              <TextArea
                label="Add publication descriptions"
                name="Add publication descriptions"
                maxLength={500}
                width="100%"
                onChange={setDescription}
              />
            </div>
          </div>
        )}
      </div>
    </ModalCreatePost>
  )
}
