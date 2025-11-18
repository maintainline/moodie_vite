import moment from "moment";
import { useNavigate } from "react-router-dom";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const WeekCalendar = () => {
  const today = new Date();
  const navigate = useNavigate();

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

  const emotionToImage = {
    기쁨: "/기쁨.svg",
    슬픔: "/슬픔.svg",
    분노: "/분노.svg",
    불안: "/불안.svg",
    평온: "/평온.svg",
  };

  return (
    <div className="mx-auto w-[390px] rounded-[15px] bg-white p-4 shadow-md">
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

      <div className="border-b border-[#4e741d]/50 my-1" />

      {/* 날짜 + 감정 */}
      <div className="flex">
        {weekDates.map(date => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          const dateStr = moment(date).format("YYYY-MM-DD");

          // 해당 날짜 mood 찾기
          // const dayMood = moodList.find(item => item.date === dateStr);

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => navigate(`/detail/${dateStr}`)}
              className="relative flex-1 border-r last:border-r-0 bg-transparent py-2 text-center text-[30px] font-extrabold text-[#4e741d]/10"
            >
              {date.getDate()}

              {/* 감정 아이콘 */}
              {/* {dayMood && (
                <div className="relative inline-block">
                  {(() => {
                    const emotions = {
                      기쁨: dayMood.joy,
                      슬픔: dayMood.sadness,
                      분노: dayMood.anger,
                      불안: dayMood.anxiety,
                      평온: dayMood.calmness,
                    };

                    const maxScore = Math.max(...Object.values(emotions));
                    const topEmotions = Object.entries(emotions)
                      .filter(([_, score]) => score === maxScore)
                      .map(([name]) => name);

                    const topEmotion = topEmotions.includes(dayMood.imoji)
                      ? dayMood.imoji
                      : topEmotions[0];

                    return (
                      <img
                        src={emotionToImage[topEmotion]}
                        alt={topEmotion}
                        className="absolute -top-8 -left-5 w-10 h-10"
                      />
                    );
                  })()}
                </div>
              )} */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendar;
