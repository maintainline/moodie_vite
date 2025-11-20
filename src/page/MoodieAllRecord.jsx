// 전체 기록 (한달)
import { useEffect, useState } from "react";
import AllCalendar from "../components/allcalendar/AllCalendar";
import AllRecordBoxCard from "../components/AllRecordBoxCard";
import MoodieCategoryBt from "../components/MoodieCategoryBt";
import moment from "moment";
import { supabase } from "../lib/supabase";
import { diaryCountComments } from "../data/diaryCountComments ";

function MoodieAllRecord() {
  const [currentMonth, setCurrentMonth] = useState(moment().month() + 1);
  const [currentYear, setCurrentYear] = useState(moment().year());
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [diaryCountMessage, setDiaryCountMessage] = useState("");

  useEffect(() => {
    const fetchMonthlyCount = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const start = new Date(currentYear, currentMonth - 1, 1);
      const end = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999); // 마지막 날

      const { data, error } = await supabase
        .from("diaries")
        .select("id", { count: "exact" })
        .eq("user_id", user.id)
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());

      if (error) {
        console.error(error);
        return;
      }

      const count = data?.length || 0;
      setMonthlyCount(count);

      // 일기 갯수에 따른 멘트 가져오기
      const clampedCount = Math.min(count, 31); // 31 이상이면 31로 처리
      setDiaryCountMessage(diaryCountComments[clampedCount]);
    };

    fetchMonthlyCount();
  }, [currentYear, currentMonth]);

  return (
    <div>
      <div className="bg-[linear-gradient(180deg,rgba(247,255,237,1)_40%,rgba(208,249,157,1)_100%)] pt-20 pb-11">
        {/*  카테고리 버튼 */}
        <MoodieCategoryBt />
        {/* 전체 캘린더 */}
        <AllCalendar
          currentDate={new Date()}
          onMonthChange={(year, month) => {
            setCurrentYear(year);
            setCurrentMonth(month);
          }}
        />
        {/* <WeekCalendar /> */}
        {/* 주간 기록 현황 */}
        <div className="mt-11">
          <h2 className="text-center text-[#314813] text-xl ">
            {currentMonth}월에는{" "}
            <span className="font-bold">
              총 {monthlyCount}개의 기록이 저장되었어요.
            </span>
          </h2>
        </div>
        <div className="mt-3 mx-auto text-center text-[#314813] text-sm w-96 px-9">
          <p>{diaryCountMessage}</p>
        </div>
      </div>

      {/* 0 월 카드 박스 */}
      <div className="mt-9">
        <AllRecordBoxCard
          year={currentYear}
          month={currentMonth}
          monthlyCount={monthlyCount}
        />
      </div>
    </div>
  );
}

export default MoodieAllRecord;
