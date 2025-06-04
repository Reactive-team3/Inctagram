import { Input, InputProps } from '@/shared/ui/Input/Input'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

export type ControlledTextFieldProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputProps, 'onChange' | 'value'>

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: ControlledTextFieldProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <Input
      {...{
        name,
        onValueChange: onChange,
        values: value,
        errorMessage: error?.message,
        ...restProps,
      }}
    />
  )
}
