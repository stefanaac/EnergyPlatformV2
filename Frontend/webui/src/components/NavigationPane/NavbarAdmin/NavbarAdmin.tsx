import { DefaultButton, IconButton, IIconProps, initializeIcons, TooltipHost } from "office-ui-fabric-react";
import { NavigateFunction, useNavigate } from "react-router";
import { MANAGE_DATA_PATH, MANAGE_DEVICES_PATH, MANAGE_USERS_PATH, NAVBAR_BACKGROUND_COLOR } from "../../../library/constants";
import { buttonStyles, logoutButtonStyles, navbarClassName } from "../NavbarStyles";

initializeIcons();

const usersIcon: IIconProps = {
  iconName: 'FabricUserFolder', styles: {
    root: { fontSize: '70px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
  }
};

const usersIcon2: IIconProps = {
  iconName: 'Devices3', styles: {
    root: { fontSize: '70px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
  }
};

const usersIcon3: IIconProps = {
  iconName: 'Timer', styles: {
    root: { fontSize: '70px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
  }
};

export const NavbarAdmin = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const logout = () =>{
    (async () => {
        const rawResponse = await fetch('https://localhost:5001/api/Users/Logout', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        
      })();
      navigate('/');
  };

  return (
    <nav className={navbarClassName}>
      <IconButton onClick={() => navigate(MANAGE_USERS_PATH)}styles={buttonStyles} iconProps={usersIcon} />
      <IconButton onClick={() => navigate(MANAGE_DEVICES_PATH)}  styles={buttonStyles} iconProps={usersIcon2} />
      <IconButton onClick={() => navigate(MANAGE_DATA_PATH)}  styles={buttonStyles} iconProps={usersIcon3} />
      <DefaultButton  onClick={logout} styles={logoutButtonStyles} text="Log Out"/>
    </nav>
  )
}; 