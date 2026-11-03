import { Model, Optional } from 'sequelize';
interface SessionAttribs {
    id: string;
    userId: string;
    context: object;
    taskType: string;
    createdAt?: Date;
    updatedAt?: Date;
}
type SessionCreation = Optional<SessionAttribs, 'context' | 'taskType'>;
export declare class Session extends Model<SessionAttribs, SessionCreation> implements SessionAttribs {
    id: string;
    userId: string;
    context: object;
    taskType: string;
}
export {};
//# sourceMappingURL=Session.d.ts.map