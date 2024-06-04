import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*
TODO: 1: Remove the ugly links and make component for them
      2: Make the components for question asking and answer 
      3: Keep a better color theme for the sideBar and also make the sideBar pretty.
      4: Create a settings page.

EXTRAS: 1: Can Create a Profile page.
        2: Give a new chat functionality like chat-gpt.
*/


const Home = () => {
  const textareaRef = useRef(null);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();


  useEffect( () => {
      axios.post("http://localhost:3000/api/auth/isauthorized",{}, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(response => {
        if(response.status === 200){
          setAuthorized(true)
        }else{
          console.log("auth failed")
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          navigate("/signin");
        }
      })
  },[])

  useEffect(() => {
    const textarea:any = textareaRef.current;

    const handleInput = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener('input', handleInput);

    return () => {
      textarea.removeEventListener('input', handleInput);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-500 border-r border-gray-300 p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
        <ul className="flex-grow overflow-auto">
          <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Link 1</a></li>
          <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Link 2</a></li>
          <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Link 3</a></li>
          <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Link 4</a></li>
        </ul>
        <div className="flex flex-col mt-4">
          <button className="rounded h-7 mb-2 bg-gray-700 text-white" onClick={() => navigate("/settings")}>Settings</button>
          <div className="grid grid-cols-10 items-center bg-white rounded p-2">
            <div className='col-span-3'>
              <Avatar name='Kalyan' />
            </div>
            <button className="col-span-7 rounded h-7 bg-gray-700 text-white ml-2">Profile</button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-black text-white flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-yellow-700 mb-4">Content Page</h1>
          <p>This is the content area. You can put your main content here.</p>
          {/* Add more content here to make it scrollable */}
          <p>More content...</p>
          <p>More content...</p>
          <p>More content...</p>
        </div>
        <div className="flex p-6 border-t border-gray-700">
          <textarea 
            ref={textareaRef}
            className="w-full bg-gray-800 border border-gray-700 rounded min-h-10 p-2 resize-none overflow-hidden text-gray-200 placeholder-gray-400" 
            rows={1}
            placeholder="Type here..."
          />
          <div className="flex justify-center pl-2">
            <button className="bg-yellow-700 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
      <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
      </span>
    </div>
  );
}

export default Home;
