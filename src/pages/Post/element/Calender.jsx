import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calender = ({ selectedDate, setDate }) => {
  const filterPassedtime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <DatePicker
      closeOnScroll={true}
      dateFormat="yy/MM/dd"
      selected={selectedDate}
      onChange={(date) => setDate(date)}
      minDate={new Date()}
      filterTime={filterPassedtime}
      name="date"
      border="none"
    />
  );
};

export default Calender;
