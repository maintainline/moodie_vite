import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emotions } from "../data/EmotionData";
import { emotionIcons } from "../data/EmotionIcons";
import { supabase } from "../lib/supabase";

function TodayDiaryForm() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [loading, setLoading] = useState(false);

  // 감정 클릭 시 선택/해제
  const toggleEmotion = emotion => {
    setSelected(prev =>
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion],
    );
  };

  // 저장 함수
  const handleSave = async () => {
    if (!content.trim()) return alert("내용을 입력해주세요!");
    if (selected.length === 0) return alert("감정 키워드를 선택해주세요!");
    if (!selectedEmotion) return alert("감정 체크를 선택해주세요!");

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    const newDiary = {
      user_id: user.id,
      content,
      keywords: selected,
      main_emotion: selectedEmotion,
      char_count: content.length,
    };

    // 🔥 insert 후 생성된 row 반환
    const { data, error } = await supabase
      .from("diaries")
      .insert(newDiary)
      .select("*")
      .single();

    setLoading(false);

    if (error) {
      console.error(error);
      alert("저장에 실패했습니다.");
      return;
    }

    alert("감정 기록이 저장되었습니다!");

    navigate(`/diary/${data.id}`, {
      state: {
        fromWeekCalendar: true, // 오늘의 인사이트 표시
        fromWeek: false,
      },
    });
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="bg-white w-[90%] max-w-[384px] rounded-md py-6 px-4 sm:w-96 sm:py-8 sm:px-5 mx-auto mt-7 shadow-md">
        <h1 className="text-[#577C2A] font-semibold text-lg sm:text-lg mb-3 ">
          오늘의 감정 기록
        </h1>

        <textarea
          onChange={e => setContent(e.target.value)}
          rows={7}
          placeholder="오늘 하루 있었던 일, 느낀 감정, 생각들을 자유롭게 적어보세요. 솔직한 마음이 가장 중요해요.."
          className="w-full p-2 sm:p-3 border border-[#B6D98B] rounded-lg resize-none mb-4 placeholder:text-sm sm:placeholder:text-sm placeholder:text-[#4E741D]"
        />

        <h1 className="text-[#577C2A] font-semibold text-sm sm:text-sm mb-2 sm:mb-3">
          선택된 감정 키워드
        </h1>

        <div className="flex flex-wrap gap-1 mb-4 min-h-[32px]">
          {selected.length > 0 ? (
            selected.map((emotion, idx) => (
              <span
                key={idx}
                className="py-1 px-2 rounded-xl text-xs sm:text-sm bg-[#EBFFD3]"
              >
                {emotion}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs sm:text-sm">
              아직 선택된 감정이 없어요.
            </span>
          )}
        </div>

        <h1 className="text-[#577C2A] font-semibold text-sm sm:text-lg mb-2 sm:mb-3">
          감정 키워드 선택
        </h1>

        <div className="flex flex-wrap gap-1 mb-4">
          {emotions.map((emotion, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => toggleEmotion(emotion)}
              className={`py-1 px-2 text-xs sm:text-sm rounded-xl bg-[#EBFFD3] font-medium transition
              ${selected.includes(emotion) ? "font-bold" : ""}`}
            >
              {emotion}
            </button>
          ))}
        </div>

        <h1 className="text-[#4E741D] font-semibold text-sm sm:text-lg mb-2 sm:mb-3">
          감정 체크
        </h1>

        <div className="flex gap-4 sm:gap-6 flex-wrap">
          {emotionIcons.map((item, idx) => (
            <div
              onClick={() => setSelectedEmotion(item.name)}
              key={idx}
              className={`flex flex-col items-center justify-center cursor-pointer transition
              ${selectedEmotion === item.name ? "opacity-100" : "opacity-30"}`}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-10 sm:w-12 h-10 sm:h-12"
              />
              <span className="text-xs sm:text-sm text-[#577C2A] mt-1 font-semibold">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="block mx-auto mt-5 sm:mt-7 bg-gradient-to-r from-[#bcf675] to-[#7ab82e] px-8 sm:px-10 py-3 sm:py-4 rounded-md text-sm sm:text-lg font-semibold shadow-md text-white"
      >
        {loading ? "저장 중..." : "감정 기록하기"}
      </button>
    </form>
  );
}

export default TodayDiaryForm;
