// 카테고리 버튼 컴포넌트

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import TodaycompletedModal from "./modal/TodaycompletedModal";

function MoodieCategoryBt() {
  const [showModal, setShowModal] = useState(false);
  const [todayDiaryId, setTodayDiaryId] = useState(null);
  const [activeMain, setActiveMain] = useState(1);
  const [activeSub, setActiveSub] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickMain = async index => {
    setActiveMain(index);

    if (index === 0) {
      // 작성하기 버튼 클릭
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // 오늘 날짜 시작/끝
      const today = new Date();
      const start = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
      );
      const end = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
      );

      const { data: diaries, error } = await supabase
        .from("diaries")
        .select("id")
        .eq("user_id", user.id)
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());

      if (error) {
        console.error(error);
        return;
      }

      // 오늘 작성된 일기가 있으면 확인 팝업
      if (diaries.length > 0) {
        setTodayDiaryId(diaries[0].id);
        setShowModal(true);
        return;
      }
      // 작성 페이지로 이동
      navigate("/add");
      return;
    } else if (index === 1) {
      navigate("/weeklyrecord");
    }
  };

  const handleClickSub = (index, route) => {
    setActiveSub(index);
    navigate(route);
  };

  useEffect(() => {
    if (location.pathname === "/weeklyrecord") {
      setActiveMain(1);
      setActiveSub(0);
    } else if (location.pathname === "/allrecord") {
      setActiveMain(1);
      setActiveSub(1);
    } else if (location.pathname === "/add") {
      setActiveMain(0);
      setActiveSub(0);
    }
  }, [location.pathname]);

  return (
    <div className="w-96 mx-auto">
      {/* 메인 버튼 */}
      <div className="flex justify-between w-96 mx-auto">
        <button
          className={`whitespace-nowrap text-xl font-semibold rounded-lg px-14 py-3 shadow ${
            activeMain === 0
              ? "bg-[#8dca41] text-white"
              : "bg-white text-[#6b9931]"
          }`}
          onClick={() => handleClickMain(0)}
        >
          작성하기
        </button>

        <button
          className={`whitespace-nowrap text-xl font-semibold rounded-lg px-14 py-3 shadow ${
            activeMain === 1
              ? "bg-[#8dca41] text-white"
              : "bg-white text-[#6b9931]"
          }`}
          onClick={() => handleClickMain(1)}
        >
          기록 보기
        </button>
      </div>

      {/* 서브 버튼 */}
      <div className="flex gap-1 w-96 mx-auto bg-[#8dca41] rounded-lg p-1 mt-2">
        <button
          className={`text-lg font-semibold w-48 rounded-lg py-2 ${
            activeSub === 0
              ? "bg-white text-[#6b9931] shadow"
              : "bg-[#8dca41] text-white"
          }`}
          onClick={() => handleClickSub(0, "/weeklyrecord")}
        >
          주간 기록
        </button>

        <button
          className={`text-lg font-semibold w-48 rounded-lg py-2 ${
            activeSub === 1
              ? "bg-white text-[#6b9931] shadow"
              : "bg-[#8dca41] text-white"
          }`}
          onClick={() => handleClickSub(1, "/allrecord")}
        >
          전체 기록
        </button>
      </div>
      {showModal && (
        <TodaycompletedModal
          title={
            <>
              오늘 이미 작성한 기록이 있어요! <br />
              지금 보러 갈까요?
            </>
          }
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            navigate(`/diary/${todayDiaryId}`, {
              state: { fromWeekCalendar: true },
            });
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default MoodieCategoryBt;
