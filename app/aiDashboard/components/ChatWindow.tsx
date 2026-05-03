// "use client";
// import React, { useEffect, useRef } from "react";

// const ChatWindow = ({ messages }: any) => {
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//       {messages.map((msg: any, i: number) => (
//         <div
//           key={i}
//           className={`flex ${
//             msg.role === "user" ? "justify-end" : "justify-start"
//           }`}
//         >
//           <div
//             className={`px-4 py-2 rounded-lg max-w-[60%] text-sm
//               ${
//                 msg.role === "user"
//                   ? "bg-gray-500 text-black"
//                   : "bg-gray-200 text-black"
//               }`}
//           >
//             {msg.text}
//           </div>
//         </div>
//       ))}

//       {/* auto scroll anchor */}
//       <div ref={bottomRef} />
//     </div>
//   );
// };

// export default ChatWindow;




// "🔥 UPDATED FOR STREAMING OUTPUT""use client";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import MarkdownRenderer from "./MarkdownRender";

const ChatWindow = ({ messages }: any) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white pb-28">

      {messages.map((msg: any, i: number) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${msg.role === "user"
              ? "bg-black text-white ml-auto"
              : "bg-gray-100 text-black"
              }`}
          >
            <MarkdownRenderer content={msg.text} />
          </div>
        </div>
      ))}

      {/* scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;