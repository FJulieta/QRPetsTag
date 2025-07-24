export default function PawIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="#fff"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }}
    >
      <path d="M256 352c-40 0-88 24-88 72s48 72 88 72 88-24 88-72-48-72-88-72zM121 256c-33 0-73 20-73 62s40 62 73 62 73-20 73-62-40-62-73-62zm270 0c-33 0-73 20-73 62s40 62 73 62 73-20 73-62-40-62-73-62zM169 96c-39 0-89 23-89 69s50 69 89 69 89-23 89-69-50-69-89-69zm174 0c-39 0-89 23-89 69s50 69 89 69 89-23 89-69-50-69-89-69z"/>
    </svg>
  );
}
