import { Dispatch, SetStateAction } from "react";

// ===================================================================
// Core Data Structures
// ===================================================================

/**
 * LEGACY TYPE: Represents the old, simple message structure.
 * The goal is to update components to use the more detailed `ChatMessage` type instead.
 */
export interface LegacyMessage {
  id: number;
  type: 'ai' | 'user';
  text: string;
  timestamp: string;
}

/**
 * Defines the structure for an item in the chat history list in the sidebar.
 */
export interface ChatHistoryItem {
  id: number;
  title: string;
  time: string;
  active: boolean;
}

// ===================================================================
// Component Prop Types
// ===================================================================

/**
 * Props for the Sidebar component.
 */
export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  handleNewChat: () => void;
  chatHistory: ChatHistoryItem[];
  handleRouteChange: (route: string) => void;
  activeRoute: string;
  handleSelectChat: (id: number) => void;
}

/**
 * Props for the Header component.
 */
export interface HeaderProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
}

/**
 * Props for the ChatArea component.P
 * It still uses the legacy message format for now.
 */
export interface ChatAreaProps {
  messages: LegacyMessage[];
  isLoading: boolean; // Added isLoading prop
  onMessageDoubleClick:(message: LegacyMessage) => void | Promise<void>;
}

/**
 * Props for the InputArea component.
 */
export interface InputAreaProps {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
  toggleRecording: () => void;
  isRecording: boolean;
  isLoading: boolean; // Added isLoading prop
}

/**
 * Props for the SummaryPopup component.
 */
export interface SummaryPopupProps {
  showSummaryPopup: boolean;
  setShowSummaryPopup: Dispatch<SetStateAction<boolean>>;
  currentSummary: string;
  postToMemoryWall: () => void;
}

/**
 * Props for the MemoryWallPopup component.
 */
export interface MemoryWallPopupProps {
  showMemoryWall: boolean;
  setShowMemoryWall: Dispatch<SetStateAction<boolean>>;
}