import { MarqueeSelection } from "office-ui-fabric-react";
import React from "react";
import {} from "../../library/constants";
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    IObjectWithKey
} from 'office-ui-fabric-react/lib/DetailsList';
import { IDeviceModel } from "../../models/IDeviceModel";
import { deviceListDivStyles, deviceListStyles, manageDevicesContainerClassName, manageDevicesTitleLineStyles, manageDevicesTitleStyles } from "../ManageDevices/ManageDevicesStyles";

const ManageMyDevices = () => {
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

    const [isShown, setIsShown] = React.useState<boolean>(false);

    const columns = [
        { key: 'device', name: 'deviceId', fieldName: 'deviceId', minWidth: 100, maxWidth: 250, isResizable: true },
        { key: 'address', name: 'address', fieldName: 'address', minWidth: 100, maxWidth: 250, isResizable: true },
        { key: 'maxHConsumption', name: 'maxHConsumption', fieldName: 'maxHConsumption', minWidth: 100, maxWidth: 250, isResizable: true }
    ];

    const [selection] = React.useState(() => new Selection({
        onSelectionChanged: () => {
            const selectionItems: IObjectWithKey[] = selection.getSelection();
        }
    }));

    const getDevices = () => {
        const user =localStorage.getItem('user');
        setIsShown(prev => !prev);
        console.log(user);
        if (user !== null){
            (async () => {
                await fetch(`https://localhost:5001/Device/GetDeviceByUserID/${user}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'text/plain'
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
        }
        setDevices(devices);
        console.log(devices);
    };

    React.useEffect(() => {
        getDevices();
    
    }, []);

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
            default:
                return item[column!.key as keyof IDeviceModel];
        }

    };

    return (
        <div className={manageDevicesContainerClassName}>
            <h1 style={manageDevicesTitleStyles}>My Devices</h1>
            <hr style={manageDevicesTitleLineStyles} />
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
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="select row"
                    />
                </MarqueeSelection>
            </div>}
           

        </div>
    );
}

export default ManageMyDevices;