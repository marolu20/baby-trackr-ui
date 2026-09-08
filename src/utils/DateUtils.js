export function formatDate(dateString) {

    const normalized = dateString.replace(/-/g, "/");
    const date = new Date(normalized);

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}


export function formatDateWithWeekday(dateString) {

    const normalized = dateString.replace(/-/g, "/");
    const date = new Date(normalized);

    return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}


export function formatDateWithHoursMinutes(value) {
    const date = parseDate(value);

    if (!date) {
        return "Invalid date";
    }

    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

export function parseDate(value) {
    if (!value) return null;

    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value;
    }

    let normalized = value;

    // Converts PostgreSQL-style:
    // 2026-08-04 18:03:56.376+00
    // into ISO-style:
    // 2026-08-04T18:03:56.376+00:00
    if (typeof normalized === "string") {
        normalized = normalized
            .replace(" ", "T")
            .replace(/([+-]\d{2})$/, "$1:00");
    }

    const date = new Date(normalized);

    return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDuration(minutes) {
    if (minutes == null) return "N/A";

    const totalMinutes = Number(minutes);

    if (Number.isNaN(totalMinutes)) return "N/A";

    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    if (hours === 0) {
        return `${remainingMinutes} min`;
    } else if (remainingMinutes === 0) {
        return `${hours} hr`;
    } else {
        return `${hours} hr ${remainingMinutes} min`;
    }
}
