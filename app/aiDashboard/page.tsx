// "use client"
// import React, {useState} from 'react'
// import Sidebar from './components/Sidebar'
// import Navbar from './components/Navbar'
// import TestingNavbar from './components/TestingNavbar'
// import SidebarTesting from './components/sidebarTesting'


// const page = () => {
//     const [user, setUser] = useState(null)
//     return (
//         // <div>Dashboard</div>
//         <>

//             <div className='flex flex-row h-screen '>
//                 {/* <div className='display flex flex-row h-full w-63 border bg-gray-100'>
//                 <Sidebar/>
//             </div> */}
//                 <SidebarTesting user={user} />
//                 <div className='flex-1 flex flex-col'>
//                     {/* <Navbar /> */}
//                     <TestingNavbar user = {user} setUser={setUser} />
//                     {/* Chat Window */}
//                     <div className='flex-1'></div>

//                     {/* Prompt Input */}
//                     <div></div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default page


"use client";
import React, { useState } from "react";
import SidebarTesting from "./components/sidebarTesting";
import TestingNavbar from "./components/TestingNavbar";
import ChatWindow from "./components/ChatWindow";
import PromptInput from "./components/PromptInput";

export type Message = {
  role: "user" | "bot";
  text: string;
};

const Page = () => {
  const APP_API_URL="http://56.228.34.165:5000" 

  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);

  const isStarted = messages.length > 0;
  const handleNewChat = () => {
    setMessages([]);
    setChatId(null);
  };


  const handleSelectChat = async (id: string) => {
    setChatId(id);

    try {
      const res = await fetch(`${APP_API_URL}/api/chat/messages/${id}`, {
        credentials: "include",
      });

      const data = await res.json();

      const formatted = data.messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "bot" : msg.role,
        text: msg.content,
      }));

      setMessages(formatted);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="flex h-screen">
      <SidebarTesting user={user} onNewChat={handleNewChat} onSelectChat={handleSelectChat} />

      <div className="flex-1 flex flex-col relative">
        <TestingNavbar user={user} setUser={setUser} />

        {/* CHAT WINDOW */}
        {messages.length === 0 ? (
          <p className="text-center mt-10 text-gray-400">
            Start a new conversation
          </p>
        ) : (
          <ChatWindow messages={messages} />
        )}
        {/* INPUT */}
        <div
          className={`
            w-full flex justify-center transition-all duration-500
            ${isStarted
              ? "absolute bottom-0 "
              : "absolute top-1/2 -translate-y-1/2"}
          `}
        >
          <PromptInput
            setMessage={setMessages}
            chatId={chatId}
            setChatId={setChatId}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;