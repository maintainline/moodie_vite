// 일일 감정
import { Link } from "react-router-dom";
import { MoodDiaryMock } from "../data/MoodDiaryMock";

function WeeklyMoodPreview() {
  return (
    <div className="w-96 bg-white mx-auto rounded-md shadow-md p-4 mb-11">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-md font-semibold text-[#4E741D]">
          이번주 나의 감정기록
        </h1>
        <Link to={"/weeklyrecord"}>
          <p className="text-sm text-[#4E741D] font-semibold">더보기</p>
        </Link>
      </div>

      {/* 일기 목록 불러오기 */}
      {MoodDiaryMock.slice(0, 7).map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[30px_35px_1fr_70px] md:grid-cols-[20px_40px_1fr_60px] items-center text-center text-sm py-2 border-b border-[#8DCA42]/50"
        >
          <div className="text-[#4E741D] font-semibold">
            {item.day.slice(0, 1)}
          </div>
          <div
            className={`
                inline-block rounded-2xl text-xs py-[4px] px-[6px]
    ${
      item.emotion === "슬픔"
        ? "bg-[#4D7BAF] text-white"
        : item.emotion === "기쁨"
          ? "bg-[#FFDC49] text-white"
          : item.emotion === "화남"
            ? "bg-[#FB5038] text-white"
            : item.emotion === "불안"
              ? "bg-[#9D52B5] text-white"
              : "bg-[#89C63F] text-white"
    }
  `}
          >
            {item.emotion}
          </div>
          <div className="truncate px-2" title={item.content}>
            {item.content}
          </div>
          <div className="text-xs text-[#4E741D] font-medium">{item.date}</div>
        </div>
      ))}
    </div>
  );
}

export default WeeklyMoodPreview;
