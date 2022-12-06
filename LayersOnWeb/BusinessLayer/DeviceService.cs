using BusinessLayer.Contracts;
using DataAccess;
using DataAccess.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class DeviceService : IDeviceService
    {
        private readonly IRepository repository;
        private readonly IUserService userService;

        public DeviceService(IRepository repository, IUserService userService)
        {
            this.repository = repository;
            this.userService = userService;
        }
        public void AddDeviceModel(DeviceModel device)
        {
            repository.Add(new DeviceEntity { Descripion = device.Descripion, Address = device.Address, MaximumHourlyConsumption=device.MaximumHourlyConsumption, UserId = device.UserId});
            repository.SaveChanges();
        }

        public bool DeleteDevice(DeviceModel device)
        {
            try
            {
                var item = repository.GetAll<DeviceEntity>().Where(x => x.Id == device.Id).FirstOrDefault();
                repository.Delete(item);
                repository.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return true;
            }
        }

        public List<DeviceModel> GetAllDevices()
        {
            List<DeviceModel> result = new List<DeviceModel>();
            foreach (var item in repository.GetAll<DeviceEntity>())
            {
                 result.Add(new DeviceModel { Id = item.Id, Descripion = item.Descripion, Address = item.Address, MaximumHourlyConsumption = item.MaximumHourlyConsumption, UserId = item.UserId });
            }
            return result;
        }

        public DeviceModel GetDeviceById(Guid id)
        {
            DeviceEntity item = repository.GetByGuid<DeviceEntity>(id);
            return new DeviceModel { Descripion = item.Descripion, Address = item.Address, MaximumHourlyConsumption = item.MaximumHourlyConsumption, UserId = item.UserId };
        }

        public List<DeviceModel> GetDevicesByUserId(string userId)
        {
            List<DeviceModel> result = new List<DeviceModel>();
            foreach (var x in repository.GetAll<DeviceEntity>())
            {
                if (x.UserId == Guid.Parse(userId))
                {
                    result.Add(new DeviceModel { Id = x.Id, Descripion = x.Descripion, Address = x.Address, MaximumHourlyConsumption = x.MaximumHourlyConsumption, UserId = x.UserId });

                }
            }
            return result;
        }

        public bool UpdateDevice(DeviceModel device)
        {
            try
            {
                var item = repository.GetAll<DeviceEntity>().Where(x => x.Id == device.Id).FirstOrDefault() ;
                if(device.Descripion != null)
                {
                    item.Descripion = device.Descripion;
                }
                if(device.Address != null)
                {
                    item.Address = device.Address; 
                }
                if (device.MaximumHourlyConsumption != null)
                {
                    item.MaximumHourlyConsumption = device.MaximumHourlyConsumption;
                }
                if (device.UserId != null)
                {
                    item.UserId = device.UserId;
                }
                repository.Update<DeviceEntity>(item);
                repository.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return true;
            }
        }
    }
}
