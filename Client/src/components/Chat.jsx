import React from "react";
import styles from "../pages/Body.module.css"

export default function Chat(props) {
  return (
    <div>
      <div className={styles.chat} id="chat_2">
        <div className={styles.userQuery}>
          <img className={styles.imageIcon} alt="" src="/image@2x.png" />
          <div className={styles.tellMeA}>
            {props.question}
          </div>
          <button className={styles.edit} id="edit">
            <img className={styles.icon} alt="" src="/icon.svg" />
          </button>
        </div>
        <div className={styles.chatAi}>Chat A.I +</div>
        <div className={styles.response}>
          <p> {props.answer} </p>
        </div>
        <div className={styles.mainChild} />
      </div>
    </div>
  );
}
