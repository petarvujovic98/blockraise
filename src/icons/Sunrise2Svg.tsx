export function Sunrise2Svg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M16 6L12 2M12 2L8 6M12 2V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 18H2M6.31412 12.3141L4.8999 10.8999M17.6858 12.3141L19.1 10.8999M22 18H20M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18M22 22H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}