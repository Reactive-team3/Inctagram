'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'
import styles from './createPostModalPage.module.scss'
import { ModalCreatePost } from '@/app/(private)/create/ui/modalCreatePost/ModalCreatePost'
import { TextArea } from '@/shared/ui/textArea/TextArea'
import { useCreatePostMutation } from '@/features/postApi/model/postApi'
import { addNotification } from '@/shared/model/notifications/notificationsSlice'
import { nanoid } from 'nanoid'
import { privateRoutes } from '@/shared/config/routes/routes'
import { useDispatch } from 'react-redux'

type ModalSize = 'lg' | 'md' | 'sm'

export const CreatePostModalPage = () => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<'select' | 'crop' | 'preview'>('select')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [description, setDescription] = useState('')

  const [createPost, { isLoading }] = useCreatePostMutation()
  const dispatch = useDispatch()

  const handleClose = () => router.back()

  const handleUploadClick = () => fileInputRef.current?.click()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
    const isValidSize = file.size <= 20 * 1024 * 1024

    if (!isValidType || !isValidSize) {
      //todo
      alert('Only JPEG/PNG files up to 20MB allowed')
      return
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
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
    formData.append('description', description || 'My new post')
    formData.append('images', selectedFile)

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
            <span>Publication</span>
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
  return (
    <ModalCreatePost
      open={true}
      onClose={handleClose}
      modalTitle={getModalTitle(step)}
      size={modalConfig.size}
    >
      <div className={styles.container}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          hidden
        />

        {step === 'select' && (
          <div className={styles.placeholder}>
            <div className={styles.imageFrame}>
              <Icon name="image-outline" width={48} height={48} />
            </div>
            <div className={styles.bottomButton}>
              <Button onClick={handleUploadClick}>Select from computer</Button>
            </div>
          </div>
        )}

        {step === 'crop' && (
          <div className={styles.imagePreview}>
            {previewUrl && <Image src={previewUrl} alt="Selected" fill className={styles.image} />}
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
