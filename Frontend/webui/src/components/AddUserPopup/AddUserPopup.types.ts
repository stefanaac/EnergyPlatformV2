import { IUser } from "../../models/IUser"

export interface EditUserProps {
    user: IUser | null,
    onUserSave: (user: IUser) => void,
    handleCloseDialog: () => void,
    isOpen: boolean
};