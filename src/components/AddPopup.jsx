function AddPopup({ handleClick }) {
  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 bg-[#4A5739]/90 flex items-center justify-center z-50"
    >
      <div className="text-white rounded-xl flex flex-col items-center justify-center p-8 max-w-[800px] min-w-[400px] min-h-[400px] text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          ✍ <br />
          <br /> 기록을 시작하기전에 <br /> 잠시 읽어주세요.
        </h2>

        <div className="text-base md:text-lg space-y-4 mb-6 font-light">
          <p>
            감정을 기록하는 ‘무디’ 는 작성 후
            <br />
            <span className="font-medium">수정이나 삭제가 불가능합니다.</span>
          </p>
          <p>
            감정을 있는 그대로 남기고, 나중에 되돌아봤을 때<br /> 진짜 나를
            마주할 수 있도록 하기 위함입니다.
          </p>
          <p className="font-medium">
            좋은 기록만 남기기보단, <br />
            모든 감정을 소중히 여겨보세요.
          </p>
          <p>그럼, 기록하러 가볼까요?</p>
        </div>

        <button className="mt-4 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          화면을 터치하여 기록 시작하기
        </button>
      </div>
    </div>
  );
}

export default AddPopup;
