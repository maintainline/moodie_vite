import { supabase } from "../lib/supabase";

export default function Login() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });

    if (error) alert("로그인 실패: " + error.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7ffed]">
      <h1 className="text-2xl font-bold mb-6 text-[#577C2A]">Moodie 로그인</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-[#FEE500] text-[#381E1F] rounded-lg font-semibold shadow-md"
      >
        Kakao로 로그인
      </button>
    </div>
  );
}
