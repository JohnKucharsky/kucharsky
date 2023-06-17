export const categories = [
    "all",
    "art",
    "biography",
    "computers",
    "history",
    "medical",
    "poetry",
];
export const orderBy = ["newest", "relevance"];

export const paginationContainerStyles = {
    position: "absolute" as const,
    margin: "0.3rem auto 0 auto",
    bottom: 0,
    left: "50%",
    transform: "translate(-50%,0)",
};
