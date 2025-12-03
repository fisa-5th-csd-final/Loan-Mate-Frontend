import WonLoginButton from "@/components/login/WonLoginButton";

export default function LoginPage() {
  return (
    <div className="flex flex-col h-full font-sans">

      {/* 제목 */}
      <h1 className="text-xl font-bold text-foreground mt-15 mb-10 text-center">
        아이디 로그인
      </h1>

      <form className="mb-13">
        {/* 아이디 입력 */}
        <div className="w-full border border-[var(--gray-400)] rounded-2xl px-3 py-3 flex flex-col gap-1.5 transition-all duration-200 hover:border-slate-300 focus-within:border-[var(--main)] focus-within:ring-1 focus-within:ring-[var(--main)] bg-white">
          <label htmlFor="userId" className="text-[13px] text-foreground/60">아이디</label>
          <input
            id="userId"
            type="text"
            placeholder="최대 10자리 입력(영문+숫자)"
            className="w-full text-[15px] text-foreground placeholder-foreground/40 focus:outline-none"
            maxLength={10}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="w-full border border-[var(--gray-400)] rounded-2xl px-3 py-3 flex flex-col gap-1.5 mt-5 transition-all duration-200 hover:border-slate-300 focus-within:border-[var(--main)] focus-within:ring-1 focus-within:ring-[var(--main)] bg-white">
          <label htmlFor="password" className="text-[13px] text-foreground/60">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호 입력"
            className="w-full text-[15px] text-foreground placeholder-foreground/40 focus:outline-none"
          />
        </div>
      </form>

      <WonLoginButton></WonLoginButton>
      <div className="flex-1" />

      {/* 하단 */}
      <div className="pb-8 flex flex-col items-center gap-5">
        <button className="text-[14px] text-foreground/60 underline underline-offset-4 hover:text-foreground/80 transition-colors">
          아이디나 비밀번호를 잊으셨나요?
        </button>

        <button className="w-full bg-[var(--gray-100)] rounded-xl py-3 text-[var(--gray-700)] font-medium text-sm hover:bg-slate-200 transition-colors">
          다른 방법으로 로그인
        </button>
      </div>

    </div>
  );
}
