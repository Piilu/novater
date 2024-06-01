import React from 'react'
import
{
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
}
  from './select'
import { cn } from '~/lib/utils';
import ActiveRing from './active-ring';

type SimpleSelectProps = {
  className?: string,
  triggerClassName?: string,
  value?: string,
  placeholder?: string,
  id?: string,
  data?: { value: string, name: string, isValid?: boolean }[],
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
}

export default function SimpleSelect(props: SimpleSelectProps)
{
  const { triggerClassName,
    className,
    id,
    value,
    data,
    placeholder,
    onValueChange,
    isLoading
  } = props;

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={cn(triggerClassName)}>
        <SelectValue id={id} placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn(className)}>
        {data?.map(item =>
        {
          return (
            <SelectItem key={`${item.value}`} value={item.value}>
              <div className='flex items-center gap-2'>
                {item.isValid && <ActiveRing />}
                {item.name}
              </div>
            </SelectItem>
          )
        })}
        {data?.length === 0 ? <p className="px-2">Not found</p> : null}
        {isLoading && "Loading..."}
      </SelectContent>
    </Select>
  )
}
