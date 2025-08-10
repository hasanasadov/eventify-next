export const Container = ({ className = "", children }) => {
  return <div className={`md:px-4 ${className}`}>{children}</div>;
};
