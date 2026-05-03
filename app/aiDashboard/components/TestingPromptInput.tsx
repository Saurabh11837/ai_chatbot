"use client";
import React, { useState } from "react";
import { Message } from "../page";

type Props = {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const TestingPromptInput: React.FC<Props> = ({ setMessages }) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    //   const handleSend = async () => {
    //     if (!input.trim() || loading) return;

    //     const userMessage: Message = {
    //       role: "user",
    //       text: input,
    //     };

    //     // 1️⃣ user message add
    //     setMessages((prev) => [...prev, userMessage]);

    //     // 2️⃣ empty bot message (stream fill karega)
    //     let botMessage: Message = { role: "bot", text: "" };
    //     setMessages((prev) => [...prev, botMessage]);

    //     setInput("");
    //     setLoading(true);

    //     try {
    //       const res = await fetch("http://localhost:5000/api/chat/send-stream", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           message: userMessage.text,
    //         }),
    //       });

    //       if (!res.body) return;

    //       const reader = res.body.getReader();
    //       const decoder = new TextDecoder("utf-8");

    //       let done = false;
    //       let accumulatedText = "";

    //       while (!done) {
    //         const { value, done: doneReading } = await reader.read();
    //         done = doneReading;

    //         const chunk = decoder.decode(value);
    //         accumulatedText += chunk;

    //         // 🔥 LIVE UPDATE
    //         setMessages((prev) => {
    //           const updated = [...prev];
    //           updated[updated.length - 1] = {
    //             role: "bot",
    //             text: accumulatedText,
    //           };
    //           return updated;
    //         });
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = {
            role: "user",
            text: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/chat/send-stream", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage.text }),
            });

            const data = await res.json(); // 🔥 IMPORTANT

            const botMessage: Message = {
                role: "bot",
                text: data.reply, // ✅ only reply
            };

            setMessages((prev) => [...prev, botMessage]);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="w-[90%] max-w-2xl bg-white border rounded-xl flex items-center px-3 py-2 shadow-md">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 outline-none px-2 py-2 text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
                onClick={handleSend}
                disabled={loading}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            >
                {loading ? "..." : "Send"}
            </button>
        </div>
    );
};

export default TestingPromptInput;