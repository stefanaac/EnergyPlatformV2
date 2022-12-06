using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Contracts
{
    public class DeviceEntity
    {
        public Guid Id { get; set; }
        public string Descripion { get; set; }
        public string Address { get; set; }
        public int MaximumHourlyConsumption { get; set; }
        public Guid UserId { get; set; }
    }
}
