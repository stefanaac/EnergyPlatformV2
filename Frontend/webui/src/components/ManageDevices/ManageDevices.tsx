import { DefaultButton, IIconProps, MarqueeSelection } from "office-ui-fabric-react";
import React from "react";
import { NAVBAR_BACKGROUND_COLOR } from "../../library/constants";
import { buttonListStyles, buttonsDivStyles, buttonStyles, deviceListDivStyles, deviceListStyles, manageDevicesContainerClassName, manageDevicesTitleLineStyles, manageDevicesTitleStyles } from "./ManageDevicesStyles";
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    IObjectWithKey
} from 'office-ui-fabric-react/lib/DetailsList';
import { IDeviceModel } from "../../models/IDeviceModel";
import { IUser } from "../../models/IUser";
import AddDevicePopUp from "../AddDevicePopup/AddDevicePopUp";

const ManageDevices = () => {
    const defaultDevice: IDeviceModel = {
        uid: '00000000-0000-0000-0000-000000000000',
        address: '',
        description: '',
        maximumHourlyConsumption: 0,
        userId: '00000000-0000-0000-0000-000000000000'
    };
    const [isEditDevicePopupOpen, setIsEditDevicePopupOpen] = React.useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = React.useState<IDeviceModel | null| undefined>(defaultDevice);
    const [devices, setDevices] = React.useState<IDeviceModel[]>([]);
    const [isPageEdited, setIsPageEdited] = React.useState<boolean>(false);

    const [users, setUsers] = React.useState<IUser[]>([]);
    const [isShown, setIsShown] = React.useState<boolean>(false);

    

    const addUserButtonProps: IIconProps = {
        iconName: 'Add', styles: {
            root: { fontSize: '40px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
        }
    };

    const deleteUserButtonProps: IIconProps = {
        iconName: 'RemoveFromTrash', styles: {
            root: { fontSize: '40px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
        }
    };

    const updateUserButtonProps: IIconProps = {
        iconName: 'Edit', styles: {
            root: { fontSize: '20px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
        }
    };

    const getUsersButtonProps: IIconProps = {
        iconName: 'Devices3', styles: {
            root: { fontSize: '40px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
        }
    };

    const columns = [
        { key: 'device', name: 'deviceId', fieldName: 'deviceId', minWidth: 100, maxWidth: 250, isResizable: true },
        { key: 'address', name: 'address', fieldName: 'address', minWidth: 100, maxWidth: 250, isResizable: true },
        { key: 'maxHConsumption', name: 'maxHConsumption', fieldName: 'maxHConsumption', minWidth: 100, maxWidth: 250, isResizable: true },
        { key: 'userId', name: 'userId', fieldName: 'userId', minWidth: 100, maxWidth: 250, isResizable: true },
        { key: 'edit', name: '', fieldName: '', minWidth: 20, maxWidth: 25, isResizable: true }
    ];

    const [selection] = React.useState(() => new Selection({
        onSelectionChanged: () => {
            const selectionItems: IObjectWithKey[] = selection.getSelection();
        }
    }));

    const getUsers = () => {
        (async () => {
            await fetch('https://localhost:5001/api/Users/Users', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then((response) => response.json()).then((respponseJson) => {
                if (respponseJson !== null) {
                    respponseJson.forEach((element: IUser) => {
                        if (users !== undefined) {
                            users.push(element);
                        }
                    });
                }
            }).catch((error) => {
                console.log("Error fetching the user data");
            });
        })();
        setUsers(users);
    };

    const getDevices = () => {
        setIsShown(prev => !prev);
        getUsers();
        (async () => {
            await fetch('https://localhost:5001/Device', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then((response) => response.json()).then((respponseJson) => {
                if (respponseJson !== null) {
                    respponseJson.forEach((element: IDeviceModel) => {
                        if (devices !== undefined) {
                            devices.push(element);
                        }
                    });
                }
            }).catch((error) => {
                console.log("Error fetching the data");
            });
        })();
        setDevices(devices);
        console.log(devices);
    };

    React.useEffect(() => {
        getDevices();
        getUsers();
    }, []);

    const deleteDevice = () => {
        const selectedDevice = selection.getSelection() as any[];
        let deviceString: string = selectedDevice[0].id!;
        (async () => {
            await fetch('https://localhost:5001/Device/DeleteDevice', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({id: deviceString})
            })
            .catch((error) => {
                console.log("Error deleting the data");
            });
        })();
        setSelectedDevice(defaultDevice);
    };

    const handleDeleteDevice = () => {
        alert("The device will be deleted, refresh the page to see the results");
        deleteDevice();
    }

    const handleNewDeviceClick = (): void => {
        setIsEditDevicePopupOpen(true);
    };

    const handleEditDeviceClick = (event: any): void => {
        // const selectedItem = selection.getSelection() as any[];
        // let deviceString: string = selectedItem[0].id!;
        // let sel: IDeviceModel|undefined = devices.find((device: IDeviceModel) => device.uid === deviceString);
        // setSelectedDevice(sel);
        // console.log(selectedItem);
        // setIsEditDevicePopupOpen(true);
        setIsEditDevicePopupOpen(true);
        setSelectedDevice(devices.find((device: IDeviceModel) => device.uid === event.currentTarget.id)!);
    };

    const addDeviceModalClose = (newDevice: IDeviceModel): void => {
        setDevices([...devices, newDevice]);
    };

    const editDeviceModalClose = (newDevice: IDeviceModel): void => {
        const devicesList = [...devices];
        const result: IDeviceModel[] = devicesList.filter((device: IDeviceModel) => device.uid === newDevice.uid);
        result.forEach((element) => {
            element.uid = newDevice.uid;
            element.description = newDevice.description;
            element.address = newDevice.address;
            element.maximumHourlyConsumption = newDevice.maximumHourlyConsumption;
            element.userId = newDevice.userId;
        });
        setDevices(devicesList);
    };

    const insertOrUpdateDevice = (device: IDeviceModel): void => {
        if (selectedDevice === null) {
            addDeviceModalClose(device);
        }
        else {
            setIsPageEdited(true);
            editDeviceModalClose(device);
        }
        setIsEditDevicePopupOpen(false);
        setSelectedDevice(null);
    };

    const closeDialog = (): void => {
        setIsEditDevicePopupOpen(false);
        setSelectedDevice(null);
    };

    const renderItemColumn = (item: any, index?: number, column?: any): React.ReactNode => {
        switch (column.key) {
            case 'device':
                return item?.id;
            case 'description':
                return item?.description;
            case 'address':
                return item?.address;
            case 'maxHConsumption':
                return item?.maximumHourlyConsumption;
            case 'user':
                const user: IUser| undefined = users.find((u) => u.uid === item.userId);
                return user?.username;
            case 'edit':
                return (
                    <DefaultButton
                        text="Edit"
                        id={item.uid}
                        styles={buttonListStyles}
                        iconProps={updateUserButtonProps}
                        onClick={handleEditDeviceClick}
                    />
                );
            default:
                return item[column!.key as keyof IDeviceModel];
        }

    };

    return (
        <div className={manageDevicesContainerClassName}>
            <h1 style={manageDevicesTitleStyles}>Manage Devices</h1>
            <hr style={manageDevicesTitleLineStyles} />
            <div style={buttonsDivStyles}>
                <DefaultButton
                    styles={buttonStyles}
                    iconProps={addUserButtonProps}
                    onClick={handleNewDeviceClick}
                >
                    Add Device
                </DefaultButton>
                <DefaultButton
                    styles={buttonStyles}
                    iconProps={deleteUserButtonProps}
                    onClick={handleDeleteDevice}
                >
                    Delete Device
                </DefaultButton>
            </div>
            { isShown && <div style={deviceListDivStyles}>
                <MarqueeSelection selection={selection}>
                    <DetailsList
                        compact={true}
                        items={devices}
                        columns={columns}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        selection={selection}
                        styles={deviceListStyles}
                        selectionPreservedOnEmptyClick={true}
                        onRenderItemColumn={renderItemColumn}
                        // onItemInvoked={this._onItemInvoked}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="select row"
                    />
                </MarqueeSelection>
            </div>}
            {isEditDevicePopupOpen && 
                    <AddDevicePopUp
                        device={selectedDevice}
                        onDeviceSave={insertOrUpdateDevice}
                        handleCloseDialog={closeDialog}
                        isOpen={isEditDevicePopupOpen}
                    />
                }

        </div>
    );
}

export default ManageDevices;