import React, { useEffect, useRef } from "react";
import { ChatAreaProps } from "../types/chat";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import {useAuth} from '../context/AuthContext'
import "highlight.js/styles/github-dark.css";

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isLoading,
  onMessageDoubleClick,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const {user} = useAuth();
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const cleanMarkdown = (text: string) =>
    text.replace(/\n{2,}/g, "\n\n").replace(/\n([^\n])/g, "\n$1");

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-2 sm:px-4 py-4">
      <div className="max-w-3xl mx-auto space-y-6 pb-20">
        {/* Empty Chat Placeholder */}
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-white/80 text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-semibold text-white">
              How’s it going,{" "}
              <span className="text-purple-400">{user.displayName}</span> ?
            </h1>
            <p className="text-sm sm:text-base text-white/50 max-w-md">
              Start a conversation by typing your doubt below.
            </p>
          </div>
        )}

        {/* Message List */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
            onDoubleClick={() => onMessageDoubleClick(message)}
          >
            <div
              className={`w-full max-w-[95%] sm:max-w-xl md:max-w-2xl px-4 py-3 rounded-2xl shadow-sm ${
                message.type === "user"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-[#1f1f1f] text-white border border-white/10"
              }`}
            >
              <div
                className="prose prose-invert max-w-none text-sm md:text-base break-words
                  prose-p:my-3
                  prose-pre:bg-[#1e1e1e] prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4
                  prose-code:text-pink-400 prose-code:bg-transparent
                  prose-code:before:hidden prose-code:after:hidden
                  prose-li:my-1 prose-strong:text-white prose-pre:overflow-x-auto"
              >
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  remarkPlugins={[remarkGfm]}
                >
                  {cleanMarkdown(message.text || "")}
                </ReactMarkdown>
              </div>

              <span className="text-xs opacity-40 mt-2 block text-right">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center text-sm text-white/60 mt-4">
            Thinking...
          </div>
        )}

        {/* Anchor to scroll into view */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatArea;
