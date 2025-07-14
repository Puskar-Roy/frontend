// types/recap.ts

export interface RecapSessionRequestBody {
  sessionId: string;
  includeQuiz?: boolean;
}

export interface RecapSessionSuccessResponse {
  recapId: string;
  sessionId: string;
  recap: string;
  quizIncluded: boolean;
}

export interface RecapDocument {
  _id: string;
  sessionContent: string;
  recap: string;
  quizIncluded: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type GetAllRecapsResponse = RecapDocument[];

export interface ErrorResponse {
  error: string;
  details?: string;
}
