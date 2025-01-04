import React, { useEffect } from "react";
import styles from "./TimePicker.module.scss";

export default function TimePicker({ localTimer, setLocalTimer }) {
  return (
    <div className={` ${styles.timePicker}`}>
      <ul className={` ${styles.time}`}>
        <li>
          <button
            className={`${styles.timeButton} ${
              localTimer === 15 ? styles.active : ""
            }`}
            onClick={() => setLocalTimer(15)}
          >
            15
          </button>
        </li>
        <li>
          <button
            className={`${styles.timeButton} ${styles.timeButton} ${
              localTimer === 30 ? styles.active : ""
            }`}
            onClick={() => setLocalTimer(30)}
          >
            30
          </button>
        </li>
        <li>
          <button
            className={`${styles.timeButton} ${
              localTimer === 60 ? styles.active : ""
            }`}
            onClick={() => setLocalTimer(60)}
          >
            60
          </button>
        </li>
      </ul>
    </div>
  );
}
