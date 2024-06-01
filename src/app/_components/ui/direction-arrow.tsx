import { ArrowRight, Dot } from 'lucide-react'
import React from 'react'
import { cn } from '~/lib/utils';

type DirectionArrowProps = {
  className?: string,
}

export default function DirectionArrow(props: DirectionArrowProps)
{
  const { className } = props;
  return (
    <div className={cn("flex items-center h-full", className)}>
      <Dot className="opacity-50" />
      <ArrowRight />
      <Dot className="opacity-50" />
    </div>
  )
}
