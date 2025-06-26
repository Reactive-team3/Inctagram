import React, { useEffect, useRef } from 'react'
import styles from './slider.module.scss'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'

export const Slider: React.FC<{
  slides: { id: string; content: React.ReactNode }[]
  currentIndex: number
  onIndexChangeAction: (index: number) => void
  showDots?: boolean
}> = ({ slides, currentIndex, onIndexChangeAction, showDots = true }) => {
  const sliderInnerRef = useRef<HTMLDivElement>(null)

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

  const handlePrev = () => {
    onIndexChangeAction((currentIndex - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    onIndexChangeAction((currentIndex + 1) % slides.length)
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ overflow: 'hidden', height: '100%' }}>
        <div
          ref={sliderInnerRef}
          style={{
            display: 'flex',
            transition: 'transform 0.5s ease',
            height: '100%',
          }}
        >
          {slides.map(slide => (
            <div key={slide.id} style={{ flexShrink: 0, height: '100%', position: 'relative' }}>
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      <Button variant="transparent" onClick={handlePrev} className={styles.sliderArrowPrev}>
        <Icon name="arrow-back" className="w-5 h-5" />
      </Button>

      <Button variant="transparent" onClick={handleNext} className={styles.sliderArrowNext}>
        <Icon name="arrow-forwards" className="w-5 h-5" />
      </Button>

      {showDots && slides.length > 1 && (
        <div className={styles.dotsContainer}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChangeAction(index)}
              className={styles.sliderDots}
              style={{ backgroundColor: index === currentIndex ? 'blue' : 'white' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
