import React from "react";
import styles from "./TimePicker.module.scss";

export default function TimePicker({
  localTimer,
  setLocalTimer,
  localTimerRef,
}) {
  const setTime = (time) => {
    setLocalTimer(time);
    localTimerRef.current = time;
  };
  return (
    <div className={` ${styles.timePicker}`}>
      <ul className={` ${styles.time}`}>
        <li>
          <button
            className={`${styles.timeButton} ${
              localTimer === 15 ? styles.active : ""
            }`}
            onClick={() => setTime(15)}
          >
            15
          </button>
        </li>
        <li>
          <button
            className={`${styles.timeButton} ${styles.timeButton} ${
              localTimer === 30 ? styles.active : ""
            }`}
            onClick={() => setTime(30)}
          >
            30
          </button>
        </li>
        <li>
          <button
            className={`${styles.timeButton} ${
              localTimer === 60 ? styles.active : ""
            }`}
            onClick={() => setTime(60)}
          >
            60
          </button>
        </li>
      </ul>
    </div>
  );
}
