import Image, { ImageProps } from 'next/image'
import styles from './extendedPicture.module.scss'

export const ExtendedPicture = ({ ...props }: ImageProps) => {
  const src = props.src ? props.src : '/common-images/photo-not-available.jpg'
  const className = props.className ? props.className : styles.extendedPicture
  return <Image {...props} src={src} alt={props.alt} className={className} />
}
