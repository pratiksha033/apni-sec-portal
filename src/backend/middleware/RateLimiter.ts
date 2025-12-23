import { NextResponse } from "next/server";

type RateLimitRecord = {
  count: number;
  resetTime: number;
};

export class RateLimiter {
  private static store = new Map<string, RateLimitRecord>();

  constructor(
    private limit: number = 100,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {}

  check(key: string) {
    const now = Date.now();
    const record = RateLimiter.store.get(key);

    // First request or window expired
    if (!record || now > record.resetTime) {
      RateLimiter.store.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
      });

      return this.buildHeaders(this.limit - 1, now + this.windowMs);
    }

    // Limit exceeded
    if (record.count >= this.limit) {
      const res = NextResponse.json(
        { success: false, message: "Too many requests" },
        { status: 429 }
      );

      res.headers.set("X-RateLimit-Limit", String(this.limit));
      res.headers.set("X-RateLimit-Remaining", "0");
      res.headers.set("X-RateLimit-Reset", String(record.resetTime));

      return res;
    }

    // Increment count
    record.count += 1;
    RateLimiter.store.set(key, record);

    return this.buildHeaders(
      this.limit - record.count,
      record.resetTime
    );
  }

  private buildHeaders(remaining: number, resetTime: number) {
    return {
      "X-RateLimit-Limit": String(this.limit),
      "X-RateLimit-Remaining": String(remaining),
      "X-RateLimit-Reset": String(resetTime),
    };
  }
}
