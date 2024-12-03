import React from "react";
import { FaUserCircle, FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const MessageBubble = ({
    sender,
    text,
    isTyping = false,
}: {
    sender: string;
    text: string;
    isTyping?: boolean;
}) => {
    const isUser = sender === "user";

    // Define animation variants
    const bubbleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className={`flex items-center ${isUser ? "justify-end" : "justify-start"} my-2`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={bubbleVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Avatar */}
            {!isUser && <FaRobot className="text-secondary w-8 h-8 mr-3 shadow-md" />}

            {/* Message Bubble or Typing Indicator */}
            <motion.div
                className={`relative max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow-lg backdrop-blur-md ${isUser
                    ? "bg-gradient-to-r from-blue-500/30 to-blue-300/30 "
                    : "bg-gradient-to-r from-gray-200/30 to-gray-100/30 "
                    }`}
                style={{
                    border: isUser ? "1px solid rgba(255, 255, 255, 0.4)" : "1px solid rgba(0, 0, 0, 0.2)",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {isTyping ? (
                    <div className="flex space-x-1">
                        <motion.span
                            className="dot bg-gray-500 rounded-full w-2 h-2"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        ></motion.span>
                        <motion.span
                            className="dot bg-gray-500 rounded-full w-2 h-2"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        ></motion.span>
                        <motion.span
                            className="dot bg-gray-500 rounded-full w-2 h-2"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        ></motion.span>
                    </div>
                ) : (
                    <p className="text-sm leading-snug">{text}</p>
                )}
            </motion.div>

            {/* User Avatar */}
            {isUser && <FaUserCircle className="text-primary w-8 h-8 ml-3 shadow-md" />}
        </motion.div>
    );
};

export default MessageBubble;
