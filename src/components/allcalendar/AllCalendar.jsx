import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "./AllCalendar.css";

const AllCalendar = ({ currentDate }) => {
  const [activeDate, setActiveDate] = useState(currentDate);
  const navigate = useNavigate();

  const weekName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const formatShortWeekday = (locale, date) => weekName[date.getDay()];
  const formatDay = (locale, date) => moment(date).format("D");

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveDate(activeStartDate);
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="relative">
        <Calendar
          value={activeDate}
          onActiveStartDateChange={handleActiveStartDateChange}
          navigationLabel={({ date }) =>
            `${activeDate.getFullYear()}년 ${activeDate.getMonth() + 1}월 기록`
          }
          prevLabel={
            <span className="custom-button">
              {activeDate.getMonth() === 0 ? 12 : activeDate.getMonth()}월
            </span>
          }
          nextLabel={
            <span className="custom-button">
              {activeDate.getMonth() === 11 ? 1 : activeDate.getMonth() + 2}월
            </span>
          }
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          formatDay={formatDay}
        />
      </div>
    </div>
  );
};

export default AllCalendar;
