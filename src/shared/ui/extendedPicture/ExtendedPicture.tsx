import Image from 'next/image'
import styles from './extendedPicture.module.scss'
import { ImageProps } from 'next/image'

type ExtendedPictureProps = Omit<ImageProps, 'src'> & {
  src?: string
}

export const ExtendedPicture = ({ src, alt, className, ...rest }: ExtendedPictureProps) => {
  const fallbackSrc = src ? src : '/common-images/photo-not-available.jpg'
  const finalClassName = className ?? styles.extendedPicture
  return <Image {...rest} src={fallbackSrc} alt={alt} className={finalClassName} />
}
