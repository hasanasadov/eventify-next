export const dateTo = (date) => {
  if (!date) return "Not specified";
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  // const d = new Date(date);
  // const day = d.getDate();
  // const month = d.toLocaleString("default", { month: "long" });
  // return `${day} ${month.toLowerCase()}`;
};
