import Keyboard from "../../assets/Keyboard";
import { motion } from "framer-motion";
export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.3 }}
      className="flex gap-2 justify-center items-center h-full"
    >
      <Keyboard className="w-8" />
      <h1 className="font-medium tracking-tighter leading-0">Typing Game.</h1>
    </motion.div>
  );
}
