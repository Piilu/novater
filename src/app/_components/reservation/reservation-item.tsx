import React from 'react'
import SimpleCard from '../ui/simple-card'
import type { ReservationModel } from '~/lib/type';
import DirectionItem from '../ticket/direction-item';
import { format } from '~/lib/format';
import { date } from '~/lib/date';

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
          <p className="text-xl font-semibold">{format.price(reservation.totalPrice)}</p>
        </div>
        <div className='flex justify-between'>
          <p className="text-xl font-semibold">Total travel time:</p>
          <p className="text-xl font-semibold">{date.formatTime(parseInt(reservation.totalTravelTime))}</p>
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
          amount: item.amount,
        }

        return (
          <DirectionItem key={"reservation-ticket-" + item.id} details={details} />
        )
      })}
    </SimpleCard>
  )
}
