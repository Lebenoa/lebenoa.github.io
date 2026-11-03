/**
 * Formats the time between `iso` and `now` as a human readable duration,
 * e.g. "2 years 4 months".
 */
export function elapsedSince(iso: string, now: Date = new Date()): string {
    const start = new Date(iso);

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();

    if (now.getDate() < start.getDate()) {
        months -= 1;
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    const parts: string[] = [];

    if (years > 0) {
        parts.push(`${years} year${years === 1 ? "" : "s"}`);
    }

    if (months > 0) {
        parts.push(`${months} month${months === 1 ? "" : "s"}`);
    }

    return parts.length > 0 ? parts.join(" ") : "less than a month";
}
