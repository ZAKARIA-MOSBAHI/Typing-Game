import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { motion } from "framer-motion";

export default function Timer() {
  const { localTimer } = useContext(GameContext);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.3 }}
      className=" p-4 text-2xl font-bold dark:text-[#eeeeee] text-[#1E1E1E] "
    >
      {localTimer}
    </motion.div>
  );
}
