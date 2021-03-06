import { Document } from "mongoose";
export declare enum Gender {
    Other = 0,
    Male = 1,
    Female = 2
}
export interface IUser extends Document {
    lastName?: string | null;
    firstName?: string | null;
    username?: string | null;
    email?: string | null;
    password?: string | any | null;
    status?: string | any | null;
    gender?: Gender;
    birthday?: string | null;
    phoneNumber?: string | null;
    avatar?: string | null;
    createdAt?: number | Date | string | null;
    updatedAt?: number | Date | string | null;
}
