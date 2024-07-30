//prototype still not working.........

// useCreateNewSession.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const CreateNewSession = (sessionData, token) => {
  const [SessionId, setSessionId] = useState("firstSession");
  const [error, setError] = useState(null);

  const newSession = useCallback(async () => {
    if (sessionData.length > 0 && sessionData[sessionData.length - 1].questions.length > 0) {
      try {
        const response = await axios.post("http://localhost:8081/api/query/createNewSession", {}, {
          headers: {
            Authorization: token,
          },
        });
        setSessionId(response.data.newSessionId);
      } catch (err) {
        console.error(`Error Message:\n    ${err}`);
        setError(err);
      }
    }
  }, [sessionData, token]);

  return { newSession, SessionId, error };
};

export default CreateNewSession;
