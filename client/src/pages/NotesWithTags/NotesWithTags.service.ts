import { StylesConfig } from "react-select";

export const colourStyles: StylesConfig<any, true> = {
    control: (styles) => ({ ...styles, minHeight: 40, borderColor: "#E2E8F0" }),

    multiValue: (styles) => {
        return {
            ...styles,
            backgroundColor: "#3182ce",
        };
    },
    multiValueLabel: (styles) => ({
        ...styles,
        color: "#fff",
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: " #bee3f8",
        svg: {
            height: "1rem",
            width: "1rem",
        },
        ":hover": {
            backgroundColor: data.color,
            color: "white",
        },
    }),
};
