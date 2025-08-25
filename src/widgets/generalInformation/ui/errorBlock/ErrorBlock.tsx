import React from 'react'
import style from './errorBlock.module.scss'
export type Format = 'size' | 'format' | 'unknown' | string
type Props = {
  name: Format
}

export const ErrorBlock = ({ name }: Props) => {
  if (name === 'size') {
    return (
      <div className={style.errorSize}>
        <b>Error!</b> Photo size must be less than 10 MB!
      </div>
    )
  }
  if (name === 'format') {
    return (
      <div className={style.errorSize}>
        <b>Error!</b> The format of the uploaded photo must be PNG and JPEG
      </div>
    )
  }
}
