using BusinessLayer.Contracts;
using DataAccess;
using DataAccess.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class DataService : IDataService
    {
        private readonly IRepository repository;
        private readonly IConsumerService consumerService;
        public DataService(IRepository repository, IConsumerService consumerService)
        {
            this.repository = repository;
            this.consumerService = consumerService;
        }
        public void AddDataModel(DataModel data)
        {
            repository.Add(new DataEntity { DeviceId=data.DeviceId, Timestamp=data.Timestamp, Consumption= data.Consumption });
            repository.SaveChanges();
        }

        public bool DeleteData(DataModel data)
        {
            try
            {
                var item = repository.GetAll<DataEntity>().Where(x => x.Id == data.Id).FirstOrDefault();
                repository.Delete(item);
                repository.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return true;
            }
        }

        public List<DataModel> GetAllData()
        {
            List<DataModel> result = new List<DataModel>();
            foreach (var data in repository.GetAll<DataEntity>())
            {
                result.Add(new DataModel { Id= data.Id, DeviceId = data.DeviceId, Timestamp = data.Timestamp, Consumption = data.Consumption });
            }
            return result;
        }

        public List<String> GetDataByDeviceId(Guid deviceId)
        {
            //List<DataModel> result = new List<DataModel>();
            //List<String> messages = consumerService.ConsumeMessage();
            
            //foreach (var data in messages)
            //{
            //    Console.WriteLine(data);
            //    string[] words = data.Split(',');
            //    Guid messageDeviceId = Guid.Parse(words[1].Trim());
            //    result.Add(new DataModel {Id = Guid.NewGuid(), DeviceId = messageDeviceId, Timestamp = DateTime.Parse(words[0]), Consumption = Int16.Parse(words[2]) });
            //}
            //return result;
            return consumerService.ConsumeMessage();
        }

        public bool UpdateData(DataModel data)
        {
            try
            {
                var item = repository.GetAll<DataEntity>().Where(x => x.Id == data.Id).FirstOrDefault();
                if (data.DeviceId != null)
                {
                    item.DeviceId = data.DeviceId;
                }
                if (data.Timestamp != null)
                {
                    item.Timestamp = data.Timestamp;
                }
                if (data.Consumption != null)
                {
                    item.Consumption = data.Consumption;
                }

                repository.Update<DataEntity>(item);
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
