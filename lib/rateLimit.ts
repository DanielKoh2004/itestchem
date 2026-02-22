import { headers } from "next/headers";

interface RateLimitTracker {
    count: number;
    resetAt: number;
}

const rateLimiter = new Map<string, RateLimitTracker>();

// Clean up expired entries periodically to prevent memory leaks
if (typeof setInterval !== 'undefined') {
    const timer = setInterval(() => {
        const now = Date.now();
        for (const [ip, record] of rateLimiter.entries()) {
            if (now > record.resetAt) {
                rateLimiter.delete(ip);
            }
        }
    }, 60 * 1000);
    // Suppress unref error in edge runtimes
    if (timer.unref) {
        timer.unref();
    }
}

export async function applyRateLimit(limit: number = 5, windowMs: number = 10 * 60 * 1000): Promise<{ success: boolean; retryAfter?: number }> {
    try {
        const headersList = await headers();
        const forwardedFor = headersList.get("x-forwarded-for");
        const realIp = headersList.get("x-real-ip");
        // Default to 'unknown' if IP cannot be determined
        const ip = forwardedFor?.split(',')[0].trim() || realIp || "unknown";

        const now = Date.now();
        const record = rateLimiter.get(ip);

        if (!record || now > record.resetAt) {
            rateLimiter.set(ip, { count: 1, resetAt: now + windowMs });
            return { success: true };
        }

        if (record.count >= limit) {
            const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
            return { success: false, retryAfter: retryAfterSeconds };
        }

        record.count += 1;
        return { success: true };
    } catch (e) {
        // Fallback for edge cases where headers() throws
        return { success: true };
    }
}
