import { NAVBAR_BACKGROUND_COLOR, PAGE_BACKGROUND_COLOR } from "../../library/constants";
import {IButtonStyles, IDropdownStyles, ILabelStyles, IModalStyles, ITextFieldStyles, mergeStyleSets } from "office-ui-fabric-react";

export const modalStyles: Partial<IModalStyles> = {
    scrollableContent: {
        overflowY: "hidden"
    }
};

export const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
        width: '400px',
        height: "auto",
        background: PAGE_BACKGROUND_COLOR,
        border: '1px solid ' + 'black',
        borderRadius: '15px',
        fontFamily: 'Raleway',
        minHeight: "460px"
    },
    header: [
        {
            display: 'block',
            alignItems: 'center',
            padding: '12px 12px 14px 24px'
        }
    ],
    body: {
        flex: '4 4 auto',
        display: 'flex',
        flexFlow: 'column',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        margin: "auto",
        width: "75%",
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 }
        }
    },
    title: {
        color: NAVBAR_BACKGROUND_COLOR,
        marginBottom: "5%",
        fontSize: "24px",
        textAlign: 'center'
    },
    footer: {
        display: 'flex',
        alignSelf: 'bottom'
    },
    serverError: {
        color: 'red',
        textAlign: 'center'
    }
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: 'black',
        marginLeft: "90%"
    },
    rootHovered: {
        color: 'black'
    }
};

export const labelStyles: Partial<ILabelStyles> = {
    root: {
        fontFamily: 'Raleway'
    }
};

export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        paddingBottom: '5%',
    },
    field: {
        backgroundColor: PAGE_BACKGROUND_COLOR
    },
    fieldGroup: {
        fontFamily: 'Raleway'
    }
};

export const dropdownStyles: Partial<IDropdownStyles> = {
    root: {
        paddingBottom: '5%',
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

export const buttonStyles: Partial<IButtonStyles> = {
    root:{
        display: 'flex',
        width: '230px',
        height: '50px',
        background: NAVBAR_BACKGROUND_COLOR,
        color: 'white',
        boxShadow: 'black',
        textShadow: 'black',
        borderRadius: '30px',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: '200',
        letterSpacing: '1px',
        fontSize: '20px',
        textAlign: 'center'
    },
    label: {
        fontWeight: '200',
    },
    rootHovered: {
        background: NAVBAR_BACKGROUND_COLOR,
        color: PAGE_BACKGROUND_COLOR,
        boxShadow: '0px 2px 10px ' + NAVBAR_BACKGROUND_COLOR
    },
    // rootDisabled: {
    //     background: DISABLED_BACKGROUND_COLOR,
    //     color: BACKGROUND_COLOR
    // },
    rootPressed: {
        background: NAVBAR_BACKGROUND_COLOR,
        color: PAGE_BACKGROUND_COLOR,
        boxShadow: '0px 2px 10px ' + NAVBAR_BACKGROUND_COLOR
    }
};