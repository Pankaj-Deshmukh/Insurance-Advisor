import React, {useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Body.module.css";
import Chat from "../components/Chat";
import axios from "axios";
import Sessions from "../components/Sessions";
import useFetchSessions from "../hooks/GetAllSessions";

const Body = ({ className = "" }) => {
   const [query, setQuery] = useState('');
   const [chatHistory, setChatHistory] = useState([]);
   const [firstSearch, setFirstSearch] = useState(false);
   const [currentSessionId, setCurrentSessionId] = useState("firstSession");
   const userName = localStorage.getItem("name") ? localStorage.getItem("name") : "userName";
   const token = localStorage.getItem("token");
   const navigate = useNavigate();


   // Navigate to setting page
   const settingPage = () => {
      navigate("/settings");
   }

   const handleInputChange = (e) => {
      setQuery(e.target.value);
   };

   // Handle search
   const handleSearch = async () => {
      if (query.trim() === '') return; // Avoid empty queries
      try {
         const response = await axios.post("http://localhost:8081/api/query/llmquery",{
            query: query,
            current_session_id: currentSessionId,
            id: token
         });
      setChatHistory(response.data);
      setQuery(''); // Clear the input field

      if(response.data.length === 1){
         setFirstSearch(true);
      }
      } catch (error) {
      console.error('Error fetching search results:', error.message);
      }
   };
   // Function to handle Enter key press
   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
   };

   // Load all the session details
   const { sessionData, dataFetched, error } = useFetchSessions(token,firstSearch);
   if(error) console.error(error);

   // Get the latest SessionId.
   useEffect(()=>{
      if (dataFetched && sessionData.length > 0) {
         try{
            const newSessionId = sessionData[0].sessionId;
            setCurrentSessionId(newSessionId);
            handleClick(newSessionId);
         } catch(err){
            console.error(err);
         }
      } else return;
   },[dataFetched,sessionData]);

   // Transform session data(questions) from objects to string.
   const transformData = (data) => {
      return data.map(session => ({
         sessionId: session.sessionId,
         questions: session.questions.map(q => 
            Object.values(q).filter(value => value === q.question).join('')
         )
      }));
   };
   // console.log(transformData(sessionData));
   
   // Create new Session & get sessionId.
   const newSession = async () => {
      if(sessionData[sessionData.length - 1].questions.length > 0){  // Returns the function without exicution if the previous session is empty
         try{
            const response = await axios.post("http://localhost:8081/api/query/createNewSession",{},{
               headers: {
                  Authorization: token
               }
            })
            setCurrentSessionId(response.data.newSessionId);
            // console.log(response.data.newSessionId);
            setChatHistory([]);
         } catch (err){
            console.error(`Error Message :\n    ${err}`);
         }
      } else return;
   }

   // Get Session Details.
   const handleClick = async (sessionId) => {
      // console.log(`Session ID clicked: ${sessionId}`);
      // Call your function with the sessionId
      try{
         const response = await axios.post("http://localhost:8081/api/query/getSessionDetails",{
            session_to_change_id: sessionId
         },{
            headers: {
               Authorization: token
            }
         });
         setChatHistory(response.data);
         setCurrentSessionId(sessionId);
      } catch (err) {
         console.error(`Error Fetching Session Details :\n ${err}`);
      }
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
               <button className={styles.setting} onClick={settingPage} id="setting">
                  <img className={styles.settingIcon} alt="setting" src="/setting-icon.svg" />
                  <div className={styles.setting1}>Setting</div>
               </button>
               <div className={styles.sideBarItem} />
               <div className={styles.historyDiv} id="history">
                  {transformData(sessionData).map((item) => (
                     <Sessions
                        key={item.sessionId} 
                        question={item.questions[0] ? item.questions[0] : '' } // Pass the first question as a prop
                        onClick={() => handleClick(item.sessionId)}
                     />
                  ))}
               </div>
               <div className={styles.sideBarItem} />
               <div className={styles.sideHeader} id="your_conversation">
                  <div className={styles.yourConversations}>Your Conversations</div>
                  <div className={styles.clearAll}>Clear All</div>
               </div>
               <div className={styles.sideBarItem} />
               <div className={styles.newChatDiv}>
                  <button className={styles.newChat} onClick={newSession} id="new_chat">+ New Chat</button>
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
