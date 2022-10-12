import { AccountModel }  from './account.model';

export class UserModel {
    id!: string;
    fullname!: string;
    address!: string;
    email!: string;
    avatarUrl!: string;
    phone!: string;
    about!: string;
    yearOfBirth!: number;
    updatedAt!: Date;
    createdAt!: Date;
    account!: AccountModel;
}
