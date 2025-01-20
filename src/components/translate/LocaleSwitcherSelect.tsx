"use client"

import * as Select from "@radix-ui/react-select"
import { useTransition } from "react"
import type { Locale } from "@/i18n/config"
import { setUserLocale } from "@/services/locale"
import { Languages } from "lucide-react"

type Props = {
  defaultValue: string
  items: Array<{ value: string; label: string }>
  label: string
}

export default function LocaleSwitcherSelect({ defaultValue, items, label }: Props) {
  const [isPending, startTransition] = useTransition()

  function onChange(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={`flex items-center text-sm text-white hover:text-gray-900 focus:outline-none ${
            isPending ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <Languages className="mr-1 h-4 w-4" />
          <Select.Value />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden rounded-md bg-white shadow-sm z-50" position="popper" align="end">
            <Select.Viewport className="p-1">
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  className="relative flex cursor-default select-none items-center rounded-sm px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <Select.ItemText>{item.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

