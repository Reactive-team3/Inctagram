import { useController, FieldValues, UseControllerProps } from 'react-hook-form'
import { Checkbox, CheckboxProps } from '@/shared/ui/Checkbox/Checkbox'

export type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'onValueChange' | 'checked' | 'id'>

export const ControlledCheckbox = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...checkboxProps
}: ControlledCheckboxProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return <Checkbox {...checkboxProps} checked={value} onChange={onChange} />
}
