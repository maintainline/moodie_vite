function DiaryCardBox() {
  return (
    <div>
      <div className="w-96 mx-auto mt-3 bg-white rounded-lg shadow-md cursor-pointer">
        <div className="flex p-4 gap-4">
          {/* 이미지 박스 */}
          <div className="flex justify-center items-center bg-white border border-[#ffdc49] rounded-full w-20 h-20 ">
            <img src="/images/기쁨.svg" alt="기쁨" className="w-14" />
          </div>

          {/* 텍스트 박스 */}
          <div className="w-64 ">
            {/* 상단: 감정 뱃지 + 날짜 */}
            <div className="flex justify-between items-center pt-1">
              <div className="text-white bg-[#ffdc49] text-xs px-2 py-1 rounded-xl font-bold inline-block items-center">
                기쁨
              </div>
              <div className="text-xs font-semibold text-[#4e741d]">
                2025-11-18
              </div>
            </div>

            {/* 제목/부제목 */}
            <div className="mt-2">
              <div className="text-xs font-semibold text-[#4E741D]">
                오늘은 참 기분 좋은 날이었어
              </div>
              <div className="mt-1 text-xs font-normal text-left whitespace-nowrap overflow-hidden text-ellipsis">
                날씨도 좋고 친구들과의 시간이 즐거웠다 얄리얄리얄라셩
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiaryCardBox;
