import type { FC, SVGProps } from "react";

const AgentSkillsIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <defs>
      <linearGradient id="brain-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <path d="M12 4C7 4 4 7 3.5 11c-.3 3 .5 6 2.5 8 1.5 1.5 4 2.5 6 2V4Z" fill="url(#brain-grad)" opacity="0.9" />
    <path d="M12 4c5 0 8 3 8.5 7 .3 3-.5 6-2.5 8-1.5 1.5-4 2.5-6 2V4Z" fill="url(#brain-grad)" opacity="0.9" />
    <path d="M6 8q3 1.5 1.5 5" stroke="#A78BFA" strokeWidth="0.6" fill="none" opacity="0.6" />
    <path d="M7 13q3 1.5 1 4.5" stroke="#A78BFA" strokeWidth="0.6" fill="none" opacity="0.6" />
    <path d="M18 8q-3 1.5-1.5 5" stroke="#A78BFA" strokeWidth="0.6" fill="none" opacity="0.6" />
    <path d="M17 13q-3 1.5-1 4.5" stroke="#A78BFA" strokeWidth="0.6" fill="none" opacity="0.6" />
    <circle cx="7" cy="9" r="1.2" fill="#EC4899" />
    <circle cx="17" cy="9" r="1.2" fill="#EC4899" />
    <circle cx="5.5" cy="14" r="1" fill="#F59E0B" />
    <circle cx="18.5" cy="14" r="1" fill="#F59E0B" />
    <circle cx="9" cy="17.5" r="0.9" fill="#10B981" />
    <circle cx="15" cy="17.5" r="0.9" fill="#10B981" />
    <circle cx="12" cy="6.5" r="1.3" fill="#F472B6" />
    <path d="m7 9 5-2.5" stroke="#A78BFA" strokeWidth="0.5" opacity="0.5" />
    <path d="m17 9-5-2.5" stroke="#A78BFA" strokeWidth="0.5" opacity="0.5" />
    <path d="m7 9-1.5 5" stroke="#A78BFA" strokeWidth="0.5" opacity="0.5" />
    <path d="m17 9 1.5 5" stroke="#A78BFA" strokeWidth="0.5" opacity="0.5" />
    <path d="m5.5 14 3.5 3.5" stroke="#A78BFA" strokeWidth="0.5" opacity="0.5" />
    <path d="m18.5 14-3.5 3.5" stroke="#A78BFA" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

export default AgentSkillsIcon;
