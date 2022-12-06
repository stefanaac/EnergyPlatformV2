import { DefaultButton, Dropdown, IconButton, IDropdownOption, IIconProps, Label, ResponsiveMode, TextField } from "office-ui-fabric-react"
import {buttonStyles, contentStyles, dropdownStyles, iconButtonStyles, labelStyles, modalStyles, textFieldStyles} from  "./AddDevicePopupStyles";
import { Modal } from '@fluentui/react';import React from "react"
import { EditDeviceProps} from "./AddDevicePopup.types";
import { IsModified } from "../../library/types";
import { IUser } from "../../models/IUser";
import { IDeviceModel } from "../../models/IDeviceModel";

const AddUserPopup = (props: EditDeviceProps) => {

    const cancelIcon: IIconProps = { iconName: 'Cancel' };

    let initialId: string|undefined;
    let initialDescription: string | undefined;
    let initialMaxConsumption: number | undefined ;
    let initialAddress: string | undefined;
    let initialUserId: string|undefined;

    if (props.device === null) {
        initialDescription = "";
        initialAddress= "";
        initialMaxConsumption = 0;
        initialUserId = "00000000-0000-0000-0000-000000000000";
        initialId = "00000000-0000-0000-0000-000000000000";
    }
    else{
        initialDescription = props.device?.description;
        initialAddress= props.device?.address;
        initialMaxConsumption = props.device?.maximumHourlyConsumption;
        initialUserId = props.device?.userId;
        initialId = props.device?.uid;
    }

    const [users,setUsers] = React.useState<IUser[]>([]);
    const [id, setId] = React.useState<string | undefined>(initialId);
    const [description, setDescription] = React.useState<string | undefined>(initialDescription);
    const [maxConsumption, setMaxConsumption] = React.useState<number | undefined>(initialMaxConsumption);
    const [address, setAddress] = React.useState<string | undefined>(initialAddress);    
    const [userId, setUserId] = React.useState<string|undefined>(initialUserId);
    const [isModified, setIsModified] = React.useState<IsModified<'Description' | 'Address' | 'UserId' | 'MaximumHourlyConsumption'>>(
        {
            Description: false,
            Address: false,
            UserId: false,
            MaximumHourlyConsumption: false
        }
    );

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

    React.useEffect(() => {
        setDescription(initialDescription);
        setMaxConsumption(initialMaxConsumption);
        setAddress(initialAddress);
        setUserId(initialUserId);
        setId(initialId);
        getUsers();
    }, []);

    const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        let value: string = newValue!;
        setDescription(value);
        const valueLength = value.trim().length;
        setIsModified(
            prevModified => {
                return {
                    ...prevModified,
                    Description: true
                };
            }
        );
    };

    const handleAddressChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        let value: string = newValue!;
        setAddress(value);
        const valueLength = value.trim().length;
        setIsModified(
            prevModified => {
                return {
                    ...prevModified,
                    Address: true
                };
            }
        );
    };
    
    const handleConsumptionChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        let value: number = Number(newValue!);
        setMaxConsumption(value);
        setIsModified(
            prevModified => {
                return {
                    ...prevModified,
                    MaximumHourlyConsumption: true
                };
            });
    };

    const handleUserIdChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        let value: string = newValue!;
        setUserId(value);

        setIsModified(
            prevModified => {
                return {
                    ...prevModified,
                    UserId: true
                };
            }
        );
    };

    const handleIdChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        let value: string = newValue!;
        setId(value);

        setIsModified(
            prevModified => {
                return {
                    ...prevModified,
                    UserId: true
                };
            }
        );
    };
    
    const isSaveButtonDisabled = (): boolean => {
        return (props.device === null)
            ?
            !(isModified.Description)
            :
            !(isModified.Description || isModified.Address || isModified.UserId || isModified.MaximumHourlyConsumption);
    };

    const addDevice = (): void => {
        const device: IDeviceModel = {
            description: description,
            address: address,
            maximumHourlyConsumption: maxConsumption,
            userId: userId
        };
        console.log("Device stringify"+device.userId +  device.address + device.description);

        (async () => {
            const rawResponse = await fetch('https://localhost:5001/Device/AddDevice', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({id: device.uid, 
                                    descripion: device.description, 
                                    address: device.address, 
                                    maximumHourlyConsumption: device.maximumHourlyConsumption, 
                                    userId:device.userId
                                })
            });
            const content = await rawResponse.json();
            if(content !== null){
                alert('Ok');
            }
          })();
    };

    const updateDevice = (): void => {
        const device: IDeviceModel = {
            uid: id,
            description: description,
            address: address,
            maximumHourlyConsumption: maxConsumption,
            userId: userId
        };
        console.log(device.uid);
         (async () => {
            const rawResponse = await fetch('https://localhost:5001/Device/UpdateDevice', {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify({id: device.uid, 
                descripion: device.description, 
                address: device.address, 
                maximumHourlyConsumption: device.maximumHourlyConsumption, 
                userId:device.userId
                })
            });
            const content = await rawResponse.json();
            if(content !== null){
                alert('The device will be updated!');
            }
          })();
    };

    const handleSubmit = (): void => {
        if (props.device === null) addDevice();
        else updateDevice();
    };

    return (
        <>
            <Modal
                isOpen={true}
                onDismiss={props.handleCloseDialog}
                isBlocking={true}
                containerClassName={contentStyles.container}
                styles={modalStyles}
            >
                <div className={contentStyles.header}>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="CLOSE"
                        onClick={props.handleCloseDialog}
                    />
                    <h3 className={contentStyles.title}>
                        {(props.device === null) ? "Add" : "Edit"} {"Device"}
                    </h3>
                </div>
                <div className={contentStyles.body}>
                <Label styles={labelStyles}>ID</Label>
                    <TextField
                        borderless={true}
                        underlined
                        styles={textFieldStyles}
                        type="text"
                        onChange={handleIdChange}
                    />
                    <Label styles={labelStyles}>DESCRIPTION</Label>
                    <TextField
                        borderless={true}
                        underlined
                        styles={textFieldStyles}
                        type="text"
                        onChange={handleDescriptionChange}
                    />
                    <Label styles={labelStyles}>ADDRESS</Label>
                    <TextField
                        borderless={true}
                        underlined
                        styles={textFieldStyles}
                        type="text"
                        onChange={handleAddressChange}
                    />
                     <Label styles={labelStyles}>MAX CONSUMPTION/h</Label>
                    <TextField
                        borderless={true}
                        underlined
                        styles={textFieldStyles}
                        type="text"
                        onChange={handleConsumptionChange}
                    />
                     <Label styles={labelStyles}>USER</Label>
                    <TextField
                        type="text"
                        borderless={true}
                        underlined
                        styles={textFieldStyles}
                        onChange={handleUserIdChange}
                    />
                   
                    <div className={contentStyles.footer}>
                        <DefaultButton
                            text="Save"
                            styles={buttonStyles}
                            onClick={handleSubmit}
                            disabled={isSaveButtonDisabled()}
                        />
                    </div>
                </div>
            </Modal>
            </>
    );
}

export default AddUserPopup;