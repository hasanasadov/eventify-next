import { CarFront } from "lucide-react";
import { motion } from "framer-motion";

export const LoadingComp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] ">
      <motion.div
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        <CarFront size={60} className="text-orange-500" />
      </motion.div>
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Loading the best rides for you...
      </p>
    </div>
  );
};

export default LoadingComp;
