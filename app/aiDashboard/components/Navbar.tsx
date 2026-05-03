"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const TestingNavbar = () => {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const cardRef = useRef<HTMLDivElement | null>(null)

  // Click outside dropdown
  useEffect(() => {
    function handleClickOutside(e:MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* 🔝 Navbar */}
      <div className="w-full h-16 px-4 border-b border-gray-300 flex justify-between items-center">
        
        {/* LEFT */}
        <div ref={cardRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex p-2 text-xl font-bold gap-1"
          >
            Chat AI <IoIosArrowDown className="mt-1" />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute top-10 left-0 border rounded-2xl bg-white shadow-xl overflow-hidden">
              <div className="h-36 w-80">
                <img
                  src="chatAi.webp"
                  className="w-full h-full object-cover"
                  alt="banner"
                />
              </div>

              <div className="p-4">
                <h2 className="font-semibold mb-1">
                  Try advanced features for free
                </h2>

                <p className="text-xs text-gray-600 mb-3">
                  Get smarter responses, upload files, create images, and more.
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="bg-black text-white px-4 py-1.5 rounded-full text-sm"
                  >
                    Log in
                  </button>

                  <button
                    onClick={() => {
                      setAuthOpen(true);
                      setIsLogin(false);
                    }}
                    className="border px-4 py-1.5 rounded-full text-sm"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setAuthOpen(true);
              setIsLogin(true);
            }}
            className="bg-black text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800"
          >
            Log in
          </button>

          <button
            onClick={() => {
              setAuthOpen(true);
              setIsLogin(false);
            }}
            className="border px-4 py-1.5 rounded-full text-sm hover:bg-gray-200"
          >
            Sign up for free
          </button>
        </div>
      </div>

      {/* 🔥 AUTH MODAL */}
      {authOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* Background */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setAuthOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white w-90 rounded-2xl shadow-xl p-6 z-10 animate-[scaleIn_0.2s_ease]">
            
            <h2 className="text-xl font-semibold text-center mb-4">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {/* Google Button */}
            <button className="w-full border flex items-center justify-center gap-2 py-2 rounded-full mb-3 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="google"
              />
              Continue with Google
            </button>

            <div className="text-center text-xs text-gray-400 mb-3">
              OR
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded mb-3"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded mb-4"
            />

            <button className="w-full bg-black text-white py-2 rounded-full mb-2">
              {isLogin ? "Log in" : "Sign up"}
            </button>

            {/* Toggle */}
            <p className="text-xs text-center text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-black cursor-pointer font-medium"
              >
                {isLogin ? "Sign up" : "Log in"}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default TestingNavbar;