import React from 'react'
import { date } from '~/lib/date'

type DirectionDataProps = {
  date: Date,
  city: string,
}

export default function DirectionData(props: DirectionDataProps)
{
  const { date: directionDate, city } = props;

  return (
    <div className='flex flex-col'>
      <small>{date.getDate(directionDate)}</small>
      <p className={"text-xl font-semibold"}>{date.getTime(directionDate)}</p>
      <small>{city}</small>
    </div>
  )
}