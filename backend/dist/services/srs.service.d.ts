import { SRSCard } from '../models';
export declare function sm2(grade: number, repetitions: number, easeFactor: number, interval: number): {
    repetitions: number;
    easeFactor: number;
    interval: number;
    nextReview: Date;
};
export declare function getDueCards(userId: string): Promise<SRSCard[]>;
export declare function applyReview(cardId: string, grade: number): Promise<SRSCard>;
export declare function createCardsFromVocab(userId: string, items: {
    word: string;
    meaning: string;
    example: string;
    sourceError?: string;
}[]): Promise<void>;
//# sourceMappingURL=srs.service.d.ts.map