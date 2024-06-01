import React, { type ReactNode } from 'react'
import
{
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from './card'
import { cn } from '~/lib/utils';

type SimpleCardProps = {
  title?: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  mainClassName?: string;
  titleClassName?: string;
  footer?: ReactNode;
}

export default function SimpleCard(props: SimpleCardProps)
{
  const {
    title,
    description,
    children,
    className,
    titleClassName,
    footer,
    mainClassName } = props;

  return (
    <Card className={mainClassName}>
      {title ?? description ?
        <CardHeader className='p-5 pb-1 m-0 mb-2'>
          <CardTitle className={cn("pb-0 mb-0", titleClassName)}>{title}</CardTitle>
          {
            description ?

              <CardDescription className={cn("truncate", titleClassName)}>
                {description}
              </CardDescription>
              : null
          }
        </CardHeader>
        : null
      }
      {children ?
        <CardContent className={cn("flex flex-col gap-3", className)}>
          {children}
        </CardContent>
        : null}
      {footer ?
        <CardFooter className="border-t p-3 px-5">{footer}</CardFooter>
        : null}
    </Card>
  )
}