// "use client";
// import { useState, useRef, useEffect } from "react";
// import { IoIosArrowDown } from "react-icons/io";

// const TestingNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [authOpen, setAuthOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);

//   const cardRef = useRef<HTMLDivElement | null>(null)

//   // Click outside dropdown
//   useEffect(() => {
//     function handleClickOutside(e:MouseEvent) {
//       if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       {/* 🔝 Navbar */}
//       <div className="w-full h-16 px-4 border-b border-gray-300 flex justify-between items-center">

//         {/* LEFT */}
//         <div ref={cardRef} className="relative">
//           <button
//             onClick={() => setOpen(!open)}
//             className="flex p-2 text-xl font-bold gap-1"
//           >
//             Chat AI <IoIosArrowDown className="mt-1" />
//           </button>

//           {/* Dropdown */}
//           {open && (
//             <div className="absolute top-10 left-0 border rounded-2xl bg-white shadow-xl overflow-hidden">
//               <div className="h-36 w-80">
//                 <img
//                   src="chatAi.webp"
//                   className="w-full h-full object-cover"
//                   alt="banner"
//                 />
//               </div>

//               <div className="p-4">
//                 <h2 className="font-semibold mb-1">
//                   Try advanced features for free
//                 </h2>

//                 <p className="text-xs text-gray-600 mb-3">
//                   Get smarter responses, upload files, create images, and more.
//                 </p>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setAuthOpen(true)}
//                     className="bg-black text-white px-4 py-1.5 rounded-full text-sm"
//                   >
//                     Log in
//                   </button>

//                   <button
//                     onClick={() => {
//                       setAuthOpen(true);
//                       setIsLogin(false);
//                     }}
//                     className="border px-4 py-1.5 rounded-full text-sm"
//                   >
//                     Sign up
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* RIGHT */}
//         <div className="flex gap-2">
//           <button
//             onClick={() => {
//               setAuthOpen(true);
//               setIsLogin(true);
//             }}
//             className="bg-black text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800"
//           >
//             Log in
//           </button>

//           <button
//             onClick={() => {
//               setAuthOpen(true);
//               setIsLogin(false);
//             }}
//             className="border px-4 py-1.5 rounded-full text-sm hover:bg-gray-200"
//           >
//             Sign up for free
//           </button>
//         </div>
//       </div>

//       {/* 🔥 AUTH MODAL */}
//       {authOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">

//           {/* Background */}
//           <div
//             className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//             onClick={() => setAuthOpen(false)}
//           />

//           {/* Modal */}
//           <div className="relative bg-white w-[360px] rounded-2xl shadow-xl p-6 z-10 animate-[scaleIn_0.2s_ease]">

//             <h2 className="text-xl font-semibold text-center mb-4">
//               {isLogin ? "Welcome Back" : "Create Account"}
//             </h2>

//             {/* Google Button */}
//             <button className="w-full border flex items-center justify-center gap-2 py-2 rounded-full mb-3 hover:bg-gray-100">
//               <img
//                 src="https://www.svgrepo.com/show/475656/google-color.svg"
//                 className="w-5 h-5"
//                 alt="google"
//               />
//               Continue with Google
//             </button>

//             <div className="text-center text-xs text-gray-400 mb-3">
//               OR
//             </div>

//             {/* Email */}
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full border p-2 rounded mb-3"
//             />

//             {/* Password */}
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full border p-2 rounded mb-4"
//             />

//             <button className="w-full bg-black text-white py-2 rounded-full mb-2">
//               {isLogin ? "Log in" : "Sign up"}
//             </button>

//             {/* Toggle */}
//             <p className="text-xs text-center text-gray-500">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}
//               <span
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="ml-1 text-black cursor-pointer font-medium"
//               >
//                 {isLogin ? "Sign up" : "Log in"}
//               </span>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Animation */}
//       <style jsx>{`
//         @keyframes scaleIn {
//           from {
//             transform: scale(0.9);
//             opacity: 0;
//           }
//           to {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default TestingNavbar;




// --- Addign lgoing route with api---
"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
type NavbarProps ={
    user:any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}
