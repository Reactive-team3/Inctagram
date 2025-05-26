import { RefObject, useEffect, useRef, useState } from 'react'
import { SelectOptions } from '@/shared/types/select'

export function useSelectTriggerWidth(
  options: SelectOptions[]
): [RefObject<HTMLButtonElement | null>, number | undefined] {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>()

  useEffect(() => {
    if (!triggerRef.current) {
      return
    }

    const style = getComputedStyle(triggerRef.current)
    const font = `${style.fontSize} ${style.fontFamily}`
    const paddingLeft = parseFloat(style.paddingLeft)
    const stringOptions = options.map(option => option.label)

    const maxOptionWidth = measureMaxTextWidth(stringOptions, font)
    const finalWidth = Math.ceil(maxOptionWidth + paddingLeft)

    setTriggerWidth(finalWidth)
  }, [options])

  return [triggerRef, triggerWidth]
}

function measureMaxTextWidth(texts: string[], font: string): number {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return 0
  }

  ctx.font = font
  return Math.max(...texts.map(text => ctx.measureText(text).width))
}
