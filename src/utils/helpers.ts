export const cleanOverview = (text?: string) =>
    text ? text.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ") : "";
