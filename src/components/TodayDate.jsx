import { useEffect, useState } from "react";

function TodayDate({ className }) {
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();

    // 연, 월, 일 가져오기
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 0~11이라 +1
    const day = now.getDate().toString().padStart(2, "0");

    // 요일 가져오기
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekDay = weekDays[now.getDay()];

    // 예: 2025-11-17 (월)
    setToday(`${year}년 ${month}월 ${day}일 ${weekDay}요일`);
  }, []);

  return <div className={className}>{today}</div>;
}

export default TodayDate;
