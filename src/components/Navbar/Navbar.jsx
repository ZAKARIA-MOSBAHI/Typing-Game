import NavActions from "../NavActions/NavActions";
import Timer from "../Timer/Timer";
import { motion } from "framer-motion";
export default function Navbar({ localTimerRef }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, width: 100 }}
      animate={{ opacity: 1, y: 0, width: "100%" }}
      transition={{
        y: { duration: 0.8, delay: 0.2, ease: "easeInOut" },
        opacity: { duration: 0.8, delay: 0.2, ease: "easeInOut" },
        width: { duration: 0.5, delay: 1, ease: "easeInOut" },
      }}
      className={`dark:bg-[#646464] bg-[#E0E0E0] my-4 rounded-lg max-w-[900px] w-full h-12 flex items-center justify-evenly    `}
    >
      <Timer />
      <NavActions localTimerRef={localTimerRef} />
    </motion.div>
  );
}
