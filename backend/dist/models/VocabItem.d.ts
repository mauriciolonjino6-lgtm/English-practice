import { Model, Optional } from 'sequelize';
interface VocabAttribs {
    id: string;
    userId: string;
    word: string;
    meaning: string;
    example: string;
    sessionId: string;
    createdAt?: Date;
}
type VocabCreation = Optional<VocabAttribs, 'id'>;
export declare class VocabItem extends Model<VocabAttribs, VocabCreation> implements VocabAttribs {
    id: string;
    userId: string;
    word: string;
    meaning: string;
    example: string;
    sessionId: string;
}
export {};
//# sourceMappingURL=VocabItem.d.ts.map