"use client"

import * as React from "react"
import {ChevronLeftIcon, ChevronRightIcon} from "@radix-ui/react-icons"
import {DayPicker} from "react-day-picker"

import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row w-full space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({variant: "outline"}),
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex w-full",
                head_cell:
                    "text-muted-foreground rounded-md w-8 font-bold text-[0.8rem] w-full text-primary ",
                row: "flex w-full mt-2",
                cell: cn(
                    "relative w-full p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                    props.mode === "range"
                        ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                        : "[&:has([aria-selected])]:rounded-md"
                ),
                day: cn(
                    buttonVariants({variant: "ghost"}),
                    "h-8 w-8 p-0 font-normal aria-selected:opacity-100 w-full"
                ),
                day_range_start: "day-range-start",
                day_range_end: "day-range-end",
                day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground w-full",
                day_today: "bg-accent text-accent-foreground",
                day_outside:
                    "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30 w-full",
                day_disabled: "text-muted-foreground opacity-50 w-full",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground w-full",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({...props}) => <ChevronLeftIcon className="h-4 w-4"/>,
                IconRight: ({...props}) => <ChevronRightIcon className="h-4 w-4"/>,
            }}
            {...props}
        />
    )
}

Calendar.displayName = "Calendar"

export {Calendar}