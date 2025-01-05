import React from "react";
import styles from "./LangPicker.module.scss";
import LangIcon from "./LangIcon";

export default function LangPicker({ Language, setLanguage }) {
  const LanguageOptions = ["English", "French"];
  return (
    <div className="dropdown open">
      <button
        className={`${styles.langButton} `}
        type="button"
        id="triggerId"
        data-bs-toggle="dropdown"
      >
        <span className={` ${styles.langLabel}`}>{Language}</span>
        <LangIcon />
      </button>
      <div className={`${styles.langOptions}  dropdown-menu`}>
        {LanguageOptions.map((lang, index) => {
          return (
            <button
              key={index}
              className={`${styles.langOptionsBtn} dropdown-item`}
              onClick={() => setLanguage(lang)}
            >
              {lang}
            </button>
          );
        })}
      </div>
    </div>
  );
}
