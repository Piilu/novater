import React, { type ReactNode } from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './form'
import { Asterisk } from 'lucide-react';

type SimpleFormItemProps = {
  label: string,
  description?: string,
  children: ReactNode,
  required?: boolean,
}

export default function SimpleFormItem(props: SimpleFormItemProps)
{
  const {
    label,
    description,
    children,
    required,
  } = props;

  return (
    <FormItem className="w-full">
      <FormLabel
        className="relative">
        {label}
        {required ?
          <Asterisk
            className="h-4 w-4 absolute top-0 right-[-1.2em] text-destructive" />
          : null}
      </FormLabel>
      <FormControl className="border">
        {children}
      </FormControl>
      {description ?
        <FormDescription>{description}</FormDescription>
        : null}
      <FormMessage />
    </FormItem>
  )
}