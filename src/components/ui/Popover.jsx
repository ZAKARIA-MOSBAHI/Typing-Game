import { AnimatePresence, motion } from "framer-motion";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/cn";

const PopoverContext = createContext();

export default function Popover({ children, className }) {
  const [open, setOpen] = useState(false);
  const closePopover = () => setOpen(false);
  const value = useMemo(
    () => ({ open, setOpen, closePopover }),
    [open, setOpen]
  );
  return (
    <PopoverContext.Provider value={value}>
      <div className={cn("relative", className)}>{children}</div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ className, children }) {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  const { open, setOpen } = context;
  useEffect(() => console.log("is open ?", open), [open]);
  return (
    <button
      onClick={() => setOpen((prev) => !prev)}
      className={cn("relative h-fit", className)}
    >
      {children}
    </button>
  );
}
export function PopoverContent({ className, children }) {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  const { open, closePopover } = context;
  const contentRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        closePopover();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          className={cn(
            "absolute top-full left-0 origin-top  rounded-md z-50 bg-[#E0E0E0] dark:bg-[#646464] ",
            className
          )}
        >
          {React.Children.map(children, (child) => {
            if (
              React.isValidElement(child) &&
              typeof child.type === "string" && // ensures it's a DOM element
              child.type === "button"
            ) {
              return React.cloneElement(child, {
                onClick: (e) => {
                  child.props.onClick?.(e); // Call original onClick if exists
                  closePopover(); // Then close popover
                },
              });
            }
            return child;
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
