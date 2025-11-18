import moment from "moment";
import { useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "./AllCalendar.css";

const AllCalendar = ({
  currentDate,
  onActiveStartDateChange,
  moodList,
  emotionToImage,
}) => {
  const navigate = useNavigate();

  const weekName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const formatShortWeekday = (locale, date) => {
    return weekName[date.getDay()];
  };
  const formatDay = (locale, date) => {
    return moment(date).format("D");
  };

  // 전달 라벨 텍스트 생성 함수
  const getPrevMonthLabel = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    return `${prev.getMonth() + 1}월`;
  };

  // 다음달 라벨 텍스트 생성 함수
  const getNextMonthLabel = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    return `${next.getMonth() + 1}월`;
  };

  // 해당날짜 기분(imoji)찾기
  const getDayMood = date => {
    const targetDate = moment(date).format("YYYY-MM-DD");
    return moodList?.find(item => item.date === targetDate);
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="relative">
        <Calendar
          value={currentDate}
          onActiveStartDateChange={onActiveStartDateChange}
          navigationLabel={({ date }) =>
            `${date.getFullYear()}년 ${date.getMonth() + 1}월 기록`
          }
          prevLabel={({ date }) => (
            <span className="custom-button">
              {date.getMonth() === 0 ? 12 : date.getMonth()}월
            </span>
          )}
          nextLabel={({ date }) => (
            <span className="custom-button">
              {date.getMonth() === 11 ? 1 : date.getMonth() + 2}월
            </span>
          )}
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          formatDay={formatDay}
          //무디리스트에서 해댱날짜 이모지 가져오기
          tileContent={({ date, view }) => {
            if (view !== "month") return null;
          }}
        />
      </div>
    </div>
  );
};

export default AllCalendar;
