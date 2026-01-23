export const cleanOverview = (text?: string) =>
    text ? text.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ") : "";


export const calculateBookAge = (publishedDate?: string): number => {
    if (!publishedDate) return 0;

    const published = new Date(publishedDate);
    if (isNaN(published.getTime())) return 0;

    const today = new Date();
    let age = today.getFullYear() - published.getFullYear();

    if (
        today.getMonth() < published.getMonth() ||
        (today.getMonth() === published.getMonth() && today.getDate() < published.getDate())
    ) {
        age -= 1;
    }
    return Math.max(0, age);
};


export const formatPublishedDateUS = (dateStr?: string): string => {
    if (!dateStr) return "Unknown";

    const parts = dateStr.split("-");
    const year = parts[0] ?? "0000";
    const month = parts[1] ?? "01";
    const day = parts[2] ?? "01";

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

