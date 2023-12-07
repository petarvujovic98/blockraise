export function Palette2Svg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 14.2091 21.2091 16 19 16H18.5C18.0038 16 17.8525 16.0022 17.7389 16.0171C16.8415 16.1353 16.1353 16.8415 16.0171 17.7389C16.0022 17.8525 16 18.0038 16 18.5V19C16 21.2091 14.2091 23 12 23C5.92487 23 1 18.0751 1 12ZM10 5C8.89543 5 8 5.89543 8 7C8 8.10457 8.89543 9 10 9C11.1046 9 12 8.10457 12 7C12 5.89543 11.1046 5 10 5ZM14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8ZM5 12C5 10.8954 5.89543 10 7 10C8.10457 10 9 10.8954 9 12C9 13.1046 8.10457 14 7 14C5.89543 14 5 13.1046 5 12Z"
        fill="currentColor"
      />
    </svg>
  );
}