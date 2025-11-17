import { useState } from "react";
import { Link } from "react-router-dom";
import { emotions } from "../data/EmotionData";
import { emotionIcons } from "../data/EmotionIcons";

function TodayDiaryForm() {
  const [selected, setSelected] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  // 감정 클릭 시 선택/해제
  const toggleEmotion = emotion => {
    setSelected(prev =>
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion],
    );
  };

  return (
    <form>
      <div className="bg-white w-96 rounded-md py-8 px-5 mx-auto mt-7 shadow-md">
        <h1 className="text-[#4E741D] font-semibold text-lg mb-3">
          오늘의 감정 기록
        </h1>
        <textarea
          rows={7}
          placeholder="오늘 하루 있었던 일, 느낀 감정, 생각들을 자유롭게
적어보세요. 솔직한 마음이 가장 중요해요.."
          className="w-full p-3 border border-[#B6D98B] rounded-lg resize-none mb-4 placeholder:text-sm placeholder:text-[#4E741D] "
        />
        <h1 className="text-[#4E741D] font-semibold text-sm mb-3">
          선택된 감정 키워드
        </h1>
        {/* 감정 키워드 출력 */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[32px]">
          {selected.length > 0 ? (
            selected.map((emotion, idx) => (
              <span
                key={idx}
                className="mr-1 mb-1 py-1 px-2 gap-2 rounded-xl text-sm bg-[#EBFFD3]"
              >
                {emotion}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">
              아직 선택된 감정이 없어요.
            </span>
          )}
        </div>

        <h1 className="text-[#4E741D] font-semibold text-lg mb-3">
          감정 키워드 선택
        </h1>
        {emotions.map((emotion, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => toggleEmotion(emotion)}
            className={`mr-1 mb-1 py-1 px-2 gap-2 rounded-xl text-sm bg-[#EBFFD3] transition
            ${selected === emotion ? "bg-[#d5f5b0] border-[#6a8f3c] font-bold" : "bg-white border-gray-300"}`}
          >
            {emotion}
          </button>
        ))}

        <h1 className="text-[#4E741D] font-semibold text-lg mb-3 mt-3">
          감정 체크
        </h1>

        {/*  이미지 감정 출력 */}
        <div className="flex gap-6 justify-start mt-4">
          {emotionIcons.map((item, idx) => (
            <div
              onClick={() => setSelectedEmotion(item.name)}
              key={idx}
              className={`
        flex flex-col items-center justify-center cursor-pointer transition
        ${selectedEmotion === item.name ? "opacity-100" : "opacity-30"}
      `}
            >
              <img src={item.icon} alt={item.name} className="w-12 h-12 " />
              <span className="text-sm text-[#4E741D] mt-1 font-semibold ">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button className="block mx-auto mt-7">
        <Link
          to="/detail"
          className="block bg-gradient-to-r from-[#bcf675] to-[#7ab82e] px-10 py-4 rounded-md text-lg font-semibold shadow-md text-center text-white"
        >
          감정 기록하기
        </Link>
      </button>
    </form>
  );
}

export default TodayDiaryForm;
