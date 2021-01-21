import React, {useState} from 'react';
import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function DatePicker() {

    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="date-picker">
            <DateView 
                selected={selectedDate} 
                onChange={date => setSelectedDate(date)}
                minDate={new Date()}/>
        </div>
    )
}

export default DatePicker
