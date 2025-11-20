import moment from "moment";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { emotionIcons } from "../../data/EmotionIcons";
import "./AllCalendar.css";

const AllCalendar = ({ currentDate, onMonthChange }) => {
  const [activeDate, setActiveDate] = useState(currentDate);
  const [moodList, setMoodList] = useState([]);
  const navigate = useNavigate();

  const weekName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const formatShortWeekday = (locale, date) => weekName[date.getDay()];
  const formatDay = (locale, date) => moment(date).format("D");

  useEffect(() => {
    fetchMoods();
  }, [activeDate]);

  const fetchMoods = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const start = moment(activeDate)
      .startOf("month")
      .format("YYYY-MM-DDT00:00:00");
    const end = moment(activeDate).endOf("month").format("YYYY-MM-DDT23:59:59");

    const { data, error } = await supabase
      .from("diaries")
      .select("created_at, main_emotion")
      .eq("user_id", user.id)
      .gte("created_at", start)
      .lte("created_at", end);

    if (error) {
      console.error(error);
      return;
    }

    const mapped = data.map(item => ({
      date: moment(item.created_at).format("YYYY-MM-DD"),
      main_emotion: item.main_emotion,
    }));

    setMoodList(mapped);
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveDate(activeStartDate);
    if (onMonthChange) {
      const year = activeStartDate.getFullYear();
      const month = activeStartDate.getMonth() + 1; // 1~12월
      onMonthChange(year, month);
    }
  };

  const handleEmojiClick = async dateStr => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("diaries")
      .select("id")
      .eq("user_id", user.id)
      .gte("created_at", `${dateStr}T00:00:00`)
      .lte("created_at", `${dateStr}T23:59:59`)
      .single();

    if (error || !data) {
      console.error(error || "No diary found for this date");
      return;
    }

    navigate(`/diary/${data.id}`, { state: { fromWeekCalendar: false } });
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="relative w-[343px] sm:w-[768px] lg:w-[960px] mx-auto">
        <Calendar
          value={activeDate}
          onActiveStartDateChange={handleActiveStartDateChange}
          navigationLabel={({ date }) => (
            <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#314813]">
              {activeDate.getFullYear()}년 {activeDate.getMonth() + 1}월 기록
            </span>
          )}
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
          tileContent={({ date, view }) => {
            if (view === "month") {
              const dateStr = moment(date).format("YYYY-MM-DD");
              const dayMood = moodList.find(m => m.date === dateStr);
              const emotionIcon = dayMood
                ? emotionIcons.find(e => e.name === dayMood.main_emotion)?.icon
                : null;

              return emotionIcon ? (
                <img
                  src={emotionIcon}
                  alt={dayMood.main_emotion}
                  className="absolute top-7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 cursor-pointer"
                  onClick={() => handleEmojiClick(dateStr)}
                />
              ) : null;
            }
          }}
        />
      </div>
    </div>
  );
};

export default AllCalendar;
