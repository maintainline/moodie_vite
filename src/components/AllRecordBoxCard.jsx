import { emotionIcons } from "../data/EmotionIcons";

function AllRecordBoxCard() {
  return (
    <div className="bg-white mx-auto w-96 rounded-lg shadow-md p-4 mb-14">
      <h1 className="text-[#577C2A] text-xl font-semibold text-center mt-6 ">
        0월 모든 기록 요약
      </h1>

      <div className="mt-5 items-end justify-center">
        {/*  글자수 */}
        <div className="text-center">
          <p className="text-6xl font-bold text-[#ff676f]">30</p>
          <p className="text-xl mt-2 font-semibold text-[#577C2A]">총 글자수</p>
        </div>
        {/*  감정수 */}
        <div className="flex gap-6 justify-center mt-9">
          {emotionIcons.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative">
                <img src={item.icon} alt={item.name} className="w-10 h-10" />
                <span className="absolute -top-2 -right-3  bg-red-500 py-1 px-2 rounded-full text-white text-xs">
                  0
                </span>
              </div>
              <p className="text-md mt-2 font-semibold text-[#577C2A]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#E6FFC7] rounded-lg mt-7 p-4">
        <h1 className="text-[#314813] text-sm font-semibold">
          이번 달 인사이트
        </h1>
        <p className="text-xs mt-4">
          이번달은 총 000글자 적으셨네요~ 앞으로 더 열심히 적어보세용 이번달은
          총 000글자 적으셨네요~ 앞으로 더 열심히 적어보세용
        </p>
      </div>
    </div>
  );
}

export default AllRecordBoxCard;
