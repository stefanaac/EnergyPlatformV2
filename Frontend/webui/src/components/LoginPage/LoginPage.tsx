import "./LoginPageStyles.ts"
import { TextField, DefaultButton, Label, Icon } from 'office-ui-fabric-react';
import { buttonStyles, labelStyles, inputTextStyle, loginPageContainerClassName, loginFormContainerClassName, controlsContainerClassName, iconContainerClassName, iconStyles } from "./LoginPageStyles"
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";

const LoginPage = () => {
    const [isShown, setIsSHown] = useState(false); //pt textfieldul de parola
    const [username, setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const login = () =>{
        (async () => {
            const rawResponse = await fetch('https://localhost:5001/api/Users/Login', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify({username: username,
                password: password})
            });
            const content = await rawResponse.json();
            console.log(content)
            localStorage.setItem("user", content.id);

            if(content.roles[0].roleName === 'User'){
                navigate('/Client');
            }
            else{
                navigate('/Admin');
            }
          })();
    };
    
    const handleUsernameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) : void =>{
        let value: string = newValue!;
        setUsername(value);
    };

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) : void=>{
        let value: string = newValue!;
        setPassword(value);
    };
    
    const navigate: NavigateFunction = useNavigate();

    return (
        <div className={loginPageContainerClassName}>
            <div className={loginFormContainerClassName}>
                <div className={iconContainerClassName}>
                    <Icon styles={iconStyles} iconName="FollowUser"></Icon>
                </div >
                <div className={controlsContainerClassName}>
                    <Label styles={labelStyles}>Username</Label>
                    <TextField  borderless={true} styles={inputTextStyle} onChange={handleUsernameChange} />
                </div>
                <div className={controlsContainerClassName}>
                    <Label styles={labelStyles}>Password</Label>
                    <TextField  type={isShown ? "text" : "password"} borderless={true} styles={inputTextStyle} onChange={handlePasswordChange} />
                </div>
                <DefaultButton styles={buttonStyles} type="submit" onClick={login}>Log In</DefaultButton>
            </div>
        </div>
    );
}

export default LoginPage;