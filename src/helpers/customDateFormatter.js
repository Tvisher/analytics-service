const dateOptions = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
};
export const customFormattedDate = (date) => date.toLocaleDateString("ru-RU", dateOptions);