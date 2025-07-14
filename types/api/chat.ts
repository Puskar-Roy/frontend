// types/chat.ts

// ===================================================================
// Core Data Structures
// ===================================================================

/**
 * Defines the possible roles in a chat conversation.
 */
export enum Role {
  user = "user",
  model = "model", // The AI model
}

/**
 * Represents a single part of a message, which is typically text.
 * The _id is optional as it's added by the backend database.
 */
export interface Part {
  text: string;
  _id?: string;
}

/**
 * Represents a single message in the chat history, aligned with the backend and Gemini API.
 * This is the primary type you should use for new components.
 * The _id is optional as it's added by the backend database.
 */
export interface ChatMessage {
  role: Role;
  parts: Part[];
  _id?: string;
}

/**
 * Represents a full chat session object, containing its ID and history.
 */
export interface ChatSessionType {
  sessionId: string;
  history: ChatMessage[];
}



/**
 * LEGACY TYPE: Represents the old message structure used by some components.
 * You can use this during the transition period. The goal is to update all
 * components to use `ChatMessage` instead.
 */
export interface Message {
    id: number;
    type: 'ai' | 'user';
    text: string;
    timestamp: string;
}


// ===================================================================
// API Request Body Types
// ===================================================================

/**
 * The shape of the request body for the `/api/summarize-doubt` endpoint.
 */
export interface SummarizeDoubtRequestBody {
  doubt: string;
  sessionId: string;
}

/**
 * The shape of the request body for continuing a chat or fetching the next part of a response.
 */
export interface NextChatRequestBody {
  sessionId: string;
}

// ===================================================================
// API Response Body Types
// ===================================================================

/**
 * The shape of a successful response from the `/api/summarize-doubt` endpoint.
 */
export interface SummarizeDoubtResponse {
  sessionId: string;
  originalDoubt: string;
  aiResponse: string;
  fullHistory: ChatMessage[];
}

/**
 * The shape of a successful response when creating a new chat.
 */
export interface NewChatResponse {
  sessionId: string;
  message: string;
}

/**
 * The shape of a successful response when fetching the history of a specific chat session.
 */
export interface ChatHistoryResponse {
  sessionId: string;
  history: ChatMessage[];
}

/**
 * The shape of a generic error response from any API endpoint.
 */
export interface ErrorResponse {
  error: string;
  details?: string;
}



export interface MemoryBase {
  title: string;
  summary: string;
  category: string;
}

export interface MemoryListItem extends MemoryBase{
  _id:string;
};

export interface Memory extends MemoryListItem {
  user: string; // The MongoDB _id of the user who owns the memory
  achieved: boolean;
  createdAt: string; // ISO date string from Mongoose timestamps
  updatedAt: string; // ISO date string from Mongoose timestamps
}

export type AddMemoryRequestBody=MemoryBase;

export type GetAllMemoriesResponse=MemoryListItem[];

export type AddMemoryResponse=Memory;