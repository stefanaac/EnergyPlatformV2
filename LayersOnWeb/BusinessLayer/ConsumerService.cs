using BusinessLayer.Contracts;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Text;


namespace BusinessLayer
{
    public class ConsumerService : IConsumerService
    {
        public List<String> ConsumeMessage()
        {
            List<String> messages = new List<String>();
            //var factory = new ConnectionFactory { HostName = "localhost" };
            string _url = "amqps://fvebewyg:CNK954zs1BxGDBKXka9LBFoYfA6omBo0@sparrow.rmq.cloudamqp.com/fvebewyg";
            var factory = new ConnectionFactory
            {
                Uri = new Uri(_url)
            };
            var connection = factory.CreateConnection();
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare("energydata", false, false, false, null);
                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, eventArgs) =>
                {
                    var body = eventArgs.Body.ToArray();
                    Console.WriteLine(body);
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine(message);
                    messages.Add(message); 

                };
                channel.BasicConsume(queue: "energydata", autoAck: true, consumer: consumer);
               
            }
            return messages;
        }
    }
}
