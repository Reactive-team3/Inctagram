import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ScrollArea } from 'radix-ui'
import s from './scroll.module.scss'
import { clsx } from 'clsx'
export type ScrollProps = {
  children: ReactNode
  className?: string
  maxWidth?: number | string
  maxHeight?: number | string
} & ComponentPropsWithoutRef<'div'>

export const Scroll = ({
  children,
  className,
  maxWidth = '100%',
  maxHeight = '100%',
  ...rest
}: ScrollProps) => {
  const componentMaxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth
  const componentMaxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
  const style = { maxWidth: componentMaxWidth, maxHeight: componentMaxHeight }

  return (
    <ScrollArea.Root asChild type={'auto'}>
      <div className={clsx(className, s.Root)} {...rest}>
        <ScrollArea.Viewport className={s.Viewport} style={style}>
          {children}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className={s.Scrollbar} orientation="vertical">
          <ScrollArea.Thumb className={s.Thumb} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className={s.Scrollbar} orientation="horizontal">
          <ScrollArea.Thumb className={s.Thumb} />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className={s.Corner} />
      </div>
    </ScrollArea.Root>
  )
}
