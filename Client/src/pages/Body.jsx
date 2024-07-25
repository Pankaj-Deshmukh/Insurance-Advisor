import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from "./Body.module.css";
import Chat from "../components/Chat";
import axios from "axios";
import Sessions from "../components/Sessions";

const Body = ({ className = "" }) => {
   const [query, setQuery] = useState('');
   const [chatHistory, setChatHistory] = useState([]);
   const [sessionData,setSessionData] = useState([]);
   const userName = localStorage.getItem("name") ? localStorage.getItem("name") : "userName";
   const token = localStorage.getItem("token");

   const handleInputChange = (e) => {
      setQuery(e.target.value);
   };

   // Handle search
   const handleSearch = async () => {
      if (query.trim() === '') return; // Avoid empty queries
      try {
         const response = await axios.get('http://localhost:8081/api/query/get_responce', {
         params: { query }, // Pass the search query as a query parameter
      });
      
      setChatHistory((prevHistory)=>[...prevHistory, { question: query, answer: response.data.answer }]);
      setQuery(''); // Clear the input field

      } catch (error) {
      console.error('Error fetching search results:', error);
      }
   };
   // Function to handle Enter key press
   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
   };

   // Load all the session details
   useEffect(()=>{
      const sessionDetails = async ()=>{
         try{
            const response = await axios.post("http://localhost:8081/api/query/getAllSessions",{},{
               headers: {
                  Authorization: token
               }
            })
            setSessionData(response.data)
            console.log(response.data)
         } catch(err){
            console.error('Error fetching session data:', err);
         }
      }
      sessionDetails();
   },[]);

   const formatQuestion = (question) => {
      if (typeof question === 'object' && !Array.isArray(question)) {
        // Ensure only character values are joined
        const characterArray = Object.values(question).filter(value => typeof value === 'string');
        return characterArray.join('');
      }
      return question;
    };
    

   return (
      <div className={[styles.body, className].join(" ")} id="body">
         <div className={styles.mainDiv}>
            <div className={styles.main} id="main">
               <div className={styles.chatDiv}>
                  {chatHistory.map((chat, index) => (
                     <Chat
                        key={index}
                        question={chat.question}
                        answer={chat.answer}
                     />
                  ))}
               </div>
               <div className={styles.searchBar} id="footer">
                  <div className={styles.searchBarChild}>
                     <div className={styles.inputDiv}>
                        <input
                           className={styles.searchBarItem}
                           placeholder="What's in your  mind ?"
                           value={query}
                           onChange={handleInputChange}
                           onKeyDown={handleKeyDown} // Handle Enter key press
                           required={true}
                           autoFocus={true}
                           id="user_input"
                        />
                        <button className={styles.sendButton} onClick={handleSearch} id="search">
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
                  <div className={styles.userName}>{userName}</div>
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
                     <div className={styles.previousHistory}>previous history ...</div>
                  </div>
                  <div className={styles.history} id="history1">
                     <img
                        className={styles.messageSquareIcon}
                        alt=""
                        src="/message-square1@2x.png"
                     />
                     <div className={styles.previousHistory}>previous history....</div>
                  </div>
                  {sessionData.map((item) => (
                     <Sessions
                        key={item.sessionId} 
                        question={formatQuestion(item.questions[0])} // Pass the first question as a prop
                     />
                  ))}
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
