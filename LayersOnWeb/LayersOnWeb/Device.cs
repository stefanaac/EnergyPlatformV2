using System;

namespace LayersOnWeb
{
    public class Device
    {
        public Guid Id { get; set; }
        public string Descripion { get; set; }
        public string Address { get; set; }
        public int MaximumHourlyConsumption { get; set; }
        public Guid UserId { get; set; }
    }
}
