import { lengthComments } from "../../data/lengthComments";

/**
 * 글자 수를 기준으로 적절한 멘트를 반환
 * @param {number} charCount 총 글자 수
 * @returns {string} 멘트
 */
export function getLengthComment(charCount) {
  if (charCount <= 10) return lengthComments.range_0_10;
  else if (charCount <= 30) return lengthComments.range_11_30;
  else if (charCount <= 60) return lengthComments.range_31_60;
  else if (charCount <= 100) return lengthComments.range_61_100;
  else if (charCount <= 150) return lengthComments.range_101_150;
  else if (charCount <= 200) return lengthComments.range_151_200;
  else return lengthComments.range_200_plus;
}
