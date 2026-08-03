export interface RateLimitResult {
  ok: boolean;
  limit: number;
  remaining: number;
  retryAfter: number;
}

const WINDOW_MS = 60_000;
const LIMIT = 15;

const buckets = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export function checkRateLimit(req: Request): RateLimitResult {
  const ip = getClientIp(req);
  const now = Date.now();

  if (buckets.size > 10_000) {
    for (const [key, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(key);
    }
  }

  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, limit: LIMIT, remaining: LIMIT - 1, retryAfter: 0 };
  }

  bucket.count += 1;
  const remaining = Math.max(0, LIMIT - bucket.count);

  if (bucket.count > LIMIT) {
    return {
      ok: false,
      limit: LIMIT,
      remaining: 0,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  return { ok: true, limit: LIMIT, remaining, retryAfter: 0 };
}
