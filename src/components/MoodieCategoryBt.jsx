// 카테고리 버튼 컴포넌트

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MoodieCategoryBt() {
  const [activeMain, setActiveMain] = useState(1);
  const [activeSub, setActiveSub] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickMain = (index, route) => {
    setActiveMain(index);
    navigate(route);
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
    <div className="w-[390px] mx-auto">
      {/* 메인 버튼 */}
      <div className="flex justify-between w-96 mx-auto">
        <button
          className={`whitespace-nowrap text-xl font-semibold rounded-lg px-14 py-3 shadow ${
            activeMain === 0
              ? "bg-[#8dca41] text-white"
              : "bg-white text-[#6b9931]"
          }`}
          onClick={() => handleClickMain(0, "/add")}
        >
          작성하기
        </button>

        <button
          className={`whitespace-nowrap text-xl font-semibold rounded-lg px-14 py-3 shadow ${
            activeMain === 1
              ? "bg-[#8dca41] text-white"
              : "bg-white text-[#6b9931]"
          }`}
          onClick={() => handleClickMain(1, "/weeklyrecord")}
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
    </div>
  );
}

export default MoodieCategoryBt;
