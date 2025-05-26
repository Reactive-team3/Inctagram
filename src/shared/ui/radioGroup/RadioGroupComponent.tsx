import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radioGroup.module.scss'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'
import { RadioOption } from '@/shared/types/radio'

const RadioGroupRoot = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={clsx(s.root, className)} {...props} ref={ref} />
})

RadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ children, className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item className={clsx(s.option, className)} ref={ref} {...props}>
      <div className={s.icon}></div>
      {children}
    </RadioGroupPrimitive.Item>
  )
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export type RadioGroupProps = Omit<
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  'children'
> & {
  errorMessage?: string
  options: RadioOption[]
}
const RadioGroup = forwardRef<ComponentRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  (props, ref) => {
    const { options, ...restProps } = props

    return (
      <RadioGroupRoot {...restProps} ref={ref}>
        {options.map(option => (
          <div className={s.label} key={option.value}>
            <RadioGroupItem id={option.value} value={option.value} />
            <span>{option.label}</span>
          </div>
        ))}
      </RadioGroupRoot>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

export { RadioGroup, RadioGroupItem, RadioGroupRoot }
