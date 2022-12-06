using Newtonsoft.Json;
using producer.Contracts;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace producer
{
    public class RabbitMQProducer : IMessageProducer
    {
        IConnection connection;
        IModel channel;


        public void CreateConnection()
        {
            string _url = "amqps://fvebewyg:CNK954zs1BxGDBKXka9LBFoYfA6omBo0@sparrow.rmq.cloudamqp.com/fvebewyg";

            var factory = new ConnectionFactory
            {
                Uri = new Uri(_url)
            };
            connection = factory.CreateConnection();
            channel = connection.CreateModel();
            channel.QueueDeclare("energydata", false, false, false, null);
        }
        public void SendMessage<T>(T message)
        {
            var json = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(json);
            channel.BasicPublish(exchange: "", routingKey: "energydata", null, body: body);


        }
    }
}
