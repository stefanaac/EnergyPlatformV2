import { UserType } from "../enums/UserType";

export interface IUser {
    uid?: string|undefined;
    username: string|undefined;
    password: string|undefined;
};

export interface ILoginUser {
    username: string|undefined;
    password: string|undefined;
};