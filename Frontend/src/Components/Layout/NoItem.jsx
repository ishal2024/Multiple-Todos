import { motion } from "framer-motion";
import { Plus } from "lucide-react"; // optional: icon library
import React from "react";

const NoItem = ({message}) => {
  return (
   
     <div className="flex flex-col items-center justify-center  text-center px-4 animate-fadeIn">
      {/* 📦 You can replace this with any GIF URL */}
      <img
        src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
        alt="No products"
        className="w-40 h-40 object-contain mb-4"
      />

      <h2 className="text-xl font-semibold text-gray-700 mb-1">
        No {message} are added
      </h2>
      <p className="text-sm text-gray-500">
        Please click the <span className="font-bold text-blue-600 text-lg">+</span> icon to create one.
      </p>
    </div>
    
 
  );
};

export default NoItem;
