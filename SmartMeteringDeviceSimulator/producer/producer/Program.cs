using producer.Contracts;
using System;
using System.IO;


namespace producer
{
    public class Program
    {
        

        static void Main(string[] args)
        {
            string filePath = @"D:\Facultate\AN-4\SD\Teme\UTCNSoftwareDesignLab\lab9\SmartMeteringDeviceSimulator\producer\sensor.csv";
            string deviceID = "4e20df6c-502a-4b0d-8161-34e71d6e6557";
            RabbitMQProducer mQProducer = new RabbitMQProducer();
            mQProducer.CreateConnection();


            try
            {
                using (StreamReader reader = new StreamReader(filePath))
                {
                    string line;
                    while ((line = reader.ReadLine()) != null)
                    {
                        //Console.WriteLine("< " + DateTime.Now.ToString() + ", " + deviceID + ", " + line + " >");
                        Message message = new Message()
                        {
                            Timestamp = DateTime.Now.ToString(),
                            DeviceID = deviceID,
                            Consumption = line
                        };
                        Console.WriteLine(message.Timestamp + ',' + message.DeviceID + ',' + message.Consumption);
                        mQProducer.SendMessage(message.Timestamp + ',' + message.DeviceID + ',' + message.Consumption);

                        System.Threading.Thread.Sleep(TimeSpan.FromMinutes(1)); //asteapta 1 minut sa citeasca urmatoarea linie din csv


                    }


                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            Console.ReadKey();
        }
    }
}