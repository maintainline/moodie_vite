import { supabase } from "../lib/supabase";

export default function Login() {
  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });

    if (error) alert("로그인 실패: " + error.message);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) alert("로그인 실패: " + error.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img src="/images/logo2.svg" alt="MOODIE" className="mb-3" />
      <p className="text-sm font-medium mb-14 text-[#121f0d]">
        무디 | 오늘의 감정기록
      </p>
      <p className="text-sm font-medium mb-6 text-[#121f0d]">
        로그인 해서 감정기록을 시작해 보세요.
      </p>
      <button
        onClick={handleKakaoLogin}
        className="w-64 py-3 mb-4 bg-[#8CC942] text-white rounded-sm font-semibold shadow-md"
      >
        Kakao로 로그인
      </button>
      <button
        onClick={handleGoogleLogin}
        className="w-64 py-3 bg-[#8CC942] text-white rounded-sm font-semibold shadow-md"
      >
        Google로 로그인
      </button>
    </div>
  );
}
