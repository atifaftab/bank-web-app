import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./MyDatePicker.css";
import getYear from "date-fns/getYear";
import range from "lodash.range";

const getMonth1 = (date) => {
  return date.getMonth();
};

export const MyDatePicker = (props) => {
  const onDatePickerChange = (e) => {
    setStartDate(e);
    props.onChange(e);
  };

  const [startDate, setStartDate] = useState(props.currentDate);
  const years = range(1940, getYear(props.currentDate) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="react-datepicker__input-container">
      <label className="text-gray-400" htmlFor={props.id}>
        {props.label}
      </label>
      <DatePicker
        className="w-full p-2 rounded-xl border"
        id={props.id}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={months[getMonth1(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
          </div>
        )}
        selected={startDate}
        onChange={onDatePickerChange}
      />
    </div>
  );
};
