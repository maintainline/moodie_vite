import { Link, useNavigate } from "react-router-dom";
import WeeklyMoodPreview from "../components/weeklymoodiepreview/WeeklyMoodPreview";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function MoodieMain() {
  const [isTodayDiary, setIsTodayDiary] = useState(false);
  const [todayDiaryId, setTodayDiaryId] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserAndTodayDiary();
  }, []);

  async function checkUserAndTodayDiary() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    if (!user) return;

    const today = new Date().toISOString().slice(0, 10);

    // 오늘 작성한 diary 있는지 확인
    const { data } = await supabase
      .from("diaries")
      .select("*")
      .eq("user_id", user.id)
      .gte("created_at", today)
      .lt("created_at", `${today}T23:59:59`);

    if (data && data.length > 0) {
      setIsTodayDiary(true);
      setTodayDiaryId(data[0].id); // ★ 오늘 diary id 저장
    } else {
      setIsTodayDiary(false);
    }
  }

  return (
    <div className="relative  mx-auto pt-6 pb-9 bg-[#f7ffed] min-h-screen ">
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
      <div className="flex justify-center">
        {!user ? (
          // 로그인 안했을 때
          <button
            onClick={() => navigate("/login")}
            className="block bg-gradient-to-l from-[#83D266] to-[#58DBBD] px-10 py-4 rounded-md text-lg font-semibold shadow-md text-center text-white"
          >
            로그인
          </button>
        ) : isTodayDiary ? (
          // 오늘 작성했으면 기록한 감정 보러가기

          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-normal text-[#315205]">
              오늘은 기록을 완료했어요!
            </p>
            <Link
              to={`/diary/${todayDiaryId}`}
              state={{ fromWeekCalendar: true }}
              className="block bg-gradient-to-l from-[#83D266] to-[#58DBBD] px-10 py-4 rounded-md text-lg font-semibold shadow-md text-center text-white"
            >
              기록한 감정 보러가기
            </Link>
          </div>
        ) : (
          // 오늘 작성 안했으면 오늘의 감정 기록하기
          <Link
            to="/add"
            className="block bg-gradient-to-l from-[#83D266] to-[#58DBBD] px-10 py-4 rounded-md text-lg font-semibold shadow-md text-center text-white"
          >
            오늘의 감정 기록하기
          </Link>
        )}
      </div>
    </div>
  );
}

export default MoodieMain;
