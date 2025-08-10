export const Container = ({ className = "", children }) => {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
};
