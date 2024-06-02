import React from 'react'
import SimpleCard from '../ui/simple-card'
import type { TicketTravelData } from '~/lib/type'
import DirectionItem from './direction-item'
import { format } from '~/lib/format'
import { Button } from '../ui/button'
import Reservation from '../reservation/reservation'

type TicketItemProps = {
  item: TicketTravelData
}

export default function TicketItem(props: TicketItemProps)
{
  const { item } = props;

  const details = {
    company: item.schedule.company.state,
    from: item.from.name,
    to: item.to.name,
    startDate: item.schedule.start,
    endDate: item.schedule.end,
    distance: item.distance,
    travelTime: item.schedule.travelTime,
  }

  return (
    <SimpleCard footer={footer()} className='p-3'>
      <DirectionItem details={details} />
    </SimpleCard>
  )

  function footer()
  {
    return (
      <div className='w-full flex flex-col gap-3'>
        <div className="flex gap-1 items-center justify-between ">
          <p className='text-xl font-semibold'>{format.price(item.schedule.price)} </p>
          <Reservation selectedTicket={item} schedules={[item.schedule.id]} tickets={[item.ticket.id]} label='Book' />
        </div>
      </div >
    )
  }
}
