using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Contracts
{
    public class DataEntity
    {
        public Guid Id { get; set; }
        public Guid DeviceId{ get; set; }
        public DateTime Timestamp { get; set; }
        public float Consumption { get; set; }
    }
}
