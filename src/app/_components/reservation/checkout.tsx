"use client";
import React, { useState, useEffect } from 'react'
import
{
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent
}
  from '../ui/dialog'
import { Button } from '../ui/button'
import { cn } from '~/lib/utils'
import { Separator } from '../ui/separator';
import { useForm } from 'react-hook-form';
import
{
  type ReservationSchema,
  reservationSchema,
  type TicketTravelData,
  type LocalTicket
} from '~/lib/type';
import { Form, FormField } from '../ui/form';
import { Input } from '../ui/input';
import SimpleFormItem from '../ui/simple-form-input';
import { api } from '~/trpc/react';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { errorHelper } from '~/lib/error';
import TicketItem from '../ticket/ticket-item';
import useLocalStorage from 'use-local-storage';
import { date } from '~/lib/date';
import type { Ticket } from '@prisma/client';
import { ticketStore } from '~/lib/ticket-store';
import AmountInput from '../ui/amount-input';
import { format } from '~/lib/format';
import { ScrollArea } from '../ui/scroll-area';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type CheckoutProps = {
  className?: string,
  ticket: Ticket,
}

export default function Checkout(props: CheckoutProps)
{
  const { className } = props;

  const [tickets, setTickets] = useLocalStorage("tickets", [] as LocalTicket[])
  const [isLoading, setIsLoading] = useState(true);
  const [list] = useAutoAnimate();

  const reservation = api.reservation.create.useMutation();

  const totalPrice = tickets.reduce((sum, obj) => (sum + parseFloat(obj.ticket.schedule.price.toString()) * obj.amount), 0)
  const totalTravelTime = tickets.reduce((sum, obj) => sum + parseFloat(date.getRawTimeBetween(obj.ticket.schedule.start, obj.ticket.schedule.end)), 0)

  const form = useForm<ReservationSchema>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      totalPrice: totalPrice.toString(),
      totalTravelTime: totalTravelTime,
    }
  })

  const onSubmit = () =>
  {
    const data: ReservationSchema = {
      ...form.getValues(),
      schedules: tickets.map(item => { return { id: item.ticket.schedule.id, amount: item.amount } }),
      tickets: tickets.map(item => item.ticket.ticket.id),
    };
    reservation.mutate(data, {
      onSuccess: (data) =>
      {
        setTickets([]);
        toast.success(`Added reservation for "${data.firstName} ${data.lastName}"`)
      },
      onError: (error) =>
      {
        toast.error(errorHelper.getTranslatedError(error.message));
      }
    })
  }

  function addToCart(item: TicketTravelData)
  {
    const newData = ticketStore.add(item, tickets);
    setTickets([...newData]);
  }

  function removeFromCart(item: TicketTravelData)
  {
    const newData = ticketStore.remove(item, tickets);
    setTickets([...newData])
  }

  useEffect(() => { setIsLoading(false) }, [])
  if (isLoading) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("w-full sm:w-[500px] h-16", className)}>Checkout ({tickets.length})</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] sm:h-auto h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Reservation</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[20em] my-3">
          <div ref={list} className='flex flex-col'>
            {tickets.map((item, index) =>
            {
              return (
                <div key={"checkout" + item.ticket.schedule.id} className='flex flex-col gap-3  pr-5'>
                  <div className='flex gap-2'>
                    <TicketItem compact item={item.ticket} />
                  </div>
                  <AmountInput remove={() => removeFromCart(item.ticket)} add={() => addToCart(item.ticket)} value={item.amount} />
                  {index !== tickets.length - 1 && <Separator />}
                </div>
              )
            })}
          </div>
        </ScrollArea>
        <Button variant={"destructive"} className="w-full" onClick={() => setTickets([])}>Clear</Button>
        <Separator />
        <div className='flex justify-between'>
          <p className='text-xl font-semibold'>Price:</p>
          <p className='text-xl font-semibold'>{format.price(totalPrice)}</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xl font-semibold'>Total travel time:</p>
          <p className='text-xl font-semibold'>{date.formatTime(totalTravelTime)}</p>
        </div>
        <Form {...form}>
          <form className='flex flex-col gap-3'>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <SimpleFormItem required label='First name'>
                  <Input placeholder="Mike" {...field} />
                </SimpleFormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <SimpleFormItem required label='Last name'>
                  <Input placeholder="Ross" {...field} />
                </SimpleFormItem>
              )}
            />
            <Button isLoading={reservation.isPending} onClick={form.handleSubmit(onSubmit)}>Book</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}
