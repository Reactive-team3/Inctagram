import styles from './AppLink.module.scss'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

interface AppLinkProps extends LinkProps {
  className?: string
  children?: ReactNode
}

export const AppLink = (props: AppLinkProps) => {
  const { href, className, children, ...otherProps } = props

  return (
    <Link href={href} className={`${styles.appLink} ${className}`} {...otherProps}>
      {children}
    </Link>
  )
}
