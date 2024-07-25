import React from "react";
import styles from "../pages/Body.module.css";

export default function Sessions({question}) {
  return (
    <div className={styles.history}>
      <img
        className={styles.messageSquareIcon}
        alt=""
        src="/message-square.svg"
      />
      <div className={styles.previousHistory}>
        {typeof question === 'string' ? question : 'Invalid question'}
      </div>
    </div>
  );
}
