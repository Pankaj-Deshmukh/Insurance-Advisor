import React from "react";
import styles from "../pages/Body.module.css"

export default function Chat() {
  return (
    <div>
      <div className={styles.chat} id="chat_2">
        <div className={styles.userQuery}>
          <img className={styles.imageIcon} alt="" src="/image@2x.png" />
          <div className={styles.tellMeA}>
            tell me a small story consisting of 20 lines
          </div>
          <button className={styles.edit} id="edit">
            <img className={styles.icon} alt="" src="/icon.svg" />
          </button>
        </div>
        <div className={styles.chatAi}>Chat A.I +</div>
        <div className={styles.response}>
          <p className={styles.basicMethods}>Basic Methods</p>
          <ol className={styles.addingElements}>
            <li className={styles.booleanAddeE}>Adding Elements</li>
          </ol>
          <ul className={styles.addingElements}>
            <li className={styles.booleanAddeE}>
              boolean add(E e): Appends the specified element to the end of the
              list.
            </li>
            <li className={styles.booleanAddeE}>
              void add(int index, E element): Inserts the specified element at
              the specified position in the list.
            </li>
            <li
              className={styles.booleanAddeE}
            >{`boolean addAll(Collection<? extends E> c): Appends all elements in the specified collection to the end of the list.`}</li>
            <li
              className={styles.booleanAddeE}
            >{`boolean addAll(int index, Collection<? extends E> c): Inserts all elements in the specified collection into the list at the specified position.`}</li>
          </ul>
          <ol className={styles.addingElements}>
            <li className={styles.booleanAddeE}>Accessing Elements</li>
          </ol>
          <ul className={styles.addingElements}>
            <li className={styles.booleanAddeE}>
              E get(int index): Returns the element at the specified position in
              the list.
            </li>
          </ul>
          <ol className={styles.addingElements}>
            <li className={styles.booleanAddeE}>Modifying Elements</li>
          </ol>
          <ul className={styles.addingElements}>
            <li className={styles.booleanAddeE}>
              E set(int index, E element): Replaces the element at the specified
              position with the specified element.
            </li>
          </ul>
          <p className={styles.basicMethods}>4.Removing Elements</p>
          <ul className={styles.addingElements}>
            <li className={styles.booleanAddeE}>
              E remove(int index): Removes the element at the specified position
              in the list.
            </li>
            <li className={styles.booleanAddeE}>
              boolean remove(Object o): Removes the first occurrence of the
              specified element from the list.
            </li>
            <li
              className={styles.booleanAddeE}
            >{`boolean removeAll(Collection<?> c): Removes all elements in the specified collection from the list.`}</li>
            <li>void clear(): Removes all elements from the list.</li>
          </ul>
        </div>
        <div className={styles.mainChild} />
      </div>
    </div>
  );
}
