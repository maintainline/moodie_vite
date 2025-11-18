// 전체 기록 (한달)
import AllCalendar from "../components/allcalendar/AllCalendar";
import DiaryCardBox from "../components/DiaryCardBox";
import MoodieCategoryBt from "../components/MoodieCategoryBt";

function MoodieAllRecord() {
  return (
    <div>
      <div className="bg-[linear-gradient(180deg,rgba(247,255,237,1)_40%,rgba(208,249,157,1)_100%)] pt-20 pb-11">
        {/*  카테고리 버튼 */}
        <MoodieCategoryBt />
        {/* <h2 className="font-semibold text-3xl text-[#314813] mt-12 text-center mb-7">
          11월 0주차 기록
        </h2> */}
        {/* 주간 캘린더 */}
        <AllCalendar />
        {/* <WeekCalendar /> */}
        {/* 주간 기록 현황 */}
        <div className="mt-11">
          <h2 className="text-center text-[#314813] text-xl ">
            7개 중 <span className="font-bold">0개의 기록</span>을 작성완료
            했어요.
          </h2>
        </div>
        <div className="mt-3 mx-auto text-center text-[#314813] text-sm w-96 px-9">
          <p>
            차근차근 감정을 기록하며 자신을 돌보고 있어요! 꾸준히 작성하여 큰
            변화를 만들어 보아요👍
          </p>
        </div>
      </div>

      {/* 기록 카드 박스 */}
      <div className="mt-9">
        <DiaryCardBox />
      </div>

      {/* 주간 기록요약 */}
      <div className="w-96 bg-white mx-auto rounded-lg shadow-md mt-7 p-4 mb-11">
        <div className="text-[#577c2a] font-semibold text-xl text-center mt-4">
          1월 0주차 기록 현황
        </div>
        <div className="flex gap-3 justify-center items-center mt-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#778cff]">
              1<span className="text-sm font-semibold text-[#314813]">개</span>
            </div>
            <p className="text-md mt-2 font-medium text-[#314813]">
              이번주 기록 수
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#ff676f]">
              30
              <span className="text-sm font-semibold text-[#314813]">개</span>
            </div>
            <p className="text-md mt-2 font-medium text-[#314813]">
              이번주 기록 글자 수
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodieAllRecord;
