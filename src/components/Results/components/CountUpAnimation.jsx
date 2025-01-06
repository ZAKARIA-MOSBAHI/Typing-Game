import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CountUpAnimation({
  targetValue,
  textBefore = "",
  textAfter = "",
  delay = 0,
}) {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const IntervalRef = useRef(null);
  const TimeoutRef = useRef(null);
  useEffect(() => {
    // delay the display and code execution
    TimeoutRef.current = setTimeout(() => {
      setShow(true);
    }, delay * 1000);
  }, [delay]);
  useEffect(() => {
    if (show) {
      if (IntervalRef.current) {
        // when the component re-renders when the count changes , it will start a new intervall
        // in addition to the existing intervall , so we clear the previous intervall
        clearInterval(IntervalRef.current);
      }
      if (count === targetValue) {
        clearInterval(IntervalRef.current);
        setCount(targetValue);
        return;
      }
      IntervalRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 10);
    } else {
      return;
    }

    // clear the intervall when component unmounts
    return () => clearInterval(IntervalRef.current);
  }, [show, count, targetValue]);
  return (
    <>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {textBefore} {count} {textAfter}
        </motion.div>
      )}
    </>
  );
}
