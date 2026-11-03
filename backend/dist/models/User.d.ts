import { Model, Optional } from 'sequelize';
interface UserAttribs {
    id: string;
    name: string;
    level: string;
    xp: number;
    streak: number;
    lastSeen: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
type UserCreation = Optional<UserAttribs, 'xp' | 'streak' | 'lastSeen'>;
export declare class User extends Model<UserAttribs, UserCreation> implements UserAttribs {
    id: string;
    name: string;
    level: string;
    xp: number;
    streak: number;
    lastSeen: Date;
    createdAt: Date;
    updatedAt: Date;
}
export {};
//# sourceMappingURL=User.d.ts.map