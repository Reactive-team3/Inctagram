'use client'

import styles from './imageGalleryPreview.module.scss'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'
import { ImageUploader } from '@/shared/ui/imageUploader/ImageUploader'

type Props = {
  images: File[]
  onAddImageAction: (files: File[]) => void
  onRemoveAction: (index: number) => void
}

export const ImageGalleryPreview = ({ images, onAddImageAction, onRemoveAction }: Props) => {
  return (
    <div className={styles.gallery}>
      {images.map((file, i) => (
        <div key={i} className={styles.thumb}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={URL.createObjectURL(file)} alt={`image-${i}`} />
          <Button variant="secondary" className={styles.remove} onClick={() => onRemoveAction(i)}>
            <Icon name="close" />
          </Button>
        </div>
      ))}
      {images.length < 10 && (
        <ImageUploader onAddImageAction={onAddImageAction} maxFiles={10 - images.length}>
          <Button variant="secondary">
            <Icon name="plus-circle-outline" width={32} height={32} />
          </Button>
        </ImageUploader>
      )}
    </div>
  )
}
