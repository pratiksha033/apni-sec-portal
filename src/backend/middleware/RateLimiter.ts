import { AppError } from "../core/AppError";

type RateData = {
  count: number;
  resetTime: number;
};

export class RateLimiter {
  private store: Map<string, RateData> = new Map();

  constructor(
    private maxRequests: number,
    private windowMs: number
  ) {}

  check(key: string) {
    const now = Date.now();
    const record = this.store.get(key);

    // first request OR window expired
    if (!record || now > record.resetTime) {
      this.store.set(key, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return;
    }

    if (record.count >= this.maxRequests) {
      throw new AppError(429, "Too many requests, try later");
    }

    record.count += 1;
  }
}
