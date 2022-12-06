import { IButtonStyles, ILabelStyles, mergeStyles } from "office-ui-fabric-react"
import { NAVBAR_BACKGROUND_COLOR } from "../../library/constants";

export const navbarClassName: string = mergeStyles({
    alignItems: 'center',
    backgroundColor: NAVBAR_BACKGROUND_COLOR,
    height: '100%',
    width: '100px', 
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column'
});

export const buttonStyles: Partial<IButtonStyles> = {
    root: {
        marginTop:'40px',
        borderRadius:'20px',
        background: NAVBAR_BACKGROUND_COLOR,
        color: NAVBAR_BACKGROUND_COLOR,
        border: 'none',
        width: '100px',
        height: '100px',
    },  
    rootHovered: {
        background: NAVBAR_BACKGROUND_COLOR,
        color: NAVBAR_BACKGROUND_COLOR
    }, 
    rootPressed: {
        background: NAVBAR_BACKGROUND_COLOR,
        color: NAVBAR_BACKGROUND_COLOR,
        boxShadow: '0px 2px 10px white'
    }
};

export const iconStyles: Partial<ILabelStyles> = {
    root: { 
        fontSize: '70px',
        color: 'white', 
        background: NAVBAR_BACKGROUND_COLOR
    }
};

export const logoutButtonStyles: Partial<IButtonStyles> = {
    root: {
        marginTop:'220px',
        fontSize: '16px',
        borderRadius:'20px',
        background: NAVBAR_BACKGROUND_COLOR,
        color: 'white',
        border: 'none',
        width: '100px',
        height: '60px',
    },  
    rootHovered: {
        background: NAVBAR_BACKGROUND_COLOR,
        color: 'white'
    }, 
    rootPressed: {
        background: NAVBAR_BACKGROUND_COLOR,
        color: NAVBAR_BACKGROUND_COLOR,
        boxShadow: '0px 2px 10px white'
    }
};

export const logoutButtonClientStyles: Partial<IButtonStyles> = {
    root: {
        marginTop:'350px',
        fontSize: '16px',
        borderRadius:'20px',
        background: NAVBAR_BACKGROUND_COLOR,
        color: 'white',
        border: 'none',
        width: '100px',
        height: '60px',
    },  
    rootHovered: {
        background: NAVBAR_BACKGROUND_COLOR,
        color: 'white'
    }, 
    rootPressed: {
        background: NAVBAR_BACKGROUND_COLOR,
        color: NAVBAR_BACKGROUND_COLOR,
        boxShadow: '0px 2px 10px white'
    }
};