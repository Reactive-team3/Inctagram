'use client'

import React from 'react'
import styles from './zoomSlider.module.scss'

type Props = {
  zoom: number
  onChangeAction: (value: number) => void
}

export const ZoomSlider = ({ zoom, onChangeAction }: Props) => {
  return (
    <div className={styles.slider}>
      <input
        type="range"
        min={1}
        max={3}
        step={0.1}
        value={zoom}
        onChange={e => onChangeAction(Number(e.target.value))}
      />
    </div>
  )
}
