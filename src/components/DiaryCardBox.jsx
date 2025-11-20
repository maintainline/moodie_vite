import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { emotionIcons } from "../data/EmotionIcons";
import { getWeekRangeSundayToSaturday } from "./utils/dateUtils";
import { emotionTitles } from "../data/EmotionTitles";
import { useNavigate } from "react-router-dom";

function DiaryCardBox() {
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadWeeklyDiaries();
  }, []);

  const loadWeeklyDiaries = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { start, end } = getWeekRangeSundayToSaturday();

    const { data, error } = await supabase
      .from("diaries")
      .select("*")
      .eq("user_id", user.id)
      .gte("created_at", `${start}T00:00:00`)
      .lte("created_at", `${end}T23:59:59`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setDiaries(data);
  };

  // 감정에 맞는 랜덤 문구 뽑기 함수
  const getRandomTitle = emotion => {
    const list = emotionTitles[emotion];
    if (!list) return "";
    return list[Math.floor(Math.random() * list.length)];
  };

  return (
    <div>
      {diaries.map(diary => {
        const emotionIcon = emotionIcons.find(
          e => e.name === diary.main_emotion,
        )?.icon;
        const randomTitle = getRandomTitle(diary.main_emotion);

        return (
          <div
            key={diary.id}
            className="w-[343px] sm:w-96 mx-auto mt-3 bg-white rounded-lg shadow-md cursor-pointer"
            onClick={() =>
              navigate(`/diary/${diary.id}`, {
                state: { fromWeekCalendar: true },
              })
            }
          >
            <div className="flex p-4 gap-3 sm:gap-4">
              {/* 이미지 박스 */}
              <div
                className={`flex justify-center items-center rounded-full w-16 sm:w-20 h-16 sm:h-20 border ${
                  diary.main_emotion === "슬픔"
                    ? "border-[#4D7BAF] bg-white"
                    : diary.main_emotion === "기쁨"
                      ? "border-[#FFDC49] bg-white"
                      : diary.main_emotion === "화남"
                        ? "border-[#FB5038] bg-white"
                        : diary.main_emotion === "불안"
                          ? "border-[#9D52B5] bg-white"
                          : "border-[#89C63F] bg-white"
                }`}
              >
                {emotionIcon && (
                  <img
                    src={emotionIcon}
                    alt={diary.main_emotion}
                    className="w-12 sm:w-14"
                  />
                )}
              </div>

              {/* 텍스트 박스 */}
              <div className="flex-1 min-w-0">
                {/* 상단: 감정 뱃지 + 날짜 */}
                <div className="flex justify-between items-center pt-1">
                  <div
                    className={`text-xs px-2 py-1 rounded-xl font-bold inline-block ${
                      diary.main_emotion === "슬픔"
                        ? "bg-[#4D7BAF] text-white"
                        : diary.main_emotion === "기쁨"
                          ? "bg-[#FFDC49] text-white"
                          : diary.main_emotion === "화남"
                            ? "bg-[#FB5038] text-white"
                            : diary.main_emotion === "불안"
                              ? "bg-[#9D52B5] text-white"
                              : "bg-[#89C63F] text-white"
                    }`}
                  >
                    {diary.main_emotion}
                  </div>
                  <div className="text-xs font-semibold text-[#4e741d]">
                    {new Date(diary.created_at).toISOString().slice(0, 10)}
                  </div>
                </div>

                {/* 제목/부제목 */}
                <div className="mt-2">
                  <div className="text-xs sm:text-sm font-semibold text-[#4E741D] truncate">
                    {randomTitle}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-normal text-left truncate">
                    {diary.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DiaryCardBox;
