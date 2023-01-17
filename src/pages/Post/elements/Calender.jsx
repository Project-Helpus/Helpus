import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calender = ({ changeInputHandler, value, setDate }) => {
  const filterPassedtime = time => {
    console.log('안쪽:',time)
    const currentDate = new Date(); 
    const selectedDate = new Date(time);
    
    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <DatePicker
      closeOnScroll={true}
      dateFormat="yy/MM/dd"
      selected={value}
      onChange={date => setDate(date)}
      minDate={new Date()}
      filterTime={filterPassedtime}
      name="date"
    />
  );
};

export default Calender;
