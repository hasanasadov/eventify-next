export const titleCase = (s) =>
  s
    .replace(/[-_]+/g, " ")
    .replace(
      /\w\S*/g,
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );
