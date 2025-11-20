// 오늘 작성 완료 모달

function TodaycompletedModal({ title, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
      <div className="bg-white p-4 pt-7 rounded-xl shadow-xl w-full max-w-xs animate-fadeIn">
        <p className="text-sm text-center font-medium mb-5 text-[#3d5a19] leading-relaxed">
          {title}
        </p>

        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold text-sm"
            onClick={onClose}
          >
            닫기
          </button>

          <button
            className="flex-1 py-2 rounded-lg bg-[#8dca41] text-white font-semibold shadow text-sm"
            onClick={onConfirm}
          >
            보러가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodaycompletedModal;
