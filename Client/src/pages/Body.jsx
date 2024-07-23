import React, {useState} from "react";
import PropTypes from "prop-types";
import styles from "./Body.module.css";
import Chat from "../components/Chat";

const Body = ({ className = "" }) => {
   const [query, setQuery] = useState('');
   const [results, setResults] = useState("");

   const handleInputChange = (e) => {
      setQuery(e.target.value);
   };

   // Handle search
   const handleSearch = async () => {
      try {
         const response = await axios.get('http://localhost:5000/api/search', {
         params: { query }, // Pass the search query as a query parameter
      });
      setResults(response.data.results);
   } catch (error) {
     console.error('Error fetching search results:', error);
   }
 };

   return (
      <div className={[styles.body, className].join(" ")} id="body">
         <div className={styles.mainDiv}>
            <div className={styles.main} id="main">
               <div className={styles.chatDiv}>
                  <Chat/>
                  <Chat/>
               </div>
               <div className={styles.searchBar} id="footer">
                  <div className={styles.searchBarChild}>
                     <div className={styles.inputDiv}>
                        <input
                           className={styles.searchBarItem}
                           placeholder="What's in your  mind ?"
                           required={true}
                           autoFocus={true}
                           id="user_input"
                        />
                        <button className={styles.sendButton} id="search">
                           <img className={styles.sendIcon} alt="" src="/send.svg" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className={styles.sideBar}>
            <div className={styles.sideBarChild}>
               <div className={styles.user} id="user">
                  <img
                     className={styles.imageIcon2}
                     alt="user_img"
                     id="user_img"
                     src="/image@2x.png"
                  />
                  <div className={styles.userName}>Pankaj Deshmukh</div>
               </div>
               <span className={styles.sideBarItem} />
               <button className={styles.setting} id="setting">
                  <img className={styles.settingIcon} alt="setting" src="/setting-icon.svg" />
                  <div className={styles.setting1}>Setting</div>
               </button>
               <div className={styles.sideBarItem} />
               <div className={styles.historyDiv} id="history">
                  <div className={styles.history}>
                     <img
                        className={styles.messageSquareIcon}
                        alt=""
                        src="/message-square.svg"
                     />
                     <div className={styles.previousHistory}>previous history....</div>
                  </div>
                  <div className={styles.history}>
                     <img
                        className={styles.messageSquareIcon}
                        alt=""
                        src="/message-square.svg"
                     />
                     <div className={styles.previousHistory}>previous history....</div>
                  </div>
                  <div className={styles.history}>
                     <img
                        className={styles.messageSquareIcon}
                        alt=""
                        src="/message-square.svg"
                     />
                     <div className={styles.previousHistory}>previous history....</div>
                  </div>
                  <div className={styles.history}>
                     <img
                        className={styles.messageSquareIcon}
                        alt=""
                        src="/message-square.svg"
                     />
                     <div className={styles.previousHistory}>previous history....</div>
                  </div>
                  <div className={styles.history} id="history1">
                     <img
                        className={styles.messageSquareIcon}
                        alt=""
                        src="/message-square1@2x.png"
                     />
                     <div className={styles.previousHistory}>previous history....</div>
                  </div>
               </div>
               <div className={styles.sideHeader} id="your_conversation">
                  <div className={styles.yourConversations}>Your Conversations</div>
                  <div className={styles.clearAll}>Clear All</div>
               </div>
               <div className={styles.newChatDiv}>
                  <button className={styles.newChat} id="new_chat">+ New Chat</button>
                  <button className={styles.search} id="Search">
                     <img className={styles.searchIcon} alt="" src="/search.svg" />
                  </button>
               </div>
               <div className={styles.chatAi2}>CHAT A.I +</div>
            </div>
         </div>
      </div>
   );
};

Body.propTypes = {
   className: PropTypes.string,
};

export default Body;
