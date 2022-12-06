import { DefaultButton, IconButton, IIconProps, initializeIcons, TooltipHost } from "office-ui-fabric-react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { MANAGE_CLIENT_DATA_PATH, MANAGE_CLIENT_DEVICES_PATH, NAVBAR_BACKGROUND_COLOR } from "../../../library/constants";
import { buttonStyles, logoutButtonClientStyles, navbarClassName } from "../NavbarStyles";


initializeIcons();
const devicesIcon: IIconProps = {
  iconName: 'Devices3', styles: {
    root: { fontSize: '70px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
  }
};

const dataIcon: IIconProps = {
  iconName: 'Timer', styles: {
    root: { fontSize: '70px', color: 'white', background: NAVBAR_BACKGROUND_COLOR, }
  }
};

export const NavbarClient = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const logout = () => {
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
      <IconButton onClick={() => navigate(MANAGE_CLIENT_DEVICES_PATH)} styles={buttonStyles} iconProps={devicesIcon} />
      <IconButton onClick={() => navigate(MANAGE_CLIENT_DATA_PATH)} styles={buttonStyles} iconProps={dataIcon} />
      <DefaultButton onClick={logout} styles={logoutButtonClientStyles} text="Log Out" />
    </nav>
  )
}; 