import { DefaultButton,IIconProps, MarqueeSelection } from "office-ui-fabric-react";
import { NAVBAR_BACKGROUND_COLOR } from "../../library/constants";
import { buttonListStyles, buttonsDivStyles, buttonStyles, manageUsersContainerClassName, manageUsersTitleLineStyles, manageUsersTitleStyles, userListStyles, usersListDivStyles } from "./ManageUsersStyles";
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    IObjectWithKey
  } from 'office-ui-fabric-react/lib/DetailsList'; 
import React from "react";
import { IUser } from "../../models/IUser";
import AddUserPopup from "../AddUserPopup/AddUserPopUp";

const ManageUsers = () => {
    const defaultUser: IUser = {
        uid: '00000000-0000-0000-0000-000000000000',
        username: '',
        password:''
    };
    const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = React.useState<boolean>(true);
    const [users, setUsers] = React.useState<IUser[]>([]);   
    const [isEditUserPopupOpen, setIsEditUserPopupOpen] = React.useState<boolean>(false);
    const [selectedUser, setSelectedUser] = React.useState<IUser | null>(defaultUser);
    const [isPageEdited, setIsPageEdited] = React.useState<boolean>(false);

    const addUserButtonProps: IIconProps = { iconName: 'Add', styles: {
        root: { fontSize: '40px',color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
      } };

      const deleteUserButtonProps: IIconProps = { iconName: 'RemoveFromTrash', styles: {
        root: { fontSize: '40px',color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
      } };

      const updateUserButtonProps: IIconProps = { iconName: 'Edit', styles: {
        root: { fontSize: '20px',color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
      } };
      
      const [selection] = React.useState(() => new Selection({
        onSelectionChanged: () => {
            const selectionItems: IObjectWithKey[] = selection.getSelection();
            setIsDeleteButtonDisabled(selectionItems.length === 0);
        }
    }));

      const columns = [
        { key: 'userID', name: 'userID', fieldName: 'userID', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'username', name: 'username', fieldName: 'username', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'edit', name: '', fieldName: '', minWidth: 20, maxWidth: 5, isResizable: true }

    ];

    const handleNewUserClick = (): void => {
        setIsEditUserPopupOpen(true);
    };

    const handleEditUserClick = (event: any): void => {
        setIsEditUserPopupOpen(true);
        setSelectedUser(users.find((user: IUser) => user.uid === event.currentTarget.id)!);
    };

    const handleDeleteUser = () => {
        alert("The user will be deleted, refresh the page to see the results");
        deleteUser();
    }
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
        getUsers();
    }, []);

    const deleteUser = () => {
        const selectedDevice = selection.getSelection() as any[];
        let deviceString: string = selectedDevice[0].id!;
        console.log(deviceString);
        (async () => {
            await fetch(`https://localhost:5001/api/Users/DeleteuUser/${deviceString}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/plain'
                }
            })
            .catch((error) => {
                console.log("Error deleting the data");
            });
        })();
        setSelectedUser(defaultUser);
    };

    const renderItemColumn = (item: any, index?: number, column?: any): React.ReactNode => {
        switch (column.key) {
            case 'userID':
                return item?.id;
            case 'username':
                return item?.username;
            case 'edit':
                return (
                    <DefaultButton
                        text="Edit"
                        id={item.uid}
                        styles={buttonListStyles}
                        iconProps={updateUserButtonProps}
                        onClick={handleEditUserClick}
                    />
                );
            default:
                return item[column!.key as keyof IUser];
        }
    };

    const addUserModalClose = (newUser: IUser): void => {
        setUsers([...users, newUser]);
    };

    const editUserModalClose = (newUser: IUser): void => {
        const usersList = [...users];
        const result: IUser[] = usersList.filter((user: IUser) => user.uid === newUser.uid);
        result.forEach((element) => {
            element.uid = newUser.uid;
            element.username = newUser.username;
        });

        setUsers(usersList);
    };


     const insertOrUpdateUser = (user: IUser): void => {
        if (selectedUser === null) {
            addUserModalClose(user);
        }
        else {
            setIsPageEdited(true);
            editUserModalClose(user);
        }
        setIsEditUserPopupOpen(false);
        setSelectedUser(null);
    };

    const closeDialog = (): void => {
        setIsEditUserPopupOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className={manageUsersContainerClassName}>
             <h1 style={manageUsersTitleStyles}>Manage Users</h1>
                <hr style={manageUsersTitleLineStyles} />
                <div style={buttonsDivStyles}>
                <DefaultButton
                    styles={buttonStyles}
                    iconProps={addUserButtonProps}
                    onClick={handleNewUserClick}
                >
                    Add User
                </DefaultButton>

                <DefaultButton
                    styles={buttonStyles}
                    iconProps={deleteUserButtonProps}
                    onClick={handleDeleteUser}
                >
                    Delete User
                </DefaultButton>
                </div>
                <div style={usersListDivStyles}>
                    <MarqueeSelection selection={selection}>
                        <DetailsList
                            compact={true}
                            items={users}
                            columns={columns}
                            setKey="set"
                            layoutMode={DetailsListLayoutMode.justified}
                            selection={selection}
                            styles={userListStyles}
                            selectionPreservedOnEmptyClick={true}
                            onRenderItemColumn={renderItemColumn}
                            // onItemInvoked={this._onItemInvoked}
                            ariaLabelForSelectionColumn="Toggle selection"
                            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                            checkButtonAriaLabel="select row"
                        />
                    </MarqueeSelection>
                </div>  
                {isEditUserPopupOpen && (
                    <AddUserPopup
                        user={selectedUser}
                        onUserSave={insertOrUpdateUser}
                        handleCloseDialog={closeDialog}
                        isOpen={isEditUserPopupOpen}
                    />
                )}
        </div>
    );
}

export default ManageUsers;