// 전체 기록 (한달)
import AllCalendar from "../components/allcalendar/AllCalendar";
import AllRecordBoxCard from "../components/AllRecordBoxCard";
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
        <AllCalendar currentDate={new Date()} />
        {/* <WeekCalendar /> */}
        {/* 주간 기록 현황 */}
        <div className="mt-11">
          <h2 className="text-center text-[#314813] text-xl ">
            0월에는
            <span className="font-bold">총 0개의 기록이 저장되었어요.</span>
          </h2>
        </div>
        <div className="mt-3 mx-auto text-center text-[#314813] text-sm w-96 px-9">
          <p>
            차근차근 감정을 기록하며 자신을 돌보고 있어요! 꾸준히 작성하여 큰
            변화를 만들어 보아요👍
          </p>
        </div>
      </div>

      {/* 0 월 카드 박스 */}
      <div className="mt-9">
        <AllRecordBoxCard />
      </div>
    </div>
  );
}

export default MoodieAllRecord;
