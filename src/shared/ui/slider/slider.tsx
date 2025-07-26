import React, { useEffect, useRef, useState } from 'react'
import styles from './slider.module.scss'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'

type SliderCustomStyles = {
  sliderContainer?: string
  sliderWrapper?: string
  sliderInner?: string
  slide?: string
  sliderArrowPrev?: string
  sliderArrowNext?: string
  dotsContainer?: string
  sliderDots?: string
  activeDot?: string
  inactiveDot?: string
}

type SliderInlineStyles = {
  sliderContainer?: React.CSSProperties
  sliderWrapper?: React.CSSProperties
  sliderInner?: React.CSSProperties
  slide?: React.CSSProperties
  sliderArrowPrev?: React.CSSProperties
  sliderArrowNext?: React.CSSProperties
  dotsContainer?: React.CSSProperties
  sliderDots?: React.CSSProperties
}

export const Slider: React.FC<{
  slides: { id: string; content: React.ReactNode }[]
  currentIndex: number
  onIndexChangeAction: (index: number) => void
  showDots?: boolean
  maxDotsVisible?: number
  customStyles?: SliderCustomStyles
  inlineStyles?: SliderInlineStyles
  activeDotColor?: string
  inactiveDotColor?: string
}> = ({
  slides,
  currentIndex,
  onIndexChangeAction,
  showDots = true,
  maxDotsVisible = 10,
  customStyles,
  inlineStyles,
  activeDotColor = 'blue',
  inactiveDotColor = 'white',
}) => {
  const sliderInnerRef = useRef<HTMLDivElement>(null)
  const [windowStart, setWindowStart] = useState(0)

  useEffect(() => {
    if (!sliderInnerRef.current) return

    sliderInnerRef.current.style.width = `${100 * slides.length}%`
    const slidesElements = sliderInnerRef.current.children
    for (let i = 0; i < slidesElements.length; i++) {
      const slide = slidesElements[i] as HTMLElement
      slide.style.width = `${100 / slides.length}%`
    }
  }, [slides.length])

  useEffect(() => {
    if (!sliderInnerRef.current) return

    const offset = -currentIndex * (100 / slides.length)
    sliderInnerRef.current.style.transform = `translateX(${offset}%)`
  }, [currentIndex, slides.length])

  // Обновляем окно видимых точек при изменении currentIndex
  useEffect(() => {
    if (slides.length <= maxDotsVisible) return

    const currentWindowEnd = Math.min(windowStart + maxDotsVisible - 1, slides.length - 1)

    // Сдвигаем окно вправо, если активная точка достигла предпоследней позиции
    if (currentIndex >= currentWindowEnd - 1 && currentIndex < slides.length - 1) {
      const newStart = Math.min(currentIndex - (maxDotsVisible - 2), slides.length - maxDotsVisible)
      setWindowStart(Math.max(0, newStart))
    }
    // Сдвигаем окно влево, если активная точка ушла левее начала окна
    else if (currentIndex < windowStart) {
      setWindowStart(Math.max(0, currentIndex))
    }
  }, [currentIndex, slides.length, maxDotsVisible, windowStart])

  const handlePrev = () => {
    onIndexChangeAction((currentIndex - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    onIndexChangeAction((currentIndex + 1) % slides.length)
  }

  // Функция для объединения базовых и кастомных классов
  const combineClasses = (baseClass: string, customClass?: string) => {
    return customClass ? `${baseClass} ${customClass}` : baseClass
  }

  // Функция для определения видимых точек
  const getVisibleDots = () => {
    const totalSlides = slides.length

    // Если слайдов меньше или равно максимальному количеству, показываем все
    if (totalSlides <= maxDotsVisible) {
      return slides.map((_, index) => index)
    }

    const currentWindowStart = Math.max(0, Math.min(windowStart, totalSlides - maxDotsVisible))
    const currentWindowEnd = Math.min(currentWindowStart + maxDotsVisible - 1, totalSlides - 1)

    const visibleIndices = []
    for (let i = currentWindowStart; i <= currentWindowEnd; i++) {
      visibleIndices.push(i)
    }

    return visibleIndices
  }

  const visibleDotIndices = getVisibleDots()

  return (
    <div
      className={combineClasses(styles.sliderContainer, customStyles?.sliderContainer)}
      style={inlineStyles?.sliderContainer}
    >
      <div
        className={combineClasses(styles.sliderWrapper, customStyles?.sliderWrapper)}
        style={inlineStyles?.sliderWrapper}
      >
        <div
          ref={sliderInnerRef}
          className={combineClasses(styles.sliderInner, customStyles?.sliderInner)}
          style={inlineStyles?.sliderInner}
        >
          {slides.map(slide => (
            <div
              key={slide.id}
              className={combineClasses(styles.slide, customStyles?.slide)}
              style={inlineStyles?.slide}
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="transparent"
        onClick={handlePrev}
        className={combineClasses(styles.sliderArrowPrev, customStyles?.sliderArrowPrev)}
        style={inlineStyles?.sliderArrowPrev}
      >
        <Icon name="arrow-ios-back" />
      </Button>

      <Button
        variant="transparent"
        onClick={handleNext}
        className={combineClasses(styles.sliderArrowNext, customStyles?.sliderArrowNext)}
        style={inlineStyles?.sliderArrowNext}
      >
        <Icon name="arrow-ios-forward" />
      </Button>

      {showDots && slides.length > 1 && (
        <div
          className={combineClasses(styles.dotsContainer, customStyles?.dotsContainer)}
          style={inlineStyles?.dotsContainer}
        >
          {visibleDotIndices.map(slideIndex => (
            <button
              key={slideIndex}
              onClick={() => onIndexChangeAction(slideIndex)}
              className={combineClasses(
                `${styles.sliderDots} ${slideIndex === currentIndex ? styles.activeDot : styles.inactiveDot}`,
                `${customStyles?.sliderDots || ''} ${slideIndex === currentIndex ? customStyles?.activeDot || '' : customStyles?.inactiveDot || ''}`
              )}
              style={{
                backgroundColor: slideIndex === currentIndex ? activeDotColor : inactiveDotColor,
                ...inlineStyles?.sliderDots,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
