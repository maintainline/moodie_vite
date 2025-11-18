import { Link } from "react-router-dom";

export default function TodayDiaryDetail() {
  return (
    <div className="relative  mx-auto py-6 bg-[#f7ffed] min-h-screen mt-18">
      {/* 상단 이모지 기분 */}
      <div className="mt-20 flex flex-col items-center">
        <img src="/images/기쁨.svg" alt="기쁨" className="h-20 w-20 mb-6" />
        <h2 className="w-full text-center font-bold text-2xl text-[#4E741D]">
          기분좋은 하루였네요.
        </h2>
        <div className="text-[#374723] font-bold text-sm text-center mt-2">
          이런날은 나에게 작은 선물을 주는 것도 좋아요!
        </div>
      </div>

      {/* 중간 일기 내용 */}
      <div className="bg-white w-96 rounded-lg shadow-md mt-8 mx-auto py-9 px-6 mb-8">
        <div className=" text-lg font-semibold text-[#4E741D] mb-5">
          2025년 7월 22일 화요일
        </div>
        <div className="border-b border-[#4E741D]/50 mb-5" />
        <div className="text-sm text-[#4E741D] font-medium">
          이것은 일기 내용입니다. 일기내용. 일기내용입니다...
        </div>
        <div className="mt-5 flex gap-1">
          <div className="bg-[#d5f5b0] font-medium py-1 px-2 rounded-xl inline-block text-xs">
            피곤
          </div>
          <div className="bg-[#d5f5b0] font-medium py-1 px-2 rounded-xl inline-block text-xs">
            개운
          </div>
        </div>
      </div>

      {/* 오늘의 인사이트 내용 */}
      <div className="bg-[#EBFFD3] w-96 mx-auto rounded-lg mb-7 py-6 px-4">
        <h1 className="text-[#4E741D] justify-center text-center text-base font-semibold mb-4">
          오늘의 인사이트
        </h1>
        <div className="bg-white w-full rounded-lg shadow-md py-5 px-6">
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-[#31A0B9] font-bold text-5xl mb-2">
                30<span className="text-base text-[#4E741D]"> 자</span>
              </div>
              <p className="text-sm font-semibold text-[#4E741D]">
                오늘의 글자수
              </p>
            </div>
            <div>
              <div className="text-[#31A0B9] font-bold text-5xl mb-2">
                1<span className="text-base text-[#4E741D]">번</span>
              </div>
              <p className="text-sm font-semibold text-[#4E741D]">
                주간 작성 횟수
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 지금까지 글자 합산수 */}
      <div className="bg-white w-96 rounded-lg shadow-md mt-8 mx-auto py-9 px-6 mb-14">
        <div className="justify-center text-center">
          <div className="text-base text-[#4E741D] font-semibold mb-8">
            지금까지 적은 글자 수는?
            <div className="mt-4 text-center">
              총{"  "}
              <span className="text-[#e64c8d] font-bold text-4xl mb-2">30</span>
              {"  "}글자
            </div>
          </div>
          <div className="bg-[#E6FFC7] w-full rounded-lg shadow-md py-5 px-6">
            <p className="text-[12px] font-medium">
              벌써 이만큼이나 적으셨네요! 앞으로 더 많이 적으면 더 많이 적을 수
              있어요~ 조금만 더 힘내세요!벌써 이만큼이나 적으셨네요! 앞으로 더
              많이 적으면 더 많이 적을 수 있어요~ 조금만 더 힘내세요!
            </p>
          </div>
        </div>
      </div>

      {/* 주간기록 화면으로 */}
      <button className="block mx-auto">
        <Link
          to="/weeklyrecord"
          className="block bg-gradient-to-r from-[#bcf675] to-[#7ab82e] px-10 py-4 rounded-md text-lg font-semibold shadow-md text-center text-white"
        >
          주간 기록 화면으로
        </Link>
      </button>
    </div>
  );
}
