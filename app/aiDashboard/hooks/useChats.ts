import { useState, useEffect } from "react";

type Chat = {
    _id: string;
    title: string;
};

export const useChats = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchChats = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/chat/chats", {
                credentials: "include",
            });
            const data = await res.json();

            if (res.ok) {
                setChats(data.chats);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const updateChat = async (id: string, title: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/chat/rename/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ title }),
            });

            const data = await res.json();

            if (res.ok) {
                setChats(prev =>
                    prev.map(chat =>
                        chat._id === id
                            ? { ...chat, title: data.chat.title }
                            : chat
                    )
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteChat = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/chat/deleteChat/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (res.ok) {
                setChats(prev =>
                    prev.filter(chat => chat._id !== id)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return { chats, setChats, fetchChats, loading, deleteChat, updateChat };
};