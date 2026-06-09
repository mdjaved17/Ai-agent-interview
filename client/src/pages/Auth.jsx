import React from "react";
import { RiRobot3Fill } from "react-icons/ri";
import { IoSparklesSharp } from "react-icons/io5";
import { motion, scale } from "motion/react";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

import axios from "axios";
import { ServerURL } from "../App.jsx";

function Auth() {
  const handleGoogleAuth = async () => {
    try{
      const response= await signInWithPopup(auth, provider);
      console.log("Firebase Success", response);
      let User = response.user;
      let name= User.displayName;
      let email= User.email;
      console.log("Sending request...");
      const res= await axios.post(ServerURL + "/api/auth/google", {
        name,
        email
      }, {withCredentials: true})
      // console.log("Response received");
      console.log(res.data);
    }catch(error){
      console.error(error);
      console.log(error.response);
    }
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 py-20 bg-[#f3f3f3]">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.2 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-300"
      >
        <div className=" flex items-center justify-center gap-3 mb-6">
          <div className=" bg-black text-white p-2 rounded-lg">
            <RiRobot3Fill size={18} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Interview With AI
          </h1>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-600 leading-snug mb-4">
          Continue with
          <span className=" bg-green-100 text-green-500 px-3 py-1 rounded-lg gap-2 inline-flex items-center">
            <IoSparklesSharp size={16} />
            Ai Smart Interview
          </span>
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign in to continue to your AI-powered interview experience.{" "}
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ opacity: 0.9, scale: 1.05 }}
          whileTap={{ opacity: 1, scale: 1 }}
          className="w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Auth;
