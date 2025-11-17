import { Link } from "react-router-dom";
import WeeklyMoodPreview from "../components/WeeklyMoodPreview";

function MoodieMain() {
  return (
    <div className="relative  mx-auto pt-6 bg-[#f7ffed] min-h-screen ">
      <div className="mt-24 mb-14">
        <h1 className="text-2xl font-bold leading-snug mb-2.5 text-[#315205] text-center">
          안녕하세요!
          <br />
          오늘 하루는 어떠셨나요?
        </h1>
        <p className="text-md font-medium text-black/50 text-center">
          무디와 함께 감정들을 기록하고 관리해 보세요.
        </p>
      </div>

      {/* 일일 내용 */}
      <WeeklyMoodPreview />

      {/* 감정 기록하기 */}
      <button className="block mx-auto">
        <Link
          to="/add"
          className="block bg-gradient-to-r from-[#bcf675] to-[#7ab82e] px-10 py-4 rounded-md text-lg font-semibold shadow-md text-center text-white"
        >
          오늘의 감정 기록하기
        </Link>
      </button>
    </div>
  );
}

export default MoodieMain;
