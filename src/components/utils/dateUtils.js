// utils/dateUtils.js
// 주간 범위 계산 함수!
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

// 해당 월 기준으로 주차 계산 (1주차: 해당 월 1~일요일~토요일 기준)
export function getWeekOfMonth(date = new Date()) {
  const current = new Date(date);
  const year = current.getFullYear();
  const month = current.getMonth(); // 0~11

  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay(); // 0=일요일, 6=토요일

  // 오늘 날짜 기준 주차 계산
  const week = Math.ceil((current.getDate() + dayOfWeek) / 7);

  return week;
}
