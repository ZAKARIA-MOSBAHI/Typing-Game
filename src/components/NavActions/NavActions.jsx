import LangPicker from "../Lang Picker/LangPicker";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import TimePicker from "../Time Picker/TimePicker";
import { motion } from "framer-motion";

export default function NavActions({ localTimerRef }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.3 }}
      className={`flex gap-4 items-center justify-center h-full`}
    >
      <LangPicker />
      <TimePicker localTimerRef={localTimerRef} />
      <ThemeChanger />
    </motion.div>
  );
}
