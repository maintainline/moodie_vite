import { supabase } from "../../lib/supabase";

export async function getWeeklyDiaries() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return []; // 로그인 안하면 빈 배열 반환

  const today = new Date();
  const day = today.getDay(); // 0:일, 1:월...

  const sunday = new Date(today);
  sunday.setDate(today.getDate() - day);
  sunday.setHours(0, 0, 0, 0);

  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  saturday.setHours(23, 59, 59, 999);

  const { data } = await supabase
    .from("diaries")
    .select("*")
    .eq("user_id", user.id) // **여기서 필터링**
    .gte("created_at", sunday.toISOString())
    .lte("created_at", saturday.toISOString())
    .order("created_at", { ascending: true });

  return data;
}
