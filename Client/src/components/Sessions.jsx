import React from "react";
import { TbMessage2 } from "react-icons/tb";

import styles from "../pages/Body.module.css";

export default function Sessions({question, onClick}) {
  return (
    <div className={styles.history} onClick={onClick}>
      <TbMessage2 className={styles.messageSquareIcon}/>
      <div className={styles.previousHistory}>
        {typeof question === 'string' ? question : 'Invalid question'}
      </div>
    </div>
  );
}
