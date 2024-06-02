import React from 'react'
import DirectionData from './direction-data';
import DirectionArrow from '../ui/direction-arrow';

type DirectionItemProps = {
  details: {
    company: string,
    from: string,
    to: string,
    startDate: Date,
    endDate: Date,
    distance: string,
    travelTime: number,
    amount?: number,
  },
  compact?: boolean
}

export default function DirectionItem(props: DirectionItemProps)
{
  const { details } = props;
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <DirectionData
          city={details.from}
          date={details.startDate} />
        <div className='flex flex-col items-center'>
          <p className='font-semibold'>{details.amount}</p>
          <p className='font-semibold'>{details.company}</p>
          <DirectionArrow />
        </div>
        <DirectionData
          city={details.to}
          date={details.endDate} />
      </div>
    </div>
  )
}
