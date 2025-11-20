import { useEffect, useState } from "react";
import { emotionIcons } from "../data/EmotionIcons";
import { supabase } from "../lib/supabase";
import { getLengthComment } from "./utils/getLengthComment";

function AllRecordBoxCard({ year, month, monthlyCount }) {
  const [totalChars, setTotalChars] = useState(0);
  const [emotionCounts, setEmotionCounts] = useState({});
  const [message, setMessage] = useState("");

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

        setMessage(getLengthComment(chars));

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
    <div className="bg-white mx-auto w-[343px] sm:w-96 max-w-full rounded-lg shadow-md p-4 mb-14">
      <h1 className="text-[#577C2A] text-xl sm:text-xl lg:text-2xl font-semibold text-center mt-6">
        {month}월 모든 기록 요약
      </h1>

      <div className="mt-5 items-end justify-center">
        <div className="mt-5 flex flex-row items-end justify-center gap-4 sm:gap-10">
          {/* 글자수 */}
          <div className="text-center">
            <div className="text-4xl sm:text-6xl font-bold text-[#7ab3fd]">
              {monthlyCount}
              <span className="text-sm sm:text-base font-semibold text-[#577C2A]">
                개
              </span>
            </div>
            <p className="text-base sm:text-xl mt-2 font-semibold text-[#577C2A]">
              이번달 기록
            </p>
          </div>

          {/* 글자수 */}
          <div className="text-center">
            <div className="text-4xl sm:text-6xl font-bold text-[#ff676f]">
              {totalChars}
              <span className="text-sm sm:text-base font-semibold text-[#577C2A]">
                자
              </span>
            </div>
            <p className="text-base sm:text-xl mt-2 font-semibold text-[#577C2A]">
              총 작성 글자수
            </p>
          </div>
        </div>

        {/* 감정 수 */}
        <div className="flex gap-4 sm:gap-6 justify-center mt-6 sm:mt-9 flex-wrap">
          {emotionIcons.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-8 sm:w-10 h-8 sm:h-10"
                />
                <span className="absolute -top-2 -right-2 sm:-top-2 sm:-right-3 bg-[#ff545c] py-1 px-2 rounded-full text-white text-xs sm:text-sm font-semibold">
                  {emotionCounts[item.name] || 0}
                </span>
              </div>
              <p className="text-sm sm:text-md mt-1 sm:mt-2 font-semibold text-[#577C2A]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#E6FFC7] rounded-lg mt-5 sm:mt-7 p-3 sm:p-4">
        <h1 className="text-[#314813] text-xs sm:text-sm font-semibold">
          이번 달 인사이트
        </h1>
        <p className="text-xs sm:text-sm mt-2 sm:mt-4 leading-5">
          이번달은 총 {totalChars}글자 적으셨네요. <br />
          {message}
        </p>
      </div>
    </div>
  );
}

export default AllRecordBoxCard;
