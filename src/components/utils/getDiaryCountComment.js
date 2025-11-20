// src/components/utils/getDiaryCountComment.js

import { diaryCountComments } from "../../data/diaryCountComments ";

/**
 * 일기 갯수에 맞는 코멘트 반환
 * @param {number} count - 일기 작성 갯수
 * @returns {string} 해당 갯수에 맞는 코멘트
 */
export function getDiaryCountComment(count) {
  // 0~31 범위로 제한
  const clampedCount = Math.max(0, Math.min(31, count));
  return diaryCountComments[clampedCount] || "";
}
