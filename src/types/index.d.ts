declare global {
  interface IUser {
    _id: string;
    fullName: string;
    age: number;
    email: string;
    avatar: string;
    phone: number;
    address: string;
    role: IRole;
    targetScore: number;
  }

  interface IRole {
    _id: string,
    name: string,
    description?: string,
    permissions?: string[],
    createdBy: {
      _id: string,
      email: string
    },
  }

  interface PromptDto {
    writingId: string;
    title: string;
    description: string;
    content: string;
    minWords?: number;
    maxWords?: number;
    level?: string;
  }

  interface WritingFeedback {
    overallFeedback: string;
    grammarErrors: {
      original: string;
      correction: string;
      explanation: string;
    }[];
    vocabularySuggestions: {
      word: string;
      suggestion: string;
      reason: string;
    }[];
    structureFeedback: string;
    score: {
      grammar: number;
      vocabulary: number;
      coherence: number;
      taskResponse: number;
      overall: number;
    };
    improvedVersion?: string;
  }

}

export { };
