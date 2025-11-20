import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getWeekRangeSundayToSaturday } from "./utils/dateUtils";
import { getLengthComment } from "./utils/getLengthComment";

export default function WeeklyCharCount() {
  const [totalChars, setTotalChars] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadWeeklyCharCount();
  }, []);

  async function loadWeeklyCharCount() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { start, end } = getWeekRangeSundayToSaturday();

    const { data } = await supabase
      .from("diaries")
      .select("char_count")
      .eq("user_id", user.id)
      .gte("created_at", `${start}T00:00:00`)
      .lte("created_at", `${end}T23:59:59`);

    const total =
      data?.reduce((sum, cur) => sum + (cur.char_count || 0), 0) || 0;

    setTotalChars(total);
    setMessage(getLengthComment(total));
  }

  return (
    <div className="bg-white w-96 rounded-lg shadow-md mt-8 mx-auto py-9 px-6 mb-14">
      <div className="justify-center text-center">
        <div className="text-base text-[#4E741D] font-semibold mb-8">
          이번 주 기록한 글자 수
          <div className="mt-4 text-center">
            총{" "}
            <span className="text-[#e64c8d] font-bold text-4xl mb-2">
              {totalChars}
            </span>{" "}
            글자
          </div>
        </div>
        <div className="bg-[#E6FFC7] w-full rounded-lg shadow-md py-5 px-6">
          <p className="text-[12px] font-medium leading-5">{message} </p>
        </div>
      </div>
    </div>
  );
}
