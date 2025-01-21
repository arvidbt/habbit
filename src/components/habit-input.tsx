'use client'

import React, { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement>

export function CustomInput({ className, ...props }: CustomInputProps) {
  const [isFilled, setIsFilled] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(e.target.value.length > 0)
    props.onChange?.(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  return (
    <Input
      {...props}
      ref={inputRef}
      className={cn(
        'transition-all duration-200 ease-in-out',
        isFilled && !isFocused
          ? 'bg-mantle px-2 text-black shadow-none placeholder:text-primary-foreground/70'
          : 'bg-base text-foreground',
        !isFilled && !isFocused
          ? 'rounded-none border-b border-black outline-none'
          : 'border-input outline-none',
        className
      )}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  )
}
