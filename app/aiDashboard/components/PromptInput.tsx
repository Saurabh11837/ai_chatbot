// "use client";
// import React, { useState } from "react";

// import { Message } from "../page";

// type Props = {
//     setMessage: React.Dispatch<React.SetStateAction<Message[]>>;
//     chatId: string | null;
//     setChatId: (id: string) => void;

// };

// const PromptInput:React.FC<Props> = ({setMessage, chatId, setChatId}) =>{
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSend = async () =>{
//         if (!input.trim() || loading) return;

//         const userMessage: Message = {
//             role: "user",
//             text: input,
//         };

//         setMessage((prev) => [...prev, userMessage]);
//         setInput("");
//         setLoading(true);

//         try{
//             const token = cookieStore.get("token"); // get token from cookies, adjust if your auth method differs
//             const res = await fetch("http://localhost:5000/api/chat/send-stream",{
//                 method: "POST",
//                 credentials: "include", // include cookies in the request
//                 headers: {
//                     "Content-Type": "application/json",


//                 },
//                 body: JSON.stringify({ 
//                     message: userMessage.text,
//                     chatId: chatId
//                 }),

//             });
//             const data = await res.json(); 


//             setChatId(data.chatId);  // update chatId in context, will be used for subsequent messages in the same chat
//             console.log("Request sent to backend with chatId:", chatId, data.chatId);
//             console.log("Response status:", res.status);
//             if (!chatId &&data.chatId){
//                 setChatId(data.chatId);  // first time chat creation, set the chatId for future messages

//                 // temporary 
//                 window.location.reload(); // reload to update sidebar with new chat, can be optimized later by directly updating the chat list in context without reload
//             }
//              console.log("Chat ID sent to backend:", chatId, data.chatId);
//             const botMessage: Message ={
//                 role: "bot",
//                 text:data.reply,

//             };

//             setMessage((prev) => [...prev, botMessage]);

//         }catch (err){
//             console.log(err);
//         }finally{
//             setLoading(false);
//         }
//     };

//     return(
//         <div className="w-[90%] max-w-2xl bg-white border rounded-xl flex items-center px-3 py-2 shadow-md">
//             <input
//                 value={input}
//                 onChange={(e)=> setInput(e.target.value)}
//                 placeholder="Ask anything..."
//                 className="flex-1 outline-none px-2 py-2 text-sm "
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//                 className="bg-black text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 "
//                 onClick={handleSend}
//                 disabled = {loading}
//             >
//                 {loading ? "..." : "Send"}
//             </button>
//         </div>
//     )
// }

// export default PromptInput;


// =================================================================================
// update for streaming output +



// "use client";
// import React, { useState } from "react";

// import { Message } from "../page";

// type Props = {
//     setMessage: React.Dispatch<React.SetStateAction<Message[]>>;
//     chatId: string | null;
//     setChatId: (id: string) => void;

// };

// const PromptInput: React.FC<Props> = ({ setMessage, chatId, setChatId }) => {
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSend = async () => {
//         if (!input.trim() || loading) return;

//         const userMessage: Message = {
//             role: "user",
//             text: input,
//         };

//         setMessage((prev) => [...prev, userMessage]);
//         setInput("");
//         setLoading(true);

//         try {

//             const res = await fetch("http://localhost:5000/api/chat/send-stream", {
//                 method: "POST",
//                 credentials: "include", // include cookies in the request
//                 headers: {
//                     "Content-Type": "application/json",


//                 },
//                 body: JSON.stringify({
//                     message: userMessage.text,
//                     chatId: chatId
//                 }),

//             });
//             const reader = res.body?.getReader();
//             if (!reader) return;

//             const decoder = new TextDecoder();

//             let botText = "";

//             setMessage((prev) => [
//                 ...prev,
//                 { role: "bot", text: "" }
//             ]);

//             while (true) {
//                 const { value, done } = await reader.read();
//                 if (done) break;

//                 const chunk = decoder.decode(value, { stream: true });

//                 // 🔥 META DETECTION
//                 if (chunk.includes("__META__")) {
//                     const metaString = chunk
//                         .replace("__META__", "")
//                         .replace("__END__", "")
//                         .trim();

//                     try {
//                         const meta = JSON.parse(metaString);
//                         if (meta.chatId) setChatId(meta.chatId);
//                     } catch { }

//                     continue;
//                 }

//                 // 🔥 STREAM TEXT
//                 botText += chunk;

//                 setMessage((prev) => {
//                     const updated = [...prev];
//                     updated[updated.length - 1] = {
//                         role: "bot",
//                         text: botText,
//                     };
//                     return updated;
//                 });
//             }




//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="w-[90%] max-w-2xl bg-white border rounded-xl flex items-center px-3 py-2 shadow-md">
//             <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Ask anything..."
//                 className="flex-1 outline-none px-2 py-2 text-sm "
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//                 className="bg-black text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 "
//                 onClick={handleSend}
//                 disabled={loading}
//             >
//                 {loading ? "..." : "Send"}
//             </button>
//         </div>
//     )
// }

// export default PromptInput;



// -----------------------------------------------------------------------------------------------------
// Update code with chat gpt style typing indicator

"use client";
import React, { useState } from "react";
import { Message } from "../page";

type Props = {
    setMessage: React.Dispatch<React.SetStateAction<Message[]>>;
    chatId: string | null;
    setChatId: (id: string) => void;
};

const PromptInput: React.FC<Props> = ({ setMessage, chatId, setChatId }) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = "http://localhost:5000";

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = {
            role: "user",
            text: input,
        };

        setMessage((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/chat/send-stream`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage.text,
                    chatId: chatId,
                }),
            });

            if (!res.ok || !res.body) {
                throw new Error("Failed to connect to server");
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            let botText = "";

            // Add empty bot message first
            setMessage((prev) => [
                ...prev,
                { role: "bot", text: "" },
            ]);

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                // META handling
                // if (chunk.includes("__META__")) {
                //     const metaString = chunk
                //         .replace("__META__", "")
                //         .replace("__END__", "")
                //         .trim();

                //     try {
                //         const meta = JSON.parse(metaString);
                //         if (meta.chatId) setChatId(meta.chatId);
                //     } catch (err) {
                //         console.error("Meta parse error:", err);
                //     }

                //     continue;
                // }

                if (chunk.includes("__META__")) {
                    const start = chunk.indexOf("__META__") + "__META__".length;
                    const end = chunk.indexOf("__END__");

                    if (end !== -1) {
                        const metaString = chunk.slice(start, end).trim();

                        try {
                            const meta = JSON.parse(metaString);
                            if (meta.chatId) setChatId(meta.chatId);
                        } catch (err) {
                            console.error("Meta parse error:", metaString);
                        }

                        // remove meta part safely
                        const remaining = chunk.slice(end + "__END__".length);

                        if (remaining) {
                            botText += remaining;

                            setMessage((prev) => {
                                const updated = [...prev];
                                updated[updated.length - 1] = {
                                    role: "bot",
                                    text: botText,
                                };
                                return updated;
                            });
                        }
                    }

                    continue;
                }

                // Append streamed text
                botText += chunk;

                setMessage((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        role: "bot",
                        text: botText,
                    };
                    return updated;
                });
            }

        } catch (err) {
            console.error("Error sending message:", err);

            // Show fallback error message in UI
            setMessage((prev) => [
                ...prev,
                { role: "bot", text: "⚠️ Something went wrong. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className=" bottom-0  w-full bg-white  px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-end gap-2">
            
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                rows={1}
                className="flex-1 resize-none rounded-xl border px-4 py-3 text-sm outline-none 
                max-h-40 overflow-y-auto"
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
                style={{
                    height: "auto",
                }}
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                    const target = e.currentTarget;
                    target.style.height = "auto";
                    target.style.height = target.scrollHeight + "px";
                }}
            />

            <button
                onClick={handleSend}
                disabled={loading}
                className="bg-black text-white px-4 py-3 rounded-xl text-sm disabled:opacity-50"
            >
                {loading ? "..." : "Send"}
            </button>
        </div>
    </div>
);
};

export default PromptInput;