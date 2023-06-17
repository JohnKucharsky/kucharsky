import { pagesNames } from "../../shared/utils";

export const headerLinks = [
    {
        link: `/app/${pagesNames.books}`,
        title: "Books",
        width: "3rem",
    },
    {
        link: `/app/${pagesNames.todos}`,
        title: "Todos",
        width: "3rem",
    },
    {
        link: `/app/${pagesNames.notes_with_tags}`,
        title: "NotesWithTags",
        width: "7.5rem",
    },
    {
        link: `/app/${pagesNames.memory_game}`,
        title: "MemoryGame",
        width: "7rem",
    },
];
