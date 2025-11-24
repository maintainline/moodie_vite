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
  else if (charCount <= 300) return lengthComments.range_201_300;
  else if (charCount <= 500) return lengthComments.range_301_500;
  else if (charCount <= 700) return lengthComments.range_501_700;
  else if (charCount <= 1000) return lengthComments.range_701_1000;
  else if (charCount <= 1500) return lengthComments.range_1001_1500;
  else if (charCount <= 2000) return lengthComments.range_1501_2000;
  else return lengthComments.range_2000_plus;
}
