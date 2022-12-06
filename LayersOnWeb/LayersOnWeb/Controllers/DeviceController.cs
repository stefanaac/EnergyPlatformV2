using BusinessLayer.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace LayersOnWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeviceController: ControllerBase
    {
        private readonly IDeviceService deviceService;
        public DeviceController(IDeviceService deviceService)
        {
            this.deviceService = deviceService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Authorize]
        public IEnumerable<Device> Get()
        {
            var result = new List<Device>();
            foreach (var item in deviceService.GetAllDevices())
            {
                result.Add(new Device { Id = item.Id, Descripion = item.Descripion, Address = item.Address, MaximumHourlyConsumption = item.MaximumHourlyConsumption, UserId = item.UserId });
            }
            return result;
        }

        [HttpPost("AddDevice")]
        [Authorize(Roles = "Admin,User")]
        [AllowAnonymous]
        public void Post(Device device)
        {
            DeviceModel dev = new DeviceModel { Descripion = device.Descripion, Address = device.Address, MaximumHourlyConsumption = device.MaximumHourlyConsumption, UserId = device.UserId };
            deviceService.AddDeviceModel(dev);
        }

        [Authorize(Roles = "Admin")]
        [AllowAnonymous]
        [HttpDelete("DeleteDevice")]
        public bool DeleteDevice(DeviceModel device)
        {
            try
            {
                deviceService.DeleteDevice(device);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [Authorize(Roles = "Admin")]
        [AllowAnonymous]
        [HttpPut("UpdateDevice")]
        public bool UpdateDevice(DeviceModel device)
        {
            try
            {
                deviceService.UpdateDevice(device);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpGet("GetDeviceByID")]
        [AllowAnonymous]
        [Authorize(Roles = "Admin")]
        public Object GetDeviceByID(Guid id)
        {

            var result = deviceService.GetDeviceById(id);
            if (result == null) return null;
            return result;

        }

        [HttpGet("GetDeviceByUserID/{userId}")]
        [AllowAnonymous]
        public Object GetDeviceByUserID(string userId)
        {
            var result = deviceService.GetDevicesByUserId(userId);
            if (result == null) return null;
            return result;

        }
    }
}
