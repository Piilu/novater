import React from 'react'
import SimpleCard from '../ui/simple-card'
import type { LocalTicket, TicketTravelData } from '~/lib/type'
import DirectionItem from './direction-item'
import { format } from '~/lib/format'
import Reservation from '../reservation/checkout'
import { Button } from '../ui/button'
import { ticketStore } from '~/lib/ticket-store'
import useLocalStorage from 'use-local-storage'
import AmountInput from '../ui/amount-input'

type TicketItemProps = {
  item: TicketTravelData,
  compact?: boolean,
  disableCart?: boolean,
}

export default function TicketItem(props: TicketItemProps)
{
  const { item, compact, disableCart } = props;
  const [tickets, setTickets] = useLocalStorage("tickets", [] as LocalTicket[])

  const details = {
    company: item.schedule.company.state,
    from: item.from.name,
    to: item.to.name,
    startDate: item.schedule.start,
    endDate: item.schedule.end,
    distance: item.distance,
    travelTime: item.schedule.travelTime,
  }

   //#region FUNCTIONS
   function addToCart()
   {
     const newData = ticketStore.add(item, tickets);
     setTickets([...newData]);
   }
 
   function removeFromCart()
   {
     const newData = ticketStore.remove(item, tickets);
     setTickets([...newData])
   }
   //#endregion

  if (compact)
  {
    return (
      <DirectionItem details={details} />
    )
  }
  return (
    <SimpleCard footer={footer()} className='p-3'>
      <DirectionItem details={details} />
    </SimpleCard>
  )

  function footer()
  {
    const current = ticketStore.findFrom(item, tickets)
    return (
      <div className='w-full flex flex-col gap-3'>
        <div className="flex gap-1 items-center justify-between ">
          <p className='text-xl font-semibold'>{format.price(item.schedule.price)} </p>
          {!disableCart && < div className="ml-auto flex ">
            {!current || current.amount === 0 ?
              <Button className='relative' onClick={() => addToCart()}>Add to cart</Button>
              : <AmountInput
                className='gap-2'
                remove={() => removeFromCart()}
                add={() => addToCart()}
                value={current.amount} />
            }
          </div>}
        </div>
      </div >
    )
  }
}
