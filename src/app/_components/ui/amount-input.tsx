import React from 'react'
import { Button } from './button'
import { Badge } from './badge'
import { Plus, Minus } from 'lucide-react'
import {cn}  from '~/lib/utils'

type AmountInputProps = {
  add: () => void,
  remove: () => void,
  value: string | number,
  className?: string
}

export default function AmountInput(props: AmountInputProps)
{
  const { add, remove, value, className } = props;

  return (
    <div className={cn("flex items-center justify-between",className)}>
      <Button onClick={() => remove()} size="icon" variant="destructive"><Minus className='h-4 w-4' /></Button>
      <Badge variant={"outline"}>{value}</Badge>
      <Button onClick={() => add()} size="icon"><Plus className='h-4 w-4' /></Button>
    </div>
  )
}