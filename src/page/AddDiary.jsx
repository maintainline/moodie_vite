import { useState } from "react";
import AddPopup from "../components/AddPopup";
import TodayDate from "../components/TodayDate";
import TodayDiaryForm from "../components/TodayDiaryForm";

function AddDiary() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative mx-auto py-6 bg-[#f7ffed] min-h-screen mt-18">
      {/* 팝업 안내창 */}
      {isVisible && <AddPopup handleClick={handleClick} />}

      {/* 오늘 날짜 */}
      <TodayDate className="w-full text-center mt-24 font-bold text-xl sm:text-2xl text-[#4E741D]" />

      {/* 오늘 하루 질문 */}
      <div className="text-[#374723] font-bold text-xs sm:text-sm text-center mt-2">
        오늘 하루는 어떠셨나요?
      </div>

      {/* 생각해 볼 질문들 */}
      <div className="w-[90%] max-w-[384px] sm:w-96 mx-auto bg-[#DFF5C3] mt-10 sm:mt-14 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <img
            src="/images/questionicon.svg"
            alt="question icon"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <p className="text-sm sm:text-base text-[#374723] font-semibold">
            생각해 볼 질문들
          </p>
        </div>
        <div className="text-[#374723] font-medium text-xs sm:text-sm mt-3 leading-5 sm:leading-6">
          <div>· 오늘 가장 기억에 남는 순간은 무엇인가요?</div>
          <div>· 어떤 감정을 가장 많이 느꼈나요?</div>
          <div>· 무엇이 그런 기분을 느끼게 했나요?</div>
          <div>· 내일은 어떤 하루가 되었으면 좋겠나요?</div>
        </div>
      </div>

      {/* 오늘의 감정 기록 */}
      <div className="mt-6 sm:mt-10">
        <TodayDiaryForm />
      </div>
    </div>
  );
}

export default AddDiary;
