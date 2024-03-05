import { format } from "date-fns"
import { useState, useEffect } from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

export function DatePicker({ name, value, onChange }) {
const [date, setDate] = useState(value ? new Date(value) : undefined);

useEffect(() => {
    if (value) {
    setDate(new Date(value));
    }
}, [value]);

const handleDateChange = (newDate) => {
    setDate(newDate);
    onChange({
    target: {
        name,
        value: newDate ? newDate.toISOString() : '',
    },
    });
};

return (
    <Popover>
    <PopoverTrigger asChild>
        <Button
        variant={"outline"}
        className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
        )}
        >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
        <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateChange}
        initialFocus
        />
    </PopoverContent>
    </Popover>
)
}