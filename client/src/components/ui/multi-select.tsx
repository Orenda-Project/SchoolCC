"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"

export interface MultiSelectOption {
  id: string
  name: string
  role: string
  school: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onSelectionChange: (selected: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onSelectionChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options

    const query = searchQuery.toLowerCase()
    return options.filter(
      (option) =>
        option.name.toLowerCase().includes(query) ||
        option.role.toLowerCase().includes(query) ||
        option.school.toLowerCase().includes(query)
    )
  }, [options, searchQuery])

  const toggleOption = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id]
    onSelectionChange(newSelected)
  }

  const selectedCount = selected.length
  const displayText =
    selectedCount === 0
      ? placeholder
      : `${selectedCount} selected`

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <span className="truncate">{displayText}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="w-[--radix-popover-trigger-width] p-0 bg-popover border rounded-md shadow-md z-50"
          align="start"
          sideOffset={4}
        >
          <div className="flex flex-col max-h-[400px]">
            {/* Search Input */}
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="overflow-y-auto flex-1">
              {filteredOptions.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  No results found
                </div>
              ) : (
                <div className="p-1">
                  {filteredOptions.map((option) => {
                    const isSelected = selected.includes(option.id)
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleOption(option.id)}
                        className="w-full flex items-start gap-2 p-2 rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer text-left"
                      >
                        <div
                          className={cn(
                            "h-4 w-4 rounded-sm border border-primary flex items-center justify-center flex-shrink-0 mt-0.5",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-transparent"
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {option.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {option.role} • {option.school}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer with selection count */}
            {selectedCount > 0 && (
              <div className="p-2 border-t bg-muted/50">
                <div className="text-xs text-muted-foreground text-center">
                  {selectedCount} {selectedCount === 1 ? "item" : "items"}{" "}
                  selected
                </div>
              </div>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
