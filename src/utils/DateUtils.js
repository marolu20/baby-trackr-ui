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


export function formatDateWithHoursMinutes(timestamp) {

    const date = new Date(timestamp);

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}