const TestingNavbar: React.FC<NavbarProps> = ({user, setUser}) => {
    const [open, setOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);

    const [step, setStep] = useState<
        "login" | "signup-email" | "otp" | "profile"
    >("login");

    // const [user, setUser] = useState<any>(null);

    const [isLogin, setIsLogin] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/auth/user", {
                    credentials: "include",
                });
                const data = await res.json();

                console.log("Full response:", data);

                if (res.ok) {
                    console.log("First name:", data.userInfo.firstName + " " + data.userInfo.lastName); // ✅
                    setUser(data.userInfo); // ✅
                }
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);

    // Click outside dropdown
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // // ✅ Initials
    // const getInitials = (f: string, l: string) =>
    //     `${f?.[0] || ""}${l?.[0] || ""}`.toUpperCase();
    // console.log(getInitials)
    // ================= API =================

    const handleSignup = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setStep("otp");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                "http://localhost:5000/api/auth/verify-otp",
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, otp }),
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setStep("profile");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteProfile = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                "http://localhost:5000/api/auth/complete-profile",
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        password,
                        firstName,
                        lastName,
                        dob,
                    }),
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setStep("login");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Initials
    const getInitials = (firstName: string, lastName: string) =>
        `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setUser(data.user);
            
            setAuthOpen(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };
    console.log("Login or not ", isLogin)
    // ================= UI =================

    return (
        <>
            {/* NAVBAR */}
            <div className="w-full h-15 px-4 border-b  border-gray-300 flex justify-between items-center">

                {/* LEFT */}
                <div ref={cardRef} className="relative hidden md:block">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex p-2 text-xl font-bold gap-1 hover:bg-gray-400 rounded-xl cursor-pointer"
                    >
                        Chat AI <IoIosArrowDown className="mt-1" />
                    </button>

                    {/* Dropdown */}
                    {open && (
                        user ? (
                            // ✅ LOGIN USER UI
                            <div className="absolute top-10 left-0 border rounded-2xl bg-white shadow-xl w-72 p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">ChatGPT Plus</p>
                                        <p className="text-xs text-gray-500">Our smartest model & more</p>
                                    </div>
                                    <button className="border px-3 py-1 rounded-full text-sm">
                                        Upgrade
                                    </button>
                                </div>

                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <p>Chat AI</p>
                                    <span>Free ✔</span>
                                </div>
                            </div>
                        ) : (

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
                        )
                    )}
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                    {!user ? (
                        <>
                            <button
                                onClick={() => {
                                    setAuthOpen(true);
                                    setStep("login");
                                }}
                                className="bg-black text-white px-4 py-1 rounded-full"
                            >
                                Log in
                            </button>

                            <button
                                onClick={() => {
                                    setAuthOpen(true);
                                    setStep("signup-email");
                                }}
                                className="border px-4 py-1 rounded-full"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Avatar */}
                            {user.profilePic ? (
                                <img
                                    src={user.profilePic}
                                    className="w-9 h-9 rounded-full"
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-full border bg-black text-white   flex items-center justify-center">
                                    {getInitials(user.firstName, user.lastName)}
                                </div>
                            )}

                            {/* <span className="text-sm">{user.firstName}</span> */}

                            <button
                                onClick={handleLogout}
                                className="border px-3 py-1 rounded-full text-sm"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>


            {/* MODAL */}
            {authOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setAuthOpen(false)}
                    />

                    <div className="bg-white w-90 p-6 rounded-xl z-10">

                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        {/* LOGIN */}
                        {step === "login" && (
                            <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-md border">

                                <h2 className="text-xl font-semibold mb-1">Welcome back</h2>
                                {/* Google Button */}
                                <button className="w-full flex items-center justify-center gap-2 border rounded-full py-2.5 text-sm font-medium hover:bg-gray-50 transition">
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-4 h-4" />
                                    Continue with Google
                                </button>

                                {/* Divider */}
                                <div className="flex items-center my-4">
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                    <span className="px-3 text-xs text-gray-400">OR</span>
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <input
                                        placeholder="Email address"
                                        className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={handleLogin}
                                    className="w-full mt-4 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition"
                                >
                                    {loading ? "Loading..." : "Login"}
                                </button>

                                <p className="text-sm text-center mt-4">
                                    Don’t have an account?
                                    <span
                                        onClick={() => setStep("signup-email")}
                                        className="ml-1 font-medium cursor-pointer hover:underline"
                                    >
                                        Sign up
                                    </span>
                                </p>
                            </div>
                        )}

                        {/* SIGNUP EMAIL */}
                        {step === "signup-email" && (
                            <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-md border">

                                {/* Heading */}
                                <h2 className="text-xl font-semibold mb-1">Create account</h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    Get started with your free account
                                </p>

                                {/* Google Button */}
                                <button className="w-full flex items-center justify-center gap-2 border rounded-full py-2.5 text-sm font-medium hover:bg-gray-50 transition">
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-4 h-4" />
                                    Continue with Google
                                </button>

                                {/* Divider */}
                                <div className="flex items-center my-4">
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                    <span className="px-3 text-xs text-gray-400">OR</span>
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                </div>

                                {/* Inputs */}
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    onClick={handleSignup}
                                    className="w-full mt-4 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition"
                                >
                                    {loading ? "Sending..." : "Continue"}
                                </button>

                                {/* Footer */}
                                <p className="text-xs text-gray-400 text-center mt-4">
                                    By continuing, you agree to our Terms & Privacy Policy
                                </p>
                            </div>
                        )}

                        {/* OTP */}
                        {step === "otp" && (
                            <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-md border">

                                <h2 className="text-xl font-semibold mb-1">Verify OTP</h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    Enter the code sent to your email
                                </p>

                                <input
                                    placeholder="Enter OTP"
                                    className="w-full px-3 py-2.5 border rounded-lg text-sm tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-black"
                                    onChange={(e) => setOtp(e.target.value)}
                                />

                                <button
                                    onClick={handleVerifyOtp}
                                    className="w-full mt-4 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition"
                                >
                                    Verify
                                </button>

                                <p className="text-xs text-gray-400 text-center mt-3 cursor-pointer hover:underline">
                                    Resend OTP
                                </p>
                            </div>
                        )}

                        {/* PROFILE */}
                        {step === "profile" && (
                            <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-md border">

                                <h2 className="text-xl font-semibold mb-1">Complete your profile</h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    Tell us a bit about yourself
                                </p>

                                <div className="flex flex-col gap-3">
                                    <input
                                        placeholder="First Name"
                                        className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        required
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />

                                    <input
                                        placeholder="Last Name"
                                        className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        required
                                        onChange={(e) => setLastName(e.target.value)}
                                    />

                                    <input
                                        type="date"
                                        className="w-full px-3 py-2.5 border rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                                        required
                                        onChange={(e) => setDob(e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={handleCompleteProfile}
                                    className="w-full mt-4 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition"
                                >
                                    Complete Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* styles */}
            <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 6px;
        }
        .btn {
          background: black;
          color: white;
          padding: 8px;
          border-radius: 20px;
        }
      `}</style>
        </>
    );
};

export default TestingNavbar;