using BusinessLayer.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace LayersOnWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController: ControllerBase
    {
        
        private readonly IDataService dataService;
        public DataController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        [HttpPost("AddData")]
        [Authorize(Roles = "Admin,User")]
        [AllowAnonymous]
        public void Post(Data data)
        {
            DataModel d = new DataModel { DeviceId = data.DeviceId, Timestamp = data.Timestamp, Consumption = data.Consumption };
            dataService.AddDataModel(d);
        }

        [HttpGet]
        [AllowAnonymous]
        [Authorize]
        public IEnumerable<Data> Get()
        {
            var result = new List<Data>();
            foreach (var data in dataService.GetAllData())
            {
                result.Add(new Data { Id = data.Id, DeviceId = data.DeviceId, Timestamp = data.Timestamp, Consumption = data.Consumption });
            }
            return result;
        }

        //[Authorize(Roles = "Admin")]
        [AllowAnonymous]
        [HttpDelete("DeleteData")]
        public bool DeleteData(DataModel data)
        {
            try
            {
                dataService.DeleteData(data);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        //[Authorize(Roles = "Admin")]
        [AllowAnonymous]
        [HttpPut("UpdateData")]
        public bool UpdateData(DataModel data)
        {
            try
            {
                dataService.UpdateData(data);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpGet("GetDataByDeviceID/{deviceId}")]
        [AllowAnonymous]
        public List<string> GetDataByDeviceID(Guid deviceId)
        {
            var result = dataService.GetDataByDeviceId(deviceId);

            if (result == null) return null;
            return result;

        }
    }
}
