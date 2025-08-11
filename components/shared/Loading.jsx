import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";

export const LoadingComp = ({ className }) => {
  return (
    <div className={`flex flex-col items-center  justify-center min-h-[70vh] ${className}`}>
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        <LoaderCircleIcon size={60} className="" />
      </motion.div>
      {/* <p className="mt-4 text-lg font-semibold text-center text-gray-700">
        Loading ...
      </p> */}
    </div>
  );
};

export default LoadingComp;
