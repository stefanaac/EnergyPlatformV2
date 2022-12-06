using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Contracts
{
    public interface IDataService
    {
        List<DataModel> GetAllData();
        void AddDataModel(DataModel data);

        bool DeleteData(DataModel data);

        bool UpdateData(DataModel data);

        public List<String> GetDataByDeviceId(Guid deviceId);

    }
}
