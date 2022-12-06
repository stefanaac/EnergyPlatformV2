

import { defaultDatePickerStrings } from "@fluentui/react";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { DatePicker, DayOfWeek, Dropdown, IDropdownOption, ResponsiveMode } from "office-ui-fabric-react";
import React from "react";
import { CartesianGrid, LineChart, XAxis, YAxis, Line } from "recharts";
import { IDeviceModel } from "../../models/IDeviceModel";
import { manageDataContainerClassName, manageDataTitleLineStyles, manageDataTitleStyles } from "../ManageData/ManageDataStyles";
import { chartDivClassName, datePickerStyles, dropdownStyles, fieldsContainerClassName } from "./ManageMyDataStyles";



const ManageMyData = () => {
    const defaultDevice: IDeviceModel = {
        uid: '00000000-0000-0000-0000-000000000000',
        address: '',
        description: '',
        maximumHourlyConsumption: 0,
        userId: '00000000-0000-0000-0000-000000000000'
    };
    const [myDevices, setMyDevices] = React.useState<IDeviceModel[]>([]);
    const [options, setOptions] = React.useState<IDropdownOption[]>([]);

    const getDevices = () => {
        const user =localStorage.getItem('user');
        console.log(user);
        if (user !== null){
            (async () => {
                await fetch(`https://localhost:5001/Device/GetDeviceByUserID/${user}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'text/plain'
                      },
                      credentials: 'include'
                }).then((response) => response.json()).then((respponseJson) => {
                    if (respponseJson !== null) {
                        respponseJson.forEach((element: IDeviceModel) => {
                            if (myDevices !== undefined) {
                                myDevices.push(element);
                            }
                        });
                    }
                }).catch((error) => {
                    console.log("Error fetching the data");
                });
            })();
        }
        setMyDevices(myDevices);
    };


    const getDeviceOptions= () =>{
        console.log(myDevices);
        myDevices.forEach((element: IDeviceModel)=> {
            console.log('Element' + element.uid!)
            let op:IDropdownOption = {key: element.uid!, text: element.uid!};
            if (op !== undefined) {
                options.push(op)
            } 
        });
        setOptions(options);
        console.log(options);
    }
    

    
    const days: IDropdownOption[] = [
        { text: 'Sunday', key: DayOfWeek.Sunday },
        { text: 'Monday', key: DayOfWeek.Monday },
        { text: 'Tuesday', key: DayOfWeek.Tuesday },
        { text: 'Wednesday', key: DayOfWeek.Wednesday },
        { text: 'Thursday', key: DayOfWeek.Thursday },
        { text: 'Friday', key: DayOfWeek.Friday },
        { text: 'Saturday', key: DayOfWeek.Saturday },
    ];

    React.useEffect(() => {
        getDevices();
        getDeviceOptions();
    }, []);

    
    
    const data = [{hour: '8:00', consumption: 2400},{hour: '9:00', consumption: 400},{hour: '10:00', consumption: 400}];

    return (
        <div className={manageDataContainerClassName}>
            <h1 style={manageDataTitleStyles}>Statistics</h1>
            <hr style={manageDataTitleLineStyles} />
            <div className={fieldsContainerClassName}>
            <DatePicker
                underlined        
                placeholder="Select a date..."
                ariaLabel="Select a date"
                strings={defaultDatePickerStrings}
                styles={datePickerStyles}
                //onSelectDate={handleStartMonthChange}
            />
            <Dropdown
                        options={options}
                        styles={dropdownStyles}
                        placeholder='Pick a device'
                        //onChange={handleRoleChange}
                        //defaultSelectedKey={role}
                        responsiveMode={ResponsiveMode.large}
            />
            </div>
            
            <div className={chartDivClassName}>
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="consumption" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="hour" />
                    <YAxis dataKey="consumption" />
            </LineChart>
            </div>
           


        </div>
    );
}

export default ManageMyData;