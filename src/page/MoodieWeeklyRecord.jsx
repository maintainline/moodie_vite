import { useEffect, useState } from "react";
import WeekCalendar from "../components/calendar/WeekCalendar";
import DiaryCardBox from "../components/DiaryCardBox";
import MonthWeekTitle from "../components/MonthWeekTitle";
import MoodieCategoryBt from "../components/MoodieCategoryBt";
import {
  getWeekOfMonth,
  getWeekRangeSundayToSaturday,
} from "../components/utils/dateUtils";
import { supabase } from "../lib/supabase";
import { getLengthComment } from "../components/utils/getLengthComment";
import { getDiaryCountComment } from "../components/utils/getDiaryCountComment";

function MoodieWeeklyRecord() {
  const [user, setUser] = useState(null);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [weeklyCharCount, setWeeklyCharCount] = useState(0);
  const [message, setMessage] = useState("");
  const [diaryCountMessage, setDiaryCountMessage] = useState("");

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  useEffect(() => {
    setDiaryCountMessage(getDiaryCountComment(weeklyCount));
  }, [weeklyCount]);

  async function fetchWeeklyData() {
    // 로그인 유저 가져오기
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return setUser(null);
    setUser(user);

    const { start, end } = getWeekRangeSundayToSaturday();

    // 이번주 일기 가져오기
    const { data, error } = await supabase
      .from("diaries")
      .select("char_count")
      .eq("user_id", user.id)
      .gte("created_at", `${start}T00:00:00`)
      .lte("created_at", `${end}T23:59:59`);

    if (error) {
      console.error(error);
      return;
    }

    setWeeklyCount(data?.length || 0);
    const totalChars =
      data?.reduce((sum, item) => sum + (item.char_count || 0), 0) || 0;
    setWeeklyCharCount(totalChars);
    setMessage(getLengthComment(totalChars));
  }

  const week = getWeekOfMonth();
  const month = new Date().getMonth() + 1;

  return (
    <div>
      <div className="bg-[linear-gradient(180deg,rgba(247,255,237,1)_40%,rgba(208,249,157,1)_100%)] pt-20 pb-11">
        {/*  카테고리 버튼 */}
        <MoodieCategoryBt />
        {/* ~월 ~주차 기록 */}
        <MonthWeekTitle />
        {/* 주간 캘린더 */}
        <WeekCalendar />
        {/* 주간 기록 현황 */}
        <div className="mt-11">
          <h2 className="text-center text-[#314813] text-xl ">
            7개 중 <span className="font-bold">{weeklyCount} 개의 기록</span>을
            작성완료 했어요.
          </h2>
        </div>
        <div className="mt-3 mx-auto text-center text-[#314813] text-sm w-96 px-9">
          <p>{diaryCountMessage}</p>
        </div>
      </div>

      {/* 기록 카드 박스 */}
      <div className="mt-9">
        <DiaryCardBox />
      </div>

      {/* 주간 기록요약 */}
      <div className="w-96 bg-white mx-auto rounded-lg shadow-md mt-7 p-4 mb-11">
        <div className="text-[#577C2A] font-semibold text-xl text-center mt-4">
          {month}월 {week}주차 기록 현황
        </div>
        <div className="flex gap-8 justify-center items-center mt-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-[#7ab3fd]">
              {weeklyCount}
              <span className="text-sm font-semibold text-[#577C2A]"> 개</span>
            </div>
            <p className="text-xl mt-2 font-semibold text-[#577C2A]">
              이번주 기록
            </p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-[#ff676f]">
              {weeklyCharCount}
              <span className="text-sm font-semibold text-[#577C2A]"> 자</span>
            </div>
            <p className="text-xl mt-2 font-semibold text-[#577C2A]">
              총 작성 글자수
            </p>
          </div>
        </div>
        <div className="bg-[#E6FFC7] rounded-lg mt-7 p-4">
          <h1 className="text-[#314813] text-sm font-semibold">
            이번 주 인사이트
          </h1>
          <p className="text-xs mt-4 leading-5">
            이번주는 총 {weeklyCharCount} 글자 적으셨네요~
            <br />
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MoodieWeeklyRecord;
