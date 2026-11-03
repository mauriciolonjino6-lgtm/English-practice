export interface AIMessageItem {
    role: 'user' | 'assistant';
    content: string;
}
export interface AIResponse {
    message: string;
    correction: {
        hasError: boolean;
        original: string;
        corrected: string;
        explanation: string;
        rule: string;
    };
    vocabulary: {
        word: string;
        meaning: string;
        example: string;
    }[];
    taskStatus: 'ongoing' | 'completed';
}
export declare function processChat(userInput: string, history: AIMessageItem[]): Promise<AIResponse>;
export declare function transcribeAudio(audioBuffer: Buffer): Promise<string>;
//# sourceMappingURL=ai.service.d.ts.map