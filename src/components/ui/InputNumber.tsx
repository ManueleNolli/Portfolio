import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'

type InputNumberProps = {
  label: string
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  additionalStyle?: string
}

// null when the value is inside the optional [min, max] range
function rangeError(value: number, min?: number, max?: number): string | null {
  const isTooSmall = min !== undefined && value < min
  const isTooLarge = max !== undefined && value > max
  if (!isTooSmall && !isTooLarge) return null
  if (min !== undefined && max !== undefined) return `🚨 Oh no! The value must be between ${min} and ${max}`
  return isTooSmall ? `🚨 Oh no! The value must be at least ${min}` : `🚨 Oh no! The value must be at most ${max}`
}

export default function InputNumber({ label, value, min, max, step, onChange, additionalStyle }: InputNumberProps) {
  const toast = useRef<Toast | null>(null)

  const [inputValue, setInputValue] = useState<string>(value.toString())

  useEffect(() => {
    setInputValue(value.toString())
  }, [value])

  // valid values are propagated while typing, invalid ones are reported (and reverted) on blur
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    const newValue = parseFloat(e.target.value)
    if (!isNaN(newValue) && !rangeError(newValue, min, max)) onChange(newValue)
  }

  const handleInputBlur = () => {
    const newValue = parseFloat(inputValue)
    if (isNaN(newValue)) return

    const errorMessage = rangeError(newValue, min, max)
    if (!errorMessage) {
      onChange(newValue)
      return
    }

    toast.current?.show({ severity: 'error', summary: 'Invalid input', detail: errorMessage, life: 3000 })
    setInputValue(value.toString())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur()
      e.currentTarget.blur() // optional: blur after pressing Enter
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <input
        type="number"
        id={label}
        value={inputValue}
        min={min}
        max={max}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        step={step}
        className={'p-1 min-w-[4rem] bg-primary-50 rounded-md focus:outline-none text-right ' + additionalStyle}
      />
    </>
  )
}
