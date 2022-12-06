using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Contracts
{
    public interface IConsumerService
    {
        public List<String> ConsumeMessage();
    }
}
