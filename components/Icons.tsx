// Small inline icons, so the site doesn't load a whole icon font.
type IconProps = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function BagIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function CloseIcon({ size = 20 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function ChatIcon({ size = 24 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M4 5h16v11H9l-5 4V5Z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  );
}

export function SendIcon({ size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className="icon-flip">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 1 1 6.96 3.86Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06 4.8 4.8 0 0 0 1 2.55 11 11 0 0 0 4.21 3.72c1.57.68 2.19.74 2.97.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function MinusIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function PlusIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
