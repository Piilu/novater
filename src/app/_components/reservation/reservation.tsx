"use client";
import React, { useState } from 'react'
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
import { type ReservationSchema, reservationSchema, type TicketTravelData } from '~/lib/type';
import { Form, FormField } from '../ui/form';
import { Input } from '../ui/input';
import SimpleFormItem from '../ui/simple-form-input';
import { api } from '~/trpc/react';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { errorHelper } from '~/lib/error';
import TicketItem from '../ticket/ticket-item';

type ReservationProps = {
  className?: string,
  label: string,
  schedules: string[],
  tickets: string[],
  selectedTicket: TicketTravelData,
}

export default function Reservation(props: ReservationProps)
{
  const { className, label, schedules, tickets, selectedTicket } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const reservation = api.reservation.create.useMutation();
  const form = useForm<ReservationSchema>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      totalPrice: "123",
      schedules,
      tickets,
    }
  })

  const onSubmit = () =>
  {
    reservation.mutate(form.getValues(), {
      onSuccess: (data) =>
      {
        setIsOpen(false);
        toast.success(`Added reservation for "${data.firstName} ${data.lastName}"`)
      },
      onError: (error) =>
      {
        toast.error(errorHelper.getTranslatedError(error.message));
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogTrigger asChild>
        <Button className={cn(className)}>{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] sm:h-auto h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Reservation</DialogTitle>
        </DialogHeader>
        <TicketItem compact item={selectedTicket} />
        <Separator />
        <div className='flex justify-between'>
            <p className='text-xl font-semibold'>Price:</p>
            <p className='text-xl font-semibold'>50,00 €</p>
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
    </Dialog>
  )
}
