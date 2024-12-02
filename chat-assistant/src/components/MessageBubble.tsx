import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const MessageBubble = ({ sender, text }: { sender: string; text: string }) => {
    const isUser = sender === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}
        >
            {!isUser && (
                <FaUserCircle className="text-gray-500 mr-2 self-center" size={30} />
            )}
            <div
                className={`p-3 rounded-lg text-white ${
                    isUser ? "bg-blue-500" : "bg-gray-500"
                }`}
                style={{ maxWidth: "75%" }}
            >
                {text}
            </div>
            {isUser && (
                <FaUserCircle className="text-blue-500 ml-2 self-center" size={30} />
            )}
        </motion.div>
    );
};

export default MessageBubble;
