// 오늘 작성 완료 모달

function TodaycompletedModal({ title, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 pt-9 rounded-xl shadow-xl w-80 animate-fadeIn">
        <p className="text-sm text-center font-medium mb-6 text-[#3d5a19]">
          {title}
        </p>

        <div className="flex justify-between mt-4">
          <button
            className="w-32 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold text-sm "
            onClick={onClose}
          >
            닫기
          </button>

          <button
            className="w-32 py-2 rounded-lg bg-[#8dca41] text-white font-semibold shadow text-sm "
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
