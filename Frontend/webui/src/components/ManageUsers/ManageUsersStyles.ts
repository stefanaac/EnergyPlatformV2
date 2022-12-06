import { IButtonStyles, IDetailsListStyles, mergeStyles } from "office-ui-fabric-react";
import { NAVBAR_BACKGROUND_COLOR, PAGE_BACKGROUND_COLOR } from "../../library/constants";

export const manageUsersContainerClassName: string = mergeStyles({
    backgroundColor: PAGE_BACKGROUND_COLOR,
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%'
});

export const manageUsersTitleStyles = {
    marginLeft: '24vw',
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    marginTop: '7vh',
    height: '56px',
    fontWeight: '700',
    fontSize: '54px',
    lineHeight: '75px',
    color: NAVBAR_BACKGROUND_COLOR
};

export const manageUsersTitleLineStyles = {
    background: NAVBAR_BACKGROUND_COLOR,
    marginLeft: '24vw',
    color: NAVBAR_BACKGROUND_COLOR,
    height: '1px',
    width: '1020px',
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '2vh'
};


export const buttonListStyles: Partial<IButtonStyles> = {
    root:{
        display: 'flex',
        width: '230px',
        height: '30px',
        background: NAVBAR_BACKGROUND_COLOR,
        color: PAGE_BACKGROUND_COLOR,
        boxShadow: 'black',
        textShadow: 'black',
        borderRadius: '30px',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: '200',
        letterSpacing: '1px',
        fontSize: '20px',
        align: 'center'
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

export const buttonStyles: Partial<IButtonStyles> = {
    root:{
        display: 'flex',
        width: '230px',
        height: '50px',
        background: NAVBAR_BACKGROUND_COLOR,
        color: PAGE_BACKGROUND_COLOR,
        boxShadow: 'black',
        textShadow: 'black',
        borderRadius: '30px',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: '200',
        letterSpacing: '1px',
        fontSize: '20px',
        align: 'center'
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

export const buttonsDivStyles = {
    display: 'flex',
    width: '1020px',
    columnGap: '10px',
    marginLeft: '400px',
    marginTop: '20px'
};

export const usersListDivStyles = {
    marginLeft: '25vw',
    marginTop: '5vh',
    minWidth: '30px',
    minHeight: '1px',
    maxWidth: '60vw',
    width: '60vw'
};

export const userListStyles: Partial<IDetailsListStyles> = {
    root: {
        backgroundColor: PAGE_BACKGROUND_COLOR,
        overflow: 'hidden',
        selectors: {
            '.ms-Viewport': {
                left: '10%',
                minWidth: '1px',
                minHeight: '1px',
                maxWidth: '100vw',
                width: '10vw'
            }
        }
    },
    focusZone: {
        selectors: {
            '.ms-DetailsRow': {
                backgroundColor: PAGE_BACKGROUND_COLOR,
                
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontSize: '24px',
                fontWeight: '300',
                ':hover': {
                    backgroundColor: 'white'
                }
            },
            '.ms-GroupHeader-title': {
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontSize: '24px',
                fontWeight: '300'
            },
            '.headerCount-152': {
                fontSize: '24px',
            }
        }
    },
    headerWrapper: {
        selectors: {
            '.ms-DetailsHeader': {
                backgroundColor: PAGE_BACKGROUND_COLOR,
            },
            '.ms-DetailsHeader-cellName': {
                fontFamily: 'Raleway',
                fontStyle: 'normal',
                fontSize: '24px',
                fontWeight: '800'
            }
        }
    }
};