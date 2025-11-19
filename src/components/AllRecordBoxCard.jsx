import { useEffect, useState } from "react";
import { emotionIcons } from "../data/EmotionIcons";
import { supabase } from "../lib/supabase";

function AllRecordBoxCard({ year, month }) {
  const [totalChars, setTotalChars] = useState(0);
  const [emotionCounts, setEmotionCounts] = useState({});

  useEffect(() => {
    if (!year || !month) return;

    const fetchMonthlyRecords = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!data?.user) return;

        const user = data.user;
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);

        const { data: diaries, error: diaryError } = await supabase
          .from("diaries")
          .select("char_count, main_emotion")
          .eq("user_id", user.id)
          .gte("created_at", start.toISOString())
          .lte("created_at", end.toISOString());

        if (diaryError) throw diaryError;

        const chars =
          diaries?.reduce((sum, item) => sum + (item.char_count || 0), 0) || 0;
        setTotalChars(chars);

        const counts = {};
        diaries?.forEach(item => {
          if (item.main_emotion) {
            counts[item.main_emotion] = (counts[item.main_emotion] || 0) + 1;
          }
        });
        setEmotionCounts(counts);
      } catch (err) {
        console.error("Failed to fetch monthly records:", err);
      }
    };

    fetchMonthlyRecords();
  }, [year, month]);

  return (
    <div className="bg-white mx-auto w-96 rounded-lg shadow-md p-4 mb-14">
      <h1 className="text-[#577C2A] text-xl font-semibold text-center mt-6 ">
        {month}월 모든 기록 요약
      </h1>

      <div className="mt-5 items-end justify-center">
        {/*  글자수 */}
        <div className="text-center">
          <p className="text-6xl font-bold text-[#ff676f]">{totalChars}</p>
          <p className="text-xl mt-2 font-semibold text-[#577C2A]">총 글자수</p>
        </div>
        {/*  감정수 */}
        <div className="flex gap-6 justify-center mt-9">
          {emotionIcons.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative">
                <img src={item.icon} alt={item.name} className="w-10 h-10" />
                <span className="absolute -top-2 -right-3  bg-red-500 py-1 px-2 rounded-full text-white text-xs">
                  {emotionCounts[item.name] || 0}
                </span>
              </div>
              <p className="text-md mt-2 font-semibold text-[#577C2A]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#E6FFC7] rounded-lg mt-7 p-4">
        <h1 className="text-[#314813] text-sm font-semibold">
          이번 달 인사이트
        </h1>
        <p className="text-xs mt-4">
          이번달은 총 {totalChars}글자 적으셨네요~ 앞으로 더 열심히 적어보세용
          이번달은 총 000글자 적으셨네요~ 앞으로 더 열심히 적어보세용
        </p>
      </div>
    </div>
  );
}

export default AllRecordBoxCard;
