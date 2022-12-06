using System;

namespace LayersOnWeb
{
    public class Data
    {
        public Guid Id { get; set; }

        public Guid DeviceId { get; set; }
        public DateTime Timestamp { get; set; }
        public float Consumption { get; set; }
    }
}
