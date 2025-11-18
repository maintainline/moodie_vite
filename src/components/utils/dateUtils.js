// utils/dateUtils.js

export function getWeekRangeSundayToSaturday(date = new Date()) {
  const current = new Date(date);
  const day = current.getDay(); // 0=일, 6=토

  // 주 시작: 이번주 일요일
  const sunday = new Date(current);
  sunday.setDate(current.getDate() - day);

  // 주 끝: 이번주 토요일
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);

  const start = sunday.toISOString().split("T")[0];
  const end = saturday.toISOString().split("T")[0];

  return { start, end };
}
