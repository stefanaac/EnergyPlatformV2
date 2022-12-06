import { IButtonStyles, ILabelStyles, ITextFieldStyles, mergeStyles } from "office-ui-fabric-react";
import { NAVBAR_BACKGROUND_COLOR, PAGE_BACKGROUND_COLOR } from "../../library/constants";

export const loginPageContainerClassName: string = mergeStyles({
    backgroundColor:PAGE_BACKGROUND_COLOR,
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
});

export const loginFormContainerClassName: string = mergeStyles({
    marginTop:'200px',
    marginLeft:'600px'
});

export const iconContainerClassName: string = mergeStyles({
    borderRadius:'100px',
    backgroundColor:NAVBAR_BACKGROUND_COLOR,
    width:'200px',
    height:'200px',
    color:'white',
    marginLeft:'50px'
});

export const iconStyles: Partial<ILabelStyles> = {
    root: {
        width:'100px',
        height:'100px',
        fontSize:'150px',
        marginLeft:'30px',
        marginTop:'20px'
    }
};

export const controlsContainerClassName: string = mergeStyles({
     display: 'flex'
});

export const inputTextStyle: Partial<ITextFieldStyles> = {
    fieldGroup: {
        width: "200px",
        border: "0vh",
        borderBottom: '2px solid'+ NAVBAR_BACKGROUND_COLOR,
        outline: "none",
        marginLeft: "0px",
    },
    field: {
        fontWeight: "600",
        fontSize: "3vh",
        textAlign: 'center',
        color: NAVBAR_BACKGROUND_COLOR
    }
};

export const labelStyles: Partial<ILabelStyles> = {
    root: {
        padding: '0px',
        textAlign:'center',
        color:NAVBAR_BACKGROUND_COLOR,
        marginTop: '17px',
        marginRight: '8px',
        fontFamily: 'Raleway',
    }
};

export const buttonStyles: Partial<IButtonStyles> = {
    root: {
        background: NAVBAR_BACKGROUND_COLOR,
        borderRadius: '20px',
        color: 'white',
        border: 'none',
        marginTop:'30PX',
        marginLeft:'100px',
        width: '100px',
        height: '31px',
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