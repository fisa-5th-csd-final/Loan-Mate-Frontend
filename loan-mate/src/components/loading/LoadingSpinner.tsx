'use client';

type LoadingSpinnerProps = {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SIZE_MAP: Record<NonNullable<LoadingSpinnerProps['size']>, string> = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-10 w-10 border-4',
};

/**
 * 공통 로딩 스피너
 * - label을 넘기면 스피너 옆에 안내 문구가 함께 표시됩니다.
 * - size는 sm / md / lg 중 선택 (기본 md)
 */
export default function LoadingSpinner({
  label,
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClass = SIZE_MAP[size];

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span
        className={`
          inline-block rounded-full border-solid border-transparent border-l-blue-500 animate-spin
          ${sizeClass}
        `}
        aria-hidden
      />
      {label && <span className="text-sm text-gray-600">{label}</span>}
    </div>
  );
}
