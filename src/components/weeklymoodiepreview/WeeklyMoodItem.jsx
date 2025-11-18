function getDayKor(date) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[new Date(date).getDay()];
}

function formatDate(date) {
  return date?.slice(0, 10);
}

function WeeklyMoodItem({ item }) {
  return (
    <div className="grid grid-cols-[40px_40px_1fr_65px] items-center text-center text-sm py-2 border-b border-[#8DCA42]/50">
      <div className="text-[#4E741D] font-semibold">
        {getDayKor(item.created_at)}
      </div>

      <div
        className={`
        inline-block rounded-full text-[11px] py-1 px-2
        ${
          item.main_emotion === "슬픔"
            ? "bg-[#4D7BAF] text-white"
            : item.main_emotion === "기쁨"
              ? "bg-[#FFDC49] text-white"
              : item.main_emotion === "화남"
                ? "bg-[#FB5038] text-white"
                : item.main_emotion === "불안"
                  ? "bg-[#9D52B5] text-white"
                  : "bg-[#89C63F] text-white"
        }
      `}
      >
        {item.main_emotion ?? "기타"}
      </div>

      <div className="truncate px-2" title={item.content}>
        {item.content}
      </div>

      <div className="text-xs text-[#4E741D] font-medium">
        {formatDate(item.created_at)}
      </div>
    </div>
  );
}

export default WeeklyMoodItem;
