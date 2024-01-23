"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const tags = [
  {
    value: "social",
    label: "Social",
  },
  {
    value: "events",
    label: "Events",
  },
  {
    value: "news",
    label: "News",
  },
];

type SelectTagsProps = {
  values: string[];
  setValues: (args: string[]) => void;
};

export function SelectTags({ values, setValues }: SelectTagsProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between bg-white overflow-hidden"
          >
            {values.length > 0
              ? tags
                  .filter((tag) => values.includes(tag.value))
                  .map((tag) => tag.label)
                  .join(", ")
              : "Select tags..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search tags..." className="h-9" />
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag.value}
                  value={tag.value}
                  onSelect={(currentValue) => {
                    let nextValues = Array<string>();
                    if (values.includes(currentValue)) {
                      nextValues = values.filter(
                        (value) => value !== currentValue
                      );
                    } else {
                      nextValues = [...values, currentValue];
                    }
                    setValues(nextValues);
                    setOpen(false);
                  }}
                >
                  {tag.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      values.includes(tag.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
