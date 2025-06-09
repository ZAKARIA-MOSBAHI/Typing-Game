import LangPicker from "../Lang Picker/LangPicker";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import TimePicker from "../Time Picker/TimePicker";
import Timer from "../Timer/Timer";

export default function NavActions() {
  return (
    <div
      className={`dark:bg-[#646464] bg-[#E0E0E0] p-6 my-4 rounded-lg max-w-[900px] w-full h-8 flex items-center justify-evenly    `}
    >
      <LangPicker Language={language} setLanguage={setLanguage} />
      <Timer localTimer={localTimer} />
      <TimePicker localTimerRef={localTimerRef} setLocalTimer={setLocalTimer} />
      <ThemeChanger />
    </div>
  );
}
