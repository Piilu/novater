"use client";
import React, { type ReactNode } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandSeparator } from './command'
import { CommandList } from 'cmdk'
import { cn } from '~/lib/utils'
import { CheckIcon } from 'lucide-react'
import { Badge } from './badge';

type SelectSearchProps = {
  options: string[],
  selected: string[],
  placeholder?: string,
  icon?: ReactNode,
  onValueChange?: (filters: string[]) => void;
}

export default function SelectSearch(props: SelectSearchProps)
{
  const { options, selected, placeholder, icon, onValueChange } = props;

  const clearFilters = () =>
  {
    onValueChange && onValueChange([]);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={icon ? "pl-2" : ""} variant="outline">
          <span className="pr-1">{icon}</span>
          <div className='flex gap-3 items-center'>
            {placeholder}
            {selected.length < 4 ? (
              <>
                {selected.map(option => (
                  <>
                    <Badge className="rounded-sm px-1 font-normal" variant={"outline"}>{option}</Badge>
                  </>
                ))}
              </>
            ) : <Badge className="rounded-sm px-1 font-normal" variant={"outline"}>{selected.length} selected</Badge>}
          </div>

        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {options.map((option) =>
              {
                const isSelected = selected.includes(option);
                return (
                  <CommandItem
                    key={option}
                    onSelect={() =>
                    {
                      if (isSelected)
                      {
                        onValueChange && onValueChange([...selected.filter(item => item !== option)]);

                      }
                      else
                      {
                        onValueChange && onValueChange([...selected, option]);
                      };
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{option}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>

            {selected.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => clearFilters()}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover >
  )
}