import React, { useState } from 'react'
import styles from './imageCarousel.module.scss'
import Icon from '@/shared/ui/icon/Icon'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'

interface ImageCarouselProps {
  images: File[]
  zoom: number
}

export const ImageCarousel = ({ images, zoom }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  if (images.length === 0) {
    return <Typography variant="body1">No images to display</Typography>
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={URL.createObjectURL(images[currentIndex])}
        alt={`Image ${currentIndex + 1}`}
        className={styles.image}
        style={{ transform: `scale(${zoom})` }}
      />

      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            className={styles.leftArrow}
            onClick={prevImage}
            aria-label="Previous image"
          >
            <Icon name="arrow-ios-back" />
          </Button>
          <Button
            variant="secondary"
            className={styles.rightArrow}
            onClick={nextImage}
            aria-label="Next image"
          >
            <Icon name="arrow-ios-forward" />
          </Button>
        </>
      )}

      {images.length > 1 && (
        <div className={styles.dots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            />
          ))}
        </div>
      )}
    </>
  )
}
