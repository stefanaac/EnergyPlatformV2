import { NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import AddUserPopUp from './components/AddUserPopup/AddUserPopUp';
import ManageData from './components/ManageData/ManageData';
import ManageDevices from './components/ManageDevices/ManageDevices';
import ManageUsers from './components/ManageUsers/ManageUsers';
import LoginPage from './components/LoginPage/LoginPage';
import { NavbarAdmin } from './components/NavigationPane/NavbarAdmin/NavbarAdmin';
import { NavbarClient } from './components/NavigationPane/NavbarClient/NavbarClient';
import { MANAGE_CLIENT_DATA_PATH, MANAGE_CLIENT_DEVICES_PATH, MANAGE_DATA_PATH, MANAGE_DEVICES_PATH, MANAGE_USERS_PATH } from './library/constants';
import ManageMyDevices from './components/ManageMyDevices/ManageMyDevices';
import ManageMyData from './components/ManageMyData/ManageMyData';

function App() {
  const navigate: NavigateFunction = useNavigate();

  const getElement = (children: JSX.Element): JSX.Element => {
    return (children);
};

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={getElement(<LoginPage />)} />
        <Route path='/Admin' element={getElement(<NavbarAdmin />)} />
        <Route path='/Client' element={getElement(<NavbarClient />)} />
        <Route path={MANAGE_USERS_PATH} element={getElement(<><NavbarAdmin/><ManageUsers/></>)} />
        <Route path={MANAGE_DEVICES_PATH} element={getElement(<><NavbarAdmin/><ManageDevices/></>)} />
        <Route path={MANAGE_DATA_PATH} element={getElement(<><NavbarAdmin/><ManageData/></>)} />
        <Route path={MANAGE_CLIENT_DEVICES_PATH} element={getElement(<><NavbarClient/><ManageMyDevices/></>)} />
        <Route path={MANAGE_CLIENT_DATA_PATH} element={getElement(<><NavbarClient/><ManageMyData/></>)} />
      </Routes>
    </div>
  );
}

export default App;
