'use client';

import { Banner } from 'fumadocs-ui/components/banner';
import Link from 'fumadocs-core/link';
import { useEffect, useState } from 'react';
import { bannerVariants } from '@/lib/bannerVariant';

const STORAGE_KEY = 'banner-countdown-start';
const DURATION_MS = 3 * 60 * 60 * 1000;

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const variant = bannerVariants.sunset;

  useEffect(() => {
    let start = localStorage.getItem(STORAGE_KEY);
    if (!start) {
      start = String(Date.now());
      localStorage.setItem(STORAGE_KEY, start);
    }

    const tick = () => {
      const elapsed = Date.now() - Number(start);
      if (elapsed >= DURATION_MS) {
        const newStart = String(Date.now());
        localStorage.setItem(STORAGE_KEY, newStart);
        start = newStart;
      }
      setTimeLeft(DURATION_MS - (Date.now() - Number(start)));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Banner id="SERPHouse-banner"  variant="rainbow" rainbowColors={variant.rainbowColors} className="!z-10 text-amber-950 dark:text-amber-50" >
      <span className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-3">
        <span className={`hidden sm:inline rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase ${variant.badge} text-amber-700 dark:text-amber-200`}>
          Limited
        </span>
        <span className="text-xs sm:text-sm tracking-tight">
          Earlybird offer —{' '}
          <Link target="_blank" href="https://www.serphouse.com/pricing?utm=documentation" className="font-semibold underline underline-offset-2 decoration-amber-800/40 hover:decoration-amber-800/80 dark:decoration-white/40 dark:hover:decoration-white/80 transition">
            grab 10% off your first month
          </Link>
        </span>
        <span className="tabular-nums rounded-md bg-gradient-to-b from-yellow-200 to-yellow-300 px-2 py-0.5 text-xs sm:text-sm font-bold text-yellow-950 shadow-sm min-w-[6rem] sm:min-w-[8.5rem] text-center">
          {timeLeft !== null ? formatTime(timeLeft) : '--h --m --s'}
        </span>
      </span>
    </Banner>
  );
}
