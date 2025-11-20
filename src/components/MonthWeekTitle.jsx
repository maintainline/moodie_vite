// components/MonthWeekTitle.jsx

import { getWeekOfMonth } from "./utils/dateUtils";

export default function MonthWeekTitle({ date = new Date() }) {
  const month = date.getMonth() + 1; // 1~12
  const week = getWeekOfMonth(date);

  return (
    <h2 className="font-semibold text-2xl  sm:text-3xl text-[#314813] mt-12 text-center mb-7">
      {month}월 {week}주차 기록
    </h2>
  );
}
