export class MessageModel {
    messageId!: string;
    conversationId!: string;
    createdAt!: Date;
    content!: string;
    type!: string;
    fromUserId!: string;
    description!: string;
}