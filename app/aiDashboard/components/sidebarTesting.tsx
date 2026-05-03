"use client";
import React, { useState, useEffect } from "react";
import { RiChatAiFill, RiChatNewFill } from "react-icons/ri";
import { GoEyeClosed } from "react-icons/go";
import { IoSearch, IoSettings } from "react-icons/io5";
import { LuBadgeHelp } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import { useChats } from "../hooks/useChats";
type SidebarProps = {
    user: any;
    onNewChat: () => void;
    onSelectChat?: (chatId: string) => void; 
}
const SidebarTesting: React.FC<SidebarProps> = ({ user, onNewChat, onSelectChat }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { chats, deleteChat, updateChat } = useChats();

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState("");


    // ✅ Initials
    const getInitials = (firstName: string, lastName: string) =>
        `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
    useEffect(() => {
        const handleClick = () => setActiveMenu(null);
        window.addEventListener("click", handleClick);

        return () => window.removeEventListener("click", handleClick);
    }, []);
    return (
        <div
            className={`flex flex-col h-screen ${collapsed ? "w-16" : "w-64"
                } bg-gray-100 transition-all duration-300 ease-in-out`}
        >
            {/* 🔝 TOP SECTION */}
            <div className="p-2 border-b h-15 border-gray-300">
                <div className="flex items-center px-1 py-2 relative group">

                    {/* Chat Icon */}
                    <RiChatAiFill
                        className={`h-7 w-7 transition-all duration-200 ${collapsed ? "opacity-100 group-hover:opacity-0" : "opacity-100"
                            }`}
                    />

                    {/* Toggle Button */}
                    <div
                        className={`absolute right-2 flex items-center transition-all duration-200 ${collapsed ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                            }`}
                    >
                        <GoEyeClosed
                            onClick={() => setCollapsed(!collapsed)}
                            className="h-5 w-5 cursor-pointer"
                        />

                        {/* Tooltip */}
                        <span
                            className="absolute left-1/2 -translate-x-1/2 top-8 
              bg-gray-800 text-white text-xs px-2 py-1 rounded 
              opacity-0 group-hover:opacity-100 transition whitespace-nowrap"
                        >
                            {collapsed ? "Open Sidebar" : "Close Sidebar"}
                        </span>
                    </div>
                </div>
            </div>

            {/* 📜 MIDDLE SCROLLABLE AREA */}
            <div className="flex-1 overflow-y-auto px-2">

                {/* MENU */}
                <div className="flex flex-col gap-1 mt-2">

                    <div
                        onClick={()=>{
                            console.log("New chat clicked");
                            onNewChat();
                        }}
                        className={`px-2 py-2 rounded cursor-pointer flex items-center ${collapsed ? "justify-center" : ""
                            } bg-gray-300 hover:bg-gray-400`}
                    >
                        <RiChatNewFill className="h-5 w-5" />
                        {!collapsed && <span className="ml-2">New Chat</span>}
                    </div>

                    <div
                        className={`px-2 py-2 rounded cursor-pointer flex items-center ${collapsed ? "justify-center" : ""
                            } hover:bg-gray-300`}
                    >
                        <IoSearch className="h-5 w-5" />
                        {!collapsed && <span className="ml-2">Search Chat</span>}
                    </div>

                    <div
                        className={`px-2 py-2 rounded cursor-pointer flex items-center ${collapsed ? "justify-center" : ""
                            } hover:bg-gray-300`}
                    >
                        <IoSettings className="h-5 w-5" />
                        {!collapsed && <span className="ml-2">Setting</span>}
                    </div>

                    <div
                        className={`px-2 py-2 rounded cursor-pointer flex items-center ${collapsed ? "justify-center" : ""
                            } hover:bg-gray-300`}
                    >
                        <LuBadgeHelp className="h-5 w-5" />
                        {!collapsed && <span className="ml-2">Help</span>}
                    </div>
                </div>

                {/* CHAT HISTORY */}

                {/* {user && !collapsed && (
          <div className="px-1 mt-4 pb-4">
            <p className="text-[15px] text-blue-500 mb-2">
              Recents chats
            </p>
            {chats.map((chat:any)=>(
              <div
                key={chat._id}
                className="hover:bg-gray-200 p-2 rounded cursor-pointer flex justify-between items-center"
              >
                <span className="truncate">{chat.title}</span>
                <BsThreeDots />
              </div>
            ))}
          </div>
        )} */}
        <div className="px-1 mt-4 pb-4">
            <p className="text-[15px] text-blue-500 mb-2">
              Recents chats
            </p>
            {chats.map((chat: any) => (
                    <div
                        key={chat._id}
                        onClick={() => onSelectChat && onSelectChat(chat._id)} // call onSelectChat when a chat is clicked
                        className="relative cursor-pointer hover:bg-gray-200 p-2 rounded flex justify-between items-center"
                    >
                        {/* 📝 EDIT MODE */}
                        {editingId === chat._id ? (
                            <div className="flex items-center w-full gap-2">
                                <input
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="border px-2 py-1 text-sm w-full"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            updateChat(chat._id, newTitle);
                                            setEditingId(null);
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        updateChat(chat._id, newTitle);
                                        setEditingId(null);
                                    }}
                                    className="text-blue-500 cursor-pointer"
                                >
                                    ✔
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="truncate">{chat.title}</span>

                                {/* 3 DOT */}
                                <BsThreeDots
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenu(activeMenu === chat._id ? null : chat._id)
                                    }}
                                />
                            </>
                        )}

                        {/* 🔽 DROPDOWN */}
                        {activeMenu === chat._id && (
                            <div className="absolute right-2 top-8 bg-white border shadow-md rounded w-28 z-10">
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingId(chat._id);
                                        setNewTitle(chat.title);
                                        setActiveMenu(null);
                                    }}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Edit
                                </div>
                                <div
                                    onClick={() => deleteChat(chat._id)}
                                    className="px-3 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
                                >
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>
                ))}
        </div>
                

            </div>

            {/* 🔻 BOTTOM FIXED */}
            <div className="p-3 border-t border-gray-300 bg-gray-100">
                {user ? (
                    <div className="flex items-center gap-3 bg-gray-200 p-2 rounded-lg">

                        {user.profilePic ? (
                            <img src={user.profilePic} className="w-9 h-9 rounded-full" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                                {getInitials(user.firstName, user.lastName)}
                            </div>
                        )}

                        {!collapsed && (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    {user.firstName} {user.lastName}
                                </span>
                                <span className="text-xs text-gray-500">Logged in</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-3 bg-gray-200 p-2 rounded-lg">
                        <FaUser />
                        {!collapsed && (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Guest User</span>
                                <span className="text-xs text-gray-500">
                                    Log in / Sign up
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarTesting;