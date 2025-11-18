import { supabase } from "../../lib/supabase";

export async function getWeeklyDiaries() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return []; // 로그인 안하면 빈 배열 반환

  const today = new Date();
  const day = today.getDay(); // 0:일, 1:월...
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const { data } = await supabase
    .from("diaries")
    .select("*")
    .eq("user_id", user.id) // **여기서 필터링**
    .gte("created_at", monday.toISOString())
    .lte("created_at", sunday.toISOString())
    .order("created_at", { ascending: true });

  return data;
}
