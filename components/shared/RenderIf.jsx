export const RenderIf = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};
