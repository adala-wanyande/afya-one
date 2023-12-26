import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div class="bg-[#16172E] p-4 border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
    );
  };

export default Calendar;