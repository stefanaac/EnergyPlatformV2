import { DefaultButton, Dropdown, IconButton, IDropdownOption, IIconProps, Label, ResponsiveMode, TextField } from "office-ui-fabric-react"
import {buttonStyles, contentStyles, dropdownStyles, iconButtonStyles, labelStyles, modalStyles, textFieldStyles} from  "./AddUserPopupStyles";
import { Modal } from '@fluentui/react';import React from "react"
import { EditUserProps } from "./AddUserPopup.types";
import { IsModified } from "../../library/types";
import { IUser } from "../../models/IUser";
import { IRole } from "../../models/IRoleModel";

const AddUserPopup = (props: EditUserProps) => {

    const cancelIcon: IIconProps = { iconName: 'Cancel' };
    const options: IDropdownOption[] = [
        { key: 1, text: 'Admin' },
        { key: 2, text: 'User' },
    ];

    let initialUsername: string|undefined;
    let initialPassword: string|undefined;
    let initialId: string|undefined;
   
    if (props.user === null) {
        initialUsername= "";
        initialPassword="";
        initialId = "00000000-0000-0000-0000-000000000000";

    } else {
        initialId= props.user?.uid;
        initialUsername = props.user?.username;
        initialPassword = props.user?.password;

    }
    const [isShown, setIsSHown] = React.useState(false); 
    const [id, setId] = React.useState<string | undefined>(initialId);
    const [roles,setRoles] = React.useState<IRole[]>([]);
    const [actualRole, setActualRole] = React.useState<IRole>();
    const [username, setUsername] = React.useState<string|undefined>(initialUsername);
    const [password, setPassword] = React.useState<string|undefined>(initialPassword);
    const [isModified, setIsModified] = React.useState<IsModified<'Username'|'Password'>>(
        {
            Username: false,
            Password: false
        }
    );

    const getRoles = () => {
        (async () => {
            await fetch('https://localhost:5001/api/Users/Roles', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then((response) => response.json()).then((respponseJson) => {
                if (respponseJson !== null) {
                    respponseJson.forEach((element: IRole) => {
                        if (roles !== undefined) {
                            roles.push(element);
                        }
                    });
                }
            }).catch((error) => {
                console.log("Error fetching the role data");
            });
        })();
        setRoles(roles);
    };

    React.useEffect(() => {
        setUsername(initialUsername);
        setId(initialId);
        getRoles();
    }, []);

    const handleUsernameNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        let value: string = newValue!;
        setUsername(value);
        setIsModified(
            prevModified => {
                return {
                    ...prevModified,
                    Name: true
                };
            }
        );
    };

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        let value: string = newValue!;
        setPassword(value);
        setIsModified(
            prevModified => {
                return {
                    ...prevModified,
                    Name: true
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
        return isModified.Username;
    };

    const addUser = (): void => {
        const roles: IRole[]=  [ {
            uid: "319b428c-d102-4a03-ad49-5f35361fd9a4",
            name: "User",
            normalizedName: "USER",
            concurrencyStamp: "6ecf8b9c-8f26-48e2-892a-53807f215bc6"
          }];
        (async () => {
            const rawResponse = await fetch('https://localhost:5001/api/Users/Register', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify({username: username,password: password, roles:roles})
            });
            const content = await rawResponse.json();
          })();
    };

    const updateUser = (): void => {
        alert("The user will be updated, refresh the page to see the results");
        const user: IUser = {
            uid: id,
            username: username,
            password:password
        };
         (async () => {
            const rawResponse = await fetch(`https://localhost:5001/api/Users/UpdateUser/${user.uid}/${user.username}`, {
              method: 'PUT',
              headers: {
                'Accept': 'text/plain',
                'Content-Type': 'text/plain'
              },
              credentials: 'include'
            });
            const content = await rawResponse.json();
          })();
    };

    const handleSubmit = (): void => {
        if (props.user === null) addUser();
        else updateUser();
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
                        {(props.user === null) ? "Add" : "Edit"} {"User"}
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
                     <Label styles={labelStyles}>USERNAME</Label>
                    <TextField
                        borderless={true}
                        underlined
                        styles={textFieldStyles}
                        type="text"
                        onChange={handleUsernameNameChange}
                    />  
                    <Label styles={labelStyles}>PASSWORD</Label>
                    <TextField
                        borderless={true}
                        underlined
                        styles={textFieldStyles}
                        type="text"
                        onChange={handlePasswordChange}
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