// 일일 감정
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import WeeklyMoodItem from "./WeeklyMoodItem";
import { getWeeklyDiaries } from "../apis/diaryApi";
import { supabase } from "../../lib/supabase";

function WeeklyMoodPreview() {
  const [list, setList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserAndFetch();
  }, []);

  async function checkUserAndFetch() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user); // 로그인 정보 상태 저장

    if (!user) {
      setList([]); // 로그인 안했으면 목록 없음
      return;
    }

    const data = await getWeeklyDiaries();
    setList(data ?? []);
  }

  return (
    <div className="w-full max-w-[400px] mx-auto bg-white rounded-md shadow-md p-4 mb-11 overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-md font-semibold text-[#4E741D]">
          이번주 나의 감정기록
        </h1>
        <Link to={"/weeklyrecord"}>
          <p className="text-sm text-[#4E741D] font-semibold">더보기</p>
        </Link>
      </div>

      {/* 일기 목록 */}
      {!user ? (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
          <p className="mb-4">로그인 후 감정 기록을 확인할 수 있어요.</p>
        </div>
      ) : list.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-4">
          이번 주 작성된 감정 기록이 없습니다.
        </p>
      ) : (
        list.map(item => <WeeklyMoodItem key={item.id} item={item} />)
      )}
    </div>
  );
}

export default WeeklyMoodPreview;
