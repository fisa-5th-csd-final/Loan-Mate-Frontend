"use client";

export default function WonLoginButton() {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/login`;
  };

  return (
    <button
      onClick={handleLogin}
      className="
        flex items-center gap-4
        w-full
        border border-[#233A88]
        rounded-2xl
        px-5 py-4
        bg-white
        hover:bg-[#F7F9FF]
        transition
      "
    >
      {/* Symbol */}
      <div className="relative w-9 h-6">
        <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#9ADAFE]" />
        <div className="absolute left-3 top-0 w-6 h-6 rounded-full bg-[#233A88]" />
      </div>

      {/* Label */}
      <span className="text-[#233A88] text-[18px] font-semibold">
        우리WON인증 로그인
      </span>
    </button>
  );
}
