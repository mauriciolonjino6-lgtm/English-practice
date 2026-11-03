import { Model, Optional } from 'sequelize';
interface SRSCardAttribs {
    id: string;
    userId: string;
    front: string;
    back: string;
    example: string;
    easeFactor: number;
    interval: number;
    repetitions: number;
    nextReview: Date;
    sourceError: string;
    createdAt?: Date;
    updatedAt?: Date;
}
type SRSCreation = Optional<SRSCardAttribs, 'id' | 'easeFactor' | 'interval' | 'repetitions' | 'nextReview' | 'sourceError'>;
export declare class SRSCard extends Model<SRSCardAttribs, SRSCreation> implements SRSCardAttribs {
    id: string;
    userId: string;
    front: string;
    back: string;
    example: string;
    easeFactor: number;
    interval: number;
    repetitions: number;
    nextReview: Date;
    sourceError: string;
}
export {};
//# sourceMappingURL=SRSCard.d.ts.map