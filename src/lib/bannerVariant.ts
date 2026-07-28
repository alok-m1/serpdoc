export interface BannerVariant {
  rainbowColors: string[];
  className: string;
  badge: string;
}

export const bannerVariants = {
  gold: {
    rainbowColors: ['rgba(251,191,36,0.5)', 'rgba(217,119,6,0.4)', 'rgba(120,53,15,0.35)', 'rgba(251,191,36,0.45)'],
    className: 'text-amber-50',
    badge: 'bg-amber-400/20 text-amber-200',
  },
  platinum: {
    rainbowColors: ['rgba(255,255,255,0.4)', 'rgba(203,213,225,0.3)', 'rgba(148,163,184,0.25)', 'rgba(255,255,255,0.35)'],
    className: 'text-slate-100',
    badge: 'bg-white/15 text-slate-200',
  },
  midnight: {
    rainbowColors: ['rgba(99,102,241,0.45)', 'rgba(139,92,246,0.35)', 'rgba(79,70,229,0.3)', 'rgba(99,102,241,0.4)'],
    className: 'text-indigo-50',
    badge: 'bg-indigo-400/20 text-indigo-200',
  },
  emerald: {
    rainbowColors: ['rgba(52,211,153,0.45)', 'rgba(16,185,129,0.35)', 'rgba(5,150,105,0.3)', 'rgba(52,211,153,0.4)'],
    className: 'text-emerald-50',
    badge: 'bg-emerald-400/20 text-emerald-200',
  },
  rose: {
    rainbowColors: ['rgba(251,113,133,0.45)', 'rgba(244,63,94,0.35)', 'rgba(190,18,60,0.3)', 'rgba(251,113,133,0.4)'],
    className: 'text-rose-50',
    badge: 'bg-rose-400/20 text-rose-200',
  },
  ocean: {
    rainbowColors: ['rgba(56,189,248,0.45)', 'rgba(14,165,233,0.35)', 'rgba(2,132,199,0.3)', 'rgba(56,189,248,0.4)'],
    className: 'text-sky-50',
    badge: 'bg-sky-400/20 text-sky-200',
  },
  sunset: {
    rainbowColors: ['rgba(251,146,60,0.5)', 'rgba(239,68,68,0.4)', 'rgba(168,85,247,0.35)', 'rgba(251,146,60,0.45)'],
    className: 'text-orange-50',
    badge: 'bg-orange-400/20 text-orange-200',
  },
  neon: {
    rainbowColors: ['rgba(232,121,249,0.5)', 'rgba(56,189,248,0.4)', 'rgba(52,211,153,0.35)', 'rgba(232,121,249,0.45)'],
    className: 'text-pink-50',
    badge: 'bg-pink-400/20 text-pink-200',
  },
  copper: {
    rainbowColors: ['rgba(252,211,77,0.45)', 'rgba(217,119,6,0.35)', 'rgba(180,83,9,0.3)', 'rgba(239,68,68,0.35)'],
    className: 'text-yellow-50',
    badge: 'bg-yellow-400/20 text-yellow-200',
  },
  aurora: {
    rainbowColors: ['rgba(52,211,153,0.4)', 'rgba(56,189,248,0.35)', 'rgba(139,92,246,0.3)', 'rgba(52,211,153,0.4)'],
    className: 'text-teal-50',
    badge: 'bg-teal-400/20 text-teal-200',
  },
  ruby: {
    rainbowColors: ['rgba(239,68,68,0.5)', 'rgba(220,38,38,0.4)', 'rgba(153,27,27,0.35)', 'rgba(239,68,68,0.45)'],
    className: 'text-red-50',
    badge: 'bg-red-400/20 text-red-200',
  },
  amethyst: {
    rainbowColors: ['rgba(217,70,239,0.45)', 'rgba(192,38,211,0.35)', 'rgba(147,51,234,0.3)', 'rgba(217,70,239,0.4)'],
    className: 'text-fuchsia-50',
    badge: 'bg-fuchsia-400/20 text-fuchsia-200',
  },
  jade: {
    rainbowColors: ['rgba(52,211,153,0.4)', 'rgba(5,150,105,0.35)', 'rgba(6,95,70,0.3)', 'rgba(52,211,153,0.4)'],
    className: 'text-emerald-50',
    badge: 'bg-emerald-400/20 text-emerald-200',
  },
  sapphire: {
    rainbowColors: ['rgba(96,165,250,0.45)', 'rgba(59,130,246,0.35)', 'rgba(29,78,216,0.3)', 'rgba(96,165,250,0.4)'],
    className: 'text-blue-50',
    badge: 'bg-blue-400/20 text-blue-200',
  },
  topaz: {
    rainbowColors: ['rgba(253,230,138,0.5)', 'rgba(250,204,21,0.4)', 'rgba(161,98,7,0.35)', 'rgba(253,230,138,0.45)'],
    className: 'text-amber-50',
    badge: 'bg-amber-400/20 text-amber-200',
  },
  coral: {
    rainbowColors: ['rgba(253,164,175,0.5)', 'rgba(244,63,94,0.4)', 'rgba(190,18,60,0.3)', 'rgba(253,164,175,0.45)'],
    className: 'text-rose-50',
    badge: 'bg-rose-400/20 text-rose-200',
  },
  obsidian: {
    rainbowColors: ['rgba(148,163,184,0.4)', 'rgba(100,116,139,0.35)', 'rgba(51,65,85,0.3)', 'rgba(148,163,184,0.4)'],
    className: 'text-slate-100',
    badge: 'bg-slate-400/20 text-slate-200',
  },
  forest: {
    rainbowColors: ['rgba(74,222,128,0.45)', 'rgba(34,197,94,0.35)', 'rgba(21,128,61,0.3)', 'rgba(74,222,128,0.4)'],
    className: 'text-green-50',
    badge: 'bg-green-400/20 text-green-200',
  },
  lavender: {
    rainbowColors: ['rgba(196,181,253,0.45)', 'rgba(167,139,250,0.35)', 'rgba(139,92,246,0.3)', 'rgba(196,181,253,0.4)'],
    className: 'text-violet-50',
    badge: 'bg-violet-400/20 text-violet-200',
  },
  tangerine: {
    rainbowColors: ['rgba(251,146,60,0.5)', 'rgba(234,88,12,0.4)', 'rgba(194,65,12,0.35)', 'rgba(251,146,60,0.45)'],
    className: 'text-orange-50',
    badge: 'bg-orange-400/20 text-orange-200',
  },
} satisfies Record<string, BannerVariant>;
