import { IDatePickerStyles, IDropdownStyles, mergeStyles } from "office-ui-fabric-react";

export const datePickerStyles: Partial<IDatePickerStyles> = {
    root: {
        padding: '0px',
        fontFamily: 'Raleway',
        marginTop: '20px',
        marginLeft:'26vw',
        width: '300px'
    },
    textField: {
        selectors: {
            '.ms-TextField-fieldGroup': {
                background: 'transparent',
                fontFamily:'Raleway',
            },
            '.ms-TextField-field': {
                fontFamily: 'Raleway',
            },
            '.ms-Label': { fontFamily: 'Raleway' },
        },
    },
    callout: {
        fontFamily: 'Raleway',
    },
};

export const chartDivClassName : string = mergeStyles({
    marginLeft: '26vw',
    marginTop: '5vh',
    minWidth: '30px',
    minHeight: '1px',
    maxWidth: '60vw',
    width: '60vw'
});

export const  fieldsContainerClassName: string = mergeStyles({
    display: 'flex',
    columnGap: '10vw',
    //marginLeft: '24vw',
    marginTop: '5vh'
});  

export const dropdownStyles: Partial<IDropdownStyles> = {
    root: {
        // paddingBottom: '5%',
        marginTop: '20px'
    },
    dropdown: {
        selectors: {
            '.ms-Dropdown-title': {
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid black',
                fontFamily: 'Raleway'
            }
        }
    },
    dropdownOptionText: {
        fontFamily: 'Raleway'
    }
};