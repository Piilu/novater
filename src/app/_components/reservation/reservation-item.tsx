import React from 'react'
import SimpleCard from '../ui/simple-card'
import TicketItem from '../ticket/ticket-item';
import type { ReservationModel, ReservationTicketData } from '~/lib/type';
import DirectionItem from '../ticket/direction-item';
import { Separator } from '../ui/separator';

type ReservationItemProps =
  {
    reservation: ReservationModel,
  }
export default function ReservationItem(props: ReservationItemProps)
{
  const { reservation } = props;
  return (
    <SimpleCard titleClassName='text-md' footer={
      <div className='flex flex-col w-full gap-3  '>
        <div className='flex justify-between'>
          <p className="text-xl font-semibold">Total price:</p>
          <p className="text-xl font-semibold">50</p>
        </div>
        <div className='flex justify-between'>
          <p className="text-xl font-semibold">Total travel time:</p>
          <p className="text-xl font-semibold">50</p>
        </div>
      </div>
    } title={`${reservation.firstName} ${reservation.lastName}`} className='p-3'>
      {reservation.tickets?.map(item =>
      {
        const details = {
          company: item.schedule.company.state,
          from: item.schedule.route.from.name,
          to: item.schedule.route.to.name,
          startDate: item.schedule.start,
          endDate: item.schedule.end,
          distance: item.schedule.route.distance,
          travelTime: item.schedule.travelTime,
        }

        return (
          <DirectionItem key={"reservation-ticket-" + item.id} details={details} />
        )
      })}
    </SimpleCard>
  )
}
