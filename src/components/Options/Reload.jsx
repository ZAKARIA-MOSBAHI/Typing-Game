import React from "react";
import styles from "./Reload.module.scss";
import ReloadIcon from "./ReloadIcon";

export default function Reload({ newGame }) {
  return (
    <div className={styles.TooltipContainer}>
      <button className={styles.TooltipBtn} onClick={newGame}>
        <ReloadIcon />
        <span className={styles.TooltipContent}>Restart Text</span>
      </button>
    </div>
  );
}
