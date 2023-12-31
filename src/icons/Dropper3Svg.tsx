export function Dropper3Svg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M16 12L9 19C6.5 21.5 2 22 2 22C2 22 2.5 17.5 5 15L12 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 11.9998L21 6.99981C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8954 1.89525 18.1046 1.89524 17 2.99981L12 7.99981M10.5 6.49981L17.5 13.4998"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
