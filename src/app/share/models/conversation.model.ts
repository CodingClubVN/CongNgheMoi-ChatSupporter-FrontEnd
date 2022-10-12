import { UserModel } from './user.model';
export class ConversationModel {
    id!: string;
    conversationName!: string;
    user!: UserModel[];
    lastMessage!: string;
    readStatus!: Object[];
    createdAt!: Date;
    updatedAt!: Date;
}
