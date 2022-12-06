import { IDeviceModel } from "../../models/IDeviceModel"

export interface EditDeviceProps {
    device: IDeviceModel | null | undefined,
    onDeviceSave: (device: IDeviceModel) => void,
    handleCloseDialog: () => void,
    isOpen: boolean
};