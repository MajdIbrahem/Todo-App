export const getStyleClasses = (classes) =>
  classes
    .filter((i) => i !== "")
    .join(" ")
    .trim();
