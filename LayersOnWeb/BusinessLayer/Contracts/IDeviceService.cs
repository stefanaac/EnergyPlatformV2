using System;
using System.Collections.Generic;


namespace BusinessLayer.Contracts
{
    public interface IDeviceService
    {
        List<DeviceModel> GetAllDevices();
        void AddDeviceModel(DeviceModel device);

        bool DeleteDevice(DeviceModel device);

        bool UpdateDevice(DeviceModel device);

        public DeviceModel GetDeviceById(Guid id);

        public List<DeviceModel> GetDevicesByUserId(string userId);

    }
}
