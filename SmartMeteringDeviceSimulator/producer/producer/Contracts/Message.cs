using System;


namespace producer.Contracts
{
    public class Message
    {
        public String Timestamp { get; set; }
        public String DeviceID { get; set; }
        public String Consumption { get; set; }
    }
}
