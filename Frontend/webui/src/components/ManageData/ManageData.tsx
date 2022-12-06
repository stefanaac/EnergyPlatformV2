import { DefaultButton, IIconProps, MarqueeSelection } from "office-ui-fabric-react";
import { NAVBAR_BACKGROUND_COLOR } from "../../library/constants";
import { buttonsDivStyles, buttonStyles, dataListDivStyles, dataListStyles, manageDataContainerClassName, manageDataTitleLineStyles, manageDataTitleStyles } from "./ManageDataStyles";
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    IColumn,
    IDetailsList,
    IObjectWithKey
} from 'office-ui-fabric-react/lib/DetailsList';
import React from "react";

const ManageData = () => {
    const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = React.useState<boolean>(true);

    const addDataButtonProps: IIconProps = {
        iconName: 'Add', styles: {
            root: { fontSize: '40px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
        }
    };

    const deleteDataButtonProps: IIconProps = {
        iconName: 'RemoveFromTrash', styles: {
            root: { fontSize: '40px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
        }
    };

    const updateDataButtonProps: IIconProps = {
        iconName: 'Edit', styles: {
            root: { fontSize: '40px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
        }
    };

    const getDataButtonProps: IIconProps = {
        iconName: 'Timer', styles: {
            root: { fontSize: '40px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
        }
    };

    const items = [{ "device": "test1", "timestamp": "admin", "energyConsumption": "100" },
    { "device": "test2", "timestamp": "admin", "energyConsumption": "20"},
    { "device": "test3", "timestamp": "admin", "energyConsumption": "100"}
    ];

    const columns = [
        { key: 'device', name: 'device', fieldName: 'device', minWidth: 100, maxWidth: 450, isResizable: true },
        { key: 'timestamp', name: 'timestamp', fieldName: 'timestamp', minWidth: 100, maxWidth: 250, isResizable: true },
        { key: 'energyConsumption', name: 'energyConsumption', fieldName: 'energyConsumption', minWidth: 100, maxWidth: 250, isResizable: true }
    ];
    const [selection] = React.useState(() => new Selection({
        onSelectionChanged: () => {
            const selectionItems: IObjectWithKey[] = selection.getSelection();
            setIsDeleteButtonDisabled(selectionItems.length === 0);
        }
    }));

    const renderItemColumn = (item: any, index?: number, column?: any): React.ReactNode => {
        switch (column.key) {
            case 'device':
                return item.device;
            case 'timestamp':
                return item.timestamp;
            case 'energyConsumption':
                return item.energyConsumption;
            default:
                return item[column.key];
        }

    };

    return (
        <div className={manageDataContainerClassName}>
            <h1 style={manageDataTitleStyles}>Manage Data</h1>
            <hr style={manageDataTitleLineStyles} />
            <div style={buttonsDivStyles}>
                <DefaultButton
                    styles={buttonStyles}
                    iconProps={addDataButtonProps}
                // onClick={addUser}
                >
                    Add Data
                </DefaultButton>
                <DefaultButton
                    styles={buttonStyles}
                    iconProps={updateDataButtonProps}
                >
                    Update Data
                </DefaultButton>

                <DefaultButton
                    styles={buttonStyles}
                    iconProps={deleteDataButtonProps}
                >
                    Delete Data
                </DefaultButton>

                <DefaultButton
                    styles={buttonStyles}
                    iconProps={getDataButtonProps}
                >
                    Get Data
                </DefaultButton>
            </div>
            <div style={dataListDivStyles}>
                <MarqueeSelection selection={selection}>
                    <DetailsList
                        compact={true}
                        items={items}
                        columns={columns}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        selection={selection}
                        styles={dataListStyles}
                        selectionPreservedOnEmptyClick={true}
                        onRenderItemColumn={renderItemColumn}
                        // onItemInvoked={this._onItemInvoked}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="select row"
                    />
                </MarqueeSelection>
            </div>
        </div>
    );
}

export default ManageData;