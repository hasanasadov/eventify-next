export const dateTo = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("default", { month: "long" });
  return `${day} ${month.toLowerCase()}`;
};
