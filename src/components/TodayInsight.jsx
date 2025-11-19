import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getWeekRangeSundayToSaturday } from "./utils/dateUtils";

// 오늘 날짜인지 확인하는 헬퍼 함수
const isToday = date => {
  if (!date) return false;
  const todayStr = new Date().toISOString().slice(0, 10);
  const dateStr = new Date(date).toISOString().slice(0, 10);
  return todayStr === dateStr;
};

export default function TodayInsight({ charCount = 0, diaryDate }) {
  const [weeklyCount, setWeeklyCount] = useState(0);

  useEffect(() => {
    loadWeeklyCount();
  }, []);

  async function loadWeeklyCount() {
    // 로그인 유저 가져오기
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { start, end } = getWeekRangeSundayToSaturday();

    // 이번 주 작성된 diary 개수 조회
    const { data } = await supabase
      .from("diaries")
      .select("id", { count: "exact" }) // count 옵션 사용
      .eq("user_id", user.id)
      .gte("created_at", `${start}T00:00:00`)
      .lte("created_at", `${end}T23:59:59`);

    setWeeklyCount(data?.length || 0);
  }

  return (
    <div className="bg-[#EBFFD3] w-96 mx-auto rounded-lg mb-7 py-6 px-4">
      <h1 className="text-[#4E741D] justify-center text-center text-base font-semibold mb-4">
        {isToday(diaryDate) ? "오늘의 인사이트" : "이날의 인사이트"}
      </h1>
      <div className="bg-white w-full rounded-lg shadow-md py-5 px-6">
        <div className="flex justify-center gap-8 text-center">
          <div>
            <div className="text-[#31A0B9] font-bold text-5xl mb-2">
              {charCount || 0}
              <span className="text-base text-[#4E741D]"> 자</span>
            </div>
            <p className="text-sm font-semibold text-[#4E741D]">
              {isToday(diaryDate) ? "오늘의 글자수" : "이날의 글자수"}
            </p>
          </div>
          <div>
            <div className="text-[#31A0B9] font-bold text-5xl mb-2">
              {weeklyCount}
              <span className="text-base text-[#4E741D]">번</span>
            </div>
            <p className="text-sm font-semibold text-[#4E741D]">
              주간 작성 횟수
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
