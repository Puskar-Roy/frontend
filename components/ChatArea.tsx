import React from "react";
import { ChatAreaProps } from "../types/chat";
import ReactMarkdown from "react-markdown";
// Component: ChatArea
// Renders the list of messages in the conversation.
const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading, onMessageDoubleClick }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`} onDoubleClick={() => onMessageDoubleClick(message)}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl ${message.type === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'}`}>
              {/*
                Key Changes:
                1. `[&_pre]:whitespace-pre-wrap`: This is the crucial fix. It's a Tailwind arbitrary variant that selects any `<pre>` element (which Markdown uses for code blocks) inside this div and applies `white-space: pre-wrap;`. This forces the code to wrap instead of overflowing the chat bubble.
                2. `break-words`: This class is kept to handle long, unbreakable strings in regular text.
                3. `prose` classes remain for general Markdown styling.
              */}
              <div className="text-sm md:text-base break-words [&_pre]:whitespace-pre-wrap prose prose-sm prose-invert max-w-none">
                <ReactMarkdown>
                  {message.text}
                </ReactMarkdown>
              </div>
              <span className="text-xs opacity-70 mt-2 block">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatArea;