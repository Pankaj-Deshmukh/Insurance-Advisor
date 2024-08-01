import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from './AccordionItem.module.css';

function AccordionItem({ title, children, isOpen, onClick }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px';
    } else {
      contentRef.current.style.maxHeight = '0px';
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    onClick();
  };

  return (
    <div className={`${styles['accordion-item']} ${isOpen ? styles.active : ''}`}>
      <button className={styles['accordion-button']} onClick={toggleAccordion}>
        {title}
        <span className={styles['accordion-icon']}>
          {isOpen ? <IoIosArrowUp className={styles.button1} /> : <IoIosArrowDown className={styles.button1} />}
        </span>
      </button>
      <div className={`${styles['accordion-content']} ${isOpen ? styles.active : ''}`} ref={contentRef}>
        <div className={`${styles['scrollable-content']} ${isOpen ? styles.active : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AccordionItem;
