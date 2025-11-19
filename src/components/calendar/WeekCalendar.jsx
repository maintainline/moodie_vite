import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { emotionIcons } from "../../data/EmotionIcons";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const WeekCalendar = () => {
  const today = new Date();
  const navigate = useNavigate();
  const [weekMoods, setWeekMoods] = useState([]);

  // 오늘 포함된 주의 일요일~토요일 구하기
  const getWeekDates = baseDate => {
    const sunday = new Date(baseDate);
    sunday.setDate(baseDate.getDate() - baseDate.getDay());

    return [...Array(7)].map((_, i) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(today);

  useEffect(() => {
    fetchWeekMoods();
  }, []);

  const fetchWeekMoods = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const start = moment(weekDates[0]).format("YYYY-MM-DDT00:00:00");
    const end = moment(weekDates[6]).format("YYYY-MM-DDT23:59:59");

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

    // dateStr 기준으로 매핑
    const mapped = data.map(item => ({
      date: moment(item.created_at).format("YYYY-MM-DD"),
      main_emotion: item.main_emotion,
    }));

    setWeekMoods(mapped);
  };

  // 클릭한 날짜 다이어리로 이동
  const goToDiaryByDate = async dateStr => {
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
      .single(); // 하루 하나만 가정

    if (error || !data) {
      console.error(error || "No diary found for this date");
      return;
    }

    navigate(`/diary/${data.id}`, { state: { fromWeekCalendar: true } });
  };

  return (
    <div className="mx-auto w-96 rounded-lg bg-white p-4 shadow-md">
      {/* 요일 */}
      <div className="flex">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={`flex-1 text-center font-extrabold border-r last:border-r-0
            ${
              i === 0
                ? "text-[#ed7777]"
                : i === 6
                  ? "text-[#4985b7]"
                  : "text-[#4e741d]"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="border-b border-[#4e741d]/20 my-1" />

      {/* 날짜 + 감정 */}
      <div className="flex">
        {weekDates.map(date => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          const dateStr = moment(date).format("YYYY-MM-DD");

          // 해당 날짜 mood 찾기
          const dayMood = weekMoods.find(item => item.date === dateStr);
          const emotionIcon = dayMood
            ? emotionIcons.find(e => e.name === dayMood.main_emotion)?.icon
            : null;

          return (
            <div
              key={date.toISOString()}
              className={`relative flex-1 border-r last:border-r-0 py-1 text-center text-2xl font-extrabold`}
            >
              {/* 날짜 숫자 */}
              <span className="text-[#4E741D]/10">{date.getDate()}</span>

              {/* 감정 아이콘 */}
              {emotionIcon && (
                <img
                  src={emotionIcon}
                  alt={dayMood.main_emotion}
                  className="absolute top-1 left-1/2 transform -translate-x-1/2 w-9 h-9 cursor-pointer"
                  onClick={() => goToDiaryByDate(dateStr)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendar;
