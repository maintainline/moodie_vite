import { useParams, Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import WeeklyCharCount from "../components/WeeklyCharCount";
import TodayInsight from "../components/TodayInsight";
import { emotionTitles } from "../data/EmotionTitles";

export default function DiaryDetail() {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);
  const location = useLocation();
  const fromWeekCalendar = location.state?.fromWeekCalendar || false;
  const fromWeek = location.state?.fromWeek || false;

  useEffect(() => {
    const fetchDiary = async () => {
      const { data, error } = await supabase
        .from("diaries")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setDiary(data);
      }
    };

    fetchDiary();
  }, [id]);

  const getRandomTitle = emotion => {
    const list = emotionTitles[emotion];
    if (!list) return "";
    return list[Math.floor(Math.random() * list.length)];
  };

  const randomTitle = diary ? getRandomTitle(diary.main_emotion) : "";

  // 로딩 화면
  if (!diary) {
    return (
      <div className="flex justify-center items-center h-screen text-[#4E741D] font-semibold">
        로딩중...
      </div>
    );
  }

  return (
    <div className="relative  mx-auto py-6 bg-[#f7ffed] min-h-screen mt-18">
      {/* 상단 이모지 기분 */}
      <div className="mt-20 flex flex-col items-center">
        <img
          src={`/images/${diary.main_emotion || "기쁨"}.svg`}
          alt={diary.main_emotion}
          className="h-20 w-20 mb-6"
        />

        <h2 className="w-96 text-center font-bold text-2xl text-[#4E741D] break-normal whitespace-normal">
          {randomTitle}
        </h2>

        <div className="text-[#374723] font-bold text-sm text-center mt-2">
          이런날은 나에게 작은 선물을 주는 것도 좋아요!
        </div>
      </div>

      {/* 중간 일기 내용 */}
      <div className="bg-white w-96 rounded-lg shadow-md mt-8 mx-auto py-9 px-6 mb-8">
        <div className=" text-lg font-semibold text-[#4E741D] mb-5">
          {new Date(diary.created_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </div>
        <div className="border-b border-[#4E741D]/50 mb-5" />
        <div className="text-sm text-[#4E741D] font-medium">
          {diary.content}
        </div>
        <div className="mt-5 flex gap-1">
          {diary.keywords?.map(key => (
            <div
              key={key}
              className="bg-[#d5f5b0] font-medium py-1 px-2 rounded-xl inline-block text-xs"
            >
              {key}
            </div>
          ))}
        </div>
      </div>

      {/* 오늘의 인사이트 내용  오늘 글자수 / 주간 작성횟수*/}
      {fromWeekCalendar && (
        <TodayInsight
          charCount={diary.char_count}
          diaryDate={diary.created_at}
        />
      )}

      {/* 이번주 지금까지 글자 합산수 */}
      {fromWeekCalendar && <WeeklyCharCount />}

      {/* 주간기록 화면으로 */}
      <button className="block mx-auto">
        <Link
          to={fromWeekCalendar ? "/weeklyrecord" : "/allrecord"}
          className="block bg-gradient-to-r from-[#bcf675] to-[#7ab82e] px-10 py-4 rounded-md text-lg font-semibold shadow-md text-center text-white"
        >
          {fromWeekCalendar ? "주간 기록 화면으로" : "전체 기록 화면으로"}
        </Link>
      </button>
    </div>
  );
}
