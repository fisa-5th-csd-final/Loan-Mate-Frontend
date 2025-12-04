'use client';

type LoadingSpinnerProps = {
  /** 스피너 옆에 표시될 안내 문구 (옵션) */
  label?: string;
  /** 스피너 크기 (기본값: 'md') */
  size?: 'sm' | 'md' | 'lg';
  /** 추가적인 Tailwind 클래스 (레이아웃 배치 등) */
  className?: string;
};

const DOT_SIZE_MAP: Record<NonNullable<LoadingSpinnerProps['size']>, string> = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
};

/**
 * 웨이브 애니메이션 로딩 인디케이터
 * - 3개의 점이 차례대로 위아래로 움직이는 파도타기 애니메이션
 * - 부드럽고 현대적인 느낌
 */
export default function LoadingSpinner({
  label,
  size = 'sm',
  className = '',
}: LoadingSpinnerProps) {
  const dotSize = DOT_SIZE_MAP[size];

  return (
    <div
      role="status"
      aria-label={label || '로딩 중'}
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      {/* 웨이브 도트 애니메이션 */}
      <div className="flex items-center gap-2">
        <div
          className={`
            ${dotSize}
            rounded-full bg-gradient-to-br from-blue-500 to-blue-600
            animate-bounce
          `}
          style={{
            animationDuration: '0.8s',
            animationDelay: '0s',
          }}
          aria-hidden
        />
        <div
          className={`
            ${dotSize}
            rounded-full bg-gradient-to-br from-blue-500 to-blue-600
            animate-bounce
          `}
          style={{
            animationDuration: '0.8s',
            animationDelay: '0.15s',
          }}
          aria-hidden
        />
        <div
          className={`
            ${dotSize}
            rounded-full bg-gradient-to-br from-blue-500 to-blue-600
            animate-bounce
          `}
          style={{
            animationDuration: '0.8s',
            animationDelay: '0.3s',
          }}
          aria-hidden
        />
      </div>

      {/* 라벨 텍스트 */}
      {label && (
        <span className="text-sm font-medium text-gray-600 select-none">
          {label}
        </span>
      )}
    </div>
  );
}