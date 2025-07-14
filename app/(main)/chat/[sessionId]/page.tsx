"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import InputArea from "../../../../components/InputArea";
import ChatArea from "../../../../components/ChatArea";
import SummaryPopup from "../../../../components/SummaryPopup";
import MemoryWallPopup from "../../../../components/MemoryWallPopup";
import { ChatMessage, Role } from "../../../../types/api/chat";
import { useCreateChat } from "../../../../hooks/useCreateChat";
import { useFetchChatHistory } from "../../../../hooks/useFetchChatHistory";
import { useSendMessage } from "../../../../hooks/useSendMessage";
import { useAddMemory } from "../../../../hooks/useAddMemory"; // 1. Import the hook

export default function App() {
  const router = useRouter();
  const createNewChat = useCreateChat();
  const { sessionId } = useParams() as { sessionId: string };

  // --- Custom Hooks for API Logic ---
  const { messages, setMessages, isLoading: isLoadingHistory } = useFetchChatHistory(sessionId);
  const { sendMessage, isSending } = useSendMessage(sessionId);
  const { addMemory } = useAddMemory(); // 2. Get the addMemory function

  // --- Local UI State ---
  const [inputText, setInputText] = useState<string>('');
  const [showSummaryPopup, setShowSummaryPopup] = useState<boolean>(false);
  const [showMemoryWall, setShowMemoryWall] = useState<boolean>(false);
  const [currentSummary, setCurrentSummary] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    const initializeChat = async () => {
      if (!sessionId && !isLoadingHistory) {
        const newSessionId = await createNewChat();
        if (newSessionId) {
          router.push(`/chat/${newSessionId}`);
        } else {
          console.error("Failed to create a new chat session.");
        }
      }
    };
    initializeChat();
  }, [sessionId, createNewChat, router, isLoadingHistory]);

  const handleSendMessage = async (): Promise<void> => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput || isSending) return;

    const optimisticUserMessage: ChatMessage = {
      role: Role.user,
      parts: [{ text: trimmedInput }],
    };
    setMessages(prev => [...prev, optimisticUserMessage]);
    setInputText('');

    const fullHistory = await sendMessage(trimmedInput);
    if (fullHistory) {
      setMessages(fullHistory);

      const viewedSessionsJSON = localStorage.getItem('viewedSummaryPopups');
      const viewedSessions: string[] = viewedSessionsJSON ? JSON.parse(viewedSessionsJSON) : [];

      if (!viewedSessions.includes(sessionId)) {
        const originalDoubt = [...fullHistory].reverse().find(m => m.role === Role.user && m.parts?.[0]?.text === trimmedInput);
        
        if(originalDoubt){
          // FIX: Added optional chaining to safely access nested properties.
          const doubtText = originalDoubt.parts?.[0]?.text || '';
          setCurrentSummary(`You asked about "${doubtText.substring(0, 50)}..." and the AI responded.`);
          setShowSummaryPopup(true);
        }

        const updatedViewedSessions = [...viewedSessions, sessionId];
        localStorage.setItem('viewedSummaryPopups', JSON.stringify(updatedViewedSessions));
      }
    }
  };

  const handleAddToMemoryWall = async (message: ChatMessage) => {
    if (message.role !== Role.model) {
      alert("You can only add AI responses to the Memory Wall.");
      return;
    }

    // Safely access the text content
    const summaryText = message.parts?.[0]?.text || 'No content';

    const memoryData = {
      title: `AI Insight: ${summaryText.substring(0, 25)}...`,
      summary: summaryText,
      category: "AI Insight",
    };

    const newMemory = await addMemory(memoryData);

    if (newMemory) {
      setShowMemoryWall(true);
    } else {
      alert("Failed to save to Memory Wall.");
    }
  };
  
  const postToMemoryWallFromPopup = () => {
      const lastModelMessage = [...messages].reverse().find(m => m.role === Role.model);
      if(lastModelMessage){
        handleAddToMemoryWall(lastModelMessage);
      }
      setShowSummaryPopup(false);
  }

  const toggleRecording = (): void => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputText('What is the difference between mitosis and meiosis?');
      }, 2000);
    }
  };

  // The mapping function is no longer needed!
  const isLoading = isLoadingHistory || isSending;

  return (
    <div className="flex flex-col h-full">
      {/* 4. Pass the messages and the new handler directly to ChatArea */}
      <ChatArea 
        messages={messages.map((msg, idx) => ({
          id: (msg as any).id ?? idx.toString(),
          type: msg.role === Role.user ? "user" : "ai",
          text: msg.parts?.[0]?.text ?? "",
          timestamp: (msg as any).timestamp ?? Date.now(),
          ...msg // preserve any extra fields if needed
        }))}
        isLoading={isLoading} 
        onMessageDoubleClick={(legacyMsg) => {
          // Convert LegacyMessage back to ChatMessage shape as needed
          const chatMsg: ChatMessage = {
            role: (legacyMsg as any).role ?? ((legacyMsg.type === "user") ? Role.user : Role.model),
            parts: [{ text: legacyMsg.text }],
            ...(legacyMsg as any)
          };
          return handleAddToMemoryWall(chatMsg);
        }}
      />
      <InputArea
        inputText={inputText}
        setInputText={setInputText}
        handleSendMessage={handleSendMessage}
        toggleRecording={toggleRecording}
        isRecording={isRecording}
        isLoading={isLoading}
      />
      <SummaryPopup
        showSummaryPopup={showSummaryPopup}
        setShowSummaryPopup={setShowSummaryPopup}
        currentSummary={currentSummary}
        postToMemoryWall={postToMemoryWallFromPopup} // Use the new handler for the popup
      />
      <MemoryWallPopup
        showMemoryWall={showMemoryWall}
        setShowMemoryWall={setShowMemoryWall}
      />
    </div>
  );
}
